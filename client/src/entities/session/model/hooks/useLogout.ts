import { sessionService } from "../../api/session.api";
import { onToastError, onToastSuccess } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionService.logout,
    onSuccess: () => {
      onToastSuccess({ title: "", content: "Sesión Cerrada Correctamente" });
      queryClient.resetQueries({ queryKey: ["profile"] });
      navigate("/auth/login", { replace: true });
    },

    onError: (error) => {
      onToastError(error);
    },
  });
};
