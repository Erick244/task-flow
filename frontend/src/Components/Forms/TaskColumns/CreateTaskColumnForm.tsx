"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/FormsAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { postApiData } from "@/functions/ApiFunctions";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CREATE_TASK_COLUMN_SCHEMA = z.object({
    title: z.string().min(3).nonempty(),
});

type CreateTaskColumnFormData = z.infer<typeof CREATE_TASK_COLUMN_SCHEMA>;

export default function CreateTaskColumnForm() {
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
    } = useForm<CreateTaskColumnFormData>({
        resolver: zodResolver(CREATE_TASK_COLUMN_SCHEMA),
    });

    const { fetchTaskColumns } = useTaskFlowDndContext();

    async function handleCreateTaskColumn(
        CreateTaskColumnFormData: CreateTaskColumnFormData
    ) {
        const createTaskColumnData = {
            title: CreateTaskColumnFormData.title,
        };

        await postApiData("/taskColumns", createTaskColumnData);
        await fetchTaskColumns();

        closeCreateTaskColumnForm();
    }

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
