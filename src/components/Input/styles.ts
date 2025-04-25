import styled from "styled-components";

export const InputBody = styled.input<{ center: boolean }>`
  border: none;
  padding: 5px 15px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.colors.antiFlashWhite};
  font-size: ${(props) => props.theme.fontSizes.small};
  text-align: ${(props) => (props.center ? "center" : "left")};
`;
