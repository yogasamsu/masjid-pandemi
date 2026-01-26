"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building, Users, GraduationCap, Target, ArrowRight } from 'lucide-react';

const recommendations = [
    {
        icon: Building,
        title: 'Reorientasi Investasi',
        subtitle: 'Beyond Physical Building',
        description: 'Hentikan obsesi pada kemegahan fisik semata. Dana umat harus direalokasi untuk infrastruktur inklusif (wajib akses difabel) dan penguatan kapasitas SDM.',
        action: 'Jadikan fasilitas ramah disabilitas sebagai syarat mutlak pencairan dana bantuan pemerintah.'
    },
    {
        icon: GraduationCap,
        title: 'Modernisasi Tata Kelola',
        subtitle: 'Professional Governance',
        description: 'Tinggalkan pola pengelolaan tradisional yang bergantung pada figur personal. Manajemen masjid harus berbasis sistem dan mengadopsi teknologi digital.',
        action: 'Geser kurikulum pelatihan takmir ke materi teknis manajemen krisis (SOP Dapur Umum, P3K, Mitigasi Bencana).'
    },
    {
        icon: Users,
        title: 'Formalisasi Peran Perempuan',
        subtitle: 'Social Capital',
        description: 'Berikan ruang struktural yang resmi bagi kelompok perempuan dalam kepengurusan takmir, khususnya dalam bidang sosial kemasyarakatan dan logistik.',
        action: 'Libatkan ibu-ibu pengajian dalam struktur pengambilan keputusan, bukan hanya sebagai seksi konsumsi.'
    },
    {
        icon: Target,
        title: 'Redefinisi "Masjid Makmur"',
        subtitle: 'New Standard',
        description: 'Sebuah masjid layak disebut "Makmur" jika ia memiliki SOP Mitigasi Bencana yang jelas dan berfungsi aktif sebagai lumbung pangan.',
        action: 'Setiap masjid wajib memiliki dokumen prosedur darurat yang ditempel di papan pengumuman.'
    },
];

const RecommendationSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-background" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
                        Rekomendasi Kebijakan
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-6 max-w-4xl mx-auto">
                        Membangun Arsitektur Ketahanan
                    </h2>
                    <div className="section-divider mb-8" />
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Berdasarkan temuan di atas, laporan ini merekomendasikan perubahan
                        arah kebijakan pengelolaan masjid di Indonesia.
                    </p>
                </motion.div>

                {/* Recommendations Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {recommendations.map((rec, index) => (
                        <motion.div
                            key={rec.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="insight-card group"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                                    <rec.icon className="w-7 h-7 text-gold" />
                                </div>
                                <div>
                                    <p className="text-gold text-xs font-medium uppercase tracking-wider mb-1">
                                        {rec.subtitle}
                                    </p>
                                    <h3 className="font-display text-xl font-bold text-navy mb-3">
                                        {rec.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {rec.description}
                                    </p>
                                    <div className="flex items-start gap-2 p-4 bg-cream rounded-lg">
                                        <ArrowRight className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium text-navy">
                                            {rec.action}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-20 max-w-4xl mx-auto text-center"
                >
                    <div className="bg-navy rounded-3xl p-10 md:p-14 text-primary-foreground">
                        <p className="font-display text-2xl md:text-3xl leading-relaxed italic">
                            "Masjid yang megah bukan yang kubahnya paling tinggi menjulang ke langit,
                            melainkan yang <span className="text-gold">akarnya paling kuat mencengkeram bumi</span>—
                            merangkul kaum difabel, melindungi warga rentan, dan berdiri paling depan saat bencana datang."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default RecommendationSection;
