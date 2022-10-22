import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    nav: Palette['primary'];
  }
  interface PaletteOptions {
    nav: PaletteOptions['primary'];
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    nav: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE8BAB',
    },
    secondary: {
      main: '#303030',
    },
    nav: {
      main: '#111111',
    },
  },
});

export default theme;
