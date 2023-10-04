import { Spinner } from "@/Components/Utils/Spinner";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormSubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: JSX.Element;
    isLoading?: boolean;
}

export default function FormSubmitButton({
    label,
    icon,
    isLoading,
    ...rest
}: FormSubmitButtonProps) {
    return (
        <button
            type="submit"
            {...rest}
            className={twMerge(
                "self-center bg-blue-500 hover:bg-blue-600 flex justify-between items-center gap-2 text-white shadow-md shadow-black/30 rounded px-3 py-2",
                rest.className
            )}
        >
            {isLoading ? (
                <Spinner className="mx-2" />
            ) : (
                <>
                    {label} {icon && <i>{icon}</i>}
                </>
            )}
        </button>
    );
}
