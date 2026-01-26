import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: '--font-source-sans' });

export const metadata: Metadata = {
  title: "Masjid Pandemic Report",
  description: "Revitalisasi Masjid sebagai Pilar Ketahanan Sosial-Ekonomi Pasca-Pandemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${sourceSans.variable} ${playfair.variable} font-body bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
