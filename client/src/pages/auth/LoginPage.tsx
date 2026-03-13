import { useAuthRedirect } from "@/features/check-status";
import { LoginForm } from "@/features/login";

export default function LoginPage() {
  useAuthRedirect();
  
  return (
    <div className="h-screen p-20 bg-slate-800 space-y-25">
      <h1 className="text-center uppercase text-4xl font-bold text-white">
        User Management
      </h1>

      <LoginForm />
    </div>
  );
}
