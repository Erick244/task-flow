"use client";
import { Form } from "@/Components/Templates/Form";
import { AngleRightIcon } from "@/Components/Utils/Icons";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { defaultToast } from "@/functions/DefaultToasts";
import {
    SIGNIN_SCHEMA,
    SignInFormData,
} from "@/schemas/forms/signin-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const {
        alternateForSignUpForm,
        errors,
        handleLogin,
        handleSubmit,
        loading,
        register,
    } = useLoginForm();

    return (
        <Form.Container className="sm:w-1/4 w-10/12">
            <Form.Title title="Login" className="mb-14" />

            <Form.Root className="gap-10" onSubmit={handleSubmit(handleLogin)}>
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

                <Form.ContainerButtons>
                    <Form.ActionButton
                        onClick={alternateForSignUpForm}
                        label="Signup"
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

function useLoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(SIGNIN_SCHEMA),
    });

    const { signIn } = useAuthContext();

    function alternateForSignUpForm() {
        push("/auth/signup");
    }

    async function handleLogin(signInData: SignInFormData) {
        try {
            setLoading(true);

            await signIn(signInData);
        } catch (e: any) {
            defaultToast(e, "warning");
        } finally {
            setLoading(false);
        }
    }

    return {
        handleSubmit,
        handleLogin,
        alternateForSignUpForm,
        register,
        errors,
        loading,
    };
}
