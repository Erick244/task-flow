"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { postApiData } from "@/functions/ApiFunctions";
import { defaultToast } from "@/functions/DefaultToasts";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import {
    SAVE_TASK_COLUMN_SCHEMA,
    SaveTaskColumnFormData,
} from "@/schemas/forms/save-task-column-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function CreateTaskColumnForm() {
    const {
        closeCreateTaskColumnForm,
        errors,
        handleCreateTaskColumn,
        handleSubmit,
        register,
    } = useCreateTaskColumnForm();

    return (
        <Form.Container
            className="sm:w-1/3 w-10/12"
            onClick={stopClickPropagation}
        >
            <Form.Title title="Create Task Column" className="mb-10" />
            <Form.Root onSubmit={handleSubmit(handleCreateTaskColumn)}>
                <Form.Input label="Title" register={register("title")} />

                {errors.title && (
                    <Form.AlertMessage>
                        {errors.title.message}
                    </Form.AlertMessage>
                )}

                <div className="flex justify-between mt-5">
                    <Form.ActionButton
                        label="Cancel"
                        onClick={closeCreateTaskColumnForm}
                    />
                    <Form.SubmitButton
                        className="bg-blue-500 hover:bg-blue-600"
                        label={"Create"}
                        icon={PlusIcon}
                    />
                </div>
            </Form.Root>
        </Form.Container>
    );
}

function useCreateTaskColumnForm() {
    const setTaskColumnFormState = useSetAtom(taskColumnFormStateAtom);

    function closeCreateTaskColumnForm() {
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
    });

    const { fetchTaskColumnsInDnd } = useTaskFlowDndContext();

    async function handleCreateTaskColumn(
        CreateTaskColumnFormData: SaveTaskColumnFormData
    ) {
        const createTaskColumnData = {
            title: CreateTaskColumnFormData.title,
        };

        await postApiData("/taskColumns", createTaskColumnData);
        await fetchTaskColumnsInDnd();

        closeCreateTaskColumnForm();
        defaultToast("Task column created", "success");
    }

    return {
        handleSubmit,
        handleCreateTaskColumn,
        closeCreateTaskColumnForm,
        errors,
        register,
    };
}
