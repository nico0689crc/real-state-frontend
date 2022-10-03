import PropTypes from 'prop-types';
import { forwardRef } from "react";
import { Select, InputLabel, FormControl } from "@mui/material";

const InputSelect = forwardRef(({ id, label, children, size, className, ...props }, ref) => {
  return (
    <FormControl variant="standard" sx={{ width: '100%' }} className={`MuiSelectCustomized ${className}`}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select 
        {...props} 
        ref={ref}
        size={size}
      >
        {children}
      </Select>
    </FormControl>
  )
});

InputSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium"]),
  className: PropTypes.string
}

InputSelect.defaultProps = {
  size: "small",
  className: ""
};

export default InputSelect;

