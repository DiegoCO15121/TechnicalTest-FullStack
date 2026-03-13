import CustomToast from "./CustomToast";
import { toast } from "react-toastify";

type onToastWarningProps = {
  title: string;
  content: string;
};

export const onToastWarning = ({ title, content }: onToastWarningProps) => {
  toast.success(CustomToast, {
    data: { title, content },
    autoClose: 3000,
    theme: "colored",
  });
};