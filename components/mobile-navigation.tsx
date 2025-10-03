"use client"

import Link from "next/link"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "./language-provider"
import { useAuth } from "./auth-provider"
import { Home, Library, BarChart3, Info, Mail, User } from "lucide-react"

export default function MobileNavigation() {
  const { t } = useTranslations()
  const { language } = useLanguage()
  const { user } = useAuth()

  const navigationItems = [
    { href: "/", icon: Home, label: t('home') },
    { href: "/library", icon: Library, label: t('library') },
    { href: "/analytics", icon: BarChart3, label: t('analytics') },
    { href: "/about", icon: Info, label: t('about') },
    { href: "/contact", icon: Mail, label: t('contact') },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-colors ${
                language === 'ar' ? 'text-right' : 'text-left'
              }`}
            >
              <Icon className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground text-center leading-tight">
                {item.label}
              </span>
            </Link>
          )
        })}
        {user && (
          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-colors ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            <User className="h-5 w-5 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground text-center leading-tight">
              {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
