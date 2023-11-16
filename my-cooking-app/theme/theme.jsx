import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0', // A soothing shade of indigo
      light: '#8e99f3',
      dark: '#26418f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff7043', // A vibrant orange for accents
      light: '#ffa270',
      dark: '#c63f17',
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5', // A light grey background
      paper: '#fff',
    },
    text: {
      primary: '#212121', // Dark grey for primary text
      secondary: '#757575', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: [
      'Roboto', // You can change the font family to suit your style
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '0.875rem',
    },
    subtitle2: {
      fontSize: '0.75rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none', // To prevent automatic uppercase
    },
  },
  components: {
    // You can add component-specific styles here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded button edges
        },
      },
    },
  },
});

export default theme;
