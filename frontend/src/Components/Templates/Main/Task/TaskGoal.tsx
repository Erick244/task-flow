import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TaskGoalProps extends HTMLAttributes<HTMLHeadingElement> {
    goal: string;
    lineThrough?: boolean;
}

export default function TaskGoal({
    goal,
    lineThrough,
    ...rest
}: TaskGoalProps) {
    return (
        <h2
            {...rest}
            className={twMerge(
                "dark:text-white",
                lineThrough && "line-through",
                rest.className
            )}
        >
            {goal}
        </h2>
    );
}
