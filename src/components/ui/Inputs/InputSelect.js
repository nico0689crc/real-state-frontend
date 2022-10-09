import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import { Select, InputLabel, FormControl, FormHelperText, MenuItem } from "@mui/material";

const InputSelect = ({ id, label, helperText, size, className, control, name, value, error, options = [] }) => {
  const select_options = options.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>);
  
  return (
    <FormControl error={error} variant="standard" sx={{ width: '100%' }} className={`MuiSelectCustomized ${className}`}>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field}) => <Select {...field} labelId={id} size={size} defaultValue={value}>{select_options}</Select>}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

InputSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium"]),
  options: PropTypes.array,
  className: PropTypes.string
}

InputSelect.defaultProps = {
  size: "small",
  className: "",
  options: [{value: "none", text: "None"}]
};

export default InputSelect;

