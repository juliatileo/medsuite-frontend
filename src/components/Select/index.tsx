import { useState } from "react";
import { SelectBody } from "./styles";
import { SelectProps } from "./types";

function Select(props: SelectProps): JSX.Element {
  const [id, setId] = useState<string | undefined>(undefined);

  return (
    <SelectBody
      width={props.width}
      height={props.height}
      onChange={props.onChange}
      center={props.center === "true" ? true : false}
      value={props.value}
      disabled={props.disabled}
      id={id}
    >
      {props.options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          id={option.id.toString()}
          onClick={(e) => setId(e.currentTarget.id)}
        >
          {option.value}
        </option>
      ))}
    </SelectBody>
  );
}

export default Select;
