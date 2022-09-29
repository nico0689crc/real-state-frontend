export default function themePalette(themeOption = null) {
  const { 
    customTheme: { mode },
    colors,
    UI_VARIABLES 
  } = themeOption;
  const isDarkMode = mode === UI_VARIABLES.UI_MODE_DARK;

  return {
    mode: mode,
    background: {
      default: isDarkMode ?  colors.background['dark-mode'].default : colors.background['light-mode'].default,
      paper: isDarkMode ? colors.background['dark-mode'].paper : colors.background['light-mode'].paper
    },
    ...colors.primary,
  };
}
