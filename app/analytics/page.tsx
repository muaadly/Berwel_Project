"use client";
import Navigation from "@/components/navigation";
import { fetchLibyanSongs, fetchSingers } from "@/lib/data"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AnalyticsPage() {
  const [songCount, setSongCount] = useState<number | null>(null)
  const [singerCount, setSingerCount] = useState<number | null>(null)
  const [fullyWrittenCount, setFullyWrittenCount] = useState<number | null>(null)
  const [notWrittenCount, setNotWrittenCount] = useState<number | null>(null)
  const [beginningOnlyCount, setBeginningOnlyCount] = useState<number | null>(null)
  const maloofEntryCount = 6
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    fetchLibyanSongs().then(songs => {
      setSongCount(songs.length)
      setFullyWrittenCount(songs.filter(song => song.lyricsStatus.trim() === "مكتوبة كاملة").length)
      setNotWrittenCount(songs.filter(song => song.lyricsStatus.trim() === "الكلمات غير موجودة").length)
      setBeginningOnlyCount(songs.filter(song => song.lyricsStatus.trim() === "مطلع الأغنية/رأس البيت فقط").length)
    })
    fetchSingers().then(singers => setSingerCount(singers.length))
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
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
          <Link 
            href="/library?tab=songs&songSearch=مطلع الأغنية/رأس البيت فقط" 
            className="bg-gray-900 border-2 border-orange-500 rounded-lg p-8 text-center shadow-lg transition-all duration-200 group hover:border-orange-400 hover:bg-gray-800 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Songs with Only Beginning Written <span className="block text-base group-hover:text-orange-400 transition-colors duration-200">(مطلع الأغنية/رأس البيت فقط)</span></h2>
            <p className="text-5xl font-bold text-white mb-4">{beginningOnlyCount !== null ? beginningOnlyCount : "-"}</p>
            <div className="flex items-center justify-center text-orange-400 group-hover:text-orange-300 transition-colors duration-200">
              <span className="text-lg font-medium">View All Songs with Partial Lyrics</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
          <Link 
            href="/library?tab=songs&songSearch=الكلمات غير موجودة" 
            className="bg-gray-900 border-2 border-orange-500 rounded-lg p-8 text-center shadow-lg transition-all duration-200 group hover:border-orange-400 hover:bg-gray-800 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-200">Songs Not Yet Written <span className="block text-base group-hover:text-orange-400 transition-colors duration-200">(الكلمات غير موجودة)</span></h2>
            <p className="text-5xl font-bold text-white mb-4">{notWrittenCount !== null ? notWrittenCount : "-"}</p>
            <div className="flex items-center justify-center text-orange-400 group-hover:text-orange-300 transition-colors duration-200">
              <span className="text-lg font-medium">View All Songs Without Lyrics</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
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