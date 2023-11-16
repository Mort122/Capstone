import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Post from './post';


function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (response.ok) {
                    const data = await response.json();
                    // console.log(data)
                    setPosts(data);
                } else {
                    // Handle errors
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
      <Box sx={{ paddingTop: '64px' }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            userName={post.user?.name}
            createdAt={post.createdAt}
          />
        ))}
      </Box>
    );
  }

export default HomePage;
