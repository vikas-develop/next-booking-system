import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luxe Salon - Premium Hair & Beauty Services",
  description: "Book your appointment at Luxe Salon. Professional hair styling, treatments, and beauty services with expert stylists.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-purple-600">Luxe Salon</h1>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <a href="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="/services" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </a>
                  <a href="/booking" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Book Now
                  </a>
                  <a href="/staff" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Our Team
                  </a>
                  <a href="/demo" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Widget Demo
                  </a>
                  <a href="/admin" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Luxe Salon</h3>
                <p className="text-gray-300">Premium hair and beauty services with expert stylists in a luxurious environment.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-300">123 Beauty Street</p>
                <p className="text-gray-300">City, State 12345</p>
                <p className="text-gray-300">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Hours</h3>
                <p className="text-gray-300">Mon-Fri: 9:00 AM - 8:00 PM</p>
                <p className="text-gray-300">Sat: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-300">Sun: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
              <p>&copy; 2024 Luxe Salon. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
