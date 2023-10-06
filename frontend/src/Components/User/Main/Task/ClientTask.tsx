"use client";
import DefaultFloatMenu from "@/Components/Menus/DefaultFloatMenu";
import { Task } from "@/Components/Templates/Main/Task";
import CloseArea from "@/Components/Utils/CloseArea";
import { MoreIcon } from "@/Components/Utils/Icons";
import { taskFormStateAtom } from "@/atomns/FormsAtoms";
import { getApiData } from "@/functions/ApiFunctions";
import useFloatMenu from "@/hooks/useFloatMenu";
import { TaskModel } from "@/models/entities/Task.model";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { FormActions } from "@/models/enums/FormActions.enum";
import { useSetAtom } from "jotai";
import { HTMLAttributes, Ref, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ClientTaskProps extends HTMLAttributes<HTMLDivElement> {
    task: TaskModel;
}

type FloatMenuPositionsProps = {
    x: number;
    y: number;
};

// TODO: Clean Code

const ClientTask = forwardRef(
    ({ task, ...rest }: ClientTaskProps, ref: Ref<HTMLDivElement>) => {
        const [descriptionIsVisible, setDescriptionVisibility] =
            useState<boolean>(false);

        const {
            floatMenuIsVisible,
            floatMenuPositions,
            renderFloatMenuInElementBottom,
            toggleFloatMenuVisibility,
        } = useFloatMenu();

        const existsDescription = !!task.description;

        function toggleDescriptionVisiblity() {
            setDescriptionVisibility(!descriptionIsVisible);
        }

        const setTaskFormState = useSetAtom(taskFormStateAtom);

        async function handlerEditFloatMenuButton() {
            const taskColumn = await getApiData<TaskColumnModel>(
                `/taskColumns/findOne/${task.taskColumnId}`
            );

            setTaskFormState({
                taskColumn,
                formAction: FormActions.EDIT,
                task,
                visibility: true,
            });
        }

        async function hanlderDeleteFloatMenuButton() {
            const taskColumn = await getApiData<TaskColumnModel>(
                `/taskColumns/findOne/${task.taskColumnId}`
            );

            setTaskFormState({
                taskColumn,
                formAction: FormActions.DELETE,
                task,
                visibility: true,
            });
        }

        return (
            <Task.Root
                {...rest}
                ref={ref}
                descriptionIsVisible={descriptionIsVisible}
                className={twMerge("flex flex-col", rest.className)}
            >
                <div className="flex gap-2">
                    <Task.ChekBox defaultChecked={task.isCompleted} />
                    <Task.Goal goal={task.goal} className="flex-grow" />
                    {existsDescription && (
                        <Task.ToggleDescription
                            onClick={toggleDescriptionVisiblity}
                            descriptionIsVisible={descriptionIsVisible}
                        />
                    )}
                    <Task.Action
                        icon={MoreIcon}
                        onClick={renderFloatMenuInElementBottom}
                    />
                </div>

                {existsDescription && (
                    <Task.Description
                        description={task.description}
                        isVisible={descriptionIsVisible}
                    />
                )}

                <CloseArea
                    isVisible={floatMenuIsVisible}
                    hiddenVisibility={toggleFloatMenuVisibility}
                    className="left-0 bg-transparent"
                >
                    <DefaultFloatMenu
                        handlerDeleteButton={hanlderDeleteFloatMenuButton}
                        handlerEditButton={handlerEditFloatMenuButton}
                        positionX={floatMenuPositions.x}
                        positionY={floatMenuPositions.y}
                    />
                </CloseArea>
            </Task.Root>
        );
    }
);

ClientTask.displayName = "ClientTask";

export default ClientTask;
