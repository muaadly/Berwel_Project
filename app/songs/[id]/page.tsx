'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SongDetail from "@/components/song-detail"
import { useState, use } from "react"

interface SongPageProps {
  params: Promise<{
    id: string
  }>
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <SongDetail songId={id} />
      <Footer />
    </div>
  )
}
