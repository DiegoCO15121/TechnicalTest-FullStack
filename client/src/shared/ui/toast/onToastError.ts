
import CustomToast from "./CustomToast";
import { toast } from "react-toastify";

export const onToastError = (error: Error | string) => {
  const message = typeof error === "string" ? error : error.message;

  toast.error(CustomToast, {
    data: { title: "Error", content: message },
    autoClose: 3000,
    theme: "colored",
  });
};