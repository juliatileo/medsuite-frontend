export interface SelectProps {
  height: string;
  width: string;
  onChange: (res: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  center?: string;
  value?: string;
  disabled?: boolean;
}
