
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <p className="mb-4 text-xl font-bold">Pusat Kajian Ekonomika dan Bisnis Syariah</p>
                <p className="text-gray-400">Fakultas Ekonomika dan Bisnis, Universitas Gadjah Mada</p>
                <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
                    © {new Date().getFullYear()} Masjid Pandemic Report. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
