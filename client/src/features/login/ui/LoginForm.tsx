import type { LoginType } from "../model/login.types";
import { GradientButton, InputPassword, InputField } from "@/shared/ui";
import { useLogin } from "@/entities/session";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({ defaultValues: { email: "", password: "" } });

  const { mutate } = useLogin();
  return (
    <form
      className="bg-slate-100 p-6 max-w-120 mx-auto rounded-lg space-y-5"
      noValidate
      onSubmit={handleSubmit((formData: LoginType) => mutate(formData))}
    >
      <div className="space-y-3">
        <h1 className="text-center text-3xl font-bold uppercase text-slate-800 ">
          Login
        </h1>

        <p className="text-center text-slate-800 text-lg">
          Inicia sesión para comenzar a administrar usuarios
        </p>
      </div>

      <div className="space-y-5">
        <InputField
          control={control}
          name="email"
          label="Email"
          required="El email es requerido"
          placeholder="example@example.com"
          error={errors.email?.message}
        />

        <InputPassword
          control={control}
          name="password"
          label="Password"
          error={errors.password?.message}
        />

        <GradientButton variant="primary" text="Iniciar Sesión" type="submit" />
      </div>
    </form>
  );
}
