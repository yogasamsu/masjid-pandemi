"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/mosque-hero.jpg"
                    alt="Mosque Interior"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Navy Overlay with high opacity as seen in Lovable */}
                <div className="absolute inset-0 bg-[#0E254E]/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0E254E]/50 to-[#0E254E]/90"></div>
            </div>

            <div className="z-10 relative max-w-5xl mx-auto flex flex-col items-center justify-center h-full pb-12">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <Image
                        src="/assets/logo-feb-ugm.svg"
                        alt="FEB UGM Logo"
                        width={160}
                        height={80}
                        className="object-contain filter brightness-0 invert opacity-90"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="block text-[#F9A806] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6 font-sans">
                        PUSAT KAJIAN EKONOMIKA & BISNIS SYARIAH
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1] drop-shadow-xl tracking-tight">
                        Kenangan Masjid Kami, <br />
                        <span className="italic font-normal text-[#F9A806]">Saat Pandemi</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-lg md:text-2xl text-gray-200 max-w-3xl font-sans font-light leading-relaxed mb-16"
                >
                    Kajian tentang peran <strong>473 masjid</strong> di D.I. Yogyakarta sebagai pilar ketahanan sosial-ekonomi selama pandemi COVID-19.
                </motion.p>

                {/* Key Stats as Footer of Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 border-t border-white/20 pt-10"
                >
                    <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-[#F9A806] mb-2 font-serif">473</div>
                        <div className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.2em] font-sans font-medium">Masjid</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-[#F9A806] mb-2 font-serif">564</div>
                        <div className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.2em] font-sans font-medium">Takmir</div>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                        <div className="text-5xl md:text-6xl font-bold text-[#F9A806] mb-2 font-serif">5</div>
                        <div className="text-xs md:text-sm text-gray-300 uppercase tracking-[0.2em] font-sans font-medium">Kab/Kota</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
