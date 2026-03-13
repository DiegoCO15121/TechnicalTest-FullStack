import { onToastSuccess } from "@/shared/ui/toast/onToastSucces";
import { onToastError } from "@/shared/ui/toast/onToastError";
import { userService, useUpdateProfileImage, type CreateUserType } from "@/entities/user";
import { useModalStore } from "@/shared/ui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useCreateUser = () => {
  const { setIsOpen, clearModal } = useModalStore();
  const { mutate: mutateProfileImage } = useUpdateProfileImage();
  const [image, setImage] = useState<File>();
  const queryClient = useQueryClient()  

  const { mutate } = useMutation({
    mutationFn: userService.createUser,
    onSuccess: (data) => {
      setIsOpen();
      onToastSuccess({ title: "", content: "Usuario Creado Correctamente" });

      console.log(image)
        console.log(data)
      if (image && data) {
        
        mutateProfileImage({ image, id: data?.userId });
      }
      queryClient.invalidateQueries({queryKey: ['getUsers']})
      clearModal();
    },

    onError: (error) => {
      onToastError(error);
    },
  });

  const handleCreateUser = (userData: CreateUserType) => {
    const { profilePicture, ...createUserData } = userData;

    if (profilePicture) {
      setImage(profilePicture);
    }

    mutate(createUserData);
  };

  return { handleCreateUser };
};
