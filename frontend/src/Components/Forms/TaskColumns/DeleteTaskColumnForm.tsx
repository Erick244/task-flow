"use client";
import { Form } from "@/Components/Templates/Form";
import { TrashIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import { useTaskColumnsDndContext } from "@/contexts/dnd/TaskColumnsDndContext";
import { deleteApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { useAtom } from "jotai";
import { FormEvent } from "react";

export default function DeleteTaskColumnForm() {
    const { closeDeleteTaskColumnForm, handleDeleteTaskColumn, taskColumn } =
        useDeleteTaskColumnForm();

    if (!taskColumn) return <p>Loading....</p>; //TODO: Skeleton

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title="Delete Task Column" className="mb-10" />
            <Form.Root onSubmit={handleDeleteTaskColumn}>
                <Form.Input
                    label="Title"
                    value={taskColumn.title}
                    disabled
                    disableLabelAnimation
                />

                <Form.AlertMessage>
                    Do you want to <strong>PERMANENTLY DELETE</strong> this task
                    column?
                </Form.AlertMessage>

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeDeleteTaskColumnForm}
                    />
                    <Form.SubmitButton
                        className="bg-red-500 hover:bg-red-600"
                        label={"Delete"}
                        icon={TrashIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useDeleteTaskColumnForm() {
    const [taskColumnFormState, setTaskColumnFormState] = useAtom(
        taskColumnFormStateAtom
    );

    const { taskColumn } = taskColumnFormState;

    function closeDeleteTaskColumnForm() {
        setTaskColumnFormState((taskColumnFormState) => {
            return {
                ...taskColumnFormState,
                visibility: false,
            };
        });
    }

    const { taskColumns, updateTasksColumnsInDnd } = useTaskColumnsDndContext();

    async function handleDeleteTaskColumn(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const taskColumnsUpdated = taskColumns?.filter(
            (taskInLocalStorage: TaskColumnModel) =>
                taskInLocalStorage.id != taskColumn?.id
        );

        try {
            await deleteApiData(`/taskColumns/${taskColumn?.id}`);
            updateTasksColumnsInDnd(taskColumnsUpdated ?? []);

            closeDeleteTaskColumnForm();
            defaultToast("Task column deleted", "success");
        } catch (e: any) {
            const errorMessage = e.response.data;
            defaultToast(errorMessage, "error");
        }
    }

    return {
        handleDeleteTaskColumn,
        taskColumn,
        closeDeleteTaskColumnForm,
    };
}
