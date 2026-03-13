import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/user.api";

export const useGetUsers = ({
  page = 1,
  limit = 5,
  status,
  role,
  search,
}: {
  page: number;
  limit: number;
  status?: string;
  role?: string;
  search?: string;
}) => {

  return useQuery({
    queryKey: ["getUsers", search, role, status, page],
    queryFn: () => userService.getUsers({ page, limit, status, role, search }),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
