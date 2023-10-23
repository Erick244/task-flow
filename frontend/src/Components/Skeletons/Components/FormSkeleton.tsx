import { BoxSkeleton } from "../Templates/BoxSkeleton";
import { ButtonSkeleton } from "../Templates/ButtonSkeleton";
import { ContainerSkeleton } from "../Templates/ContainerSkeleton";
import { HorizontalBarSkeleton } from "../Templates/HorizontalBarSkeleton";

export function FormSkeleton() {
    return (
        <ContainerSkeleton className="sm:w-1/3 w-10/12 flex flex-col gap-10">
            <BoxSkeleton className="p-3 flex justify-center">
                <HorizontalBarSkeleton className="p-3 w-20 rounded" />
            </BoxSkeleton>

            <InputSkeleton />
            <InputSkeleton />

            <div className="flex justify-between">
                <ButtonSkeleton className="py-4">
                    <HorizontalBarSkeleton className="p-1" />
                </ButtonSkeleton>
                <ButtonSkeleton className="py-4 dark:bg-blue-500 bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-600">
                    <HorizontalBarSkeleton className="p-1 bg-white" />
                </ButtonSkeleton>
            </div>
        </ContainerSkeleton>
    );
}

function InputSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <HorizontalBarSkeleton className="p-1" />
            <HorizontalBarSkeleton className="rounded w-full" />
        </div>
    );
}
