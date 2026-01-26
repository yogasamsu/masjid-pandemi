
interface ContentBlockProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    bgColor?: string;
}

export default function ContentBlock({ title, subtitle, children, className = "", bgColor = "bg-white" }: ContentBlockProps) {
    return (
        <section className={`py-32 ${bgColor} ${className}`}>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-16 text-center">
                    {subtitle && (
                        <span className="block text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
                </div>
                <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-8 font-sans font-light">
                    {children}
                </div>
            </div>
        </section>
    );
}
