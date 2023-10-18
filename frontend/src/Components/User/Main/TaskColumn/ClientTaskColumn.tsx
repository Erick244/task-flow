"use client";
import DefaultFloatMenu from "@/Components/Menus/DefaultFloatMenu";
import { TaskColumn } from "@/Components/Templates/Main/TaskColumn";
import CloseArea from "@/Components/Utils/CloseArea";
import { MoreIcon } from "@/Components/Utils/Icons";
import { taskColumnFormStateAtom } from "@/atomns/StateAtoms";
import useFloatMenu from "@/hooks/useFloatMenu";
import { TaskColumnModel } from "@/models/entities/TaskColumn.model";
import { FormActions } from "@/models/enums/FormActions.enum";
import { useSetAtom } from "jotai";
import { HTMLAttributes, Ref, forwardRef } from "react";

interface ClientTaskColumnProps extends HTMLAttributes<HTMLDivElement> {
    taskColumn: TaskColumnModel;
    children: React.ReactNode;
    titleAttributes?: any;
}

const ClientTaskColumn = forwardRef(
    (
        {
            children,
            taskColumn,
            titleAttributes,
            ...rest
        }: ClientTaskColumnProps,
        ref: Ref<HTMLDivElement>
    ) => {
        const {
            floatMenuIsVisible,
            floatMenuPositions,
            renderFloatMenuInElementBottom,
            toggleFloatMenuVisibility,
        } = useFloatMenu();

        const taskColumnFormState = useSetAtom(taskColumnFormStateAtom);

        function handlerDeleteFloatMenuButton() {
            taskColumnFormState({
                taskColumn,
                formAction: FormActions.DELETE,
                visibility: true,
            });
        }

        function handlerEditFloatMenuButton() {
            taskColumnFormState({
                taskColumn,
                formAction: FormActions.EDIT,
                visibility: true,
            });
        }

        return (
            <TaskColumn.Root {...rest} ref={ref}>
                <div className="flex">
                    <TaskColumn.Title
                        {...titleAttributes}
                        className="flex-grow"
                        title={taskColumn.title}
                    />
                    <TaskColumn.Action
                        className="dark:bg-neutral-600 bg-neutral-100 dark:hover:bg-neutral-600 hover:bg-neutral-100"
                        icon={MoreIcon}
                        onClick={renderFloatMenuInElementBottom}
                    />
                </div>

                <CloseArea
                    isVisible={floatMenuIsVisible}
                    hiddenVisibility={toggleFloatMenuVisibility}
                    className="left-0 bg-transparent"
                >
                    <DefaultFloatMenu
                        handlerDeleteButton={handlerDeleteFloatMenuButton}
                        handlerEditButton={handlerEditFloatMenuButton}
                        positionX={floatMenuPositions.x}
                        positionY={floatMenuPositions.y}
                    />
                </CloseArea>

                <div className="flex flex-col gap-7 p-4">{children}</div>
            </TaskColumn.Root>
        );
    }
);

ClientTaskColumn.displayName = "ClientTaskColumn";

export default ClientTaskColumn;
