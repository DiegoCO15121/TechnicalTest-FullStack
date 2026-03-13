
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { type ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import { IoClose } from "react-icons/io5";
import { useModalStore } from "../model";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

export default function ModalLayout({ children, onClose }: ModalProps) {
  const { modalType, clearModal, isOpen, setIsOpen } = useModalStore();

  const handelAfterLeave = () => {
    clearModal();
    if (onClose) onClose();
  };

  return (
    <Transition
      appear
      show={modalType !== null && isOpen}
      as={Fragment}
      afterLeave={handelAfterLeave}
    >
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 dark:bg-white/5 backdrop-blur-xs" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white 
                          dark:bg-dark-color text-left align-middle shadow-xl dark:shadow-primary-color/20 transition-all p-6"
              >
                <button
                  onClick={() => {
                    setIsOpen();
                  }}
                  className="absolute top-4 right-4 p-1 rounded-full text-neutral-color hover:bg-red-500/20 hover:text-red-500 transition"
                  aria-label="Cerrar modal"
                >
                  <IoClose className="w-6 h-6 " />
                </button>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}