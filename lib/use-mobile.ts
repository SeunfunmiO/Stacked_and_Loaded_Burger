"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        checkScreen(); // run once
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, [breakpoint]);

    return isMobile;
}