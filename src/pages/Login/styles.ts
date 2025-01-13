import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  h2 {
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.jet};
  }

  input,
  button {
    margin-top: 25px;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

export const LoginCreateAccount = styled.span<{ green?: string }>`
  margin-top: 10px;
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) =>
    props.green === "true"
      ? props.theme.colors.fernGreen
      : props.theme.colors.battleshipGray};
  cursor: ${(props) => (props.green ? "pointer" : "inherit")};
`;
