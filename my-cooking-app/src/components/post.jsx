import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

function Post({ title, description, image, userName, userAvatar, createdAt }) {
  // You might need to adjust the logic for userName and userAvatar based on your actual data structure
  return (
    <Box mb={2}>
      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        {/* ... rest of your Card component */}
      </Card>
    </Box>
  );
}

export default Post;