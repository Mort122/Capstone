import React, { useState } from 'react';
import { TextField, Button, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PostCreationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Re-add this if you want the field to show

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if necessary
        },
        body: JSON.stringify({ title, description }), // Do not include image in the body
      });

      if (response.ok) {
        navigate('/');
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Re-add this TextField for the image URL if you want it to appear in the form */}
          <TextField
            margin="normal"
            fullWidth
            name="image"
            label="Image URL (optional)"
            id="image"
            autoComplete="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled // Add this if you want the field to be non-interactive
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCreationForm;
