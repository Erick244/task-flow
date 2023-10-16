"use client";
import { Form } from "@/Components/Templates/Form";
import { PlusIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/FormsAtoms";
import { useTaskFlowDndContext } from "@/contexts/dnd/TaskFlowDndContext";
import { patchApiData } from "@/functions/ApiFunctions";
import { stopClickPropagation } from "@/functions/EventsFunctions";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EDIT_TASK_COLUMN_SCHEMA = z.object({
    title: z.string().min(3).nonempty(),
});

type EditTaskColumnFormData = z.infer<typeof EDIT_TASK_COLUMN_SCHEMA>;

export default function EditTaskColumnForm() {
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
    } = useForm<EditTaskColumnFormData>({
        resolver: zodResolver(EDIT_TASK_COLUMN_SCHEMA),
        values: {
            title: taskColumn?.title ?? "",
        },
    });

    const { updateTasksColumnsInDnd, taskColumns } = useTaskFlowDndContext();

    async function handleEditTaskColumn(
        editTaskColumnFormData: EditTaskColumnFormData
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
    }

    const disableLabelAnimation = !!taskColumn?.title;

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
