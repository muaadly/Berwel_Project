"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Share2, ExternalLink, ChevronRight, Clock, BookOpen } from "lucide-react"
import { fetchLibyanSongById, getSingerImagePath, LibyanSong, fetchLibyanSongs } from "@/lib/data"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Facebook, Instagram, Link as LinkIcon, MessageCircle, MessageSquare } from "lucide-react"

interface SongDetailProps {
  songId: string
}

export default function SongDetail({ songId }: SongDetailProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(2)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<string[]>([])
  const [song, setSong] = useState<LibyanSong | null>(null)
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState<LibyanSong[]>([])

  useEffect(() => {
    const loadSong = async () => {
      try {
        const songData = await fetchLibyanSongById(songId)
        setSong(songData)
      } catch (error) {
        console.error('Error loading song:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSong()
    fetchLibyanSongs().then(setAllSongs)
  }, [songId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading song...</h1>
        </div>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Song not found</h1>
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
        title: song.songName,
        text: `Listen to ${song.songName} by ${song.singer}`,
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

  // Section 1: Other Songs (any, excluding current)
  const otherSongs = allSongs.filter(s => String(s.id) !== String(songId)).slice(0, 4)

  // Section 2: Other Singers (unique singers, excluding current song's singer)
  const otherSingers = Array.from(
    allSongs
      .filter(s => s.singer !== song?.singer)
      .reduce((map, s) => map.has(s.singer) ? map : map.set(s.singer, s), new Map())
      .values()
  ).slice(0, 4)

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
            Libyan Songs
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{song.songName}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Singer Image */}
          <div className="lg:col-span-1">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <img
                src={getSingerImagePath(song.imageName)}
                alt={song.singer}
                className="w-full h-96 object-cover select-none pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/placeholder-user.jpg'
                }}
                onContextMenu={e => e.preventDefault()}
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Song Name with Orange Border */}
            <div className="bg-black border border-gray-700 p-6 rounded-lg mb-4">
              <h1 className="text-3xl font-bold text-white text-center">{song.songName}</h1>
            </div>

            {/* SoundCloud Button at the top */}
            {song.soundcloudLink && (
              <div className="mb-4 flex justify-center">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  <a href={song.soundcloudLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Listen on SoundCloud
                  </a>
                </Button>
              </div>
            )}

            {/* Lyrics Box */}
            <div className="bg-black border border-gray-700 rounded-lg overflow-hidden">
              {/* Stretched Lyrics Tab */}
              <div className="w-full bg-black border border-gray-700 rounded-t-lg">
                <h2 className="text-white font-bold text-center py-3">Lyrics</h2>
              </div>

              <div className="p-6">
                <div className="bg-gray-900 rounded-lg p-6 max-h-64 overflow-y-auto">
                  <pre className="text-white text-lg leading-relaxed whitespace-pre-wrap font-arabic select-none" style={{ userSelect: 'none' }} onCopy={e => e.preventDefault()} onContextMenu={e => e.preventDefault()}>
                    {song.lyrics}
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
                  {/* Share Button and Add Lyrics next to each other */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-full bg-gray-900 border-none rounded-2xl p-8">
                      <DialogTitle className="text-2xl font-bold text-white mb-4">Share music with your friends</DialogTitle>
                      <div className="flex flex-col items-center">
                        <img
                          src={getSingerImagePath(song.imageName)}
                          alt={song.singer}
                          className="w-24 h-24 object-cover rounded-lg mb-4 select-none pointer-events-none"
                          onContextMenu={e => e.preventDefault()}
                          draggable={false}
                        />
                        <div className="text-xl font-bold text-white mb-1">{song.songName}</div>
                        <div className="text-md text-orange-500 mb-6">{song.singer}</div>
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
                            <a href={`https://wa.me/?text=${encodeURIComponent(song.songName + ' - ' + window.location.href)}`} target="_blank" rel="noopener noreferrer">
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
                            <a href={`sms:?body=${encodeURIComponent(song.songName + ' - ' + window.location.href)}`}>
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

        {/* Song Details (Full Width) */}
        <div className="mt-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Song Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Singer</h3>
                <p className="text-white">{song.singer}</p>
              </div>
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Category</h3>
                <p className="text-white">{song.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Year</h3>
                <p className="text-white">{song.year}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Writer</h3>
                <p className="text-white">{song.writer || 'Unknown'}</p>
              </div>
              <div className="border-r border-gray-700 pr-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Composer</h3>
                <p className="text-white">{song.composer || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Recording Status</h3>
                <p className="text-white">{song.recordingStatus}</p>
              </div>
            </div>

            {/* Lyrics Status */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-1">Lyrics Status</h3>
              <p className="text-white">{song.lyricsStatus}</p>
            </div>
          </div>
        </div>

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

        {/* Section 1: Other Songs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Other Songs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {otherSongs.length === 0 ? (
              <div className="text-gray-400 col-span-full">No other songs found.</div>
            ) : (
              otherSongs.map(s => (
                <Link key={s.id} href={`/songs/${s.id}`} className="block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={getSingerImagePath(s.imageName)}
                      alt={s.singer}
                      className="w-24 h-24 object-cover rounded mb-4 bg-gray-800"
                      onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                    />
                    <div className="text-white font-bold text-lg text-center mb-1 group-hover:text-orange-500 transition-colors">{s.songName}</div>
                    <div className="text-gray-400 text-sm text-center">{s.singer}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Section 2: Other Singers */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Other Singers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {otherSingers.length === 0 ? (
              <div className="text-gray-400 col-span-full">No other singers found.</div>
            ) : (
              otherSingers.map(s => (
                <Link key={s.singer} href={`/songs/${s.id}`} className="block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={getSingerImagePath(s.imageName)}
                      alt={s.singer}
                      className="w-24 h-24 object-cover rounded mb-4 bg-gray-800"
                      onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                    />
                    <div className="text-white font-bold text-lg text-center mb-1 group-hover:text-orange-500 transition-colors">{s.singer}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
