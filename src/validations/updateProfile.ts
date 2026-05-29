import { z } from "zod";

export const updateProfileSchema = z.object({
  userName: z.string().trim().min(1, { message: "User Name Is Required" }),
  email: z.string().trim().email({ message: "Email Is Required" }),
  fullName: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  image: z.custom((val) => val instanceof File).optional(),
});
