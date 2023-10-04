"use client";
import CloseArea from "@/Components/Utils/CloseArea";
import {
    taskColumnFormStateAtom,
    taskFormStateAtom,
} from "@/atomns/FormsAtoms";
import { useAtomValue } from "jotai";

interface MainLayoutMainProps {
    children: React.ReactNode;
}

export default function MainLayoutMain({ children }: MainLayoutMainProps) {
    const taskColumnFormIsVisible = useAtomValue(
        taskColumnFormStateAtom
    ).visibility;
    const saveTaskFormIsVisible = useAtomValue(taskFormStateAtom).visibility;

    return (
        <main className="w-full h-full flex-grow dark:bg-neutral-700 bg-stone-300 overflow-x-hidden">
            <CloseArea
                isVisible={taskColumnFormIsVisible}
                className="flex justify-center items-center"
            >
                {/* <TaskColumnForm /> */}
            </CloseArea>

            <CloseArea
                isVisible={saveTaskFormIsVisible}
                className="flex justify-center items-center"
            >
                {/* <TaskForm /> */}
            </CloseArea>

            {children}
        </main>
    );
}
