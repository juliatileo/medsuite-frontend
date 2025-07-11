import { SelectBody } from "./styles";
import { SelectProps } from "./types";

function Select(props: SelectProps): JSX.Element {
  return (
    <SelectBody
      width={props.width}
      height={props.height}
      onChange={props.onChange}
      center={props.center === "true" ? true : false}
      value={props.value}
      disabled={props.disabled}
    >
      {props.options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          id={option.id.toString()}
          onClick={() => props.setId && props.setId(option.id.toString())}
        >
          {option.value}
        </option>
      ))}
    </SelectBody>
  );
}

export default Select;
