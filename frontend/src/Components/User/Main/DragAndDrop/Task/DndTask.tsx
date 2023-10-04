"use client";
import { TaskModel } from "@/models/entities/Task.model";
import { DndTypes } from "@/models/enums/DndTypes.enum";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ClientTask from "../../Task/ClientTask";

interface DndTaskProps {
    task: TaskModel;
}

function useDndTask(task: TaskModel) {
    const {
        setNodeRef,
        transform,
        transition,
        isDragging,
        attributes,
        listeners,
    } = useSortable({
        id: `${task.id} - Task`,
        data: {
            task,
            type: DndTypes.TASK,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return {
        style,
        setNodeRef,
        isDragging,
        attributes,
        listeners,
    };
}

export default function DndTask({ task }: DndTaskProps) {
    const { attributes, isDragging, listeners, setNodeRef, style } =
        useDndTask(task);

    return (
        <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <ClientTask
                task={task}
                className={
                    isDragging
                        ? "opacity-50 dark:bg-transparent bg-transparent border-2 border-blue-500 border-dashed"
                        : "visible"
                }
            />
        </div>
    );
}
