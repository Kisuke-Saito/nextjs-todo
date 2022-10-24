import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormTextField ({ control, name, label }: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <TextField
          label={label}
          {...field}
          value={field.value || ''}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error && <p>{fieldState.error.message}</p>}
        />
      )}
    />
  )
}