import styled from "styled-components";

import { AppointmentStatus } from "config/api/dto";

export const AppointmentStatusColorMap: Map<number, string> = new Map<
  number,
  string
>([
  [AppointmentStatus.SCHEDULED, "#F2DC5D"],
  [AppointmentStatus.CANCELED, "crimson"],
  [AppointmentStatus.PENDING_DONE, "#6D9DF9"],
  [AppointmentStatus.DONE, "#588157"],
]);

export const RelativeDate = styled.span`
  width: 100px;
  text-align: right;

  @media (max-width: 720px) {
    text-align: center;
  }
`;

export const Status = styled.div<{ status: AppointmentStatus }>`
  font-weight: bold;
  padding: 8px;
  border-radius: 10px;
  font-size: 1.2rem;
  border: ${({ status }) =>
    status && `2px solid ${AppointmentStatusColorMap.get(status)}`};
  color: ${({ status }) =>
    status && `${AppointmentStatusColorMap.get(status)}`};
`;

export const DescriptionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  row-gap: 20px;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 15px;
  column-gap: 10px;
  width: 150px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const AppointmentCard = styled.div`
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
