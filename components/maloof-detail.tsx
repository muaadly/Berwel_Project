"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Share2, ChevronRight, Clock } from "lucide-react"
import { fetchMaloofEntryById, getEntryTypeImagePath, getNoteImagePath, MaloofEntry, fetchMaloofEntries } from "@/lib/data"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import React from "react"
import { useRouter } from "next/navigation"
import { Facebook, Instagram, Link as LinkIcon, MessageCircle, MessageSquare, Share2 as ShareIcon, BookOpen } from "lucide-react"

interface MaloofDetailProps {
  entryId: string
}

const entryImages = [
  "SKA.png",
  "ISB.png",
  "HSN.png",
  "MHR.png",
  "RSD.png",
  "NWA.png",
]

const entryTypeMap: Record<string, string> = {
  "HSN.png": "الحسين",
  "ISB.png": "الإصبعين",
  "MHR.png": "المحير",
  "NWA.png": "النوى",
  "RSD.png": "الرصد",
  "SKA.png": "السيكه",
}

export default function MaloofDetail({ entryId }: MaloofDetailProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(3)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<string[]>([])
  const [entry, setEntry] = useState<MaloofEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [allEntries, setAllEntries] = useState<MaloofEntry[]>([])

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const entryData = await fetchMaloofEntryById(entryId)
        setEntry(entryData)
      } catch (error) {
        console.error('Error loading maloof entry:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEntry()
    fetchMaloofEntries().then(setAllEntries)
  }, [entryId])

  useEffect(() => {
    if (entry?.typeEntryImage) {
      const raw = entry.typeEntryImage;
      const trimmed = entry.typeEntryImage.trim();
      console.log('[MaloofDetail] Entry Type Image - Raw:', raw, '| Trimmed:', trimmed);
    }
  }, [entry?.typeEntryImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading entry...</h1>
        </div>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Maloof entry not found</h1>
          <Link href="/library" className="text-orange-500 hover:text-orange-400">
            Back to Library
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: entry.entryName,
        text: `Explore ${entry.entryName} - ${entry.entryType}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment("")
    }
  }

  // Section 1: Entries from the same type (excluding current entry)
  const sameTypeEntries = allEntries.filter(e => e.entryType === entry?.entryType && e.id !== entry?.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/library" className="hover:text-orange-500 transition-colors">
            Library
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/library" className="hover:text-orange-500 transition-colors">
            Maloof Entries
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{entry.entryName}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Entry Type Image */}
          <div className="lg:col-span-1">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <img
                src={getEntryTypeImagePath(entry.typeEntryImage)}
                alt={entry.entryName}
                className="w-full h-96 object-cover select-none pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/placeholder.svg'
                }}
                onContextMenu={e => e.preventDefault()}
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Entry Name */}
            <div className="bg-black border border-gray-700 p-6 rounded-lg">
              <h1 className="text-3xl font-bold text-white text-center">{entry.entryName}</h1>
            </div>

            {/* Entry Lyrics */}
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              {/* Stretched Lyrics Tab */}
              <div className="w-full bg-black border border-gray-700 rounded-t-lg">
                <h2 className="text-white font-bold text-center py-3">Entry Lyrics</h2>
              </div>

              <div className="p-6">
                <div className="bg-gray-900 rounded-lg p-6 max-h-64 overflow-y-auto">
                  <pre className="text-white text-lg leading-relaxed whitespace-pre-wrap font-arabic select-none" style={{ userSelect: 'none' }} onCopy={e => e.preventDefault()} onContextMenu={e => e.preventDefault()}>
                    {entry.entryLyrics}
                  </pre>
                </div>

                {/* Centered Like and Share Buttons */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                        <Heart className="h-4 w-4 mr-2" />
                        Like
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-none rounded-xl p-10 max-w-xs text-center">
                      <DialogTitle className="sr-only">Coming Soon!</DialogTitle>
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                          <Clock className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
                        <p className="text-gray-300 mb-6">This feature will be live soon</p>
                        <DialogClose asChild>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md text-lg">Got it</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* Share Button and Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center gap-2">
                        <ShareIcon className="h-4 w-4" /> Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-full bg-gray-900 border-none rounded-2xl p-8">
                      <DialogTitle className="text-2xl font-bold text-white mb-4">Share this entry</DialogTitle>
                      <div className="flex flex-col items-center">
                        <img
                          src={getEntryTypeImagePath(entry.typeEntryImage)}
                          alt={entry.entryName}
                          className="w-24 h-24 object-cover rounded-lg mb-4 select-none pointer-events-none"
                          onContextMenu={e => e.preventDefault()}
                          draggable={false}
                        />
                        <div className="text-xl font-bold text-white mb-1">{entry.entryName}</div>
                        <div className="text-md text-orange-500 mb-6">{entry.entryType}</div>
                        <div className="flex flex-wrap gap-3 justify-center mb-2">
                          {/* Copy Link */}
                          <Button
                            variant="outline"
                            className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center gap-2"
                            onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                          >
                            <LinkIcon className="h-5 w-5" />
                            <span className="hidden sm:inline">Copy Link</span>
                          </Button>
                          {/* Facebook */}
                          <Button
                            variant="outline"
                            className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2"
                            asChild
                          >
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                              <Facebook className="h-5 w-5" />
                              <span className="hidden sm:inline">Facebook</span>
                            </a>
                          </Button>
                          {/* WhatsApp */}
                          <Button
                            variant="outline"
                            className="rounded-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex items-center gap-2"
                            asChild
                          >
                            <a href={`https://wa.me/?text=${encodeURIComponent(entry.entryName + ' - ' + window.location.href)}`} target="_blank" rel="noopener noreferrer">
                              <MessageSquare className="h-5 w-5" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                          </Button>
                          {/* Instagram (just open Instagram for now) */}
                          <Button
                            variant="outline"
                            className="rounded-full border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white flex items-center gap-2"
                            asChild
                          >
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                              <Instagram className="h-5 w-5" />
                              <span className="hidden sm:inline">Instagram</span>
                            </a>
                          </Button>
                          {/* SMS */}
                          <Button
                            variant="outline"
                            className="rounded-full border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white flex items-center gap-2"
                            asChild
                          >
                            <a href={`sms:?body=${encodeURIComponent(entry.entryName + ' - ' + window.location.href)}`}>
                              <MessageCircle className="h-5 w-5" />
                              <span className="hidden sm:inline">SMS</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Button variant="ghost" className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  {/* Add Lyrics Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Add Lyrics
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-none rounded-xl p-10 max-w-xs text-center">
                      <DialogTitle className="sr-only">Coming Soon!</DialogTitle>
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                          <Clock className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
                        <p className="text-gray-300 mb-6">This feature will be live soon</p>
                        <DialogClose asChild>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md text-lg">Got it</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Details (Full Width) */}
        <div className="mt-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Entry Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Entry Type</h3>
                <p className="text-white">{entry.entryType}</p>
              </div>
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Entry Rhythm</h3>
                <p className="text-white">{entry.entryRhythm}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Entry Number</h3>
                <p className="text-white">{entry.entryNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Note Image Section */}
        {entry.noteImageName && (
          <div className="mt-8">
            <div className="bg-black border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Musical Notes</h2>
              <div className="flex justify-center">
                <img
                  src={getNoteImagePath(entry.noteImageName)}
                  alt="Musical Notes"
                  className="max-w-full h-auto max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.svg'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Comments</h2>
            
            {/* Comment Input */}
            <div className="mb-4">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                rows={3}
              />
              <Button
                asChild
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                      Post Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-none rounded-xl p-10 max-w-xs text-center">
                    <DialogTitle className="sr-only">Coming Soon!</DialogTitle>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                        <Clock className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
                      <p className="text-gray-300 mb-6">This feature will be live soon</p>
                      <DialogClose asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md text-lg">Got it</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4">
                  <p className="text-white">{comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Entries from the Same Type */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Entries from the Same Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sameTypeEntries.length === 0 ? (
              <div className="text-gray-400 col-span-full">No other entries from the same type.</div>
            ) : (
              sameTypeEntries.map(e => (
                <Link key={e.id} href={`/maloof/${e.id}`} className="block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={getEntryTypeImagePath(e.typeEntryImage)}
                      alt={e.entryName}
                      className="w-24 h-24 object-cover rounded mb-4 bg-gray-800"
                      onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder.svg' }}
                    />
                    <div className="text-white font-bold text-lg text-center mb-1 group-hover:text-orange-500 transition-colors">{e.entryName}</div>
                    <div className="text-gray-400 text-sm text-center">{e.entryType}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Section 2: All Entries */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">All Entries</h2>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg px-8 pt-8 pb-4 shadow-lg transition-colors duration-200 flex items-center gap-8 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex w-max space-x-6 pb-4">
              {entryImages.map((img, idx) => {
                const entryType = entryTypeMap[img] || "";
                return (
                  <Link
                    key={img}
                    href={{ pathname: "/library", query: { entryType, tab: "maloof" } }}
                    className="flex-shrink-0 group cursor-pointer"
                    prefetch={false}
                  >
                    <div className="w-48 h-48 rounded-lg overflow-hidden mb-3 transition-transform group-hover:scale-105">
                      <img
                        src={`/Data/Berwel Data Org/R_Images/Entry_Images/${img}`}
                        alt={`Maloof Entry ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
