import { useProfile } from "@/entities/session";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = (redirectTo = '/home') => {
  const navigate = useNavigate();
  const { data } = useProfile();

  useEffect(() => {
    if (data) {
      navigate(redirectTo, { replace: true });
    }
  }, [data, navigate]);
};