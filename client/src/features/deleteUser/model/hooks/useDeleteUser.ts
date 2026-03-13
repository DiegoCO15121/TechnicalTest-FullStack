import { useMutation, useQueryClient } from "@tanstack/react-query";

import { onToastSuccess } from "@/shared/ui/toast/onToastSucces";
import { onToastError } from "@/shared/ui/toast/onToastError";
import { userService } from "@/entities/user";
import { useModalStore } from "@/shared/ui/modal";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { setIsOpen, clearModal } = useModalStore();

  return useMutation({
    mutationFn: userService.deleteUser,
    retry: false,
    onSuccess: () => {
      onToastSuccess({ title: "", content: "Usuario Eliminado Correctamente" });
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      setIsOpen();
      clearModal();
    },

    onError: (error) => {
      onToastError(error);
    },
  });
};
