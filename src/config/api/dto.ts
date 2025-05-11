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

export interface AppointmentEntity {
  id: string;
  date: string;
  description: string;
  patientId: string;
  doctorId: string;
  Doctor: UserEntity;
  Patient: UserEntity;
}

export interface LoginParams {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  user: UserEntity;
  token: string;
}

export type Pagination<T> = {
  rows: T[];
  count: number;
};

export type SearchParameterBase = {
  offset?: number;
  limit?: number;
  page?: number;
  orderBy?: string;
  isDESC?: boolean;
  sort?: "ASC" | "DESC";
};

export interface IUserSearchParameters extends SearchParameterBase {
  name?: string;
  taxIdentifier?: string;
  type?: UserType;
}

export interface IAppointmentSearchParameters extends SearchParameterBase {
  patientName?: string;
  doctorName?: string;
}
