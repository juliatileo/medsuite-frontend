import { ChangeEventHandler } from "react";

export interface SearchProps {
  submit: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
