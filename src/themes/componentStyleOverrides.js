import { borderRadius } from 'constants/ui';

const componentStyleOverrides = ({isDarkMode, colors, theme}) => {

  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto, sans-serif",
          "&.MuiTypographyCustomized": {
            "&.MuiTypographyEllipsisThirdLine": {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: '-webkit-box !important',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              minHeight: '75px'
            }
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiList-root": {
            width: '100%',
            padding: 0,
            "& .MuiCollapse-root": {
              paddingLeft: "30px"
            }
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          padding: "12px 20px",
          borderLeft: "5px solid transparent",
          borderRadius: "0 20px 20px 0",
          transition: 'all 0.5s ease',
          marginBottom: '0.5rem',
          color: isDarkMode ? 'inherit' : colors.grey[700],
          "&:hover, &.Mui-selected": {
            color: colors.primary.main,
            borderLeft: `5px solid ${colors.primary.main}`,
            backgroundColor: colors.primary.lightBackground,
            "& svg": {
              color: colors.primary.main,
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          marginRight: "5px"
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
          '& p': {
            fontSize: '0.875rem',
            fontWeight: '600',
            lineHeight: '1',
          }
        }
      }
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          padding: 0,
          "& .MuiList-root": {
            paddingLeft: 0,
            [theme.breakpoints.up('md')]: {
              paddingLeft: "30px",
            },
            "& .MuiListItemButton-root":{
              borderLeft: 0,
              borderRadius: 0,
              backgroundColor: 'transparent',
              transition: 'all 0.5s ease',
              "&.Mui-selected": {
                color: "colors.primary.main",
                backgroundColor: 'transparent',
                "& svg": {
                  color: colors.primary.main,
                }
              },
              "&:hover": {
                color: colors.primary.main,
                backgroundColor: 'transparent',
                "& svg": {
                  color: colors.primary.main,
                }
              },
            }
          },
        }
      }
    },
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
          transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
          }),
          "&.MuiIconButtonCustomized":{
            borderRadius: `${borderRadius}px`,
            backgroundColor: isDarkMode ? colors.background['dark-mode'].button.regular : colors.background['light-mode'].button.regular,
            color: isDarkMode ? colors.typography['dark-mode'].button.color : colors.typography['light-mode'].button.color,
            '&:hover': {
              backgroundColor: isDarkMode ? colors.background['dark-mode'].button.hover : colors.background['light-mode'].button.hover,
            },
            "&.MuiIconButtonRounded":{
              borderRadius: "50%"
            }
          },
          "&.MuiIconButtonNoHoverEffect": {
            '&:hover': {
              backgroundColor: 'transparent'
            },
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "600",
          borderRadius: `${borderRadius}px`,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextFieldCustomized": {

            "& .MuiFormLabel-root": {
              fontSize: "1.25rem",
              position: "relative",
              color: 'inherit',
              "&.Mui-error": {
                color: theme.palette.error.main
              },
            },
            '& .MuiInputBase-root.MuiInput-root': {
              padding: '0.5rem 0.75rem',
              border: `1px solid ${ isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.42)' }`,
              borderRadius: `${borderRadius}px`,
              marginTop: 0,
              "& input": {
                padding: 0
              },
              "&:hover": {
                "&::before, &::after": {
                  borderBottom: 0
                },
              },
              "&::before, &::after": {
                borderBottom: 0
              },
              "&.Mui-error .MuiInputAdornment-root svg": {
                color: theme.palette.error.main
              },
              "& .MuiInputAdornment-positionEnd button": {
                padding: 0,
                marginRight: 0
              },
              "&.Mui-error": {
                border: `1px solid ${theme.palette.error.main}`, 
              },
            }
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.MuiSelectCustomized": {
            "& .MuiFormLabel-root": {
              fontSize: "1.25rem",
              position: "relative",
              color: 'inherit',
              transform: "translate(0, -1.5px) scale(0.75)",
              "&.Mui-error": {
                color: theme.palette.error.main
              },
            },
            '& .MuiInputBase-root.MuiInput-root': {
              padding: '0.5rem 0.75rem',
              border: `1px solid ${ isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.42)' }`,
              borderRadius: `${borderRadius}px`,
              marginTop: 0,
              "&.MuiInputBase-sizeSmall": {
                height: "41px"
              },
              "& input": {
                padding: 0
              },
              "&:hover": {
                "&::before, &::after": {
                  borderBottom: 0
                },
              },
              "&::before, &::after": {
                borderBottom: 0
              },
              "&.Mui-error .MuiInputAdornment-root svg": {
                color: theme.palette.error.main
              },
              "& .MuiInputAdornment-positionEnd button": {
                padding: 0,
                marginRight: 0
              },
              "&.Mui-error": {
                border: `1px solid ${theme.palette.error.main}`, 
              },
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "&.MuiCardCustomized": {
            borderRadius: `${borderRadius}px`,
            boxShadow: '3.3px 3.7px 22.5px rgb(0 0 0 / 7%)',
            backgroundImage: "none",
            "&.MuiCardFullScreen": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              borderRadius: 0
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${borderRadius}px`,
          padding: "5px",
          fontWeight: "600"
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "&.MuiAppSnackBarCustomized": {
            "& .MuiAlert-icon": {
              alignItems: "center"
            }
          }
        }
      }
    },
  };
}

export default componentStyleOverrides;
