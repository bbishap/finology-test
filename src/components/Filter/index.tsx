import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FilterComponentProps {
  inputData: string[];
  handleSelect: (event: SelectChangeEvent, label: string) => void;
  label: string;
  value: string;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  inputData,
  handleSelect,
  label,
  value,
}) => {
  return (
    <FormControl
      sx={{ m: 1 }}
      className="w-1/1 2xs:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5"
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(event) => handleSelect(event, label)}
      >
        {inputData.map((data, idx) => (
          <MenuItem value={data} key={idx}>
            <em>{data}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
