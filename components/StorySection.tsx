"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface StorySectionProps {
    id?: string;
    title: string;
    children: ReactNode;
    visual?: ReactNode;
    imageSrc?: string;
    reverse?: boolean; // If true, image on left, text on right
    bgColor?: string;
}

export default function StorySection({
    id,
    title,
    children,
    visual,
    imageSrc,
    reverse = false,
    bgColor = "bg-white"
}: StorySectionProps) {

    return (
        <section id={id} className={`py-32 relative ${bgColor} overflow-hidden`}>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Sticky Visual Side */}
                    <div className="flex-1 w-full lg:h-auto lg:sticky lg:top-32 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-card bg-white border border-white/60"
                        >
                            {imageSrc ? (
                                <div className="relative w-full h-full group">
                                    <Image
                                        src={imageSrc}
                                        alt={title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Glass Overlay for modern feel */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50/50 backdrop-blur-sm p-8">
                                    {visual}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Scrolling Text Side */}
                    <div className="flex-1 flex flex-col justify-center py-4 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ margin: "-20%" }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-0.5 w-16 bg-secondary rounded-full"></div>
                                <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">
                                    Key Insight
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-10 leading-[1.1] tracking-tight">
                                {title}
                            </h2>

                            <div className="text-lg lg:text-xl text-gray-600 leading-relaxed font-sans font-light space-y-8">
                                {children}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
