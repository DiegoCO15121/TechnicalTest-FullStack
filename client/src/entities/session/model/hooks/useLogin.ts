import { sessionService } from "../../api/session.api";
import { onToastError, onToastSuccess } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: sessionService.login,
    onSuccess: (data) => {
      onToastSuccess({
        title: `Bienvenido ${data?.name}`,
        content: "Sesión Iniciada Correctamente",
      });

      navigate("/home", { replace: true });
    },
    onError: (error) => {
      onToastError(error);
    },
  });
};
