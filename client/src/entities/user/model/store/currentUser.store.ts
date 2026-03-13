import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CurrentUserState = {
  currentUser: {
    id: number | null;
    firstName: string;
    lastName: string;
  };
  setCurrentUser: (currentUser: {
    id: number | null;
    firstName: string;
    lastName: string;
  }) => void;
};

export const useCurrentUserStore = create<CurrentUserState>()(
  devtools((set) => ({
    currentUser: {
      id: null,
      firstName: '',
      lastName: '',
    },

    setCurrentUser: (currentUser) => {
      set({ currentUser }, false, "CurrentUser/set");
    },
  })),
);
