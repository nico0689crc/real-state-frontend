export default function themeTypography(themeOption = null) {
  return {
    // fontFamily: customTheme.fontFamily
    mainContent: {
      borderTopLeftRadius: `${themeOption.customTheme.borderRadius}px`,
      width: '100%',
      minHeight: 'calc(100vh - 65px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '65px',
      marginRight: 0,
    }
  };
}
