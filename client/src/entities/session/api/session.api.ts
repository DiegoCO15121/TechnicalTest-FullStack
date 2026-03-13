import { api, catchError } from "@/shared/api";
import type { SessionForm } from "../model/types/session.type";
import { GetProfileDTO, LoginDTO } from "../model/schemas/session.schema";

class SessionService {
  async login(sessionData: SessionForm) {
    try {
      const { data } = await api.post("/auth/login", sessionData);

      const response = LoginDTO.safeParse(data);

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      catchError(error);
    }
  }

  async getProfile() {
    try {
      const { data } = await api("/auth/profile");

      const response = GetProfileDTO.safeParse(data);

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      catchError(error);
    }
  }

  async logout() {
    try {
      const { data } = await api.post("/auth/logout");

      return data;
    } catch (error) {
      catchError(error);
    }
  }
}

export const sessionService = new SessionService();
