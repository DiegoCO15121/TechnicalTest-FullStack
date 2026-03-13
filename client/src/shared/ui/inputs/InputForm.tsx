import {
  type Control,
  type Path,
  type FieldValues,
  useController,
} from "react-hook-form";
import ErrorMessage from "../error/ErrorMessage";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required: string;
  placeholder: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  validate?: (value: string) => boolean | string;
};

export default function InputField<T extends FieldValues>({
  label,
  name,
  required,
  placeholder,
  error,
  control,
  type,
  validate,
}: InputFieldProps<T>) {
  const {
    field: { onChange, value },
  } = useController({ control, name, rules: { required, validate } });
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label
        htmlFor={name}
        className="text-base text-slate-800 font-bold"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="border border-cyan-800 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-800
        focus:border-none"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
