import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Card, Typography, Alert, Link } from '@mui/material';
import SignUp from './signUp';
const Login = (props) => {
  const {setToken} = props;

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState('');


  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { emailId: email, password });

      console.log({response});

      const token = response.data.token; // Assuming the token is sent back directly under a token key
      setToken(token); // Save the token using the setToken prop

      if (token){
        navigate('/');
      }

      //lookup how to navigat ]e to different URL ******* after logging in ****
      
      //localStorage.setItem('token', token); // Save the token to local storage
      // Handle response.data as needed;co for example, save the auth token
      console.log(response.data);
      // get/check if token from response

      // if token, then call setToken(token)

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  if (isSignUp) {
    return <SignUp />
  }

  return (
    <Container maxWidth="xs">
      <Card sx={{ mt: 8, p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Welcome to FlavorVerse!</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Not a member? <Link href="#" color="primary" onClick={() => setIsSignUp(true)}>Sign up now</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
