import { CircleSkeleton } from "../Templates/CircleSkeleton";
import { HorizontalBarSkeleton } from "../Templates/HorizontalBarSkeleton";

export function UserProfileSkeleton() {
    return (
        <div className="flex gap-2 items-center">
            <CircleSkeleton className="p-5" />
            <HorizontalBarSkeleton className="mr-10" />
        </div>
    );
}
