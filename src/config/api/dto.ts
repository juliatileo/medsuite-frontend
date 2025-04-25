export enum UserType {
  PATIENT = 1,
  DOCTOR = 2,
}

export interface PatientInfoEntity {
  birth: string;
  height: number;
  weight: number;
  bloodType: string;
  sex: "M" | "F";
  userId: string;
}
export interface UserEntity {
  id: string;
  name: string;
  cellphone: string;
  email: string;
  password: string;
  type: UserType;
  createdAt: string;
  patientInfo?: PatientInfoEntity;
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
