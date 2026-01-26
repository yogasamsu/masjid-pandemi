"use client";

import { motion } from "framer-motion";

interface ImpactStatProps {
    value: string;
    label: string;
    description?: string;
    color?: string;
    delay?: number;
}

export default function ImpactStat({ value, label, description, color = "text-secondary", delay = 0 }: ImpactStatProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className={`text-5xl md:text-6xl font-bold font-serif mb-3 ${color}`}>
                {value}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wide">{label}</h3>
            {description && (
                <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3 mt-3">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
