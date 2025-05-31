import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import session from "config/session";

import {
  AppointmentEntity,
  IAppointmentSearchParameters,
  IUserSearchParameters,
  LoginParams,
  LoginResponse,
  UserEntity,
  UserType,
} from "./dto";
import { DateTime } from "luxon";
import { formatParams } from "utils/formatParams";

class API {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:13000/api/",
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

  async listByType(type: UserType): Promise<AxiosResponse<UserEntity[]>> {
    return this.api.get("user/list-by-type", { params: { type } });
  }

  async getUsersPaginated(
    params: IUserSearchParameters
  ): Promise<AxiosResponse<UserEntity[]>> {
    const paramsString: string = formatParams(params);

    return this.api.get(`user/get-paginated?${paramsString}`);
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

  async deleteUser(id: string): Promise<AxiosResponse<UserEntity>> {
    return this.api.put("user", { id, deletedAt: new Date() });
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

  async getAppointmentsPaginated(
    params: IAppointmentSearchParameters
  ): Promise<AxiosResponse<AppointmentEntity[]>> {
    const paramsString: string = formatParams(params);

    return this.api.get(`appointment/get-paginated?${paramsString}`);
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
