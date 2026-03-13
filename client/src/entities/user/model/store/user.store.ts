import type { UserProfileDTOType } from "../types/user.types";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

type UserState = {
  user: UserProfileDTOType | undefined;

  setUser: (user: UserProfileDTOType | undefined) => void;
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: undefined,

    setUser: (user) => {
      set({ user }, false, "User/set");
    },
  })),
);
