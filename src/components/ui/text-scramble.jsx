'use client';

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
    const intervalRef = useRef(null);

    useEffect(() => {
        const text = children;

        // WCAG 2.3.3 — if user prefers reduced motion, skip the scramble entirely
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            setDisplayText(text);
            return;
        }

        const length = text.length;
        let frame = 0;
        const totalFrames = duration * 60;

        const startTimeout = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                setDisplayText(() => {
                    return text
                        .split('')
                        .map((char, index) => {
                            if (index < (frame / totalFrames) * length) {
                                return char;
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join('');
                });

                frame++;
                if (frame >= totalFrames) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setDisplayText(text);
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
        /*
         * WCAG 1.3.1 — the outer <span> exposes the final, readable text via aria-label.
         * The animated <motion.span> is aria-hidden so AT always reads the correct word,
         * never the scrambled random characters shown visually during the animation.
         */
        <span aria-label={children}>
            <motion.span className={className} aria-hidden="true">
                {displayText}
            </motion.span>
        </span>
    );
};
