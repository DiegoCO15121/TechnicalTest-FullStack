import {
  defaultValues,
  useCurrentUserStore,
  useGetUserById,
  type UserFormType,
} from "@/entities/user";
import UserForm from "@/entities/user/ui/UserForm";
import { ModalLayout } from "@/shared/ui/modal";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function UpdateUserForm() {
  const methods = useForm<UserFormType>({ defaultValues });
  const { currentUser, setCurrentUser } = useCurrentUserStore();
  const { data } = useGetUserById(currentUser.id);

  useEffect(() => {
    if (!data) return;

    const { id, profilePicture, ...currentUserData } = data;
    const newDefaultUserData = { ...currentUserData } as UserFormType;
    methods.reset(newDefaultUserData);
  }, [data]);

  const handleCloseModal = () => {
    methods.reset(defaultValues);
    setCurrentUser({ id: null, firstName: "", lastName: "" });
  };

  return (
    <ModalLayout onClose={handleCloseModal}>
      <FormProvider {...methods}>
        <UserForm isEdit data={data} />
      </FormProvider>
    </ModalLayout>
  );
}
