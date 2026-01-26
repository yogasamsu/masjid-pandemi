"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Users, Calendar, FileText, Search, Database } from 'lucide-react';

const methodologyData = [
    {
        icon: Search,
        title: 'Pendekatan',
        value: 'Mixed Method',
        desc: 'Kuantitatif (Survei) & Kualitatif (Wawancara Mendalam)'
    },
    {
        icon: MapPin,
        title: 'Lokasi',
        value: '5 Kab/Kota',
        desc: 'Seluruh wilayah D.I. Yogyakarta (Sleman, Bantul, Kota, dll)'
    },
    {
        icon: Database,
        title: 'Sampel',
        value: '473 Masjid',
        desc: 'Cluster Random Sampling dengan Margin of Error < 5%'
    },
    {
        icon: Calendar,
        title: 'Periode',
        value: 'Feb - Jul 2023',
        desc: 'Pengumpulan data primer pasca-pandemi'
    }
];

const BackgroundMethodologySection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="methodology" className="py-24 md:py-32 bg-background pattern-grid" ref={ref}>
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 max-w-4xl mx-auto"
                >
                    <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
                        Landasan Riset
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-8">
                        Latar Belakang & Metodologi
                    </h2>
                    <div className="section-divider mb-10" />

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Studi ini bermula dari pertanyaan sederhana: <em className="text-navy font-serif">"Bagaimana masjid berperan dalam ketahanan sosial menghadapi pandemi?"</em>.
                        Kami menelusuri ratusan masjid untuk memotret realitas ketahanan ekonomi berbasis komunitas yang sering luput dari radar kebijakan nasional.
                    </p>
                </motion.div>

                {/* Methodology Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {methodologyData.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="bg-cream rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-gold/30"
                        >
                            <div className="w-14 h-14 bg-navy text-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="w-7 h-7" />
                            </div>

                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                                {item.title}
                            </h3>
                            <p className="font-display text-2xl font-bold text-navy mb-3">
                                {item.value}
                            </p>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-navy-light/10 rounded-full border border-navy/10 text-navy text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Melibatkan 564 Takmir & Pengelola Masjid</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default BackgroundMethodologySection;
