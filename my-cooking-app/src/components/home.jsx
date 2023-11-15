import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Recipe Sharing Website
        </Typography>
        {/* Additional home page content if any */}
      </Box>
    </Container>
  );
}

export default Home;
