import styled from "styled-components";

export const PatientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const PatientsSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const PatientCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-between;
  row-gap: 30px;
  margin-top: 30px;
`;

export const PatientCard = styled.div`
  display: flex;
  align-items: center;
  width: 1015px;
  height: 80px;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.seasalt};

  @media (max-width: 1920px) {
    width: 755px;
  }

  @media (max-width: 1366px) {
    width: 100%;
  }

  @media (max-width: 1280px) {
    width: 100%;
  }

  @media (max-width: 720px) {
    width: 100%;
    height: 150px;
  }
`;

export const PatientName = styled.span`
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
  width: 200px;

  @media (max-width: 720px) {
    width: 130px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 15px;
  column-gap: 10px;
  width: 150px;
`;

export const CreatePatientButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: ${(props) => props.theme.colors.hunterGreen};
  color: ${(props) => props.theme.colors.white};
`;

export const ModalContainer = styled.div`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: fit-content;
  padding: 30px 0;
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.seasalt};

  span {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

export const ModalInputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 50px;
  justify-content: space-between;
  margin: 30px 50px;

  @media (max-width: 1920px) {
    row-gap: 50px;
  }

  @media (max-width: 1366px) {
    row-gap: 20px;
  }

  @media (max-width: 1280px) {
    row-gap: 20px;
  }

  @media (max-width: 720px) {
    row-gap: 20px;
  }
`;
