import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, useMediaQuery, useTheme } from '@mui/material';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const NavLink = ({ to, label }) => (
        <Button color="inherit" onClick={() => navigate(to)}>
            <Typography variant="h6" component="span">
                {label}
            </Typography>
        </Button>
    );

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                {isMobile ? (
                    // Replace this comment with your mobile view components
                    <div>Mobile View Placeholder</div>
                ) : (
                    <>
                        {/* <NavLink to="/login" label="Login" /> */}
                        <NavLink to="/" label="Home" />
                        <NavLink to="/posts" label="Posts" />
                        <NavLink to="/recipes" label="Recipes" />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
