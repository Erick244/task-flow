import { PlusIcon } from "@/Components/Utils/Icons";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function AddTaskButton(
    props: HTMLAttributes<HTMLButtonElement>
) {
    return (
        <button
            {...props}
            className={twMerge(
                "overflow-hidden relative p-3 outline-none flex items-center gap-4 rounded-lg border-2 border-blue-500 text-blue-500 hover:text-white shadow-md hover:shadow-black/30 group",
                props.className
            )}
        >
            <span className="transition delay-300 absolute w-full h-full bg-blue-500 left-0 -translate-x-full z-0 group-hover:-translate-x-0"></span>
            <i className="text-2xl group-hover:rotate-180 group-hover:scale-125 z-10">
                {PlusIcon}
            </i>
            <span className="z-10">New Task</span>
        </button>
    );
}
