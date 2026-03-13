import { type UserType } from "@/entities/user";

export type LoginType = Pick<UserType, "email" | "password">;
