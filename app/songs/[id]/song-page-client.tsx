'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SongDetail from "@/components/song-detail"
import { useState } from "react"

interface SongPageClientProps {
  songId: string
}

export default function SongPageClient({ songId }: SongPageClientProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <SongDetail songId={songId} />
      <Footer />
    </div>
  )
}
