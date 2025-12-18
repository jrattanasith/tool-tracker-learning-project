import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { Button, Box } from '@mui/material';

export default function App() {
  const [nightMode, setNightMode] = useState(false);

  return (
    <Box sx={{ p: 2, bgcolor: nightMode ? '#4a4e69' : 'white', minHeight: '100vh' }}>
      <Button
        onClick={() => setNightMode(prev => !prev)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Toggle Night Mode
      </Button>

      <Dashboard nightMode={nightMode} />
    </Box>
  );
}
