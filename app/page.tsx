"use client"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import SingersSection from "@/components/singers-section"
import MaloofSection from "@/components/maloof-section"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import { useState } from "react"
import { Search } from "lucide-react"

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Hero />
      {/* Search Our Library Section */}
      <section className="max-w-7xl mx-auto mt-8 mb-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Search Our Library</h2>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg shadow-lg flex flex-col items-start py-10 px-8">
          <button
            className="w-full flex items-center gap-4 bg-black border border-gray-700 rounded-lg px-6 py-4 text-2xl font-semibold text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-500 transition-colors group"
            onClick={() => setSearchOpen(true)}
            aria-label="Open global search"
            style={{ maxWidth: '100%' }}
          >
            <Search className="h-8 w-8 text-orange-500 group-hover:text-orange-600 transition-colors" />
            <span className="flex-1 text-left">Search Berwel...</span>
          </button>
        </div>
      </section>
      <SingersSection />
      <MaloofSection />
      {/* Berwel Soundcloud Playlist Section */}
      <section className="mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Berwel Soundcloud Playlist</h2>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg px-8 pt-6 pb-4 shadow-lg flex flex-col items-center">
            <a
              href="https://soundcloud.com/berwel-ly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors text-lg mt-2"
              style={{ textDecoration: 'none' }}
            >
              {/* SoundCloud SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
                <path d="M25.6 18.667c-0.267 0-0.533 0.027-0.8 0.08-0.267-2.987-2.88-5.28-5.92-5.28-0.507 0-1.013 0.067-1.493 0.2-0.267 0.067-0.427 0.32-0.36 0.587 0.053 0.227 0.253 0.373 0.48 0.373 0.04 0 0.08-0.013 0.12-0.027 0.387-0.107 0.787-0.16 1.187-0.16 2.56 0 4.693 2.027 4.893 4.587 0.027 0.32 0.293 0.56 0.613 0.56h1.28c0.36 0 0.653-0.293 0.653-0.653s-0.293-0.653-0.653-0.653zM8.267 17.333c-0.36 0-0.653 0.293-0.653 0.653v2.667c0 0.36 0.293 0.653 0.653 0.653s0.653-0.293 0.653-0.653v-2.667c0-0.36-0.293-0.653-0.653-0.653zM10.667 16.667c-0.36 0-0.653 0.293-0.653 0.653v3.333c0 0.36 0.293 0.653 0.653 0.653s0.653-0.293 0.653-0.653v-3.333c0-0.36-0.293-0.653-0.653-0.653zM13.067 16c-0.36 0-0.653 0.293-0.653 0.653v4c0 0.36 0.293 0.653 0.653 0.653s0.653-0.293 0.653-0.653v-4c0-0.36-0.293-0.653-0.653-0.653zM15.467 16c-0.36 0-0.653 0.293-0.653 0.653v4c0 0.36 0.293 0.653 0.653 0.653s0.653-0.293 0.653-0.653v-4c0-0.36-0.293-0.653-0.653-0.653zM27.2 19.2c-0.16 0-0.32 0.027-0.48 0.067-0.027-0.013-0.053-0.013-0.08-0.013h-1.28c-0.027 0-0.053 0-0.08 0.013-0.16-0.04-0.32-0.067-0.48-0.067-0.72 0-1.307 0.587-1.307 1.307s0.587 1.307 1.307 1.307h2.4c0.72 0 1.307-0.587 1.307-1.307s-0.587-1.307-1.307-1.307z"/>
              </svg>
              Listen on SoundCloud
            </a>
            <p className="mt-4 text-gray-400 text-center max-w-xl">Discover Berwel's curated Libyan music playlist and more on our official SoundCloud channel.</p>
          </div>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </div>
  )
}
