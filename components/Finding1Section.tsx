"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';

const regionData = [
    { name: 'Sleman', value: 52.3, label: 'Sangat Responsif' },
    { name: 'Bantul', value: 46.5, label: 'Cukup Responsif' },
    { name: 'Kota Yogyakarta', value: 44.4, label: 'Cukup Responsif' },
    { name: 'Gunung Kidul', value: 35.2, label: 'Kurang Responsif' },
    { name: 'Kulon Progo', value: 27.3, label: 'Perlu Intervensi' },
];

const Finding1Section = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-background" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Finding Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium">
                        Temuan 1
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-6">
                        Ketimpangan Respons:
                        <span className="block text-gold">Geografi Menentukan Kecepatan</span>
                    </h2>
                    <div className="section-divider mb-8" />
                    <p className="text-xl text-muted-foreground">
                        Tidak semua masjid siap menjadi <em>supporting system</em>.
                        Hanya <strong className="text-navy">44%</strong> yang aktif tanggap pandemi.
                    </p>
                </motion.div>

                {/* Big Stat */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <span className="stat-number text-8xl md:text-9xl">
                            <AnimatedCounter value={44} suffix="%" className="stat-number text-8xl md:text-9xl" />
                        </span>
                        <p className="text-lg text-muted-foreground mt-4">
                            Masjid aktif merespons pandemi
                        </p>
                    </div>
                </motion.div>

                {/* Regional Data */}
                <div className="max-w-4xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="font-display text-2xl text-navy mb-8 text-center"
                    >
                        Hierarki Keaktifan per Wilayah
                    </motion.h3>

                    <div className="space-y-4">
                        {regionData.map((region, index) => (
                            <motion.div
                                key={region.name}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-32 md:w-40 shrink-0 text-right">
                                    <p className="font-medium text-navy">{region.name}</p>
                                    <p className="text-xs text-muted-foreground">{region.label}</p>
                                </div>

                                <div className="flex-1 h-12 bg-cream rounded-lg overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${region.value}%` } : {}}
                                        transition={{ duration: 1.2, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                                        className="h-full chart-bar flex items-center justify-end pr-4"
                                    >
                                        <span className="text-navy font-bold text-lg">
                                            {region.value}%
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Insight Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-16 max-w-3xl mx-auto"
                >
                    <div className="insight-card">
                        <p className="text-gold font-medium text-sm uppercase tracking-wider mb-3">
                            Insight Kunci
                        </p>
                        <p className="text-lg text-foreground leading-relaxed">
                            <strong>Masjid di Sleman (52,3%)</strong> tercatat dua kali lebih responsif
                            dibandingkan masjid di <strong>Kulon Progo (27,2%)</strong>. Hal ini menunjukkan
                            bahwa ketahanan sosial tidak tumbuh alami di pedesaan, melainkan membutuhkan
                            dukungan infrastruktur dan akses informasi yang kuat.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Finding1Section;
