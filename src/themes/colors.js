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
  text: {
    "dark-mode": {
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      third: "rgba(255, 255, 255, 0.6)",
      fourth: "rgba(255, 255, 255, 0.4)",
      fifth: "rgba(255, 255, 255, 0.3)"
    },
    "light-mode": {
      disabled: "rgba(0, 0, 0, 0.38)",
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      third: "rgba(0, 0, 0, 0.5)",
      fourth: "rgba(0, 0, 0, 0.4)",
      fifth: "rgba(0, 0, 0, 0.2)"
    }
  },
  grey
};

export default colors;