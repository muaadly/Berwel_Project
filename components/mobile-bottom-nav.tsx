"use client"

import Link from "next/link"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"
import { Home, Library, BarChart3, Info, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const { t } = useTranslations()
  const { language } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: t('home'),
      icon: Home,
      key: 'home'
    },
    {
      href: "/library",
      label: t('library'),
      icon: Library,
      key: 'library'
    },
    {
      href: "/analytics",
      label: t('analytics'),
      icon: BarChart3,
      key: 'analytics'
    },
    {
      href: "/about",
      label: t('about'),
      icon: Info,
      key: 'about'
    },
    {
      href: "/contact",
      label: t('contact'),
      icon: MessageCircle,
      key: 'contact'
    }
  ]

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
