"use client";
import {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    useId,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    register?: any;
    disableLabelAnimation?: boolean;
}

function UseFormInputUtils() {
    const inputId = useId();

    const [inputIsFocus, setInputIsFocus] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");

    function handlerOnFocus() {
        setInputIsFocus(true);
    }

    function handlerOnBlur() {
        if (!inputText) setInputIsFocus(false);
    }

    function handlerOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    return {
        inputId,
        inputIsFocus,
        handlerOnFocus,
        handlerOnBlur,
        handlerOnChange,
    };
}

type LabelProps = {
    inputId: string;
    inputIsFocus: boolean;
    label: string;
    disableLabelAnimation?: boolean;
};

function Label({
    inputId,
    inputIsFocus,
    label,
    disableLabelAnimation,
}: LabelProps) {
    const conditionalAnimationClasses =
        inputIsFocus || disableLabelAnimation
            ? "-translate-y-6 mx-0 dark:text-white text-black"
            : "translate-y-0 dark:text-white/50 text-black/50";

    return (
        <label
            htmlFor={inputId}
            className={twMerge(
                "absolute  bottom-0 mx-2  cursor-text",
                conditionalAnimationClasses
            )}
        >
            {label}
        </label>
    );
}

export default function FormInput({
    label,
    register,
    disableLabelAnimation,
    ...rest
}: FormInputProps) {
    const {
        handlerOnBlur,
        handlerOnFocus,
        inputId,
        inputIsFocus,
        handlerOnChange,
    } = UseFormInputUtils();

    return (
        <div className="w-full relative">
            <Label
                inputId={inputId}
                inputIsFocus={inputIsFocus}
                label={label}
                disableLabelAnimation={disableLabelAnimation}
            />
            <input
                {...rest}
                {...register}
                id={inputId}
                type="text"
                onFocus={handlerOnFocus}
                onBlur={handlerOnBlur}
                onChange={handlerOnChange}
                className={twMerge(
                    "w-full bg-transparent outline-none focus:ring-transparent ring-transparent border-t-0 border-r-0 border-l-0 border-b-2 border-neutral-500 focus:border-blue-500 px-2 py-0 dark:text-white disabled:border-dashed dark:disabled:text-white/50 disabled:text-black/50",
                    rest.className
                )}
            />
        </div>
    );
}
