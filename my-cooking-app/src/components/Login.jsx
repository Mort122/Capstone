import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const {setToken} = props;

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { emailId: email, password });
      const token = response.data.token; // Assuming the token is sent back directly under a token key
      setToken(token); // Save the token using the setToken prop
      localStorage.setItem('token', token); // Save the token to local storage
      // Handle response.data as needed; for example, save the auth token
      console.log(response.data);
      // get/check if token from response

      // if token, then call setToken(token)

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div id="login-container">
      <form onSubmit={handleLogin}>
        <h2>Welcome to RecipeShare!</h2>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
        <div className="signup-link">
          Not a member? <a href="/signup">Sign up now</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
