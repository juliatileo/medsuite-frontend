import { AlertProps } from "@mui/material";

export interface ISnackBarProps {
  severity: AlertProps["severity"];
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      severity: AlertProps["severity"];
    }>
  >;
  message: string;
}
