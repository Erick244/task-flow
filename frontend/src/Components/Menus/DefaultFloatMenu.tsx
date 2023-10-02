import { FloatMenu } from "@/Components/Templates/Main/FloatMenu";
import { EditIcon, TrashIcon } from "@/Components/Utils/Icons";

interface DefaultFloatMenuProps {
    positionX: number;
    positionY: number;
    handlerEditButton: () => void;
    handlerDeleteButton: () => void;
}

export default function DefaultFloatMenu({
    positionX,
    positionY,
    handlerEditButton,
    handlerDeleteButton,
}: DefaultFloatMenuProps) {
    const style = { top: `${positionY}px`, left: `${positionX}px` };

    return (
        <FloatMenu.Root className="flex flex-col gap-2" style={style}>
            <FloatMenu.Item
                onClick={handlerEditButton}
                icon={EditIcon}
                label="Edit"
                className="border-blue-500 bg-blue-500/10 dark:text-blue-500 text-blue-500 dark:hover:text-white/50 hover:text-black/50"
            />
            <FloatMenu.Item
                onClick={handlerDeleteButton}
                icon={TrashIcon}
                label="Delete"
                className="border-red-500 bg-red-500/10 dark:text-red-500 text-red-500 dark:hover:text-white/50 hover:text-black/50"
            />
        </FloatMenu.Root>
    );
}
