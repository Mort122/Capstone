import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Recipes = ({ posts }) => {
  return (
    <Box 
      // display="flex"
      
      // flexDirection="column"
      // alignItems="center"
      // height="100vh"
      // paddingTop={2}
    >
      <Typography variant="h4" align="center">
        Recipes
      </Typography>
    </Box>
  );
}

export default Recipes;