import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const text = children;
        const length = text.length;
        let frame = 0;
        const totalFrames = duration * 60;

        // Start animation with delay
        const startTimeout = setTimeout(() => {
            setIsAnimating(true);

            const interval = setInterval(() => {
                setDisplayText(current => {
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
                    clearInterval(interval);
                    setDisplayText(text);
                    setIsAnimating(false);
                }
            }, 1000 / 60);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [children, duration, delay]);

    return (
        <motion.span className={className}>
            {displayText}
        </motion.span>
    );
};
