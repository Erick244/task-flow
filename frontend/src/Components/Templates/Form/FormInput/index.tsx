"use client";
import {
    ChangeEvent,
    DetailedHTMLProps,
    FocusEvent,
    InputHTMLAttributes,
    useId,
    useState,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormInputLabel } from "./FormInputLabel";

interface FormInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    disableLabelAnimation?: boolean;
    register?: UseFormRegisterReturn<string>;
    removeLabel?: boolean;
}

export default function FormInput({
    label,
    disableLabelAnimation,
    removeLabel,
    register,
    ...rest
}: FormInputProps) {
    const {
        inputId,
        inputIsFocus,
        handleOnBlur,
        handleOnChange,
        handleOnFocus,
    } = useFormInput(register);

    return (
        <div className="w-full relative">
            {!removeLabel && (
                <FormInputLabel
                    inputId={inputId}
                    inputIsFocus={inputIsFocus}
                    label={label}
                    disableLabelAnimation={disableLabelAnimation}
                />
            )}

            <input
                {...rest}
                id={inputId}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                className={twMerge(
                    "w-full bg-transparent outline-none focus:ring-transparent ring-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-neutral-500 focus:border-blue-500 px-2 py-0 dark:text-white disabled:border-dashed dark:disabled:text-white/50 disabled:text-black/50",
                    rest.className
                )}
                {...register}
            />
        </div>
    );
}

function useFormInput(register?: UseFormRegisterReturn<string>) {
    const inputId = useId();

    const [inputIsFocus, setInputIsFocus] = useState<boolean>(false);
    const [inputLength, setInputLength] = useState<number>(0);

    function handleOnBlur(e: FocusEvent) {
        if (!inputLength) setInputIsFocus(false);

        register?.onBlur(e);
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const inputTextLength = e.target.value.length;
        setInputLength(inputTextLength);

        register?.onChange(e);
    }

    function handleOnFocus() {
        setInputIsFocus(true);
    }

    return {
        inputId,
        inputIsFocus,
        handleOnFocus,
        handleOnChange,
        handleOnBlur,
    };
}
