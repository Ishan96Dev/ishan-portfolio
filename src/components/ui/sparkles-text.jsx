import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Sparkle = ({ size, color, style }) => {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={style}
            className="absolute block pointer-events-none z-10"
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M80 0C80 0 84.2846 41.2925 101.914 58.9211C119.543 76.5497 160 80 160 80C160 80 119.543 83.4503 101.914 101.079C84.2846 118.708 80 160 80 160C80 160 75.7154 118.708 58.0865 101.079C40.4575 83.4503 0 80 0 80C0 80 40.4575 76.5497 58.0865 58.9211C75.7154 41.2925 80 0 80 0Z"
                    fill={color}
                />
            </svg>
        </motion.span>
    );
};

export const SparklesText = ({ text, colors = { first: "#A07CFE", second: "#FE8FB5" }, className, sparklesCount = 10 }) => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const generateSparkles = () => {
            const newSparkles = Array.from({ length: sparklesCount }).map((_, i) => ({
                id: Math.random(),
                size: Math.random() * 10 + 10,
                style: {
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                },
                color: Math.random() > 0.5 ? colors.first : colors.second,
            }));
            setSparkles(newSparkles);
        };

        generateSparkles();
        const interval = setInterval(generateSparkles, 2000);
        return () => clearInterval(interval);
    }, [colors, sparklesCount]);

    return (
        <div className={cn("relative inline-block", className)}>
            <span className="relative z-0">{text}</span>
            {sparkles.map((sparkle) => (
                <Sparkle key={sparkle.id} size={sparkle.size} color={sparkle.color} style={sparkle.style} />
            ))}
        </div>
    );
};
