import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchCandidates, voteCandidate } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function CandidateList() {
  const { electionTitle } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchCandidates(electionTitle);
      setCandidates(data || []);
      setLoading(false);
    })();
  }, [electionTitle]);

  const handleVote = async (candidateName) => {
    try {
      await voteCandidate({
        email: user?.email,
        candidateName,
        electionTitle,
      });
      setVoted(prev => ({...prev, [candidateName]: true}));
      alert("Your vote has been cast. Thank you!");
    } catch (e) {
      alert("Voting failed: " + (e.response?.data?.message || ""));
    }
  };

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>Candidates in <b>{electionTitle}</b></Typography>
        <List>
          {candidates.map(c => (
            <ListItem key={c._id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={<Typography variant="h6">{c.name}</Typography>}
                secondary={<Typography paragraph>{c.bio}</Typography>}
              />
              <Button
                variant={voted[c.name] ? "contained" : "outlined"}
                disabled={!!voted[c.name]}
                onClick={() => handleVote(c.name)}>
                {voted[c.name] ? "Voted" : "Vote"}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
