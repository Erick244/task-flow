"use client";
import CaractereCount from "@/Components/Utils/CaractereCount";
import {
    ChangeEvent,
    DetailedHTMLProps,
    TextareaHTMLAttributes,
    useId,
    useState,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormTextAreaProps
    extends DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    label: string;
    maxLength: number;
    register: UseFormRegisterReturn<string>;
}

export default function FormTextArea({
    label,
    maxLength,
    register,
    ...rest
}: FormTextAreaProps) {
    const textAreaId = useId();
    const [textLength, setTextLength] = useState<number>(0);

    function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setTextLength(e.target.value.length);
        register.onChange(e);
    }

    return (
        <div className="relative flex flex-col gap-1">
            <label htmlFor={textAreaId} className="dark:text-white">
                {label}
            </label>
            <CaractereCount
                limit={maxLength}
                textLength={textLength}
                className="right-0"
            />
            <textarea
                id={textAreaId}
                {...register}
                {...rest}
                onChange={handleOnChange}
                maxLength={maxLength}
                className={twMerge(
                    "resize-none h-full w-full outline-none focus:ring-transparent ring-transparent dark:text-white border-2 rounded dark:border-neutral-500 border-neutral-400 dark:bg-neutral-600 bg-neutral-100 disabled:border-dashed dark:disabled:text-white/50 disabled:text-black/50",
                    rest.className
                )}
            ></textarea>
        </div>
    );
}
