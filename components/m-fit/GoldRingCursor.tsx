"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GoldRingCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-[#ecab13] rounded-full pointer-events-none z-[9999]"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.5,
            }}
            style={{
                boxShadow: "0 0 10px rgba(236, 171, 19, 0.4)",
            }}
        />
    );
}