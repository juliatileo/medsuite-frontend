export interface SelectProps {
  height: string;
  width: string;
  onChange: (res: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; id: string | number }[];
  center?: string;
  value?: string;
  disabled?: boolean;
}
