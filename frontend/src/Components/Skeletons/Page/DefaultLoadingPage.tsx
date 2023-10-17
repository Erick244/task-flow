import { BallsLoading } from "@/Components/Utils/BallsLoading";
import TaskFlowLogo from "@/Components/Utils/TaskFlowLogo";

export function DefaultLoadingPage() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center dark:bg-neutral-700 bg-stone-300">
            <TaskFlowLogo heigth={300} width={300} />
            <BallsLoading />
        </div>
    );
}
