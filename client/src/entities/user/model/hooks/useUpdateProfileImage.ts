import { useMutation } from "@tanstack/react-query";
import { userService } from "../../api/user.api";
import { onToastError } from "@/shared/ui/toast/onToastError";

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: userService.updateProfileImage,
    /* onSuccess: (data) => {
      console.log(data);
    }, */
    onError: (error) => {
      onToastError(error);
    },
  });
};
