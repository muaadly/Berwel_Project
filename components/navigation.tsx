"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { CommandDialog } from "@/components/ui/command"
import { Search, LogOut, User, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchLibyanSongs, fetchMaloofEntries, LibyanSong, MaloofEntry } from "@/lib/data"
import { useEffect } from "react"
import { useAuth } from "./auth-provider"
import { useLanguage } from "./language-provider"
import { useTranslations } from "@/lib/translations"
import { signIn, signOut } from "next-auth/react"

interface NavigationProps {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function Navigation({ searchOpen, setSearchOpen, searchValue, setSearchValue }: NavigationProps) {
  const { user, isLoading } = useAuth()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslations()
  const [mounted, setMounted] = useState(false)
  const [libyanSongs, setLibyanSongs] = useState<LibyanSong[]>([])
  const [maloofEntries, setMaloofEntries] = useState<MaloofEntry[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      fetchLibyanSongs().then(setLibyanSongs)
      fetchMaloofEntries().then(setMaloofEntries)
    }
  }, [searchOpen])

  // Filtered suggestions
  const filteredSongs = searchValue
    ? libyanSongs.filter((song: LibyanSong) =>
        song.songName.toLowerCase().includes(searchValue.toLowerCase()) ||
        song.singer.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5)
    : []
  const filteredMaloof = searchValue
    ? maloofEntries.filter((entry: MaloofEntry) =>
        entry.entryName.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5)
    : []

  const handleSignIn = () => {
    signIn('google')
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              {mounted && (
                <Image 
                  src={resolvedTheme === "light" ? "/images/Light_Mode_Logo.jpeg" : "/images/Dark_Mode_Logo.png"} 
                  alt="Berwel Logo" 
                  width={60} 
                  height={60} 
                  className="rounded" 
                  priority
                />
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="ml-2 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              {/* Show icon for the mode you can switch TO (sun in dark, moon in light) */}
              <Sun className="h-5 w-5 rotate-0 scale-0 transition-all dark:scale-100" />
              <Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="ml-2 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors px-3 py-2"
            >
              {language === "ar" ? "ENG" : "ARB"}
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('home')}
              </Link>
              <Link
                href="/library"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-primary"
              >
                {t('library')}
              </Link>
              <Link
                href="/analytics"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('analytics')}
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary hover:bg-transparent focus-visible:ring-0"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-6 w-6" />
            </Button>
          {/* Register Button or User Profile */}
          <div className="hidden md:block">
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                    <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-white hover:bg-gray-800 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
                >
                  {t('registerNow')}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Global Search Command Palette */}
      <CommandDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
      >
        {/* Suggestions for Libyan Songs */}
        {searchValue && (filteredSongs.length > 0 || filteredMaloof.length > 0) && (
          <>
            {filteredSongs.length > 0 && (
              <>
                <div className="text-muted-foreground text-xs font-semibold px-4 pt-4 pb-1">{t('libyanSongs')}</div>
                {filteredSongs.map((song: LibyanSong) => (
                  <a
                    key={song.id}
                    href={`/songs/${song.id}`}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors text-base"
                  >
                    {song.songName} <span className="text-muted-foreground">({song.singer})</span>
                  </a>
                ))}
              </>
            )}
            {filteredMaloof.length > 0 && (
              <>
                <div className="text-muted-foreground text-xs font-semibold px-4 pt-4 pb-1">{t('maloofEntries')}</div>
                {filteredMaloof.map((entry: MaloofEntry) => (
                  <a
                    key={entry.id}
                    href={`/maloof/${entry.id}`}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors text-base"
                  >
                    {entry.entryName}
                  </a>
                ))}
              </>
            )}
          </>
        )}
      </CommandDialog>

    </nav>
  )
}
