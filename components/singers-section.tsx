"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { fetchSingers, getSingerImagePath } from "@/lib/data"
import Link from "next/link"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"

export default function SingersSection() {
  const [singers, setSingers] = useState<{ name: string, imageName: string }[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslations()
  const { language } = useLanguage()

  useEffect(() => {
    fetchSingers().then(singers => {
      console.log('Fetched singers:', singers)
      setSingers(singers)
    })
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    console.log('Scroll function called with direction:', direction)
    console.log('scrollRef.current:', scrollRef.current)
    
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollAmount = 300 // Fixed scroll amount instead of percentage
      const currentScroll = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      
      let newScroll
      if (direction === 'left') {
        newScroll = Math.max(0, currentScroll - scrollAmount)
      } else {
        newScroll = Math.min(maxScroll, currentScroll + scrollAmount)
      }
      
      console.log(`Scrolling ${direction}: current=${currentScroll}, new=${newScroll}, max=${maxScroll}`)
      console.log('Container dimensions:', {
        clientWidth: container.clientWidth,
        scrollWidth: container.scrollWidth,
        scrollLeft: container.scrollLeft
      })
      
      // Try multiple scroll methods
      try {
        container.scrollTo({ left: newScroll, behavior: 'smooth' })
      } catch (e) {
        console.log('scrollTo failed, trying scrollLeft:', e)
        container.scrollLeft = newScroll
      }
    } else {
      console.error('scrollRef.current is null - cannot scroll')
    }
  }

  return (
    <section className={`bg-background py-16 px-4 ${language === 'ar' ? 'singers-section force-ltr' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title and Navigation - Moved to Top */}
        <div className="flex items-center justify-between mb-8">
          {language === 'ar' ? (
            <>
              <h2 className="text-3xl font-bold text-foreground text-right">{t('singers')}</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-foreground text-left">{t('singers')}</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Singers Carousel */}
        <div className="bg-card border-2 border-border rounded-lg px-8 pt-8 pb-4 shadow-lg transition-colors duration-200 overflow-x-auto scrollbar-hide" ref={scrollRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex w-max space-x-6 pb-4">
            {singers.map((singer, idx) => (
              <Link
                key={singer.name + idx}
                href={{ pathname: "/library", query: { singer: singer.name } }}
                className="flex-shrink-0 text-center group cursor-pointer"
                prefetch={false}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-3 transition-transform group-hover:scale-105">
                  <img
                    src={getSingerImagePath(singer.imageName) || "/placeholder-user.jpg"}
                    alt={singer.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      console.log('Singer image failed to load:', getSingerImagePath(singer.imageName))
                      ;(e.target as HTMLImageElement).src = '/placeholder-user.jpg'
                    }}
                    onLoad={() => {
                      console.log('Singer image loaded successfully:', getSingerImagePath(singer.imageName))
                    }}
                  />
                </div>
                <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors text-center">
                  {singer.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
