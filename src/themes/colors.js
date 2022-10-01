import { red, grey } from '@mui/material/colors';

const colors = {
  primary: {
    lightBackground: "#f344511a",
    main: "#f34451",
  },
  background: {
    "dark-mode": {
      default: "#1b1b1b",
      paper: "#232323",
      button: {
        regular: "#ffffff1a",
        hover: "#ffffff33"
      } 
    },
    "light-mode": {
      default: "#f0f0f0",
      paper: "#ffffff",
      button: {
        regular: red['50'],
        hover: red['100']
      } 
    }
  },
  typography: {
    "dark-mode": {
      button: {
        color: 'inherit'
      } 
    },
    "light-mode": {
      button: {
        color: red['500']
      } 
    }
  },
  grey
};

export default colors;