"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MemoriamSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-navy-dark" ref={ref}>
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center text-primary-foreground">
                    {/* Decorative */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="mb-10"
                    >
                        <span className="text-gold text-6xl">✦</span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
                            In Memoriam
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                            K.H. Muhammad Jazir ASP
                        </h2>
                        <p className="text-primary-foreground/60 italic mb-10">
                            (1962 – 2024)
                        </p>
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative mb-10"
                    >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold/30 text-8xl font-display">"</span>
                        <p className="text-xl md:text-2xl italic leading-relaxed text-primary-foreground/90 relative z-10">
                            Jika masjid hanya diam saat umat lapar, sakit, dan kehilangan arah,
                            maka rubuhkanlah menaranya. Sebab masjid bukan tempat menumpuk uang,
                            melainkan <span className="text-gold">tempat memuliakan manusia</span>.
                        </p>
                    </motion.blockquote>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-6 text-primary-foreground/80"
                    >
                        <p>
                            Laporan ini kami persembahkan sebagai penghormatan kepada Almarhum Ust. H.M. Jazir ASP,
                            <strong className="text-primary-foreground"> Ketua Dewan Syura Masjid Jogokariyan</strong>,
                            Sang Begawan Manajemen Masjid Indonesia.
                        </p>

                        <p>
                            Melalui konsep <strong className="text-gold">"Saldo Nol"</strong>, beliau mengajarkan kepada kita bahwa
                            kemakmuran masjid tidak diukur dari berapa miliar uang yang tersimpan di bank,
                            melainkan dari seberapa cepat uang itu habis untuk melayani jemaah.
                        </p>

                        <p className="text-lg font-medium text-primary-foreground">
                            Selamat jalan, Ustadz. Visi Anda adalah peta jalan kami.
                        </p>
                    </motion.div>

                    {/* Decorative */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-10"
                    >
                        <div className="section-divider" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MemoriamSection;
