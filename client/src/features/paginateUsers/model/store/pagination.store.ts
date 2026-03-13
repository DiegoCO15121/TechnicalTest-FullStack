import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PaginationState = {
  page: number;
  setPage: (page: number) => void;

  total: number;
  setTotal: (total: number) => void;

  limit: number;
  setLimit: (limit: number) => void;
};

export const usePaginationState = create<PaginationState>()(
  devtools((set) => ({
    page: 1,
    total: 0,
    limit: 5,

    setPage: (page) => {
      set({ page }, false, "Page/set");
    },

    setTotal: (total) => {
      set({ total }, false, "Total/set");
    },

    setLimit: (limit) => {
      set({ limit }, false, "Limit/set");
    },
  })),
);
