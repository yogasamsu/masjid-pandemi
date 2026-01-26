"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
    decimals?: number;
}

const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
    decimals = 0
}: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            setCount(easeOutCubic * value);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, duration]);

    return (
        <motion.span
            ref={ref}
            className={`counter-value ${className}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{count.toFixed(decimals)}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
