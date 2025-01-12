import { ButtonBody, ButtonText } from "./styles";
import { ButtonProps } from "./types";

function Button(props: ButtonProps) {
  return (
    <ButtonBody
      height={props.height}
      width={props.width}
      onClick={props.onClick}
    >
      <ButtonText>{props.text}</ButtonText>
    </ButtonBody>
  );
}

export default Button;
