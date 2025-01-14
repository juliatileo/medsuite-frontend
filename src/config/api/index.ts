import axios, { AxiosInstance, AxiosResponse } from "axios";

import session from "config/session";

import { LoginParams, LoginResponse, RegisterParams } from "./dto";

class API {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3333/api/",
      headers: { Authorization: `Bearer ${session?.getToken() || ""}` },
    });
  }

  async login(body: LoginParams): Promise<AxiosResponse<LoginResponse>> {
    return this.api.put("user/login", body);
  }

  async saveUser(body: RegisterParams): Promise<AxiosResponse<LoginResponse>> {
    return this.api.post("user", body);
  }
}

const api = new API();

export default api;
