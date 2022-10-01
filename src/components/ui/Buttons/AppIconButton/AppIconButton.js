import { forwardRef } from "react";
import { IconButton } from "@mui/material";

const AppIconButton = forwardRef(({children, ...props}, ref) => {
  return <IconButton {...props} className={`MuiIconButtonCustomized ${props.className}`} ref={ref}>{children}</IconButton>
});

export default AppIconButton;