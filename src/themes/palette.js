import { UI_VARIABLES } from '../store/uiSlice';

export default function themePalette(themeOption = null) {
  return {
    mode: themeOption.customTheme.mode,
    primary: themeOption.colors.primary,
    background: {
      default: themeOption.customTheme.mode === UI_VARIABLES.UI_MODE_DARK ? 
                themeOption.colors.background['dark-mode'].dark : themeOption.colors.white,
      paper: themeOption.customTheme.mode === UI_VARIABLES.UI_MODE_DARK ? 
                themeOption.colors.background['dark-mode'].light : themeOption.colors.white
    }
  };
}
