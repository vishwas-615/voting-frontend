import React from 'react';
import { Box, Typography, Paper, Button, Stack, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const sampleQA = [
  {
    q: "What is this portal?",
    a: "This is India's leading electronic election platform for digital voting."
  },
  {
    q: "Is my vote secure?",
    a: "Yes, all votes are securely managed & counted in real time."
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={2}>Welcome, {user?.fullName || user?.userName}!</Typography>
        <Typography variant="subtitle1" mb={3}>
          Your Location: <strong>{user.location || user?.location_id?.name}</strong>
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button variant="contained" onClick={() => navigate('/elections')}>See Elections</Button>
          <Button variant="contained" onClick={() => navigate('/results')}>View Results</Button>
        </Stack>
        <Box mt={5}>
          <Typography variant="h6">What is Election?</Typography>
          <Typography paragraph>
            Indian elections provide every citizen the right to choose their leaders legally and transparently. Digital voting makes the process faster and more accessible.
          </Typography>
          <Typography variant="h6">Q & A</Typography>
          <List>
            {sampleQA.map((item, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemText
                  primary={<strong>{item.q}</strong>}
                  secondary={item.a}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
}
