'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LibraryContent from "@/components/library-content"
import { Suspense, useState } from "react"

export default function LibraryPage() {
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
      <Suspense fallback={<div>Loading...</div>}>
        <LibraryContent />
      </Suspense>
      <Footer />
    </div>
  )
}
