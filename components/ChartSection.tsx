
import Image from 'next/image';

export default function ChartSection() {
    const charts = [
        { src: "/assets/chart_governance.png", title: "Governance Score" },
        { src: "/assets/chart_inclusivity.png", title: "Inclusivity Score" },
        { src: "/assets/chart_qris_adoption.png", title: "QRIS Adoption" },
        { src: "/assets/chart_qris_by_region.png", title: "QRIS by Region" },
    ];

    return (
        <section id="charts" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Visualisasi Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {charts.map((chart, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">{chart.title}</h3>
                            <div className="relative w-full h-64 md:h-80">
                                <Image
                                    src={chart.src}
                                    alt={chart.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
