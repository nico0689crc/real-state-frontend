export default function componentStyleOverrides(themeOption = null) {
  const borders = `1px solid ${themeOption.colors.grey[300]}`;
  const { mode } = themeOption.customTheme;
  const { UI_MODE_DARK } = themeOption.UI_VARIABLES;

  return {
    MuiInput: {
      styleOverrides: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
          "&::after": {
            borderBottom: borders
          },
          "&::before": {
            borderBottom: borders
          },
          "&:hover": {
            "&::before": {
              borderBottom: `${borders} !important`
            }
          }
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset",
          }
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: `${themeOption.customTheme.borderRadius}px`,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === UI_MODE_DARK ?
            themeOption.colors.background["dark-mode"].dark :
            themeOption.colors.white,
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            backgroundColor: mode === UI_MODE_DARK ?
              themeOption.colors.background["dark-mode"].dark :
              themeOption.colors.white,
          }
        }
      }
    }
  };
}
