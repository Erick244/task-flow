"use client";
import { DefaultLoadingPage } from "@/Components/Skeletons/Page/DefaultLoadingPage";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { FormActions } from "@/models/enums/FormActions.enum";
import { DndContext } from "@dnd-kit/core";
import { useSetAtom } from "jotai";
import AddTaskColumnButton from "../TaskColumn/AddTaskColumnButton";
import DndDragOverlay from "./DndDragOverlay";
import DndContainerTaskColumns from "./TaskColumn/DndContainerTaskColumns";

export default function DndContainer() {
    const {
        taskColumns,
        tasks,
        activeTask,
        dataFetchingIsLoading,
        activeTaskColumn,
        handlerOnDragEnd,
        handlerOnDragOver,
        handlerOnDragStart,
        sensors,
    } = useTaskFlowDndContext();

    const setSaveTaskColumnState = useSetAtom(taskColumnFormStateAtom);

    if (dataFetchingIsLoading) return <DefaultLoadingPage />;

    function handlerAddTaskColumnButton() {
        setSaveTaskColumnState({
            taskColumn: null,
            formAction: FormActions.CREATE,
            visibility: true,
        });
    }

    return (
        <DndContext
            onDragStart={handlerOnDragStart}
            onDragEnd={handlerOnDragEnd}
            onDragOver={handlerOnDragOver}
            sensors={sensors}
        >
            <div className="h-full flex flex-col items-start sm:flex-row sm:flex-wrap">
                <DndContainerTaskColumns
                    taskColumns={taskColumns}
                    tasks={tasks}
                />

                <DndDragOverlay
                    activeTask={activeTask}
                    activeTaskColumn={activeTaskColumn}
                    tasks={tasks}
                />

                <AddTaskColumnButton
                    className="self-center sm:self-start m-5 p-5 sm:p-3"
                    onClick={handlerAddTaskColumnButton}
                />
            </div>
        </DndContext>
    );
}
