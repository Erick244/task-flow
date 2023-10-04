import { z } from "zod";

const SIGNIN_SCHEMA = z.object({
    email: z
        .string()
        .nonempty("The E-mail field is required")
        .email("Enter a valid E-mail address"),
    password: z
        .string()
        .nonempty("The Password field is required")
        .max(16, "The Password field accepts a maximum of 16 characters")
        .min(8, "The Password field accepts a minimum of 8 characters"),
});

type SignInFormData = z.infer<typeof SIGNIN_SCHEMA>;

export { SIGNIN_SCHEMA };
export type { SignInFormData };
