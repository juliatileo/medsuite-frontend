import styled from "styled-components";

export const InputBody = styled.input`
  border: none;
  padding: 5px 15px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.colors.seasalt};
  font-size: ${(props) => props.theme.fontSizes.small};
`;
