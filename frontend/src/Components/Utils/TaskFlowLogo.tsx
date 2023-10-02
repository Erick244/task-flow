"use client";
import TaskFlowLogoDarkMode from "@/assets/images/taskflow-logo_from_darkMode.png";
import TaskFlowLogoLightMode from "@/assets/images/taskflow-logo_from_lightMode.png";
import { darkModeAtom } from "@/atomns/DarkModeAtom";
import { useAtomValue } from "jotai";
import Image from "next/image";

interface TaskFlowLogoProps {
    width?: number;
    heigth?: number;
}

export default function TaskFlowLogo({ heigth, width }: TaskFlowLogoProps) {
    const isDarkMode = useAtomValue(darkModeAtom);

    const themeLogoSrc = isDarkMode
        ? TaskFlowLogoDarkMode.src
        : TaskFlowLogoLightMode.src;

    return (
        <Image
            draggable={false}
            alt="TaskFlow Logo"
            src={themeLogoSrc}
            width={width ?? 200}
            height={heigth ?? 200}
            priority
        />
    );
}
