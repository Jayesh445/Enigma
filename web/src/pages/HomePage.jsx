import React from "react";
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import { CssBaseline, Container, Box } from '@mui/material';

const Homepage = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      {/* Background image applied here */}
      <Box 
        sx={{
          backgroundImage: 'url("https://ahaslides.com/wp-content/uploads/2023/08/35020247_8262066-1024x1024.jpg")',
          backgroundSize: 'contain',  // Makes the image smaller but still fully visible
          backgroundPosition: 'left center',  // Position the image at the top-left corner
          backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
          minHeight: '60vh', // Ensures the background image covers the entire viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Content />
        </Container>
      </Box>
    </>
  );
};

export default Homepage;
