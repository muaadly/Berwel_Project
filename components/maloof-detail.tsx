"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Heart, Share2, BookOpen, Clock, LinkIcon, Facebook, MessageSquare, Instagram, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { MaloofEntry, fetchMaloofEntryById, fetchMaloofEntries } from "@/lib/data"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { getMaloofData, toggleMaloofLike, addMaloofComment, Comment } from "@/lib/user-data"

interface MaloofDetailProps {
  entryId: string
}

export default function MaloofDetail({ entryId }: MaloofDetailProps) {
  const { user, isLoading } = useAuth()
  const [entry, setEntry] = useState<MaloofEntry | null>(null)
  const [otherEntries, setOtherEntries] = useState<MaloofEntry[]>([])
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const otherEntriesScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const entryData = await fetchMaloofEntryById(entryId)
        if (!entryData) return
        
        setEntry(entryData)
        
        // Load user data (likes and comments)
        const userData = getMaloofData(entryId)
        setLikes(userData.likes)
        setComments(userData.comments)
        
        // Check if current user has liked this entry
        if (user) {
          setIsLiked(userData.likes.includes(user.id))
        }
        
        // Load other entries
        const allEntries = await fetchMaloofEntries()
        const otherEntriesData = allEntries.filter(e => String(e.id) !== String(entryId)).slice(0, 10)
        setOtherEntries(otherEntriesData)
      } catch (error) {
        console.error("Error loading entry:", error)
      }
    }
    
    loadEntry()
  }, [entryId, user])

  const BackButton = () => (
    <Link href="/library" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-4">
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back to Library
    </Link>
  )

  const handleLike = () => {
    if (!user) {
      alert("Please sign in to like entries")
      return
    }
    
    const newData = toggleMaloofLike(entryId, user.id)
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
    
    const newData = addMaloofComment(entryId, user.id, comment.trim(), user.name)
    setComments(newData.comments)
    setComment("")
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

  const getEntryImagePath = (imageName: string) => {
    return `/Data/Berwel Data Org/R_Images/Entry_Images/${imageName}`
  }

  const getNoteImagePath = (imageName: string) => {
    return `/Data/Berwel Data Org/R_Images/Notes_Images/${imageName}`
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading entry...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        {/* Entry Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Entry Image */}
          <div className="flex-shrink-0">
            <img
              src={getEntryImagePath(entry.typeEntryImage)}
              alt={entry.entryName}
              className="w-64 h-64 object-cover rounded-lg bg-gray-800"
              onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
            />
          </div>

          {/* Entry Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{entry.entryName}</h1>
            <p className="text-2xl text-orange-500 mb-4">{entry.entryType}</p>
            <p className="text-gray-400 mb-6">{entry.entryRhythm}</p>

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
              {/* Add Notes Button */}
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Add Notes
              </Button>
            </div>
          </div>
        </div>

        {/* Entry Details */}
        <div className="mt-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Entry Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Entry Type</h3>
                <p className="text-white">{entry.entryType}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Entry Rhythm</h3>
                <p className="text-white">{entry.entryRhythm}</p>
              </div>
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

        {/* Other Entries Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Other Entries</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherEntriesScrollRef, 'left')}
              >
                <ChevronLeft className="h-4 w-4 text-orange-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white bg-transparent border-2"
                onClick={() => scroll(otherEntriesScrollRef, 'right')}
              >
                <ChevronRight className="h-4 w-4 text-orange-500" />
              </Button>
            </div>
          </div>
          <div ref={otherEntriesScrollRef} className="w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row flex-nowrap gap-6 pb-2 whitespace-nowrap">
              {otherEntries.length === 0 ? (
                <div className="text-gray-400">No other entries found.</div>
              ) : (
                otherEntries.map(e => (
                  <Link key={e.id} href={`/maloof/${e.id}`} className="min-w-[220px] max-w-[220px] block group border border-gray-700 rounded-lg p-4 bg-gray-900 hover:border-orange-500 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={getEntryImagePath(e.typeEntryImage)}
                        alt={e.entryName}
                        className="w-24 h-24 object-cover rounded mb-4 bg-gray-800"
                        onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                      />
                      <div className="text-white font-bold text-lg text-center mb-1 group-hover:text-orange-500 transition-colors">{e.entryName}</div>
                      <div className="text-gray-400 text-sm text-center">{e.entryType}</div>
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
