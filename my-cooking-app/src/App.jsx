import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import theme from '../theme/theme';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import PostList from './components/posts.jsx';
import Recipes from './components/recipes.jsx';
import SignUp from './components/signUp.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState(true);
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/" element={
              <>
                <Home />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
