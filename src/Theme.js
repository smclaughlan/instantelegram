import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  gradientBackground: "linear-gradient(45deg, #8a64c7 30%, #ac9cc7 90%)",
  fontFamily: "Verdana",
  primaryColor: '#8a64c7',
  secondaryColor: 'green',
  typography: {
    fontFamily: "Verdana"
  }
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
