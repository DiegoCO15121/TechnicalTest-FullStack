import { api, catchError } from "@/shared/api";
import {
  CreateUserDTO,
  GetUserByIdDTO,
  GetUsersDTO,
  UpdateUserDTO,
  type CreateUserApiType,
  type UpdateUserApiType,
} from "../model";

class UserService {
  async getUsers({
    page,
    limit,
    status,
    role,
    search,
  }: {
    page: number;
    limit: number;
    status?: string;
    role?: string;
    search?: string;
  }) {
    try {
      const { data } = await api("/user", {
        params: {
          page,
          limit,
          status,
          role,
          search,
        },
      });

      const response = GetUsersDTO.safeParse(data);

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      catchError(error);
    }
  }

  async getUserById(id: number) {
    try {
      const { data } = await api(`/user/${id}`);

      const response = GetUserByIdDTO.safeParse(data);

      if (!response.success) {
        throw new Error("Invalid API response");
      }

      return response.data;
    } catch (error) {
      catchError(error);
      throw error;
    }
  }

  async createUser(userData: CreateUserApiType) {
    try {
      const { data } = await api.post("/user", userData);

      console.log(data)

      const response = CreateUserDTO.safeParse(data);

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      catchError(error);
    }
  }

  async updateUser({
    userData,
    id,
  }: {
    userData: UpdateUserApiType;
    id: number;
  }) {
    try {
      const { data } = await api.patch(`/user/${id}`, userData);
      const response = UpdateUserDTO.safeParse(data);

      console.log(response);

      if (response.success) {
        return response.data;
      }
    } catch (error) {
      catchError(error);
    }
  }

  async deleteUser(id: number) {
    try {
      const { data } = await api.delete(`/user/${id}`);

      return data;
    } catch (error) {
      catchError(error);
    }
  }

  async updateProfileImage({ id, image }: { id: number; image: File }) {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const { data } = await api.patch<string>(`/upload/${id}`, formData);

      return data;
    } catch (error) {}
  }
}

export const userService = new UserService();
