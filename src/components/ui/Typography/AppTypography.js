import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FONT_COLORS_VARIANTS } from "constants/ui";

const { DISABLED, PRIMARY, SECONDARY, THIRD, FOURTH, FIFTH } = FONT_COLORS_VARIANTS;

const AppTypography = ({fontColor, className, children, ...props}) => {
  const theme = useTheme();

  return (
    <Typography {...props} className={`MuiCardCustomized ${className}`} sx={{color: theme.palette.text[fontColor]}}>
      {children}
    </Typography>
  ); 
}

AppTypography.propTypes = {
  fontColor: PropTypes.oneOf([ DISABLED, PRIMARY, SECONDARY, THIRD, FOURTH, FIFTH]),
  className: PropTypes.string
}

AppTypography.defaultProps = {
  fontColor: PRIMARY,
  className: "",
};

export default AppTypography;