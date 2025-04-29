import { AlertProps } from "@mui/material";

export interface ISnackBarProps {
  severity: AlertProps["severity"];
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}
