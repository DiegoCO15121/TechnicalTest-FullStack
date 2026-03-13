import { sessionService } from "../../api/session.api";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: sessionService.getProfile,
    retry: false,
  });
};
