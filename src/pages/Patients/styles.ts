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
  align-items: center;
  margin-right: 15px;
  column-gap: 10px;
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
  height: 650px;
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
`;
