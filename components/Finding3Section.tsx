"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';
import { Accessibility, Users, Wallet, X, Check } from 'lucide-react';

const Finding3Section = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-cream" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Finding Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium">
                        Temuan 3 — Yang Paling Krusial
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
                        Paradoks Kapasitas:
                        <span className="block text-gold">Inklusivitas Lebih Penting dari Uang</span>
                    </h2>
                    <div className="section-divider mb-8" />
                    <p className="text-xl text-muted-foreground">
                        Analisis statistik membuktikan bahwa kepemilikan administrasi legal, QRIS,
                        atau saldo kas besar <strong>bukanlah penentu</strong> kesiapan masjid menghadapi krisis.
                    </p>
                </motion.div>

                {/* Main Stat - 2.7x */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block bg-navy rounded-3xl p-10 md:p-16 shadow-elevated">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Accessibility className="w-10 h-10 text-gold" />
                        </div>
                        <p className="stat-number text-7xl md:text-9xl">
                            <AnimatedCounter
                                value={2.7}
                                suffix="x"
                                decimals={1}
                                className="stat-number text-7xl md:text-9xl"
                            />
                        </p>
                        <p className="text-primary-foreground text-xl mt-4 max-w-md">
                            Peluang lebih besar untuk menjadi <strong>Masjid Tangguh</strong>
                            jika memiliki fasilitas ramah difabel
                        </p>
                        <p className="text-gold text-sm mt-4 font-medium">
                            P-Value &lt; 0.001 (Sangat Signifikan Secara Statistik)
                        </p>
                    </div>
                </motion.div>

                {/* Comparison */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {/* Faktor Signifikan */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-card rounded-2xl p-8 shadow-soft border-l-4 border-gold"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-gold" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-navy">
                                Faktor Signifikan
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Accessibility className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-navy">Fasilitas Ramah Difabel</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Masjid Ideal: <strong className="text-gold">49.4%</strong> vs Lainnya: 23.8%
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Users className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-navy">Pengajian Ibu-ibu Aktif</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        <strong>Peluang 1.8x</strong> lebih tangguh. "Intelijen Sosial" yang lebih cair dan taktis di lapangan.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Check className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-navy">Keberadaan TPA</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Masjid Ideal: <strong className="text-gold">89.2%</strong> vs Lainnya: 79.5%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Faktor Tidak Signifikan */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-card rounded-2xl p-8 shadow-soft border-l-4 border-muted"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-muted-foreground">
                                Faktor TIDAK Signifikan
                            </h3>
                        </div>

                        <div className="space-y-4 text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <Wallet className="w-5 h-5 shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium">Kepemilikan QRIS</p>
                                    <p className="text-sm">Adopsi 14% tidak menjamin kesiapan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Wallet className="w-5 h-5 shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium">Saldo Kas Besar</p>
                                    <p className="text-sm mt-1">Masjid kaya tidak menjamin tanggap krisis</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-5 h-5 shrink-0 mt-1 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Good Governance Formal</p>
                                    <p className="text-sm mt-1">98% punya dokumen, tapi tidak berdampak</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Super Insight */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-navy rounded-2xl p-8 md:p-10 text-primary-foreground text-center">
                        <p className="text-gold font-medium text-sm uppercase tracking-wider mb-4">
                            💡 Super Insight
                        </p>
                        <p className="text-xl md:text-2xl font-display leading-relaxed">
                            Kunci dari masjid yang tangguh bukan pada <span className="text-gold">UANG</span> atau <span className="text-gold">USIA</span>,
                            melainkan pada <strong className="text-gold">INKLUSIVITAS FISIK</strong>.
                            Masjid yang peduli pada kaum rentan cenderung lebih siap menghadapi krisis apapun.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Finding3Section;
