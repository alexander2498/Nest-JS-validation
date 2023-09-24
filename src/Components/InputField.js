import {TextField} from "@mui/material";

export default function InputField({field, setField}) {
  const validate = (field, newValue) => {
    const errors = [];
    field.rules.forEach(rule => {
      if (!rule.rule(newValue)) errors.push(rule.name);
    });
    return errors;
  };
  
  return (
    <TextField
      fullWidth
      error={field.errors.length}
      onChange={(e) => {

        setField((x) => {
          return {
            ...x,
            errors: validate(x, e.target.value),
            value: e.target.value
          };
        })
      }}
      helperText={field.helperText}
      label={field.label}
      required={field.required}
      multiline={field.multiline}
    />
  )
}