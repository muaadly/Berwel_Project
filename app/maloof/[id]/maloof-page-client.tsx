'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MaloofDetail from "@/components/maloof-detail"
import { useState } from "react"

interface MaloofPageClientProps {
  entryId: string
}

export default function MaloofPageClient({ entryId }: MaloofPageClientProps) {
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
      <MaloofDetail entryId={entryId} />
      <Footer />
    </div>
  )
}
