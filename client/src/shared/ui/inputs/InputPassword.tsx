
import ErrorMessage from "@/shared/ui/error/ErrorMessage";
import { useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FiEye, FiEyeOff  } from "react-icons/fi";

type InputPasswordProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
};

export default function InputPassword<T extends FieldValues>({
  label,
  name,
  control,
  error,
}: InputPasswordProps<T>) {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-base text-slate-800 font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          placeholder="Tu contraseña"
          value={value}
          type={showPassword ? "text" : "password"}
          className="border border-cyan-800 p-2 rounded-lg w-full focus:outline-none 
          focus:ring-2 focus:ring-cyan-800 focus:border-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-800 hover:text-slate-800/70 
          transition-colors duration-500"
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>


      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
