import { twMerge } from "tailwind-merge";

interface FormInputLabelProps {
    inputId: string;
    inputIsFocus: boolean;
    label: string;
    disableLabelAnimation?: boolean;
}

export function FormInputLabel({
    inputId,
    inputIsFocus,
    label,
    disableLabelAnimation,
}: FormInputLabelProps) {
    const conditionalAnimationClasses =
        disableLabelAnimation || inputIsFocus
            ? "-translate-y-6 mx-0 dark:text-white text-black text-sm"
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
