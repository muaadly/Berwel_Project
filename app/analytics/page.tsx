"use client";
import Navigation from "@/components/navigation";
import { fetchLibyanSongs, fetchSingers } from "@/lib/data"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"

export default function AnalyticsPage() {
  const { t } = useTranslations()
  const { language } = useLanguage()
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
    <main className="min-h-screen bg-background text-foreground pb-16">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="max-w-4xl mx-auto pt-16 pb-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-foreground">
          {language === 'ar' ? t('analyticsTitle') : 'Analytics'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border-2 border-border rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-primary">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('totalSongs') : 'Total Songs'}
            </h2>
            <p className="text-5xl font-bold text-foreground">{songCount !== null ? songCount : "-"}</p>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-primary">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('uniqueSingers') : 'Unique Singers'}
            </h2>
            <p className="text-5xl font-bold text-foreground">{singerCount !== null ? singerCount : "-"}</p>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-primary">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('maloofEntries') : 'Maloof Entries'}
            </h2>
            <p className="text-5xl font-bold text-foreground">{maloofEntryCount}</p>
          </div>
          <div className="bg-card border-2 border-border rounded-lg p-8 text-center shadow-lg transition-colors duration-200 group hover:border-primary">
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('fullyWrittenSongs') : 'Fully Written Songs'} 
              <span className="block text-base group-hover:text-primary transition-colors duration-200">(مكتوبة كاملة)</span>
            </h2>
            <p className="text-5xl font-bold text-foreground">{fullyWrittenCount !== null ? fullyWrittenCount : "-"}</p>
          </div>
          <Link 
            href="/library?tab=songs&songSearch=مطلع الأغنية/رأس البيت فقط" 
            className="bg-card border-2 border-primary rounded-lg p-8 text-center shadow-lg transition-all duration-200 group hover:border-primary/80 hover:bg-muted cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('songsWithOnlyBeginningWritten') : 'Songs with Only Beginning Written'} 
              <span className="block text-base group-hover:text-primary transition-colors duration-200">(مطلع الأغنية/رأس البيت فقط)</span>
            </h2>
            <p className="text-5xl font-bold text-foreground mb-4">{beginningOnlyCount !== null ? beginningOnlyCount : "-"}</p>
            <div className="flex items-center justify-center text-primary group-hover:text-primary/80 transition-colors duration-200">
              <span className="text-lg font-medium">
                {language === 'ar' ? t('viewAllSongsWithPartialLyrics') : 'View All Songs with Partial Lyrics'}
              </span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
          <Link 
            href="/library?tab=songs&songSearch=الكلمات غير موجودة" 
            className="bg-card border-2 border-primary rounded-lg p-8 text-center shadow-lg transition-all duration-200 group hover:border-primary/80 hover:bg-muted cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {language === 'ar' ? t('songsNotYetWritten') : 'Songs Not Yet Written'} 
              <span className="block text-base group-hover:text-primary transition-colors duration-200">(الكلمات غير موجودة)</span>
            </h2>
            <p className="text-5xl font-bold text-foreground mb-4">{notWrittenCount !== null ? notWrittenCount : "-"}</p>
            <div className="flex items-center justify-center text-primary group-hover:text-primary/80 transition-colors duration-200">
              <span className="text-lg font-medium">
                {language === 'ar' ? t('viewAllSongsWithoutLyrics') : 'View All Songs Without Lyrics'}
              </span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
        </div>
        <div className="text-center text-muted-foreground">
          <p>{language === 'ar' ? t('dataSource') : 'Data is sourced from the Libyan Songs and Maloof Entries collections.'}</p>
          <p className="mt-2">{language === 'ar' ? t('exploreLibrary') : 'Explore the library for more details and enjoy the music archive!'}</p>
        </div>
      </div>
      <Footer />
    </main>
  )
} 