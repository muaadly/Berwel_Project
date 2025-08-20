"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useTranslations } from "@/lib/translations"

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {mounted && (
                <Image 
                  src={resolvedTheme === "light" ? "/images/Light_Mode_Logo.jpeg" : "/images/Dark_Mode_Logo.png"} 
                  alt="Berwel Logo" 
                  width={40} 
                  height={40} 
                  className="rounded mr-3" 
                  priority
                />
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('library')}
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('analytics')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@berwel.ly</li>
              <li>Phone: +218 91 234 5678</li>
              <li>{t('address')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
