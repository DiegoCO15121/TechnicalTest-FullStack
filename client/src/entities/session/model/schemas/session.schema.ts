import z from "zod";

const USER_ROLE = ['admin', 'user'] as const

export const GetProfileDTO = z.object({
  id: z.number(),
  name: z.string(),
  role: z.enum(USER_ROLE),
});

export const LoginDTO = z.object({
  name: z.string(),
});
