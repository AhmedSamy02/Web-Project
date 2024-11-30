import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const handleShowAllMatches = () => {
    navigate('/matches');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('/Home.avif')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <NavBar />
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 2,
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to Tazkarti!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Discover exciting matches, Buy tickets. Enjoy the game.
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleShowAllMatches}
            sx={{ 
              mt: 2, 
              padding: '12px 24px',
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: 'green', // Customize hover color
              }
            }}
          >
            Show All Matches
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
