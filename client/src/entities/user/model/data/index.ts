import type { UserFormType } from "../types/user.types";

export const userRole: Record<string, string>[] = [
  { admin: "Admin" },
  { user: "User" },
];
export const userStatus: Record<string, string>[] = [
  { active: "Active" },
  { inactive: "Inactive" },
];

export const defaultValues: UserFormType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  role: "user",
  status: "active",
  profilePicture: undefined,
  password: "",
  street: "",
  number: "",
  city: "",
  postalCode: "",
};
