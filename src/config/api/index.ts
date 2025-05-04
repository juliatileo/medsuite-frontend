import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import session from "config/session";

import {
  AppointmentEntity,
  LoginParams,
  LoginResponse,
  UserEntity,
} from "./dto";
import { DateTime } from "luxon";

class API {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3333/api/",
      headers: { Authorization: `Bearer ${session?.getToken() || ""}` },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error(error);

        if (error.status === 401) {
          session.logOut();
        }

        return Promise.reject(error);
      }
    );
  }

  // USER
  async login(body: LoginParams): Promise<AxiosResponse<LoginResponse>> {
    return this.api.put("user/login", body);
  }

  async saveUser(body: UserEntity): Promise<AxiosResponse<LoginResponse>> {
    return this.api.post("user", body);
  }

  async updateUser(
    body: Partial<UserEntity>
  ): Promise<AxiosResponse<UserEntity>> {
    return this.api.put("user", body);
  }

  async listPatients(): Promise<AxiosResponse<UserEntity[]>> {
    return this.api.get("user/patients");
  }

  async getUserById(id: string): Promise<AxiosResponse<UserEntity>> {
    return this.api.get(`user/${id}`);
  }

  async forgotPassword(body: {
    email: string;
  }): Promise<AxiosResponse<string>> {
    return this.api.put("user/forgot-password", body);
  }

  async resetPassword(body: {
    password: string;
    token: string;
  }): Promise<AxiosResponse<UserEntity>> {
    return this.api.put("user/reset-password", body);
  }

  // APPOINTMENT
  async saveAppointment(
    body: Partial<AppointmentEntity>
  ): Promise<AxiosResponse<AppointmentEntity>> {
    return this.api.post("appointment", body);
  }

  async listAppointmentsByDoctorId(
    doctorId: string
  ): Promise<AxiosResponse<AppointmentEntity[]>> {
    return this.api.get(`appointment/doctor/${doctorId}`);
  }

  async listAppointmentsByPatientId(
    patientId: string
  ): Promise<AxiosResponse<AppointmentEntity[]>> {
    return this.api.get(`appointment/patient/${patientId}`);
  }

  async listAppointmentsByDate(
    date: Date
  ): Promise<AxiosResponse<AppointmentEntity[]>> {
    return this.api.get("appointment/date", {
      params: { date: DateTime.fromJSDate(date).toISO() },
    });
  }
}

const api = new API();

export default api;
