export enum UserType {
  PATIENT = 1,
  DOCTOR = 2,
}

export interface UserEntity {
  name: string;
  cellphone: string;
  email: string;
  password: string;
  type: UserType;
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
