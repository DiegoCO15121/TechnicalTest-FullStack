import z from "zod";

const USER_ROLE = ["user", "admin"] as const;
const USER_STATUS = ["active", "inactive"] as const;

const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  role: z.enum(USER_ROLE),
  status: z.enum(USER_STATUS),
  address: AddressSchema,
  profilePicture: z.string(),
  password: z.string(),
});

export const GetUserByIdDTO = UserSchema.omit({
  address: true,
  password: true,
}).extend({
  street: z.string(),
  number: z.string(),
  city: z.string(),
  postalCode: z.string(),
  profilePicture: z.string().or(z.null()),
});

export const GetUsersDTO = z.object({
  users: z.array(
    UserSchema.omit({
      address: true,
      profilePicture: true,
      password: true,
    }),
  ),
  page: z.string(),
  limit: z.string(),
  total: z.number(),
});

export const CreateUserDTO = z.object({
  userId: z.number(),
});

export const UpdateUserDTO = UserSchema.omit({
  password: true,
  address: true,
  profilePicture: true,
});
