import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/user.api";

export const useGetUserById = (id: number | null) => {
  return useQuery({
    queryKey: ["getUserById", id],
    enabled: !!id,
    queryFn: () => userService.getUserById(id as number),
    refetchOnWindowFocus: false,
    retry: 2
  });
};
