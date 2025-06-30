"use client";
import Navigation from "@/components/navigation";
import { fetchLibyanSongs, fetchSingers } from "@/lib/data"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"

export default function AnalyticsPage() {
  const [songCount, setSongCount] = useState<number | null>(null)
  const [singerCount, setSingerCount] = useState<number | null>(null)
  const [fullyWrittenCount, setFullyWrittenCount] = useState<number | null>(null)
  const [notWrittenCount, setNotWrittenCount] = useState<number | null>(null)
  const maloofEntryCount = 6

  useEffect(() => {
    fetchLibyanSongs().then(songs => {
      setSongCount(songs.length)
      setFullyWrittenCount(songs.filter(song => song.lyricsStatus.trim() === "مكتوبة كاملة").length)
      setNotWrittenCount(songs.filter(song => song.lyricsStatus.trim() === "الكلمات غير موجودة").length)
    })
    fetchSingers().then(singers => setSingerCount(singers.length))
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-16 pb-20">
        <h1 className="text-4xl font-bold mb-10 text-center">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-orange-500">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Total Songs</h2>
            <p className="text-5xl font-bold text-white">{songCount !== null ? songCount : "-"}</p>
          </div>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-orange-500">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Unique Singers</h2>
            <p className="text-5xl font-bold text-white">{singerCount !== null ? singerCount : "-"}</p>
          </div>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-orange-500">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Maloof Entries</h2>
            <p className="text-5xl font-bold text-white">{maloofEntryCount}</p>
          </div>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-orange-500">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Fully Written Songs <span className="block text-base group-hover:text-orange-400 transition-colors duration-200">(مكتوبة كاملة)</span></h2>
            <p className="text-5xl font-bold text-white">{fullyWrittenCount !== null ? fullyWrittenCount : "-"}</p>
          </div>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-orange-500 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Songs Not Yet Written <span className="block text-base group-hover:text-orange-400 transition-colors duration-200">(الكلمات غير موجودة)</span></h2>
            <p className="text-5xl font-bold text-white">{notWrittenCount !== null ? notWrittenCount : "-"}</p>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>Data is sourced from the Libyan Songs and Maloof Entries collections.</p>
          <p className="mt-2">Explore the library for more details and enjoy the music archive!</p>
        </div>
      </div>
      <Footer />
    </main>
  )
} 