"use client";
import { taskFormStateAtom } from "@/atomns/FormsAtoms";
import { DndTypes } from "@/models/DndTypes.enum";
import { FormActions } from "@/models/FormActions.enum";
import { TaskModel } from "@/models/Task.model";
import { TaskColumnModel } from "@/models/TaskColumn.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSetAtom } from "jotai";
import AddTaskButton from "../../Task/AddTaskButton";
import ClientTaskColumn from "../../TaskColumn/ClientTaskColumn";
import DndContainerTasks from "../Task/DndContainerTasks";

interface DndTaskColumnProps {
    taskColumn: TaskColumnModel;
    tasks: TaskModel[];
}

function useDndTaskColumn(taskColumn: TaskColumnModel) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: `${taskColumn.id} - TaskColumn`,
        data: {
            taskColumn,
            type: DndTypes.TASK_COLUMN,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return {
        setNodeRef,
        attributes,
        listeners,
        isDragging,
        style,
    };
}

export default function DndTaskColumn({
    taskColumn,
    tasks,
}: DndTaskColumnProps) {
    const { attributes, isDragging, listeners, setNodeRef, style } =
        useDndTaskColumn(taskColumn);

    const setTaskFormState = useSetAtom(taskFormStateAtom);

    function handlerAddTaskButton() {
        setTaskFormState({
            formAction: FormActions.CREATE,
            taskColumn: taskColumn,
            task: null,
            visibility: true,
        });
    }

    return (
        <ClientTaskColumn
            ref={setNodeRef}
            taskColumn={taskColumn}
            titleAttributes={{ ...attributes, ...listeners }}
            style={style}
            className={
                isDragging
                    ? "opacity-50 border-dashed border-2 bg-neutral-500 dark:border-blue-500 border-blue-500"
                    : "visible"
            }
        >
            <DndContainerTasks tasks={tasks} />

            <AddTaskButton
                className="self-center"
                onClick={handlerAddTaskButton}
            />
        </ClientTaskColumn>
    );
}
