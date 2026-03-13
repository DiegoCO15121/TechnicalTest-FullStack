import { ModalLayout, useModalStore } from "@/shared/ui/modal";
import { useDeleteUser } from "../model/hooks/useDeleteUser";
import GradientButton from "@/shared/ui/buttons/GradientButton";

type DeleteMessageProps = {
  id: number;
  firstName: string;
  lastName: string;
};
export default function DeleteMessage({
  firstName,
  lastName,
  id
}: DeleteMessageProps) {
  const { mutate } = useDeleteUser();
  const { setIsOpen, clearModal } = useModalStore();

  const handleCloseModal = () => {
    setIsOpen();
    clearModal();
  };

  return (
    <ModalLayout>
      <div className="space-y-6">
        <h4 className="text-center font-bold text-2xl text-slate-800">
          Eliminar Usuario
        </h4>

        <p className="text-center text-lg">
          ¿Estas seguro que deseas eliminar al usuario:{" "}
          <span className="font-bold">
            {firstName} {lastName}
          </span>
          ?
        </p>

        <div className="flex justify-between gap-5">
          <GradientButton
            type="button"
            text="Cancelar"
            variant="primary"
            onClick={handleCloseModal}
          />
          <GradientButton type="button" text="Eliminar" variant="cancel" onClick={() => mutate(id)} />
        </div>
      </div>
    </ModalLayout>
  );
}
