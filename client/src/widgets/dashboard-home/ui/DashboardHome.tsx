import { useFiltersStore } from "@/features/filterUsers";
import { GradientButton } from "@/shared/ui/";
import { Pagination } from "@/features/paginateUsers";
import { useUserStore } from "@/entities/user";
import { useHandleClickCreateUser } from "../model/hooks/useHandleClickCreateUser";
import DashboardTable from "./DashboardTable";

export default function HomeDashboard() {
  const { handleClickCreateUser } = useHandleClickCreateUser();
  const { setStatus, setRole, role, status } = useFiltersStore();
  const { user } = useUserStore();

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-3">
          <h2 className="text-slate-800 font-bold uppercase text-4xl">
            User Managment
          </h2>
          <p className="text-cyan-500 text-xl">
            {user?.role === "admin"
              ? "Administra, audita y concede permisos a usuarios"
              : "Consulta la información de usuarios"}
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <select
            name="role"
            id="role"
            className="bg-slate-800 border border-slate-200 text-slate-100 rounded-lg p-1 
            hover:cursor-pointer"
            defaultValue={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Todos los roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <select
            name="status"
            id="status"
            className="bg-slate-800 border border-slate-200 text-slate-100 rounded-lg p-1 
            hover:cursor-pointer"
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos los status</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
          {user?.role === "admin" && (
            <GradientButton
              variant="primary"
              text="Agregar Usuario"
              onClick={handleClickCreateUser}
            />
          )}
        </div>
      </div>

      <DashboardTable />

      <Pagination />
    </div>
  );
}
