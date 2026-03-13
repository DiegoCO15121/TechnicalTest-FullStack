import { useProfile } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import { Spinner } from "@/shared/ui";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const { data, isLoading, isError } = useProfile();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError || !data) return <Navigate to={"auth/login"} replace />;

  if (data) return <Outlet />;
}
