import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import theme from '../theme/theme';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import PostCreationForm from './components/posts.jsx';
import Recipes from './components/recipes.jsx';
import RecipeDetail from './components/recipeDetail'; 
import SignUp from './components/signUp.jsx';
import './App.css';

function App() {
  const [token, setToken] = useState();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
  
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
            <Route path="/posts" element={<PostCreationForm />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:idMeal" element={<RecipeDetail />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
          </Routes>
        </div>
      </ThemeProvider>

  );
}

export default App;
