"use client";
import { Form } from "@/Components/Templates/Form";
import { TrashIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/FormsAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { deleteApiData } from "@/functions/ApiFunctions";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { useAtom } from "jotai";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function DeleteTaskColumnForm() {
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

    const { updateTasksColumnsInDnd, taskColumns } = useTaskFlowDndContext();

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
        } catch (e: any) {
            const errorMessage = e.response.data;
            toast(errorMessage, { type: "error", theme: "dark" });
        }
    }

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title="Delete Task Column" className="mb-10" />
            <Form.Root onSubmit={handleDeleteTaskColumn}>
                <Form.Input
                    label="Title"
                    value={taskColumn?.title}
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
