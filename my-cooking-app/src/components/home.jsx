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
      <Box>
          {posts.map((post, index) => (
              <Post
                  key={index}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  userName={"User Name"} // Replace with actual user name data
                  userAvatar={"User Avatar"} // Replace with actual user avatar data
                  createdAt={post.createdAt} // Replace with actual creation date data
              />
          ))}
      </Box>
  );
}

export default HomePage;
