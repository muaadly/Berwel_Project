"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Navigation() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/Data/Berwel Data Org/Logoo.png" alt="Berwel Logo" width={60} height={60} className="rounded" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/library"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-orange-500"
              >
                Library
              </Link>
              <Link
                href="/analytics"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => setShowRegisterModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" className="text-white hover:text-orange-500" size="sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Coming Soon!</h3>
                <p className="text-gray-300">This feature will be live soon</p>
              </div>
              <Button
                onClick={() => setShowRegisterModal(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
