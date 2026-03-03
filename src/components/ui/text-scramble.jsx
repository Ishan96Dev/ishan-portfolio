import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export const TextScramble = ({
    children,
    duration = 0.6,
    delay = 0,
    className
}) => {
    const [displayText, setDisplayText] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const text = children;
        const length = text.length;
        let frame = 0;
        const totalFrames = duration * 60;

        // Start animation with delay
        const startTimeout = setTimeout(() => {
            setIsAnimating(true);

            intervalRef.current = setInterval(() => {
                setDisplayText(() => {
                    return text
                        .split("")
                        .map((char, index) => {
                            if (index < (frame / totalFrames) * length) {
                                return char;
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("");
                });

                frame++;
                if (frame >= totalFrames) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setDisplayText(text);
                    setIsAnimating(false);
                }
            }, 1000 / 60);
        }, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [children, duration, delay]);

    return (
        <motion.span className={className}>
            {displayText}
        </motion.span>
    );
};
