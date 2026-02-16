import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name cannot exceed 100 characters.")
      .refine(
        (value) => /^[a-zA-Z\s'-]+$/.test(value),
        "Name can only contain letters, spaces, hyphens, and apostrophes.",
      ),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email address.")
      .refine((value) => !/\s/.test(value), "Email cannot contain spaces."),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 digits.")
      .max(20, "Phone number cannot exceed 20 characters.")
      .refine(
        (value) => /^\+?[0-9\s\-()]{7,20}$/.test(value),
        "Please enter a valid phone number.",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password cannot exceed 128 characters.")
      .refine(
        (value) => /[A-Z]/.test(value),
        "Password must contain at least one uppercase letter.",
      )
      .refine(
        (value) => /[a-z]/.test(value),
        "Password must contain at least one lowercase letter.",
      )
      .refine(
        (value) => /[0-9]/.test(value),
        "Password must contain at least one number.",
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        "Password must contain at least one special character.",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    acceptedTerms: z.literal(true, {
      error: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type SignInFormData = z.infer<typeof signInSchema>;
