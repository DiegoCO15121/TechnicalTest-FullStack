import {
  type Control,
  type Path,
  type FieldValues,
  useController,
} from "react-hook-form";
import ErrorMessage from "../error/ErrorMessage";

type InputSelectProps<T extends FieldValues> = {
  values: Record<string, string>[];
  label: string;
  name: Path<T>;
  control: Control<T>;
  required: string;
  error?: string;
};

export default function InputSelect<T extends FieldValues>({
  values,
  label,
  name,
  control,
  required,
  error,
}: InputSelectProps<T>) {
  const {
    field: { onChange, value },
  } = useController({ control, name, rules: { required } });

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor="" className="text-base text-slate-800 font-bold">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        name="role"
        id="role"
        className="border border-cyan-800 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-800
                    focus:border-none"
      >
        {values.map((v, index) => (
          <option key={index} value={Object.keys(v)}>
            {Object.values(v)}
          </option>
        ))}
      </select>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
