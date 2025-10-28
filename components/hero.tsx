"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useTranslations } from "@/lib/translations"

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [logoAnimated, setLogoAnimated] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    setMounted(true)
    // Trigger logo animation after a short delay
    const timer = setTimeout(() => {
      setLogoAnimated(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 relative">
          {mounted && (
            <div className="relative inline-block">
              <Image 
                src={resolvedTheme === "light" ? "/images/Light_Mode_Logo.jpeg" : "/images/Dark_Mode_Logo.png"} 
                alt="Berwel Logo" 
                width={300} 
                height={300} 
                className={`mx-auto rounded-lg transition-all duration-1000 ease-out ${
                  logoAnimated 
                    ? 'animate-logo-flip' 
                    : 'opacity-0 scale-95 rotate-12'
                }`}
                priority
              />
              {/* Shine effect overlay */}
              <div 
                className={`absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ease-out ${
                  logoAnimated 
                    ? 'animate-logo-shine' 
                    : 'opacity-0 translate-x-[-100%]'
                }`}
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                }}
              />
            </div>
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
