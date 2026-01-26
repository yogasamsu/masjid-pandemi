
export default function Statistics() {
    const stats = [
        {
            value: "98%",
            label: "Punya Dokumen Keuangan",
            desc: "Administrasi dasar adalah higenis, bukan pembeda.",
            color: "text-blue-500"
        },
        {
            value: "2.7x",
            label: "Peluang Masjid Ideal",
            desc: "Masjid ramah difabel punya peluang lebih besar jadi tanggap bencana.",
            color: "text-secondary"
        },
        {
            value: "P < 0.001",
            label: "Signifikansi Inklusivitas",
            desc: "Faktor terkuat pendorong kesuksesan masjid.",
            color: "text-primary"
        },
        {
            value: "0.06",
            label: "Signifikansi Pengajian Ibu-ibu",
            desc: "Aktivitas ibu-ibu membuat masjid lebih responsif.",
            color: "text-pink-500"
        }
    ];

    return (
        <section id="findings" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Key Findings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gray-50 hover:shadow-xl transition-shadow border border-gray-100">
                            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                            <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
                            <p className="text-gray-600 text-sm">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
