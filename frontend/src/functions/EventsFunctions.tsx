import { MouseEvent } from "react";

export function stopClickPropagation(e: MouseEvent) {
    e.stopPropagation();
}
