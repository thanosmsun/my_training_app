// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary buttons and components
    },
    secondary: {
      main: '#C0C0C0', // Silver for secondary elements
    },
    text: {
      primary: '#000000', // Black text for primary contrast
      secondary: '#000000', // White text for secondary contrast
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  components: {

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Set the text color of InputAdornment to white
        },
      },
    },
    
  MuiButton: {

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#000000', // Change the label color to black
          },
        },
      },

      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text for better visibility on dark buttons
          backgroundColor: '#000000', // Black background for buttons
          '&:hover': {
            backgroundColor: '#333333', // Darker on hover
          },
        },
      },
    },


    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#000000', // Black label color
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#000000', // Black icon in Select
        },
        select: {
          color: '#000000', // Black text in Select
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000', // Black text in menu items
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#000000', // Black label color when focused
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000', // Black underline color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000', // Black border color
            },
            '&:hover fieldset': {
              borderColor: '#000000', // Black border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000', // Black border color when focused
            },
          },
        },
      },
    },
    // Add more component overrides as needed
  },
  // You can add more customizations here
});

export default theme;
