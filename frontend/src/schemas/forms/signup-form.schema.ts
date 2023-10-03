import { z } from "zod";

const SIGNUP_SCHEMA = z
    .object({
        username: z
            .string()
            .nonempty("The Username field is required")
            .max(20, "The Username field accepts a maximum of 20 characters")
            .min(3, "The Username field accepts a minimum of 3 characters"),
        email: z
            .string()
            .nonempty("The E-mail field is required")
            .email("Enter a valid E-mail address"),
        password: z
            .string()
            .nonempty("The Password field is required")
            .max(16, "The Password field accepts a maximum of 16 characters")
            .min(8, "The Password field accepts a minimum of 8 characters"),
        confirmPassword: z
            .string()
            .nonempty("The Confimr Password field is required")
            .max(16, "The Password field accepts a maximum of 16 characters")
            .min(8, "The Password field accepts a minimum of 8 characters"),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ["confirmPassword"],
        message: "The Passwords did not match",
    });

type SignupFormData = z.infer<typeof SIGNUP_SCHEMA>;

export { SIGNUP_SCHEMA };
export type { SignupFormData };
