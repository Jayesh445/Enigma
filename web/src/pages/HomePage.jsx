import React from "react";
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import { CssBaseline, Container } from '@mui/material';

const Homepage = () => {
  return (
    <>
    <CssBaseline />
    <Navbar />
    <Container>
      <Content />
    </Container></>
  );
};

export default Homepage;
