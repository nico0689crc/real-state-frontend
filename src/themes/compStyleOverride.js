export default function componentStyleOverrides(themeOption = null) {
  
  const { 
    customTheme: { mode, borderRadius },
    colors,
    UI_VARIABLES 
  } = themeOption;
  const isDarkMode = mode === UI_VARIABLES.UI_MODE_DARK;

  return {
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       paddingTop: 2,
    //       paddingBottom: 2,
    //       "&::after": {
    //         borderBottom: borders
    //       },
    //       "&::before": {
    //         borderBottom: borders
    //       },
    //       "&:hover": {
    //         "&::before": {
    //           borderBottom: `1px solid ${colors.grey[300]} !important`
    //         }
    //       }
    //     },
    //     input: {
    //       "&:-webkit-autofill": {
    //         WebkitBoxShadow: "0 0 0 1000px white inset",
    //       }
    //     },
    //   },
    // },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 !important',
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: `${borderRadius}px`,
          backgroundColor: isDarkMode ? colors.background['dark-mode'].button.regular : colors.background['light-mode'].button.regular,
          color: isDarkMode ? colors.typography['dark-mode'].button.color : colors.typography['light-mode'].button.color,
          '&:hover': {
            backgroundColor: isDarkMode ? colors.background['dark-mode'].button.hover : colors.background['light-mode'].button.hover,
          }
        }
      }
    }
  };
}
