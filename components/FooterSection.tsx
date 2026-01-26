"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const FooterSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <footer className="bg-navy-dark py-16" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center text-primary-foreground"
                >
                    {/* Logos */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6">
                        <div className="h-14 md:h-16 w-auto relative">
                            <Image
                                src="/assets/logo-pkebs-white.png"
                                alt="Pusat Kajian Ekonomika dan Bisnis Syariah"
                                width={200}
                                height={64}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <div className="hidden md:block w-px h-10 bg-primary-foreground/30" />
                        <div className="h-6 md:h-8 w-auto relative">
                            <Image
                                src="/assets/logo-sanggabiz.png"
                                alt="Sanggabiz"
                                width={100}
                                height={32}
                                className="h-full w-auto object-contain filter brightness-0 invert"
                            />
                        </div>
                    </div>

                    {/* Institution */}
                    <p className="font-display text-xl mb-2">
                        Pusat Kajian Ekonomika dan Bisnis Syariah
                    </p>
                    <p className="text-primary-foreground/60 mb-8">
                        Fakultas Ekonomika dan Bisnis, Universitas Gadjah Mada
                    </p>

                    {/* Report Info */}
                    <div className="mb-8">
                        <p className="text-sm text-primary-foreground/60 mb-2">
                            Laporan Hasil Survei Kondisi Masjid Menghadapi Pandemi COVID-19
                        </p>
                        <p className="text-sm text-primary-foreground/60">
                            di Provinsi Daerah Istimewa Yogyakarta
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="section-divider mb-8" />

                    {/* Credits */}
                    <div className="text-sm text-primary-foreground/50 space-y-2">
                        <p>
                            Data: 473 Masjid • 564 Takmir • Survei Feb–Jul 2023
                        </p>
                        <p>
                            © 2024 FEB UGM. Semua Hak Dilindungi.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default FooterSection;
