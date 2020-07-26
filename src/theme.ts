import {createMuiTheme} from '@material-ui/core/styles';
import {red, orange, green, cyan, grey} from '@material-ui/core/colors';

const lightShade = 100;
const mainShade = 300;
const darkShade = 500;

const PytyperTheme = createMuiTheme({
  palette: {
    primary: {
      light: grey[lightShade],
      main: grey[mainShade],
      dark: grey[darkShade],
    },
    secondary: {
      light: cyan[lightShade],
      main: cyan[mainShade],
      dark: cyan[darkShade],
    },
    success: {
      light: green[lightShade],
      main: green[mainShade],
      dark: green[darkShade],
    },
    warning: {
      light: orange[lightShade],
      main: orange[mainShade],
      dark: orange[darkShade],
    },
    error: {
      light: red[lightShade],
      main: red[mainShade],
      dark: red[darkShade],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1024,
    },
  },
});

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: false;
    xl: false;
  }
}

export default PytyperTheme;
