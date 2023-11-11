import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/posts">Posts</Button>
                <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;