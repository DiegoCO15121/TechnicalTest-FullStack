import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onToastSuccess } from "@/shared/ui/toast/onToastSucces";
import { onToastError } from "@/shared/ui/toast/onToastError";
import { useState } from "react";
import {
  userService,
  useUpdateProfileImage,
  type UpdateUserType,
} from "@/entities/user";
import { useModalStore } from "@/shared/ui/modal";

export const useUpdateUser = () => {
  const [image, setImage] = useState<File>();
  const { setIsOpen, clearModal } = useModalStore();
  const { mutate: mutateProfileImage } = useUpdateProfileImage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: (data) => {
      setIsOpen();
      onToastSuccess({
        title: "",
        content: "Usuario actualizado correctamente",
      });

      queryClient.setQueryData(["getUsers"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.map((user: typeof data) =>
            user?.id === data?.id ? { ...user, ...data } : user,
          ),
        };
      });

      queryClient.invalidateQueries({ queryKey: ["getUsers"] });


      if (image && data) {
      
        mutateProfileImage({ image, id: data?.id });
      }

      clearModal();
    },

    onError: (error) => {
      onToastError(error);
    },
  });

  const handleUpdateUser = (userData: UpdateUserType, id: number) => {
    const { profilePicture, ...updateUserData } = userData;

    if (profilePicture) {
      setImage(profilePicture);
    }

    mutate({ userData: updateUserData, id });
  };

  return { handleUpdateUser };
};
