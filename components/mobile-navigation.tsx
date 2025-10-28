"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "./language-provider"
import { useAuth } from "./auth-provider"
import { Home, Library, BarChart3, Info, Mail, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslations()
  const { language } = useLanguage()
  const { user, isLoading, signIn, signOut } = useAuth()

  const handleSignIn = () => {
    signIn('google')
    closeMenu()
  }

  const handleSignOut = () => {
    signOut()
    closeMenu()
  }

  const navigationItems = [
    { href: "/", icon: Home, label: t('home') },
    { href: "/library", icon: Library, label: t('library') },
    { href: "/analytics", icon: BarChart3, label: t('analytics') },
    { href: "/about", icon: Info, label: t('about') },
    { href: "/contact", icon: Mail, label: t('contact') },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg z-50 md:hidden hover:bg-primary/90 transition-colors"
        aria-label={t('menu')}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Slide-up Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMenu}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-xl transform transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="p-6">
            {/* Header */}
            <div className={`flex justify-between items-center mb-6 ${
              language === 'ar' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <h2 className={`text-xl font-bold ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t('menu')}</h2>
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-4">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center p-3 rounded-lg hover:bg-muted transition-colors ${
                      language === 'ar' ? 'flex-row-reverse justify-center space-x-6' : 'flex-row space-x-4'
                    }`}
                  >
                    {language === 'ar' ? (
                      <>
                        <span className="text-lg font-medium text-right">{item.label}</span>
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </>
                    ) : (
                      <>
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg font-medium text-left">{item.label}</span>
                      </>
                    )}
                  </Link>
                )
              })}
              
              {/* Authentication Section */}
              {!isLoading && (
                user ? (
                  // User is logged in - Show profile picture with dropdown
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto">
                          <Image
                            src={user.image || "/placeholder-user.jpg"}
                            alt={user.name || "User"}
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer hover:opacity-80 transition-opacity border-2 border-border"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-48 bg-card border-border">
                        <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          {user.name}
                        </DropdownMenuItem>
                        <Link href="/profile" onClick={closeMenu}>
                          <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                          onClick={handleSignOut}
                          className="text-white hover:bg-gray-800 cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t('signOut')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  // User is not logged in - Show Register button
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSignIn}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md transition-colors w-full max-w-xs"
                    >
                      {language === 'ar' ? 'سجل الآن' : 'Register'}
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
