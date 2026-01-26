"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';
import { Droplets, Shield, Building, Users, Syringe, Heart } from 'lucide-react';

const transformationData = [
    {
        icon: Droplets,
        value: 87.1,
        label: 'Fasilitas Cuci Tangan',
        description: '412 masjid menyediakan fasilitas sanitasi'
    },
    {
        icon: Shield,
        value: 78.4,
        label: 'Wajib Masker',
        description: '371 masjid mewajibkan pemakaian masker'
    },
    {
        icon: Building,
        value: 69.8,
        label: 'Tidak Pakai Karpet',
        description: 'Jemaah bawa sajadah sendiri'
    },
    {
        icon: Users,
        value: 65.3,
        label: 'Social Distancing',
        description: 'Penandaan jarak antar saf'
    },
];

const roleData = [
    { value: 125, label: 'Tempat Penyaluran Bansos', percent: 26.4 },
    { value: 42, label: 'Gudang Logistik', percent: 8.9 },
    { value: 28, label: 'Posko Relawan', percent: 5.9 },
    { value: 10, label: 'Tempat Isolasi', percent: 2.1 },
    { value: 9, label: 'Sentra Vaksinasi', percent: 1.9 },
];

const Finding2Section = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-navy text-primary-foreground" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Finding Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium">
                        Temuan 2
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                        Transformasi Fungsi:
                        <span className="block text-gold">Dari Ritual ke Operasional Kemanusiaan</span>
                    </h2>
                    <div className="section-divider mb-8" />
                    <p className="text-xl text-primary-foreground/80">
                        Masjid terbukti mampu beradaptasi dari sekadar tempat sujud
                        menjadi <strong>simpul logistik</strong> dan <strong>benteng kesehatan publik</strong>.
                    </p>
                </motion.div>

                {/* Health Protocol Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {transformationData.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="bg-navy-dark/50 backdrop-blur rounded-2xl p-6 text-center border border-primary-foreground/10"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/20 rounded-xl mb-4">
                                <item.icon className="w-7 h-7 text-gold" />
                            </div>
                            <p className="stat-number text-4xl mb-2">
                                <AnimatedCounter
                                    value={item.value}
                                    suffix="%"
                                    decimals={1}
                                    className="stat-number text-4xl"
                                />
                            </p>
                            <p className="font-medium text-lg mb-1">{item.label}</p>
                            <p className="text-sm text-primary-foreground/60">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Role as Social Safety Net */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-3 justify-center mb-8">
                        <Heart className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-2xl text-center">
                            Jaring Pengaman Sosial
                        </h3>
                    </div>

                    <p className="text-center text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        Masjid tidak lagi hanya mengurus "Dosa dan Pahala",
                        tetapi juga <strong className="text-gold">"Lapar dan Kenyang"</strong>.
                    </p>

                    <div className="grid md:grid-cols-5 gap-4">
                        {roleData.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                                className="bg-navy-dark/50 backdrop-blur rounded-xl p-5 text-center border border-primary-foreground/10 hover:border-gold/30 transition-colors"
                            >
                                <p className="stat-number text-3xl mb-1">
                                    <AnimatedCounter value={item.value} className="stat-number text-3xl" />
                                </p>
                                <p className="text-primary-foreground/60 text-xs mb-2">Masjid</p>
                                <p className="text-sm font-medium leading-tight">{item.label}</p>
                                <p className="text-gold text-xs mt-2">({item.percent}%)</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="mt-20 max-w-3xl mx-auto text-center"
                >
                    <div className="quote-block text-primary-foreground/90 text-xl md:text-2xl italic">
                        "Data-data ini membantah anggapan bahwa masjid adalah tempat penyebaran virus.
                        Sebaliknya, mayoritas masjid justru menjadi <span className="text-gold">Garda Depan Pertahanan</span>."
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Finding2Section;
