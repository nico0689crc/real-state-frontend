import { forwardRef } from "react";
import { TextField } from "@mui/material";

const Input = forwardRef((props, ref) => {
  return <TextField  variant="standard" size="small" {...props} className={`MuiTextFieldCustomized ${props.className}`} ref={ref}/>
});

export default Input;

