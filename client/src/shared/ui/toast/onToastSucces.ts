
import CustomToast from "./CustomToast";
import { toast } from "react-toastify";

type onToastSuccessProps = {
  title: string;
  content: string;
};

export const onToastSuccess = ({ title, content }: onToastSuccessProps) => {
  toast.success(CustomToast, {
    data: { title, content },
    autoClose: 3000,
    theme: "colored",
  });
};
