import styled from "styled-components";

export const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: fit-content;
  margin-top: 30px;
`;

export const AppointmentCardContainer = styled.div`
  display: flex;
  margin-top: 30px;
  row-gap: 30px;
  column-gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AppointmentCard = styled.div`
  width: 900px;
  height: 250px;
  background-color: ${(props) => props.theme.colors.seasalt};

  @media (max-width: 1920px) {
    width: 800px;
  }

  @media (max-width: 1366px) {
    width: 600px;
  }

  @media (max-width: 1280px) {
    width: 550px;
  }

  @media (max-width: 720px) {
    width: 80%;
  }
`;
