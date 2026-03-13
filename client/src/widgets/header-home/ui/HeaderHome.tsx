import { useUserStore } from "@/entities/user";
import { useFiltersStore } from "@/features/filterUsers";
import { useLogout } from "@/entities/session";
import { parseRole } from "@/shared/lib";
import { IoLogOutSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

export default function HeaderHome() {
  const { user, setUser } = useUserStore();
  const { setSearch } = useFiltersStore();
  const { mutate } = useLogout();

  const handleLogout = () => {
    setUser(undefined);
    mutate();
  };

  /* const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    useEffect(() => {
      const searchValue = useDelaySearch(5000, e.target.value);
      setSearch(searchValue);
    }, [e]);
  }; */

  return (
    <div className="h-13 bg-slate-800 flex justify-between w-full items-center px-20">
      <div className="flex space-x-2 items-center">
        <p className="text-slate-100 text-center">Bienvenido: {user?.name} </p>
        <p className="text-cyan-500 border border-cyan-500 px-1 rounded-lg">
          {parseRole(user?.role!)}
        </p>
      </div>

      <div className="w-2/6 flex items-center gap-7">
        <div className="relative w-full">
          <MdPersonSearch className="text-xl text-slate-100 absolute translate-y-1.5 translate-x-1" />
          <input
            type="text"
            className="bg-slate-100/50 w-full p-1 pl-6.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700 text-slate-100"
            placeholder="Buscar por nombre o email"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="cursor hover:scale-110 transition-transform duration-500 cursor-pointer"
        >
          <IoLogOutSharp className="w-9 h-9 text-slate-100" />
        </button>
      </div>
    </div>
  );
}
