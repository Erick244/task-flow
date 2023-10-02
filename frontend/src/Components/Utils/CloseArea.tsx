"use client";
import useUtilAtomFunctions from "@/hooks/useUtilAtomFunctions";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CloseAreaProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isVisible: boolean;
    hiddenVisibility?: () => void;
}

export default function CloseArea({
    children,
    isVisible,
    hiddenVisibility,
    ...rest
}: CloseAreaProps) {
    const { closeAllVisibilityAtoms } = useUtilAtomFunctions();

    return (
        <div
            {...rest}
            className={twMerge(
                "absolute h-screen w-screen bottom-0 z-20 bg-black/40",
                isVisible ? "opacity-100 visible" : "opacity-0 invisible",
                rest.className
            )}
            onClick={hiddenVisibility || closeAllVisibilityAtoms}
        >
            {children}
        </div>
    );
}
