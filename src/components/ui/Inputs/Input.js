import { forwardRef } from "react";
import { TextField } from "@mui/material";

const Input = forwardRef((props, ref) => {
  return <TextField {...props} className="MuiTextFieldCustomized" ref={ref}/>
});

export default Input;

