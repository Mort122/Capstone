import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Card, Typography, Alert } from '@mui/material';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('/api/users/create', { 
        firstName, 
        lastName, 
        emailId: email, 
        password 
      });
      // Handle response from the server
      navigate('/login');
      window.location.reload();
      console.log(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong during sign up.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ mt: 8, p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12}>
              <TextField
                label="First Name"
                type="text"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                type="text"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">Sign Up</Button>-
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default SignUp;
