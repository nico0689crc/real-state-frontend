import PropTypes from 'prop-types';
import { forwardRef } from "react";
import { IconButton, Tooltip } from "@mui/material";

const AppIconButton = forwardRef(({ tooltipText, tooltipPlacement, className, children, ...props }, ref) => {
  const iconButton = ( 
    <IconButton {...props} className={`MuiIconButtonCustomized ${className}`} ref={ref}>
      {children}
    </IconButton>
  );

  return tooltipText ? <Tooltip title={tooltipText} placement={tooltipPlacement}>{iconButton}</Tooltip> : iconButton;
});

AppIconButton.propTypes = {
  className: PropTypes.string,
  tooltipText: PropTypes.any,
  tooltipPlacement: PropTypes.string
}

AppIconButton.defaultProps = {
  className: "",
  tooltipText: false,
  tooltipPlacement: "bottom-end"
};

export default AppIconButton;