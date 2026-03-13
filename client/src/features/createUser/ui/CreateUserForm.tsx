import { ModalLayout } from "@/shared/ui/modal";
import { defaultValues, UserForm, type UserFormType } from "@/entities/user";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateUserForm() {
  const methods = useForm<UserFormType>({ defaultValues });
  const handleCloseModal = () => {
    methods.reset(defaultValues);
  };

  return (
    <ModalLayout onClose={handleCloseModal}>
      <FormProvider {...methods}>
        <UserForm isEdit={false} />
      </FormProvider>
    </ModalLayout>
  );
}
