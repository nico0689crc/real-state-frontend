import PropTypes from 'prop-types';
import { Chip } from "@mui/material";

const AppChip = ({className, position, top, left, right, bottom,  ...props}) => {

  const sx = position === "absolute" ? { position, top, left, right, bottom } : {};

  return (
    <Chip 
      {...props}
      sx={{...sx}} 
      className={`MuiChipCustomized ${className}`} 
    />
  ); 
}

AppChip.propTypes = {
  className: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  position: PropTypes.oneOf(["relative", "absolute"]),
}

AppChip.defaultProps = {
  className: "",
  position: "relative",
  top: null,
  left: null,
  bottom: null,
  right: null,
};

export default AppChip;