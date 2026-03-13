import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FiltersState = {
  search: string;
  setSearch: (search: string) => void;
  role: string;
  setRole: (role: string) => void;
  status: string;
  setStatus: (status: string) => void;
};

export const useFiltersStore = create<FiltersState>()(
  devtools((set) => ({
    search: "",
    role: "",
    status: "",

    setSearch: (search) => {
    
      set({ search }, false, "Search/set");
    },

    setRole: (role) => {
      set({ role }, false, "Role/set");
    },

    setStatus: (status) => {
      set({ status }, false, "Status/set");
    },
  })),
);
