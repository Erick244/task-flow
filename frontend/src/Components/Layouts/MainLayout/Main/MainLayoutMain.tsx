"use client";
import CreateTaskColumnForm from "@/Components/Forms/TaskColumns/CreateTaskColumnForm";
import DeleteTaskColumnForm from "@/Components/Forms/TaskColumns/DeleteTaskColumnForm";
import EditTaskColumnForm from "@/Components/Forms/TaskColumns/EditTaskColumnForm";
import CreateTaskForm from "@/Components/Forms/Tasks/CreateTaskForm";
import DeleteTaskForm from "@/Components/Forms/Tasks/DeleteTaskForm";
import EditTaskForm from "@/Components/Forms/Tasks/EditTaskForm";
import CloseArea from "@/Components/Utils/CloseArea";
import {
    taskColumnFormStateAtom,
    taskFormStateAtom,
} from "@/atomns/FormsAtoms";
import { FormActions } from "@/models/enums/FormActions.enum";
import { useAtomValue } from "jotai";

interface MainLayoutMainProps {
    children: React.ReactNode;
}

export default function MainLayoutMain({ children }: MainLayoutMainProps) {
    const taskColumnFormState = useAtomValue(taskColumnFormStateAtom);
    const taskColumnAction = taskColumnFormState.formAction;

    const taskFormState = useAtomValue(taskFormStateAtom);
    const taksFormAction = taskFormState.formAction;

    return (
        <main className="w-full h-full flex-grow dark:bg-neutral-700 bg-stone-300 overflow-x-hidden">
            <CloseArea
                isVisible={taskColumnFormState.visibility}
                className="flex justify-center items-center"
            >
                {taskColumnAction === FormActions.CREATE && (
                    <CreateTaskColumnForm />
                )}
                {taskColumnAction === FormActions.EDIT && (
                    <EditTaskColumnForm />
                )}
                {taskColumnAction === FormActions.DELETE && (
                    <DeleteTaskColumnForm />
                )}
            </CloseArea>

            <CloseArea
                isVisible={taskFormState.visibility}
                className="flex justify-center items-center"
            >
                {taksFormAction === FormActions.CREATE && <CreateTaskForm />}
                {taksFormAction === FormActions.DELETE && <DeleteTaskForm />}
                {taksFormAction === FormActions.EDIT && <EditTaskForm />}
            </CloseArea>

            {children}
        </main>
    );
}
