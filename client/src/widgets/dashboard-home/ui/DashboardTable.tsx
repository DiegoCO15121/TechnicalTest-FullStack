import { useGetUsers, useUserStore, useCurrentUserStore } from "@/entities/user";
import { useDelaySearch } from "@/entities/user/model/hooks/useDelaySearch";
import {DeleteMessage} from "@/features/deleteUser";
import { useFiltersStore } from "@/features/filterUsers";
import { usePaginationState } from "@/features/paginateUsers";
import { parseRole, parseStatus } from "@/shared/lib";
import { useModalStore, Spinner } from "@/shared/ui";
import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Navigate } from "react-router-dom";

export default function DashboardTable() {
  const { setCurrentUser, currentUser } = useCurrentUserStore();
  const { user } = useUserStore();
  const { role, status, search } = useFiltersStore();
  const { limit, page, setTotal } = usePaginationState();
  const searchValue = useDelaySearch(1000, search)

  const { data, isLoading, isError } = useGetUsers({
    page,
    limit,
    role,
    status,
    search: searchValue,
  });
  const { setIsOpen, setModalType, modalType } = useModalStore();

  useEffect(() => {
    if (!data) return;
    setTotal(data.total);
  }, [data]);

  if (isError) return <Navigate to={"/home"} />;
  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-20">
        <Spinner />
      </div>
    );

  const handlePressEdit = (id: number, firstName: string, lastName: string) => {
    setIsOpen();
    setModalType("updateUser");
    setCurrentUser({ id, firstName, lastName });
  };

  const handlePressDelete = (
    id: number,
    firstName: string,
    lastName: string,
  ) => {
    setIsOpen();
    setModalType("deleteUser");
    setCurrentUser({ id, firstName, lastName });
  };

  const disableButtonStyles =
    user?.role === "user" ? "opacity-50 hover:cursor-not-allowed" : "";

  if (data)
    return (
      <>
        <table className="bg-blue-100 w-full">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="border border-cyan-500 py-1 px-3">Nombre</th>
              <th className="border border-cyan-500 py-1 px-3">Email</th>
              <th className="border border-cyan-500 py-1 px-3">
                Número de telefóno
              </th>
              <th className="border border-cyan-500 py-1 px-3">Rol</th>
              <th className="border border-cyan-500 py-1 px-3">Estatus</th>
              <th className="border border-cyan-500 py-1 px-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.users.map((d) => (
              <tr className="text-center" key={d.id}>
                <td className="border border-cyan-500">
                  {d.firstName} {d.lastName}
                </td>
                <td className="border border-cyan-500">{d.email} </td>
                <td className="border border-cyan-500">{d.phoneNumber} </td>
                <td className="border border-cyan-500">{parseRole(d.role)}</td>
                <td className="border border-cyan-500">
                  {parseStatus(d.status)}
                </td>
                <td className="border border-cyan-500 p-1.5">
                  <div className="flew space-x-4">
                    <button
                      type="button"
                      disabled={user?.role === "user"}
                      className={`p-1 rounded-lg border border-red-500 bg-red-300 cursor-pointer
                        hover:scale-110 transition-transform duration-200 ${disableButtonStyles}`}
                      onClick={() =>
                        handlePressDelete(d.id, d.firstName, d.lastName)
                      }
                    >
                      <MdDeleteForever className="w-6 h-6 text-red-700" />
                    </button>

                    <button
                      type="button"
                      disabled={user?.role === "user"}
                      className={`p-1 rounded-lg border border-orange-500 bg-orange-300 
                        cursor-pointer hover:scale-110 transition-transform duration-200 ${disableButtonStyles}`}
                      onClick={() =>
                        handlePressEdit(d.id, d.firstName, d.lastName)
                      }
                    >
                      <MdEdit className="w-6 h-6 text-orange-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalType === "deleteUser" && (
          <DeleteMessage
            id={currentUser?.id!}
            firstName={currentUser?.firstName!}
            lastName={currentUser?.lastName!}
          />
        )}
      </>
    );
}
