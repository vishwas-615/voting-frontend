import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { fetchElections } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ElectionList() {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // allow both user.location or user.location_id.name
        const loc = user.location || user?.location_id?.name;
        console.log("Fetching user:", loc);
        const { data } = await fetchElections(loc);
        console.log("Elections fetched:", data);
        setElections(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>Elections in <b>{user.location || user?.location_id?.name}</b></Typography>
        {elections.length === 0 ? (
          <Typography>No elections scheduled at your location.</Typography>
        ) : (
          <List>
            {elections.map(election => (
              <ListItem key={election._id} alignItems="flex-start" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                <ListItemText
                  primary={<Typography variant="h6">{election.title}</Typography>}
                  secondary={
                    <>
                      <Typography>{election.description}</Typography>
                      <Typography variant="body2">
                        Time: {new Date(election.start_time).toLocaleString()} <b>-</b> {new Date(election.end_time).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <Button sx={{ mt: 1 }} variant="outlined"
                  onClick={() => navigate(`/candidates/${encodeURIComponent(election.title)}`)}>
                  View Candidates / Vote
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
