import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
    return (
        <div
            className={cn(
                "absolute top-0 left-0 w-full h-full p-0 m-0 overflow-hidden bg-neutral-950 pointer-events-none",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-3xl" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
    );
};
