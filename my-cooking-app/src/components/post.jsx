import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box
} from '@mui/material';

function Post({ title, description, userName, createdAt }) { 
  return (
    <Box mb={2}>
      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardHeader
          title={title}
          subheader={new Date(createdAt).toLocaleDateString()}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {/* ... other components */}
      </Card>
    </Box>
  );
}

export default Post;
