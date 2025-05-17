export enum UserType {
  PATIENT = 1,
  DOCTOR = 2,
}

export interface PatientInfoEntity {
  id?: string;
  birthDate: string;
  height: number;
  weight: number;
  bloodType: string;
  sex: "M" | "F" | "";
  userId?: string;
}
export interface UserEntity {
  id?: string;
  name: string;
  cellphone: string;
  email: string;
  taxIdentifier: string;
  password: string;
  type: UserType;
  firstAccess?: boolean;
  createdAt?: string;
  patientInfo?: PatientInfoEntity;
}

export enum AppointmentStatus {
  SCHEDULED = 1,
  CANCELED = 2,
  PENDING_DONE = 4,
  DONE = 3,
}

export const AppointmentStatusMap: Map<number, string> = new Map<
  number,
  string
>([
  [AppointmentStatus.SCHEDULED, "Agendada"],
  [AppointmentStatus.CANCELED, "Cancelada"],
  [AppointmentStatus.PENDING_DONE, "Pendente"],
  [AppointmentStatus.DONE, "Concluída"],
]);

export interface AppointmentEntity {
  id: string;
  date: string;
  description: string;
  status: AppointmentStatus;
  patientId: string;
  doctorId: string;
  Doctor: UserEntity;
  Patient: UserEntity;
  createdAt: string;
}

export interface LoginParams {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  user: UserEntity;
  token: string;
}

export interface IUserSearchParameters {
  name?: string;
  taxIdentifier?: string;
  type?: UserType;
}

export interface IAppointmentSearchParameters {
  patientName?: string;
  doctorName?: string;
}
