export interface InputProps {
  placeholder: string;
  height: string;
  width: string;
  type: string;
  onChange: (res: React.ChangeEvent<HTMLInputElement>) => void;
}
