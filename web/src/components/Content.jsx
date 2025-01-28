import React from "react";
import { Typography, Button, Box } from "@mui/material";

const Content = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 260, // Adjust the value for desired spacing from the bottom
        right: 16, // Adjust the value for desired spacing from the right
        padding: 4,
        width: "70%",
        textAlign: "center",
        backgroundColor: "white", // Optional: background color to make it stand out
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif", // Apply premium font
        }}
      >
        Welcome to Our School Portal
      </Typography>
      <Typography
        variant="h5"
        paragraph
        sx={{
          fontFamily: "Poppins, sans-serif", // Apply premium font
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto", // Center the text horizontally
          justifyContent: "space-evenly",
        }}
      >
        Our school is dedicated to providing a top-notch education and fostering
        a strong community.
      </Typography>
    </Box>
  );
};

export default Content;
