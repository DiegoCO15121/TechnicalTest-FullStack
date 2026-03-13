import {InputField} from "@/shared/ui";
import GoogleAddressPicker from "./GoogleAddressPicker";
import type { GetUserByIdDTOType, UserFormType } from "../model";
import { useFormContext } from "react-hook-form";

type UserFormProps = {
  data?: GetUserByIdDTOType;
};

export default function AddressForm({ data }: UserFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormType>();
  return (
    <div className="space-y-3">
      <h4 className="text-2xl text-center font-bold text-slate-800">Dirección</h4>
      <div className="w-full grid grid-cols-2 gap-2">
        <InputField
          control={control}
          name="street"
          label="Calle"
          placeholder="Tu Calle"
          error={errors.street?.message}
          required="La calle es requerida"
        />

        <InputField
          control={control}
          name="number"
          label="Número"
          placeholder="Número ext."
          error={errors.number?.message}
          required="El número es requerido"
        />

        <InputField
          control={control}
          name="city"
          label="Ciudad"
          placeholder="Tu ciudad"
          error={errors.city?.message}
          required="La ciudad es requerida"
        />

        <InputField
          control={control}
          name="postalCode"
          label="Código Postal"
          placeholder="Tu código postal"
          error={errors.postalCode?.message}
          required="El código postal es requerido"
        />
      </div>
        <p className="text-center text-lg text-slate-600">Puedes usar el mapa para marcar tu dirección</p>
      <GoogleAddressPicker
        street={data?.street}
        number={data?.number}
        city={data?.city}
        postalCode={data?.postalCode}
      />
    </div>
  );
}
