import {createMuiTheme} from '@material-ui/core/styles';

const PytyperTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      main: '#0044ff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
    },
  },
});

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: false;
    lg: false;
    xl: false;
  }
}

export default PytyperTheme;
