"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { fetchSingers, getSingerImagePath } from "@/lib/data"
import Link from "next/link"

export default function SingersSection() {
  const [singers, setSingers] = useState<{ name: string, imageName: string }[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchSingers().then(setSingers)
  }, [])

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
          <h2 className="text-3xl font-bold text-white">Singers</h2>
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

        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg px-8 pt-8 pb-4 shadow-lg transition-colors duration-200 flex items-center gap-8 overflow-x-auto scrollbar-hide" ref={scrollRef} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                  />
                </div>
                <p className="text-white text-sm font-medium group-hover:text-orange-500 transition-colors">
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
