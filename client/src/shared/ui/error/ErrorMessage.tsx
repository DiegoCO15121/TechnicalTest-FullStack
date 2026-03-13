import type { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="text-red-500 font-semibold text-sm text-center">{children}</p>
  );
}
