"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useTranslations } from "@/lib/translations"

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          {mounted && (
            <Image 
              src={resolvedTheme === "light" ? "/images/Light_Mode_Logo.jpeg" : "/images/Dark_Mode_Logo.png"} 
              alt="Berwel Logo" 
              width={300} 
              height={300} 
              className="mx-auto rounded-lg" 
              priority
            />
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">{t('heroTitle')}</h1>

          <div className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-4">
            <p>{t('heroSubtitle')}</p>
            <p>{t('heroDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
