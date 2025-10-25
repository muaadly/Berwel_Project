"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { fetchMaloofEntries, getEntryTypeImagePath, MaloofEntry } from "@/lib/data"
import Link from "next/link"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"

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
  const { t } = useTranslations()
  const { language } = useLanguage()
  
  console.log('MaloofSection - Language:', language)
  console.log('MaloofSection - Entry images:', entryImages)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      // For Arabic, ensure we're always scrolling in the correct direction
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
      scrollRef.current.scrollTo({
        left: Math.max(0, newScrollLeft),
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className={`bg-background py-16 px-4 ${language === 'ar' ? 'maloof-section' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {language === 'ar' ? (
            <>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Button>
              </div>
              <h2 className="text-3xl font-bold text-foreground text-right">{t('maloofEntries')}</h2>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-foreground text-left">{t('maloofEntries')}</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </>
          )}
        </div>

        <div ref={scrollRef} className="bg-card border-2 border-border rounded-lg px-8 pt-8 pb-4 shadow-lg transition-colors duration-200 flex items-center gap-8 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                      src={`/images/maloof/${img}`}
                      alt={`Maloof Entry ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.log('Maloof image failed to load:', `/images/maloof/${img}`)
                        ;(e.target as HTMLImageElement).src = '/placeholder.jpg'
                      }}
                      onLoad={() => {
                        console.log('Maloof image loaded successfully:', `/images/maloof/${img}`)
                      }}
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
