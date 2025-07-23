'use client';

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MaloofDetail from "@/components/maloof-detail"
import { useState, use } from "react"

interface MaloofPageProps {
  params: Promise<{
    id: string
  }>
}

export default function MaloofPage({ params }: MaloofPageProps) {
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
      <MaloofDetail entryId={id} />
      <Footer />
    </div>
  )
}
