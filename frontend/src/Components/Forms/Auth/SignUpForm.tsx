"use client";
import { Form } from "@/Components/Templates/Form";
import { AngleRightIcon } from "@/Components/Utils/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SIGNUP_SCHEMA = z
    .object({
        name: z
            .string()
            .nonempty("The Name field is required")
            .max(20, "The Name field accepts a maximum of 20 characters")
            .min(3, "The Name field accepts a minimum of 3 characters"),
        email: z
            .string()
            .nonempty("The Name field is required")
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

export default function SignUpForm() {
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SIGNUP_SCHEMA),
    });

    function handlerLoginButton() {
        push("/auth/login");
    }

    function signUp(data: any) {
        console.log("jkdbnwjdhbaijdnh");
    }

    return (
        <Form.Container className="sm:w-1/4 w-10/12">
            <Form.Title title="Singup" className="mb-14" />

            <Form.Root className="gap-7" onSubmit={handleSubmit(signUp)}>
                <Form.Input label="Name" register={register("name")} />
                {errors?.name && (
                    <Form.AlertMessage>{errors.name.message}</Form.AlertMessage>
                )}

                <Form.Input label="E-mail" register={register("email")} />
                {errors?.email && (
                    <Form.AlertMessage>
                        {errors.email.message}
                    </Form.AlertMessage>
                )}

                <Form.Input
                    label="Password"
                    type="password"
                    register={register("password")}
                />
                {errors?.password && (
                    <Form.AlertMessage>
                        {errors.password.message}
                    </Form.AlertMessage>
                )}

                <Form.Input
                    label="Confirm Password"
                    type="password"
                    register={register("confirmPassword")}
                />
                {errors?.confirmPassword && (
                    <Form.AlertMessage>
                        {errors.confirmPassword.message}
                    </Form.AlertMessage>
                )}

                <Form.ContainerButtons>
                    <Form.ActionButton
                        onClick={handlerLoginButton}
                        label="Login"
                        className="px-5"
                    />
                    <Form.SubmitButton label="Enter" icon={AngleRightIcon} />
                </Form.ContainerButtons>
            </Form.Root>
        </Form.Container>
    );
}
