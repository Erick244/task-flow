"use client";
import { Form } from "@/Components/Templates/Form";
import { AngleRightIcon } from "@/Components/Utils/Icons";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { push } = useRouter();

    function handlerSignupButton() {
        push("/auth/signup");
    }

    return (
        <Form.Container className="sm:w-1/4 w-10/12">
            <Form.Title title="Login" className="mb-14" />

            <Form.Root className="gap-10">
                <Form.Input label="E-mail" />
                <Form.Input label="Password" type="pasasword" />

                <Form.ContainerButtons>
                    <Form.ActionButton
                        onClick={handlerSignupButton}
                        label="Signup"
                        className="px-5"
                    />
                    <Form.SubmitButton label="Enter" icon={AngleRightIcon} />
                </Form.ContainerButtons>
            </Form.Root>
        </Form.Container>
    );
}
