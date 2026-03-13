import type { GetUserByIdDTO, UserSchema } from "../schema/user.schema";
import type z from "zod";

export type UserType = z.infer<typeof UserSchema>;

export type UserFormType = Omit<
  UserType,
  "id" | "address" | "profilePicture"
> & {
  password?: string;
  profilePicture: File | undefined;
  street: string;
  number: string;
  city: string;
  postalCode: string;
};

// Posible reposicionamiento a features correspondiente
export type CreateUserType = Omit<
  UserType,
  "id" | "password" | "profilePicture"
> & {
  profilePicture?: File;
};

export type CreateUserApiType = Omit<CreateUserType, "profilePicture">;

export type UpdateUserType = Omit<
  UserType,
  "id" | "password" | "profilePicture"
> & {
  profilePicture?: File;
};

export type UpdateUserApiType = Omit<UpdateUserType, "profilePicture">;

export type DefaultValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  profilePicture?: undefined;
  password: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
};

export type GetUserByIdDTOType = z.infer<typeof GetUserByIdDTO>;

export type UserProfileDTOType = Pick<UserType, "id" | "role"> & {
  name: string;
};
