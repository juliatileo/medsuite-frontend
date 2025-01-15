import styled from "styled-components";

export const HeaderBody = styled.header`
  background-color: #a3b18a;
  width: 100vw;
  height: 70px;
  border-bottom: 2px solid ${(props) => props.theme.colors.timberwolf};
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
