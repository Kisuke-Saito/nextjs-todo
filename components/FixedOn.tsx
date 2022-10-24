import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

export default function FixedOn ({ control, name, label }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({field, fieldState}) => (
          <DatePicker
            {...field}
            value={field.value ?? ''}
            label={label ?? "期日"}
            inputFormat="YYYY年MM月DD日"
            mask="____年__月__日"
            toolbarFormat="YYYY年MM月DD日"
            onChange={(newValue) => {
              field.onChange(new Date(newValue));
            }}
            renderInput={(params) => (
              <TextField 
                {...params}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error && <p>{fieldState.error.message}</p>}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}