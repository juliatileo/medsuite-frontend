import { InputBody } from "./styles";
import { InputProps } from "./types";

function Input(props: InputProps): JSX.Element {
  return (
    <InputBody
      placeholder={props.placeholder}
      width={props.width}
      height={props.height}
      onChange={props.onChange}
      type={props.type}
      center={props.center === "true" ? true : false}
      value={props.value}
    />
  );
}

export default Input;
