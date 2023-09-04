import { z } from "zod";

export const PostModalSchema = z.object({
    title: z
        .string()
        .nonempty("Title cant be empty")
        .max(50, { message: "Title must be less than 51 characters" }),
    text: z
        .string()
        .nonempty("Text cant be empty")
        .max(240, { message: "Text must be less than 241 characters" }),
    select: z.string(),
});

export const SignInSchema = z.object({
    email: z.string().nonempty("Email cant be empty").email("Is not valid email"),
    password: z
        .string()
        .nonempty("Password cant be empty")
        .min(6, { message: "Password must be at least 6 characters" })
        .max(24, { message: "Password must be less than 25 characters" }),
});

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email cant be empty")
      .email("Is not valid email"),
    password: z
      .string()
      .nonempty("Password cant be empty")
      .min(6, { message: "Password must be at least 6 characters" })
      .max(24, { message: "Password must be less than 25 characters" }),
    confirm: z.string().nonempty("Password Again cant be empty"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });