import { useModalStore } from "@/shared/ui/modal";

export const useHandleClickCreateUser = () => {
  const { setIsOpen, setModalType } = useModalStore();
  const handleClickCreateUser = () => {
    setModalType("createUser");
    setIsOpen();
  };

  return { handleClickCreateUser };
};
