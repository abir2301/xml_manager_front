import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const FormField = (props) => {
  return (
    <TextField
      fullWidth
      id={props.id}
      label={props.label}
      variant="outlined"
      margin="normal"
      defaultValue={props.defaultValue}
      required
      value={props.value}
      onChange={props.onChange}
      error={props.error ? true : false}
      helperText={props.error}
      type={props.isPassword ? "password" : "text"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" x={{ fontSize: 36 }}>
            {props.icon}
          </InputAdornment>
        ),
      }}
    />
  );
};
export default FormField;
