import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Username Is Required" }),

    email: z.string().trim().email({ message: "Email Adderess Is Required" }),

    password: z
      .string()
      .min(6, { message: "Password Must Be More Than 6 Characters" })
      .max(40, { message: "Password Must Be Less Than 40 Characters" }),

    confirmPassword: z
      .string()
      .min(6, { message: "Password Must Be More Than 6 Characters" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Are Not The Same",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Email Address Is Required" }),

  password: z
    .string()
    .min(6, { message: "Password Must Be More Than 6 Characters" })
    .max(40, { message: "Password Must Be Less Than 40 Characters" }),
});
