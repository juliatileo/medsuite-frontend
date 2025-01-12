import styled from "styled-components";

export const ButtonBody = styled.button<{ height: string; width: string }>`
  margin: 0;
  font-weight: bold;
  color: #fefefe;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.sage};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  cursor: pointer;
`;

export const ButtonText = styled.span`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
