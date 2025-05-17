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
