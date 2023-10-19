"use client";
import { Form } from "@/Components/Templates/Form";
import { AngleRightIcon } from "@/Components/Utils/Icons";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { defaultToast } from "@/functions/DefaultToasts";
import { SignInFormData } from "@/schemas/forms/signin-form.schema";
import {
    SIGNUP_SCHEMA,
    SignupFormData,
} from "@/schemas/forms/signup-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
    const {
        errors,
        alternateForLoginForm,
        handleSignUp,
        handleSubmit,
        register,
        loading,
    } = useSignUpForm();

    return (
        <Form.Container className="sm:w-1/4 w-10/12">
            <Form.Title title="Singup" className="mb-14" />

            <Form.Root className="gap-7" onSubmit={handleSubmit(handleSignUp)}>
                <Form.Input
                    label="Name"
                    type="text"
                    register={register("username")}
                />
                {errors?.username && (
                    <Form.AlertMessage>
                        {errors.username.message}
                    </Form.AlertMessage>
                )}

                <Form.Input
                    label="E-mail"
                    type="email"
                    register={register("email")}
                />
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
                        onClick={alternateForLoginForm}
                        label="Login"
                        className="px-5"
                    />
                    <Form.SubmitButton
                        label="Enter"
                        icon={AngleRightIcon}
                        isLoading={loading}
                    />
                </Form.ContainerButtons>
            </Form.Root>
        </Form.Container>
    );
}

function useSignUpForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SIGNUP_SCHEMA),
    });

    const { signUp, signIn } = useAuthContext();

    function alternateForLoginForm() {
        push("/auth/login");
    }

    async function handleSignUp(signUpData: SignupFormData) {
        try {
            setLoading(true);
            await signUp(signUpData);

            const signInData: SignInFormData = {
                email: signUpData.email,
                password: signUpData.password,
            };

            await signIn(signInData);
        } catch (e: any) {
            defaultToast(e, "warning");
        } finally {
            setLoading(false);
        }
    }

    return {
        handleSubmit,
        handleSignUp,
        alternateForLoginForm,
        register,
        errors,
        loading,
    };
}
