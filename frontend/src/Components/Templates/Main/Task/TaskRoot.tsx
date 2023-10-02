"use client";
import { HTMLAttributes, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TaskRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    descriptionIsVisible: boolean;
}

const TaskRoot = forwardRef(
    (
        { children, descriptionIsVisible, ...rest }: TaskRootProps,
        ref: Ref<HTMLDivElement>
    ) => {
        return (
            <div
                {...rest}
                ref={ref}
                className={twMerge(
                    "dark:bg-neutral-600 bg-neutral-100 px-2 py-3 rounded shadow-md shadow-black/20",
                    descriptionIsVisible ? "h-40" : "h-12",
                    rest.className
                )}
            >
                {children}
            </div>
        );
    }
);

TaskRoot.displayName = "TaskRoot";

export default TaskRoot;
