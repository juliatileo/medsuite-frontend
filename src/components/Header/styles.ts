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

export const DrawerContainer = styled.div`
  width: 20vw;
  height: 100%;
  background-color: ${(props) => props.theme.colors.seasalt};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogOutContainer = styled.div`
  background-color: ${(props) => props.theme.colors.seasalt};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 75px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
  }
`;

export const LinkContainer = styled.div`
  width: 40%;
  height: 75px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  row-gap: 50px;
`;
