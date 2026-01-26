"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
    const scrollToContent = () => {
        document.getElementById('context')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/hero-mosque.jpg"
                    alt="Masjid di Yogyakarta"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 hero-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
                {/* Logos */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
                >
                    <div className="h-14 md:h-20 w-auto relative">
                        <Image
                            src="/assets/logo-pkebs-white.png"
                            alt="Pusat Kajian Ekonomika dan Bisnis Syariah"
                            width={200}
                            height={80}
                            className="h-full w-auto object-contain"
                        />
                    </div>
                    <div className="hidden md:block w-px h-12 bg-primary-foreground/30" />
                    <div className="h-8 md:h-10 w-auto relative">
                        <Image
                            src="/assets/logo-sanggabiz.png"
                            alt="Sanggabiz"
                            width={100}
                            height={40}
                            className="h-full w-auto object-contain filter brightness-0 invert"
                        />
                    </div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gold font-medium tracking-widest uppercase text-sm md:text-base mb-6"
                >
                    Pusat Kajian Ekonomika dan Bisnis Syariah
                </motion.p>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
                >
                    Kenangan<br />
                    <span className="text-gold">Masjid Kami,</span><br />
                    Saat Pandemi
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12"
                >
                    Kajian tentang peran 473 masjid di D.I. Yogyakarta sebagai pilar ketahanan sosial-ekonomi selama pandemi COVID-19
                </motion.p>

                {/* Stats Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
                >
                    <div className="text-center">
                        <p className="stat-number text-4xl md:text-5xl">473</p>
                        <p className="text-primary-foreground/70 text-sm mt-1">Masjid</p>
                    </div>
                    <div className="text-center">
                        <p className="stat-number text-4xl md:text-5xl">564</p>
                        <p className="text-primary-foreground/70 text-sm mt-1">Takmir</p>
                    </div>
                    <div className="text-center">
                        <p className="stat-number text-4xl md:text-5xl">5</p>
                        <p className="text-primary-foreground/70 text-sm mt-1">Kabupaten/Kota</p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.button
                    onClick={scrollToContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 1.2 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                    aria-label="Scroll ke bawah"
                >
                    <ChevronDown className="w-10 h-10" />
                </motion.button>
            </div>
        </section>
    );
};

export default HeroSection;
