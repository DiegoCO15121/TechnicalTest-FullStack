import {
  InputField,
  InputSelect,
  InputPassword,
  GradientButton,
} from "@/shared/ui";
import {
  useUpdateUser,
  LoadUserImgProfile,
  userRole,
  userStatus,
  useCreateUser,
  useCurrentUserStore,
  AddressForm,
  type GetUserByIdDTOType,
  type UserFormType,
} from "@/entities/user";
import { useFormContext } from "react-hook-form";

type UserFormProps = {
  isEdit: boolean;
  data?: GetUserByIdDTOType;
};

export default function UserForm({ isEdit, data }: UserFormProps) {
  const { handleCreateUser } = useCreateUser();
  const { handleUpdateUser } = useUpdateUser();
  const { currentUser } = useCurrentUserStore();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<UserFormType>();

  const handleEditable = (formData: UserFormType) => {
    const { street, number, postalCode, city, ...userData } = formData;

    const newUserData = {
      ...userData,
      address: {
        street,
        number,
        postalCode,
        city,
      },
    };

    if (!isEdit) {
      handleCreateUser(newUserData);
    } else {
      if (!currentUser.id) return;
      handleUpdateUser(newUserData, currentUser.id);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleEditable)}
      className="space-y-7"
    >
      <h3 className="text-center font-bold uppercase text-xl text-slate-800">
        {!isEdit ? "Crea un nuevo usuario" : "Actualizar usuario"}
      </h3>

      <div className="space-y-2">
        <LoadUserImgProfile
          isEdit={isEdit}
          control={control}
          name="profilePicture"
          currentImage={data?.profilePicture}
        />

        <div className="flex w-full gap-x-2">
          <InputField
            control={control}
            name="firstName"
            label="Nombre"
            required="El nombre es requerido"
            placeholder="Tu nombre"
            error={errors.firstName?.message}
          />

          <InputField
            control={control}
            name="lastName"
            label="Apellido"
            required="El apellido es requerido"
            placeholder="Tu Apellido"
            error={errors.lastName?.message}
          />
        </div>

        <InputField
          control={control}
          name="email"
          label="Email"
          required="El email es requerido"
          placeholder="example@example.com"
          error={errors.email?.message}
        />

        <InputField
          control={control}
          name="phoneNumber"
          label="Número de telefóno"
          required="El número de telefóno es requerido"
          placeholder="Tu número de telefóno"
          error={errors.phoneNumber?.message}
        />

        {!isEdit && (
          <InputPassword
            control={control}
            name="password"
            label="Password"
            error={errors.password?.message}
          />
        )}

        <div className="w-full grid grid-cols-2 gap-2">
          <InputSelect
            control={control}
            label="Rol"
            name="role"
            required="El rol es requerido"
            error={errors.role?.message}
            values={userRole}
          />

          <InputSelect
            control={control}
            label="Estatus"
            name="status"
            required="El estatus es requerido"
            error={errors.status?.message}
            values={userStatus}
          />
        </div>

        <div className="mt-5">
          <AddressForm data={data} />
        </div>
      </div>

      <GradientButton
        variant="primary"
        text={isEdit ? "Actualizar" : "Crear"}
        type="submit"
      />
    </form>
  );
}
