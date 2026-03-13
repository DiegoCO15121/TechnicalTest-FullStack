type VariantType = "primary" | "secondary" | "cancel";

type VariantStyles = {
  base: string;
  gradient?: string;
};

const styles: Record<VariantType, VariantStyles> = {
  primary: {
    base: "text-white bg-slate-800",
    gradient: "from-slate-800 to-cyan-800",
  },
  secondary: {
    base: "text-white bg-cyan-800",
    gradient: "from-cyan-800 to-slate-800",
  },
  cancel: {
    base: "text-white border border-red-500 bg-red-500",
    gradient: "from-red-500 to-red-400",
  },
};

type GradientButtonProps = {
  text: string;
  variant?: VariantType;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function GradientButton({
  text,
  variant = "primary",
  type = "button",
  onClick,
}: GradientButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg w-full px-4 py-2 font-bold hover:animate-pop hover:cursor-pointer
      flex justify-center items-center ${styles[variant].base}`}
    >
      <span className="relative z-10 transition-colors duration-30 uppercase">
        {text}
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 opacity-0 transition-opacity duration-300 ease-in-out
               pointer-events-none bg-linear-to-t ${styles[variant].gradient} group-hover:opacity-100`}
      />
    </button>
  );
}
