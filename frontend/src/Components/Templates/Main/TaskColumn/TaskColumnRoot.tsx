import { HTMLAttributes, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TaskColumnRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const TaskColumnRoot = forwardRef(
    ({ children, ...rest }: TaskColumnRootProps, ref: Ref<HTMLDivElement>) => {
        return (
            <div
                {...rest}
                ref={ref}
                className={twMerge(
                    "flex-shrink-0 h-4/5 w-full sm:w-80 sm:border-r-2 dark:border-neutral-600 border-neutral-400",
                    rest.className
                )}
            >
                {children}
            </div>
        );
    }
);

TaskColumnRoot.displayName = "TaskColumnRoot";

export default TaskColumnRoot;
