import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image src="/Data/Berwel Data Org/Logoo.png" alt="Berwel Logo" width={40} height={40} className="rounded mr-3" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving and celebrating Libya's rich musical heritage through an interactive digital platform that
              connects people with their cultural roots.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/contributions" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Contributions
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@berwel.ly</li>
              <li>Phone: +218 91 234 5678</li>
              <li>Tripoli, Libya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Berwel. All rights reserved. Preserving Libyan musical heritage.
          </p>
        </div>
      </div>
    </footer>
  )
}
