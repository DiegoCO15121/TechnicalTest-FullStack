import { create } from "zustand";
import type { ModalType } from "../types/modal.type";

type ModalState = {
  modalType: ModalType["modal"];
  isOpen: boolean;
  setModalType: (type: ModalType["modal"]) => void;
  clearModal: () => void;
  setIsOpen: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  modalType: null,
  isOpen: false,

  setModalType: (type) => {
    set(() => ({
      modalType: type,
    }));
  },

  clearModal: () => {
    set(() => ({
      modalType: null,
    }));
  },

  setIsOpen: () => {
    set(() => ({
      isOpen: !get().isOpen,
    }));
  },
}));
