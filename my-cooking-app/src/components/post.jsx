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
  return (
    <Box mb={2}>
      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardHeader
          avatar={
            userAvatar ? (
              <Avatar src={userAvatar} aria-label="user avatar">
                {userName?.[0]}
              </Avatar>
            ) : (
              <Avatar aria-label="user avatar">{userName?.[0]}</Avatar>
            )
          }
          // ... other CardHeader props
        />
        {/* ... rest of your component */}
      </Card>
    </Box>
  );
}

export default Post;