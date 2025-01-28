import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Content = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 210, // Adjust the value for desired spacing from the bottom
        right: 16, // Adjust the value for desired spacing from the right
        padding: 4,
        textAlign: 'center',
        backgroundColor: 'white', // Optional: background color to make it stand out
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Poppins, sans-serif', // Apply premium font
        }}
      >
        Welcome to Our School Portal
      </Typography>
      <Typography
        variant="h5"
        paragraph
        sx={{
          fontFamily: 'Poppins, sans-serif', // Apply premium font
        }}
      >
        Our school is dedicated to providing a top-notch education and fostering a strong community.
      </Typography>
      <Button variant="contained" color="primary" href="#signin">
        Sign In
      </Button>
    </Box>
  );
};

export default Content;
