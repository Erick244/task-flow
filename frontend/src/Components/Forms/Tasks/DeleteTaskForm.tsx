"use client";
import { FormSkeleton } from "@/Components/Skeletons/Components/FormSkeleton";
import { Form } from "@/Components/Templates/Form";
import { TrashIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/StateAtoms";
import { useTasksDndContext } from "@/contexts/dnd/TasksDndContext";
import { deleteApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskModel } from "@/models/entities/Task.model";
import { useAtom } from "jotai";
import { FormEvent } from "react";

export default function DeleteTaskForm() {
    const { closeDeleteTaskForm, handleDeleteTask, task, taskColumn } =
        useDeleteTaskForm();

    if (!task || !taskColumn) return <FormSkeleton />;

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <div className="flex flex-col">
                <Form.Title title="Delete Task" className="mb-5" />
                <Form.SubTitle
                    title={taskColumn.title}
                    className="mb-10 self-center"
                />
            </div>
            <Form.Root onSubmit={handleDeleteTask}>
                <Form.Input
                    value={task?.goal}
                    label="Goal"
                    disableLabelAnimation
                    disabled
                />

                <Form.TextArea
                    value={task.description ?? ""}
                    label="Description (Optional)"
                    maxLength={150}
                    placeholder="Create a description for your goal, ex: Drinking water..."
                    disabled
                />

                <Form.AlertMessage>
                    Do you want to <strong>PERMANENTLY DELETE</strong> this
                    task?
                </Form.AlertMessage>

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeDeleteTaskForm}
                    />
                    <Form.SubmitButton
                        className="bg-red-500 hover:bg-red-600"
                        label="Delete"
                        icon={TrashIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useDeleteTaskForm() {
    const [taskFormState, setTaskFormState] = useAtom(taskFormStateAtom);
    const { taskColumn, task } = taskFormState;

    function closeDeleteTaskForm() {
        setTaskFormState({
            ...taskFormState,
            visibility: false,
        });
    }

    const { tasks, updateTasksInDnd } = useTasksDndContext();

    async function handleDeleteTask(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const tasksUpdated = tasks?.filter(
            (taskInLocalStorage: TaskModel) => taskInLocalStorage.id != task?.id
        );

        updateTasksInDnd(tasksUpdated ?? []);
        await deleteApiData(`/tasks/${task?.id}`);

        closeDeleteTaskForm();
        defaultToast("Task deleted", "success");
    }

    return {
        closeDeleteTaskForm,
        taskColumn,
        handleDeleteTask,
        task,
    };
}
