import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Content = () => {
  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our School Portal
      </Typography>
      <Typography variant="h5" paragraph>
        Our school is dedicated to providing a top-notch education and fostering a strong community.
      </Typography>
      <Button variant="contained" color="primary" href="#signin">
        Sign In
      </Button>
    </Box>
  );
};

export default Content;
