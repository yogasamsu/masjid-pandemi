"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';

const ContextSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="context" className="py-24 md:py-32 bg-cream" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
                        Konteks Penelitian
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-6">
                        Mengapa Studi Ini Penting?
                    </h2>
                    <div className="section-divider" />
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Pandemi COVID-19 bukan hanya krisis kesehatan, melainkan
                            <span className="text-highlight"> ujian terberat bagi ketahanan sosial kita</span>.
                            Ketika infrastruktur negara mengalami tekanan hebat, ribuan masjid di Yogyakarta
                            bertransformasi secara organik menjadi <strong>"jaring pengaman sosial"</strong>.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            D.I. Yogyakarta dipilih sebagai lokasi studi karena memiliki indeks spiritualitas
                            tinggi dan merupakan daerah rawan bencana—menjadikannya "laboratorium" ideal untuk
                            studi ketahanan berbasis komunitas.
                        </p>

                        <div className="quote-block text-navy">
                            "Masjid bukan sekadar tempat ibadah, melainkan infrastruktur sosial raksasa yang
                            terbukti menjadi jaring pengaman paling efektif saat negara kewalahan."
                        </div>
                    </motion.div>

                    {/* Right - Data Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-navy rounded-2xl p-8 md:p-10 text-primary-foreground"
                    >
                        <h3 className="font-display text-2xl mb-8 text-center">
                            Integritas Data
                        </h3>

                        <div className="space-y-8">
                            <div className="text-center">
                                <p className="stat-number text-5xl md:text-6xl">
                                    <AnimatedCounter value={8568} className="stat-number text-5xl md:text-6xl" />
                                </p>
                                <p className="text-primary-foreground/70 mt-2">Total Populasi Masjid di DIY</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-navy-dark/30 rounded-xl">
                                    <p className="stat-number text-3xl">
                                        <AnimatedCounter value={473} className="stat-number text-3xl" />
                                    </p>
                                    <p className="text-primary-foreground/70 text-sm mt-1">Sampel Valid</p>
                                </div>
                                <div className="text-center p-4 bg-navy-dark/30 rounded-xl">
                                    <p className="stat-number text-3xl">
                                        <AnimatedCounter value={95} suffix="%" className="stat-number text-3xl" />
                                    </p>
                                    <p className="text-primary-foreground/70 text-sm mt-1">Tingkat Kepercayaan</p>
                                </div>
                            </div>

                            <div className="text-center p-4 bg-navy-dark/30 rounded-xl">
                                <p className="stat-number text-3xl">
                                    <AnimatedCounter value={564} className="stat-number text-3xl" />
                                </p>
                                <p className="text-primary-foreground/70 text-sm mt-1">
                                    Takmir/Pengelola (rata-rata 15 tahun pengalaman)
                                </p>
                            </div>

                            <p className="text-center text-sm text-primary-foreground/60">
                                Survei: Februari – Juli 2023
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContextSection;
