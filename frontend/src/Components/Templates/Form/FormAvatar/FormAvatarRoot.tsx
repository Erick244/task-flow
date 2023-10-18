import { ImageIcon } from "@/Components/Utils/Icons";
import { HTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import FormInput from "../FormInput";

interface FormAvatarRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    register?: UseFormRegisterReturn<string>;
}

export function FormAvatarRoot({
    children,
    register,
    ...rest
}: FormAvatarRootProps) {
    return (
        <div
            {...rest}
            className={twMerge(
                "w-full border-2 border-neutral-500 p-2 dark:text-white",
                rest.className
            )}
        >
            <p className="absolute flex items-center gap-2 text-blue-500">
                {ImageIcon} Drop your image here or select!
            </p>

            <FormInput
                register={register}
                removeLabel
                disableLabelAnimation
                label="Avatar Image (Optional)"
                type="file"
                className="h-full w-full opacity-0"
            />

            {children}
        </div>
    );
}
