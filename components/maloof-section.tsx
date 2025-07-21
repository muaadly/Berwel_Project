"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { fetchMaloofEntries, getEntryTypeImagePath, MaloofEntry } from "@/lib/data"
import Link from "next/link"

const entryImages = [
  "SKA.png",
  "ISB.png",
  "HSN.png",
  "MHR.png",
  "RSD.png",
  "NWA.png",
]

// Mapping from image filename to corrected Arabic entryType
const entryTypeMap: Record<string, string> = {
  "HSN.png": "الحسين",
  "ISB.png": "الإصبعين",
  "MHR.png": "المحير",
  "NWA.png": "النوى",
  "RSD.png": "الرصد",
  "SKA.png": "السيكه",
}

export default function MaloofSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Maloof Entries</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-600 text-white bg-transparent border-2"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4 text-orange-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-600 text-white bg-transparent border-2"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4 text-orange-500" />
            </Button>
          </div>
        </div>

        <div ref={scrollRef} className="bg-gray-900 border-2 border-gray-700 rounded-lg px-8 pt-8 pb-4 shadow-lg transition-colors duration-200 flex items-center gap-8 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex w-max space-x-6 pb-4">
            {entryImages.map((img, idx) => {
              const entryType = entryTypeMap[img] || "";
              return (
                <Link
                  key={img}
                  href={{ pathname: "/library", query: { entryType, tab: "maloof" } }}
                  className="flex-shrink-0 group cursor-pointer"
                  prefetch={false}
                >
                  <div className="w-48 h-48 rounded-lg overflow-hidden mb-3 transition-transform group-hover:scale-105">
                    <img
                      src={`/Data/Berwel Data Org/R_Images/Entry_Images/${img}`}
                      alt={`Maloof Entry ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
