import { CreateUserForm } from "@/features/createUser";
import { UpdateUserForm } from "@/features/updateUser";
import { useModalStore } from "@/shared/ui/modal";
import {HomeDashboard} from "@/widgets/dashboard-home";
import { HeaderHome } from "@/widgets/header-home";

export default function HomePage() {
  const { modalType } = useModalStore();

  return (
    <div className="space-y-20">
      <HeaderHome />

      <div className="w-10/12 mx-auto">
        <HomeDashboard />
      </div>

      {(modalType === "createUser") && <CreateUserForm />}
      {(modalType === "updateUser" )&& <UpdateUserForm />}
      
    </div>
  );
}
