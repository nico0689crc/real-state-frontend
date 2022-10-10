import PropTypes from 'prop-types';
import { forwardRef } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";

const AppIconButton = forwardRef(({ tooltipText, tooltipPlacement, className, children, isLoading, ...props }, ref) => {
  const iconButton = ( 
    <IconButton 
      {...props} 
      className={`MuiIconButtonCustomized ${className}`}
      ref={ref}
    >
      {isLoading ? <CircularProgress sx={{height: "20px !important", width: "20px !important", padding: "3px"}} /> : children}
    </IconButton>
  );

  return (tooltipText && !isLoading) ? <Tooltip title={tooltipText} placement={tooltipPlacement}>{iconButton}</Tooltip> : iconButton;
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