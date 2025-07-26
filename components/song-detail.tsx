"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Heart, Share2, BookOpen, Clock, LinkIcon, Facebook, MessageSquare, Instagram, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { LibyanSong, fetchLibyanSongById, fetchLibyanSongs } from "@/lib/data"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { getSongData, toggleSongLike, addSongComment, Comment } from "@/lib/user-data"

interface SongDetailProps {
  songId: string
}

export default function SongDetail({ songId }: SongDetailProps) {
  const { user, isLoading } = useAuth()
  const [song, setSong] = useState<LibyanSong | null>(null)
  const [otherSongs, setOtherSongs] = useState<LibyanSong[]>([])
  const [otherSingers, setOtherSingers] = useState<LibyanSong[]>([])
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const otherSongsScrollRef = useRef<HTMLDivElement>(null)
  const otherSingersScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadSong = async () => {
      try {
        const songData = await fetchLibyanSongById(songId)
        if (!songData) return
        
        setSong(songData)
        
        // Load user data (likes and comments)
        const userData = getSongData(songId)
        setLikes(userData.likes)
        setComments(userData.comments)
        
        // Check if current user has liked this song
        if (user) {
          setIsLiked(userData.likes.includes(user.id))
        }
        
        // Load other songs and singers
        const allSongs = await fetchLibyanSongs()
        const sameCategorySongs = allSongs.filter(s => s.category === songData.category && String(s.id) !== String(songId))
        const shuffledSongs = shuffleArray(sameCategorySongs).slice(0, 10)
        setOtherSongs(shuffledSongs)
        
        const sameSingerSongs = allSongs.filter(s => s.singer === songData.singer && String(s.id) !== String(songId))
        const shuffledSingers = shuffleArray(sameSingerSongs).slice(0, 10)
        setOtherSingers(shuffledSingers)
      } catch (error) {
        console.error("Error loading song:", error)
      }
    }
    
    loadSong()
  }, [songId, user])

  const BackButton = () => (
    <Link href="/library" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-4">
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back to Library
    </Link>
  )

  const handleLike = () => {
    if (!user) {
      alert("Please sign in to like songs")
      return
    }
    
    const newData = toggleSongLike(songId, user.id)
    setLikes(newData.likes)
    setIsLiked(newData.likes.includes(user.id))
  }

  const handleCommentSubmit = () => {
    if (!user) {
      alert("Please sign in to comment")
      return
    }
    
    if (!comment.trim()) {
      alert("Please enter a comment")
      return
    }
    
    const newData = addSongComment(songId, user.id, comment.trim(), user.name)
    setComments(newData.comments)
    setComment("")
  }

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300
      const currentScroll = ref.current.scrollLeft
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount
      ref.current.scrollTo({ left: newScroll, behavior: 'smooth' })
    }
  }

  const getSingerImagePath = (imageName: string) => {
    return `/Data/Berwel Data Org/R_Images/Singers_Images/${imageName}`
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading song...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        {/* Song Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Song Image */}
          <div className="flex-shrink-0">
            <img
              src={getSingerImagePath(song.imageName)}
              alt={song.singer}
              className="w-64 h-64 object-cover rounded-lg bg-gray-800"
              onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
            />
          </div>

          {/* Song Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{song.songName}</h1>
            <p className="text-2xl text-orange-500 mb-4">{song.singer}</p>
            <p className="text-gray-400 mb-6">{song.category}</p>

            {/* SoundCloud Link */}
            {song.soundcloudLink && (
              <div className="mb-6">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
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
                  {/* Likes Count Circle */}
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    {likes.length}
                  </div>
                  <Button 
                    onClick={handleLike}
                    className={`transition-colors flex items-center gap-2 ${
                      isLiked 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  {/* Share Button */}
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                  {/* Add Lyrics Button */}
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Add Lyrics
                  </Button>
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
                onClick={handleCommentSubmit}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Post Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-semibold">{comment.name}</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Other Songs */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Other Songs</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherSongsScrollRef, 'left')}
              >
                <ChevronLeft className="h-4 w-4 text-orange-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherSongsScrollRef, 'right')}
              >
                <ChevronRight className="h-4 w-4 text-orange-500" />
              </Button>
            </div>
          </div>
          <div ref={otherSongsScrollRef} className="w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row flex-nowrap gap-6 pb-2 whitespace-nowrap">
              {otherSongs.length === 0 ? (
                <div className="text-gray-400">No other songs found.</div>
              ) : (
                otherSongs.map(s => (
                  <Link key={s.id} href={`/songs/${s.id}`} className="min-w-[220px] max-w-[220px] block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
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
        </div>

        {/* Section 2: Other Singers */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Other Singers</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherSingersScrollRef, 'left')}
              >
                <ChevronLeft className="h-4 w-4 text-orange-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherSingersScrollRef, 'right')}
              >
                <ChevronRight className="h-4 w-4 text-orange-500" />
              </Button>
            </div>
          </div>
          <div ref={otherSingersScrollRef} className="w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row flex-nowrap gap-6 pb-2 whitespace-nowrap">
              {otherSingers.length === 0 ? (
                <div className="text-gray-400">No other singers found.</div>
              ) : (
                otherSingers.map(s => (
                  <Link key={s.id} href={`/songs/${s.id}`} className="min-w-[220px] max-w-[220px] block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
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
    </div>
  )
}
