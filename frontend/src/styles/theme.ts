import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      200: '#A5B4C5',
      500: '#1A202C',
    },
    background: {
      light: '#F7FAFC',
      dark: '#1A202C',
    },
    accent: {
      50: '#FFF5F5',
      100: '#FFF5F5',
      200: '#FED7D7',
      300: '#FEB2B2',
      400: '#FC8181',
      500: '#E53E3E',
      600: '#C53030',
      700: '#9B2C2C',
      800: '#822727',
      900: '#63171B',
    },
    accentHover: '#C53030',
  },
});

export default theme;
