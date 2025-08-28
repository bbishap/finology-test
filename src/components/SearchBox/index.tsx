import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

interface SearchBoxProps {
  handleSearchChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearchChange,
  value,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
      }}
      className="flex items-center w-full lg:w-1/2"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search User"
        onChange={(event) => handleSearchChange(event)}
        value={value}
        inputProps={{ "aria-label": "search user" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
