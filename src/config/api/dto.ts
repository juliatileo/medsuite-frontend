export enum UserType {
  PATIENT = 1,
  DOCTOR = 2,
}

export interface UserEntity {
  id: string;
  name: string;
  cellphone: string;
  email: string;
  password: string;
  type: UserType;
}

export interface AppointmentEntity {
  id: string;
  date: string;
  description: string;
  patientId: string;
  doctorId: string;
}

export interface LoginParams {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  user: UserEntity;
  token: string;
}

export interface RegisterParams {
  name?: string;
  email?: string;
  password?: string;
  cellphone?: string;
}
