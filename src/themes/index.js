import { createTheme } from '@mui/material/styles';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import colors from './colors';
import { UI_VARIABLES } from '../store/uiSlice'

export const theme = (customTheme) => {
  const themeOption = {
    colors,
    customTheme,
    UI_VARIABLES
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
