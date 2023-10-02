"use client";
import { MouseEvent, useState } from "react";

type FloatMenuPositionsProps = {
    x: number;
    y: number;
};

export default function useFloatMenu() {
    const [floatMenuIsVisible, setFloatMenuVisibility] =
        useState<boolean>(false);

    const [floatMenuPositions, setFloatMenuPositions] =
        useState<FloatMenuPositionsProps>({ x: 0, y: 0 });

    function toggleFloatMenuVisibility() {
        setFloatMenuVisibility(!floatMenuIsVisible);
    }

    function renderFloatMenuInElementBottom(e: MouseEvent) {
        const element = e.target as Element;

        const elementPositions = element.getBoundingClientRect();
        const elementBottom = elementPositions.bottom;
        const elementLeft = elementPositions.left;

        const floatMenuX = elementLeft;
        const floatMenuY = elementBottom + 10;

        setFloatMenuPositions({ x: floatMenuX, y: floatMenuY });

        toggleFloatMenuVisibility();
    }

    return {
        floatMenuPositions,
        floatMenuIsVisible,
        toggleFloatMenuVisibility,
        renderFloatMenuInElementBottom,
    };
}
