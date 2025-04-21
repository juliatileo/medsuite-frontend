import styled from "styled-components";

export const PatientCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  width: 100vw;
  height: 100vh;
  margin-top: 30px;
`;

export const PatientCard = styled.div`
  display: flex;
  align-items: center;
  width: 1250px;
  height: 80px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.seasalt};
`;

export const PatientName = styled.span`
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 15px;
  column-gap: 10px;
`;
