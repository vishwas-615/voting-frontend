import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Chip } from '@mui/material';
import { fetchCandidates, fetchElections, fetchVoteCounts } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function Results() {
  const { user } = useAuth();
  const [voteCounts, setVoteCounts] = useState([]);
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = user.location || user?.location_id?.name;

  useEffect(() => {
    (async () => {
      setLoading(true);
      // Get elections & candidates in this location
      const { data: electionList = [] } = await fetchElections(location);

      setElections(electionList);

      // Flatten all candidates across all elections
      const allCandidates = [];
      for (const election of electionList) {
        const { data: candList = [] } = await fetchCandidates(election.title);
        allCandidates.push(...candList);
      }
      setCandidates(allCandidates);

      // Get vote counts (for all elections/candidates system-wide)
      const { data: voteList = [] } = await fetchVoteCounts();
      setVoteCounts(voteList.map(v => ({
        ...v, voteCount: Number(v.voteCount),
      })));

      setLoading(false);
    })();
  }, [location]);

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  if (elections.length === 0) return (
    <Box maxWidth={700} mx="auto" mt={4}><Paper sx={{ p: 4 }}>
      <Typography variant="h6">No elections to show results for your location.</Typography>
    </Paper></Box>
  );

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
      {elections.map(election => {
        // Filter candidates for this election
        const cands = candidates.filter(c => c.election_id._id === election._id);
        // Get votes for this election's candidates
        const thisVotes = voteCounts.filter(v => v.electionId === election._id);
        // Sort by descending votes (for ranking)
        const sorted = [...cands].map(c => ({
          ...c,
          votes:
            thisVotes.find(v => v.candidateId === c._id)?.voteCount || 0
        })).sort((a, b) => b.votes - a.votes);

        return (
          <Paper sx={{ p: 3, mb: 4 }} key={election._id}>
            <Typography variant="h5" mb={2}>{election.title} <span style={{ color: "#777", fontSize: 16 }}>({location})</span></Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Votes</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {sorted.map((c, idx) => (
                  <TableRow key={c._id}>
                    <TableCell>{idx === 0 ? <Chip label="1 (Leading)" color="success" /> : idx+1}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.votes}</TableCell>
                    <TableCell>
                      {idx === 0
                        ? <Chip label="Leading" color="success" />
                        : <Chip label="Running" color="primary" />}
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );
      })}
    </Box>
  );
}
