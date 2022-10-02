import { createTheme } from '@mui/material/styles';
import componentStyleOverrides from './componentStyleOverrides';
import colors from './colors';
import { UI_VARIABLES } from "constants/ui";

export const customThemeCreator = ({customTheme, theme}) => {
  const themeOption = { 
    colors, 
    isDarkMode: customTheme.mode === UI_VARIABLES.UI_MODE_DARK,
    theme 
  };

  return createTheme({
    palette: {
      mode: customTheme.mode,
      background: {
        default: themeOption.isDarkMode ?  colors.background['dark-mode'].default : colors.background['light-mode'].default,
        paper: themeOption.isDarkMode ? colors.background['dark-mode'].paper : colors.background['light-mode'].paper
      },
      primary: {
        ...colors.primary,
      },
      text: {
        ...(themeOption.isDarkMode ? colors.text['dark-mode'] : colors.text['light-mode'])
      }
    },
    components: componentStyleOverrides(themeOption),
    typography: {
      fontFamily: ['"Montserrat"', '"Roboto"', '"Rubik"', 'sans-serif'].join(',')
    }
  });
};

export default customThemeCreator;
