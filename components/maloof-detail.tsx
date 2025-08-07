"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Heart, Share2, BookOpen, Clock, LinkIcon, Facebook, MessageSquare, Instagram, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { MaloofEntry, fetchMaloofEntryById, fetchMaloofEntries } from "@/lib/data"
import Link from "next/link"
import { useAuth } from "./auth-provider"
type CommentWithUser = {
  id: string
  userId: string
  text: string
  createdAt: string
  user: {
    name: string
    image: string | null
  }
}
import MaloofShareModal from '@/components/maloof-share-modal'

interface MaloofDetailProps {
  entryId: string
}

export default function MaloofDetail({ entryId }: MaloofDetailProps) {
  const { user, isLoading } = useAuth()
  const [entry, setEntry] = useState<MaloofEntry | null>(null)
  const [otherEntries, setOtherEntries] = useState<MaloofEntry[]>([])
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<CommentWithUser[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null)
  const [editingCommentText, setEditingCommentText] = useState("")
  const [activeTab, setActiveTab] = useState<'lyrics' | 'notes'>('lyrics')
  const otherEntriesScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const entryData = await fetchMaloofEntryById(entryId)
        if (!entryData) return
        
        console.log('Loaded entry data:', entryData)
        setEntry(entryData)
        
        // Load likes and comments from database
        if (user) {
          // Get user's like status
          const likeResponse = await fetch(`/api/maloof/${entryId}/likes`)
          if (likeResponse.ok) {
            const likeData = await likeResponse.json()
            setIsLiked(likeData.isLiked)
          }
        }
        
        // Get all likes count
        const likesResponse = await fetch(`/api/maloof/${entryId}/likes`)
        if (likesResponse.ok) {
          const likesData = await likesResponse.json()
          setLikes(Array(likesData.count || 0).fill('liked'))
        }
        
        // Get comments
        const commentsResponse = await fetch(`/api/maloof/${entryId}/comments`)
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json()
          setComments(commentsData)
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

  const handleLike = async () => {
    if (!user) {
      alert("Please sign in to like entries")
      return
    }
    
    try {
      const response = await fetch(`/api/maloof/${entryId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setIsLiked(data.liked)
        setLikes(Array(data.count || 0).fill('liked'))
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please sign in to comment")
      return
    }
    
    if (!comment.trim()) {
      alert("Please enter a comment")
      return
    }
    
    try {
      const response = await fetch(`/api/maloof/${entryId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          text: comment.trim(),
          userName: user.name
        }),
      })
      
      if (response.ok) {
        const newComment = await response.json()
        setComments(prev => [...prev, newComment])
        setComment("")
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleEditComment = (index: number, currentText: string) => {
    if (!user) {
      alert("Please sign in to edit comments")
      return
    }
    
    setEditingCommentIndex(index)
    setEditingCommentText(currentText)
  }

  const handleSaveEdit = async () => {
    if (!user || editingCommentIndex === null) return
    
    if (!editingCommentText.trim()) {
      alert("Please enter a comment")
      return
    }
    
    try {
      const commentToEdit = comments[editingCommentIndex]
      const response = await fetch(`/api/maloof/${entryId}/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId: commentToEdit.id,
          userId: user.id,
          text: editingCommentText.trim()
        }),
      })
      
      if (response.ok) {
        const updatedComment = await response.json()
        setComments(prev => prev.map((comment, index) => 
          index === editingCommentIndex ? updatedComment : comment
        ))
        setEditingCommentIndex(null)
        setEditingCommentText("")
      }
    } catch (error) {
      console.error('Error editing comment:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentIndex(null)
    setEditingCommentText("")
  }

  const handleDeleteComment = async (index: number) => {
    if (!user) {
      alert("Please sign in to delete comments")
      return
    }
    
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        const commentToDelete = comments[index]
        const response = await fetch(`/api/maloof/${entryId}/comments`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commentId: commentToDelete.id,
            userId: user.id
          }),
        })
        
        if (response.ok) {
          setComments(prev => prev.filter((_, i) => i !== index))
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
      }
    }
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
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
    if (!imageName) return '/placeholder-user.jpg'
    // Keep original case - the files are actually uppercase
    const cleanImageName = imageName.trim()
    // Use a completely different approach - direct path without encoding
    const imagePath = `/Data/Berwel Data Org/R_Images/Entry_Images/${cleanImageName}?v=${Date.now()}`
    console.log('FIXED - Generated image path:', imagePath, 'from:', imageName)
    return imagePath
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
              onError={ev => { 
                console.log('Image failed to load:', entry.typeEntryImage)
                ;(ev.target as HTMLImageElement).src = '/placeholder-user.jpg' 
              }}
            />
          </div>

          {/* Entry Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{entry.entryName}</h1>
            <p className="text-2xl text-orange-500 mb-4">{entry.entryType}</p>
            <p className="text-gray-400 mb-6">{entry.entryRhythm}</p>

            {/* Mobile-friendly Action Buttons */}
            <div className="mt-4">
              {/* First Row: Like count, Like button, Share button */}
              <div className="flex items-center justify-center gap-4 mb-3">
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
                <Button 
                  onClick={handleShare}
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
              {/* Second Row: Add Notes Button (full width) */}
              <div className="flex justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center gap-2 w-full max-w-xs">
                  <BookOpen className="h-4 w-4" /> Add Notes
                </Button>
              </div>
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

        {/* Entry Content Tabs */}
        <div className="mt-8">
          <div className="bg-black border border-gray-700 rounded-lg">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('lyrics')}
                className={`flex-1 px-6 py-4 text-lg font-semibold transition-colors ${
                  activeTab === 'lyrics'
                    ? 'bg-black text-white border-b-2 border-orange-500'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Lyrics
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 px-6 py-4 text-lg font-semibold transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-black text-white border-b-2 border-orange-500'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Notes
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'lyrics' && entry.entryLyrics && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Entry Lyrics</h2>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-white text-lg leading-relaxed whitespace-pre-line font-arabic">
                      {entry.entryLyrics}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && entry.noteImageName && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Notes {entry.entryName}</h2>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <img
                      src={getNoteImagePath(entry.noteImageName)}
                      alt={`Notes for ${entry.entryName}`}
                      className="w-full h-auto max-w-full rounded-lg"
                      onError={(ev) => {
                        console.log('Note image failed to load:', entry.noteImageName)
                        ;(ev.target as HTMLImageElement).src = '/placeholder.svg'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notes' && !entry.noteImageName && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <p className="text-gray-400 text-center">No notes available for this entry.</p>
                  </div>
                </div>
              )}
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
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={comment.user?.image || '/placeholder-user.jpg'}
                            alt={comment.user?.name || 'User'}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-user.jpg'
                            }}
                          />
                        </div>
                        {/* User Info */}
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-sm">
                            {comment.user?.name || 'Anonymous User'}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      {/* Edit/Delete Buttons */}
                      {user && (comment.userId === user.id || comment.userId === user.email) && (
                        <div className="flex gap-2">
                          {editingCommentIndex === index ? (
                            <>
                              <Button
                                onClick={handleSaveEdit}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={handleCancelEdit}
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs px-3 py-1"
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() => handleEditComment(index, comment.text)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteComment(index)}
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Comment Text */}
                    {editingCommentIndex === index ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <p className="text-white text-sm leading-relaxed">{comment.text}</p>
                    )}
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
                        onError={ev => { 
                          console.log('Other entry image failed to load:', e.typeEntryImage)
                          ;(ev.target as HTMLImageElement).src = '/placeholder-user.jpg' 
                        }}
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

      {/* Share Modal */}
      <MaloofShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entryName={entry.entryName}
        entryType={entry.entryType}
        entryImage={getEntryImagePath(entry.typeEntryImage)}
        currentUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  )
}
