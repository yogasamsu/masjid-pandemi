"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const PartnersSection = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-12">
                        Terima Kasih Kepada Semua Mitra
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* IAEI Logo */}
                        <div className="flex flex-col items-center gap-3 group">
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <Image
                                    src="/assets/logo-iaei.png"
                                    alt="IAEI DIY"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="font-semibold text-sm text-navy/70 group-hover:text-navy transition-colors">
                                IAEI - DIY
                            </p>
                        </div>

                        {/* ICMI Logo Placeholder (since file is missing/placeholder) */}
                        {/* If user provides logo-icmi.png, uncomment Image block below */}
                        <div className="flex flex-col items-center gap-3 group">
                            {/* 
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <Image
                                    src="/assets/logo-icmi.png"
                                    alt="ICMI DIY"
                                    fill
                                    className="object-contain"
                                />
                            </div> 
                            */}
                            {/* Text Placeholder for now */}
                            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-gray-200 rounded-full text-navy font-bold text-xl border-2 border-dashed border-navy/30">
                                ICMI
                            </div>
                            <p className="font-semibold text-sm text-navy/70 group-hover:text-navy transition-colors">
                                ICMI DIY
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-sm text-muted-foreground">
                        <p>Ikatan Ahli Ekonomi Islam - DIY &bull; Ikatan Cendekiawan Muslim Indonesia DIY</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PartnersSection;
