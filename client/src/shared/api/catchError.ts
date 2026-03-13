import { isAxiosError } from "axios";

export function catchError(error: unknown) {
  if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data?.message ?? "Error en el servidor");
      }

      throw new Error("No se pudo conectar al servidor");
    }

    throw error;
}