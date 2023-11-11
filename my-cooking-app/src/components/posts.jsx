import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const posts = [
  {
    title: 'Post 1',
    content: 'Content for post 1',
    author: 'Jane Doe',
    timestamp: '2 hours ago',
  },
  {
    title: 'Post 2',
    content: 'Content for post 2',
    author: 'John Doe',
    timestamp: '5 hours ago',
  },
];

const PostList = () => {
  return (
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid item xs={12} sm={8} md={6} key={index}>
          <Card variant="outlined" style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader
              avatar={
                <Avatar src="/path-to-your-profile-picture.jpg" />
              }
              title={post.author}
              subheader={post.timestamp}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2">{post.content}</Typography>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Box>
                <Button variant="outlined" size="small">
                  Read More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;