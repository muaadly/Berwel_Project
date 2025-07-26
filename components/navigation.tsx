"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog"
import { CommandDialog } from "@/components/ui/command"
import { Search, LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchLibyanSongs, fetchMaloofEntries, LibyanSong, MaloofEntry } from "@/lib/data"
import { useEffect } from "react"
import { useAuth } from "./auth-provider"
import { signIn, signOut } from "next-auth/react"

interface NavigationProps {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function Navigation({ searchOpen, setSearchOpen, searchValue, setSearchValue }: NavigationProps) {
  const { user, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [libyanSongs, setLibyanSongs] = useState<LibyanSong[]>([])
  const [maloofEntries, setMaloofEntries] = useState<MaloofEntry[]>([])

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
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/Data/Berwel Data Org/Logoo.png" alt="Berwel Logo" width={60} height={60} className="rounded" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/library"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-orange-500"
              >
                Library
              </Link>
              <Link
                href="/analytics"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-orange-500"
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
                  <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                    <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-white hover:bg-gray-800 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
                >
                  Register Now
                </Button>
              )
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
              <Button
                variant="ghost"
                className="text-white hover:text-orange-500"
                size="sm"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
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
                <div className="text-gray-400 text-xs font-semibold px-4 pt-4 pb-1">Libyan Songs</div>
                {filteredSongs.map((song: LibyanSong) => (
                  <a
                    key={song.id}
                    href={`/songs/${song.id}`}
                    className="block px-4 py-2 text-white hover:text-orange-500 hover:bg-gray-800 transition-colors text-base"
                  >
                    {song.songName} <span className="text-gray-400">({song.singer})</span>
                  </a>
                ))}
              </>
            )}
            {filteredMaloof.length > 0 && (
              <>
                <div className="text-gray-400 text-xs font-semibold px-4 pt-4 pb-1">Maloof Entries</div>
                {filteredMaloof.map((entry: MaloofEntry) => (
                  <a
                    key={entry.id}
                    href={`/maloof/${entry.id}`}
                    className="block px-4 py-2 text-white hover:text-orange-500 hover:bg-gray-800 transition-colors text-base"
                  >
                    {entry.entryName}
                  </a>
                ))}
              </>
            )}
          </>
        )}
      </CommandDialog>

      {/* Mobile Drawer Menu */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerContent className="bg-black border-none text-white">
          <DialogTitle className="sr-only">Mobile Navigation Menu</DialogTitle>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">Menu</span>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </DrawerClose>
            </div>
            <Link href="/" className="text-white hover:text-orange-500 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/library" className="text-white hover:text-orange-500 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Library
            </Link>
            <Link href="/analytics" className="text-white hover:text-orange-500 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Analytics
            </Link>
            <Link href="/about" className="text-white hover:text-orange-500 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-orange-500 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            {!isLoading && (
              user ? (
                <div className="flex items-center gap-2 mt-4">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-white">{user.name}</span>
                  <Button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors mt-4"
                  onClick={() => {
                    handleSignIn()
                    setMobileMenuOpen(false)
                  }}
                >
                  Register Now
                </Button>
              )
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
