import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface AlretComponentProps {
  severity: "success" | "info" | "warning" | "error";
  message: string;
}

export const AlertComponent: React.FC<AlretComponentProps> = ({
  severity,
  message,
}) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity}>{message || "Something went wrong!"}</Alert>
    </Stack>
  );
};
