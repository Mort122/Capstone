import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, IconButton, Box, Divider, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (path) => {
        handleClose();
        navigate(path);
    };

    const NavLink = ({ to, label }) => (
        <Button color="inherit" onClick={() => navigate(to)}>
            <Typography variant="h6" component="span">
                {label}
            </Typography>
        </Button>
    );

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Your Brand
            </Typography>
            <Divider />
            <List>
                <ListItem button onClick={() => navigate('/')}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => navigate('/posts')}>
                    <ListItemText primary="Posts" />
                </ListItem>
                <ListItem button onClick={() => navigate('/recipes')}>
                    <ListItemText primary="Recipes" />
                </ListItem>
                {/* Add more ListItems here */}
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" color="primary" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{ keepMounted: true }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            FlavorVerse
                        </Typography>
                        <NavLink to="/" label="Home" />
                        <NavLink to="/posts" label="Posts" />
                        <NavLink to="/recipes" label="Recipes" />
                        {/* Add more NavLinks here */}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                        <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleMenuClick('/my-account')}>My account</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
