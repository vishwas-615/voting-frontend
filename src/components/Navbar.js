import React from 'react';
import { AppBar, Toolbar, Button, Typography, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none' }}>
          Election Portal
        </Typography>
        <Stack direction="row" spacing={2}>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
