import { red, grey, blueGrey } from '@mui/material/colors';

const colors = {
  white: '#ffffff',
  primary: {
    main: red['500'],
    light: red['300'],
    dark: red['700'],
    ...red
  },
  grey: { ...grey },
  blueGrey: { ...blueGrey },
  background: {
    "dark-mode": {
      light: grey[700],
      default: grey[800],
      dark: grey[900]
    },
    "light-mode": {
      light: grey[400],
      default: grey[500],
      dark: grey[600]
    }
  }
};

export default colors;