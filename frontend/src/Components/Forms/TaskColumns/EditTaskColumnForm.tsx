"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { patchApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import {
    SAVE_TASK_COLUMN_SCHEMA,
    SaveTaskColumnFormData,
} from "@/schemas/forms/save-task-column-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function EditTaskColumnForm() {
    const {
        closeEditTaskColumnForm,
        errors,
        handleEditTaskColumn,
        handleSubmit,
        register,
        disableLabelAnimation,
    } = useEditTaskColumnForm();

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title="Edit Task Column" className="mb-10" />
            <Form.Root onSubmit={handleSubmit(handleEditTaskColumn)}>
                <Form.Input
                    label="Title"
                    register={register("title")}
                    disableLabelAnimation={disableLabelAnimation}
                />

                {errors.title && (
                    <Form.AlertMessage>
                        {errors.title.message}
                    </Form.AlertMessage>
                )}

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeEditTaskColumnForm}
                    />
                    <Form.SubmitButton
                        className="bg-blue-500 hover:bg-blue-600"
                        label={"Edit"}
                        icon={PlusIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useEditTaskColumnForm() {
    const [taskColumnFormState, setTaskColumnFormState] = useAtom(
        taskColumnFormStateAtom
    );

    const { taskColumn } = taskColumnFormState;

    function closeEditTaskColumnForm() {
        setTaskColumnFormState((taskColumnFormState) => {
            return {
                ...taskColumnFormState,
                visibility: false,
            };
        });
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SaveTaskColumnFormData>({
        resolver: zodResolver(SAVE_TASK_COLUMN_SCHEMA),
        values: {
            title: taskColumn?.title ?? "",
        },
    });

    const { updateTasksColumnsInDnd, taskColumns } = useTaskFlowDndContext();

    async function handleEditTaskColumn(
        editTaskColumnFormData: SaveTaskColumnFormData
    ) {
        if (!taskColumn?.id) return;

        const editTaskColumn = {
            id: taskColumn.id,
            ...editTaskColumnFormData,
        };

        const updatedTaskColumns = taskColumns.map(
            (dndTaskColumn: TaskColumnModel) => {
                if (dndTaskColumn.id == taskColumn.id) {
                    dndTaskColumn = editTaskColumn;
                }

                return dndTaskColumn;
            }
        );

        updateTasksColumnsInDnd(updatedTaskColumns);
        await patchApiData(`/tasks/${taskColumn.id}`, editTaskColumnFormData);

        closeEditTaskColumnForm();
        defaultToast("Task column edited", "success");
    }

    const disableLabelAnimation = !!taskColumn?.title;

    return {
        closeEditTaskColumnForm,
        handleSubmit,
        handleEditTaskColumn,
        register,
        errors,
        disableLabelAnimation,
    };
}
