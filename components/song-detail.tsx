"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Heart, Share2, BookOpen, Clock, LinkIcon, Facebook, MessageSquare, Instagram, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { LibyanSong, fetchLibyanSongById, fetchLibyanSongs } from "@/lib/data"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { useTranslations } from "@/lib/translations"
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
import ShareModal from '@/components/share-modal'

interface SongDetailProps {
  songId: string
}

export default function SongDetail({ songId }: SongDetailProps) {
  const { user, isLoading } = useAuth()
  const { t, language } = useTranslations()
  const [song, setSong] = useState<LibyanSong | null>(null)
  const [otherSongs, setOtherSongs] = useState<LibyanSong[]>([])
  const [otherSingers, setOtherSingers] = useState<LibyanSong[]>([])
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<CommentWithUser[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null)
  const [editingCommentText, setEditingCommentText] = useState("")
  const otherSongsScrollRef = useRef<HTMLDivElement>(null)
  const otherSingersScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadSong = async () => {
      try {
        const songData = await fetchLibyanSongById(songId)
        if (!songData) return
        
        setSong(songData)
        
        // Load likes and comments from database
        if (user) {
          // Get user's like status
          const likeResponse = await fetch(`/api/songs/${songId}/likes`)
          if (likeResponse.ok) {
            const likeData = await likeResponse.json()
            setIsLiked(likeData.isLiked)
          }
        }
        
        // Get all likes count
        const likesResponse = await fetch(`/api/songs/${songId}/likes`)
        if (likesResponse.ok) {
          const likesData = await likesResponse.json()
          setLikes(Array(likesData.count).fill('liked'))
        }
        
        // Get comments
        const commentsResponse = await fetch(`/api/songs/${songId}/comments`)
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json()
          setComments(commentsData)
        }
        
        // Load other songs and singers
        const allSongs = await fetchLibyanSongs()
        const sameCategorySongs = allSongs.filter(s => s.category === songData.category && String(s.id) !== String(songId))
        const shuffledSongs = shuffleArray(sameCategorySongs).slice(0, 10)
        setOtherSongs(shuffledSongs)
        
        // Get unique singers in the same category (excluding current singer)
        const sameCategorySongsForSingers = allSongs.filter(s => 
          s.category === songData.category && 
          s.singer !== songData.singer &&
          s.singer.trim() !== '' // Ensure singer name is not empty
        )
        
        // Create a Map to ensure unique singers with their first occurrence
        const uniqueSingersMap = new Map<string, LibyanSong>()
        sameCategorySongsForSingers.forEach(song => {
          if (!uniqueSingersMap.has(song.singer)) {
            uniqueSingersMap.set(song.singer, song)
          }
        })
        
        const uniqueSingers = Array.from(uniqueSingersMap.values())
        const shuffledSingers = shuffleArray(uniqueSingers).slice(0, 10)
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
      {language === 'ar' ? t('backToLibrary') : 'Back to Library'}
    </Link>
  )

  const handleLike = async () => {
    if (!user) {
      alert("Please sign in to like songs")
      return
    }
    
    try {
      const response = await fetch(`/api/songs/${songId}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setIsLiked(data.liked)
        setLikes(Array(data.count).fill('liked'))
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
      const response = await fetch(`/api/songs/${songId}/comments`, {
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
      const response = await fetch(`/api/songs/${songId}/comments`, {
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
        const response = await fetch(`/api/songs/${songId}/comments`, {
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-xl">Loading song...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        {/* Song Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Song Image */}
          <div className="flex-shrink-0">
            <img
              src={getSingerImagePath(song.imageName)}
              alt={song.singer}
              className="w-64 h-64 object-cover rounded-lg bg-muted"
              onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
            />
          </div>

          {/* Song Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">{song.songName}</h1>
            <p className="text-2xl text-primary mb-4">{song.singer}</p>
            <p className="text-muted-foreground mb-6">{song.category}</p>

            {/* SoundCloud Link */}
            {song.soundcloudLink && (
              <div className="mb-6">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                  <a href={song.soundcloudLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {language === 'ar' ? t('listenOnSoundcloud') : 'Listen on SoundCloud'}
                </a>
                </Button>
              </div>
            )}

            {/* Lyrics Box */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Stretched Lyrics Tab */}
              <div className="w-full bg-card border border-border rounded-t-lg">
                <h2 className="text-foreground font-bold text-center py-3">
                  {language === 'ar' ? t('lyrics') : 'Lyrics'}
                </h2>
              </div>

              <div className="p-6">
                <div className="bg-muted rounded-lg p-6 max-h-64 overflow-y-auto">
                  <pre className="text-foreground text-lg leading-relaxed whitespace-pre-wrap font-arabic select-none" style={{ userSelect: 'none' }} onCopy={e => e.preventDefault()} onContextMenu={e => e.preventDefault()}>
                    {song.lyrics}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">
                  {/* Desktop: Single line layout */}
                  <div className="hidden md:flex items-center justify-center gap-4">
                    {/* Likes Count Circle */}
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {likes.length}
                    </div>
                    <Button 
                      onClick={handleLike}
                      className={`transition-colors flex items-center gap-2 ${
                        isLiked 
                          ? 'bg-red-500 hover:bg-red-600 text-primary-foreground' 
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? (language === 'ar' ? t('liked') : 'Liked') : (language === 'ar' ? t('like') : 'Like')}
                    </Button>
                    {/* Share Button */}
                    <Button 
                      onClick={handleShare}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" /> {language === 'ar' ? t('share') : 'Share'}
                    </Button>
                    {/* Add Lyrics Button */}
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> {language === 'ar' ? t('addLyrics') : 'Add Lyrics'}
                    </Button>
                  </div>

                  {/* Mobile: Stacked layout */}
                  <div className="md:hidden">
                    {/* First Row: Like count, Like button, Share button */}
                    <div className="flex items-center justify-center gap-4 mb-3">
                      {/* Likes Count Circle */}
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {likes.length}
                      </div>
                      <Button 
                        onClick={handleLike}
                        className={`transition-colors flex items-center gap-2 ${
                          isLiked 
                            ? 'bg-red-500 hover:bg-red-600 text-primary-foreground' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        {isLiked ? (language === 'ar' ? t('liked') : 'Liked') : (language === 'ar' ? t('like') : 'Like')}
                      </Button>
                      {/* Share Button */}
                      <Button 
                        onClick={handleShare}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" /> {language === 'ar' ? t('share') : 'Share'}
                      </Button>
                    </div>
                    {/* Second Row: Add Lyrics Button (full width) */}
                    <div className="flex justify-center">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center gap-2 w-full max-w-xs">
                        <BookOpen className="h-4 w-4" /> {language === 'ar' ? t('addLyrics') : 'Add Lyrics'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Song Details (Full Width) */}
        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'ar' ? t('songInformation') : 'Song Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-r border-border pr-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('singer') : 'Singer'}
                </h3>
                <p className="text-foreground">{song.singer}</p>
              </div>
              <div className="border-r border-border pr-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('category') : 'Category'}
                </h3>
                <p className="text-foreground">{song.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('year') : 'Year'}
                </h3>
                <p className="text-foreground">{song.year}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border-r border-border pr-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('writer') : 'Writer'}
                </h3>
                <p className="text-foreground">{song.writer || 'Unknown'}</p>
              </div>
              <div className="border-r border-border pr-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('composer') : 'Composer'}
                </h3>
                <p className="text-foreground">{song.composer || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                  {language === 'ar' ? t('recordingStatus') : 'Recording Status'}
                </h3>
                <p className="text-foreground">{song.recordingStatus}</p>
              </div>
            </div>

            {/* Lyrics Status */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                {language === 'ar' ? t('lyricsStatus') : 'Lyrics Status'}
              </h3>
              <p className="text-foreground">{song.lyricsStatus}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'ar' ? t('comments') : 'Comments'}
            </h2>
            
            {/* Comment Input */}
            <div className="mb-4">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={language === 'ar' ? t('commentPlaceholder') : "Add a comment..."}
                className="bg-muted border-border text-foreground placeholder-muted-foreground"
                rows={3}
              />
              <Button
                onClick={handleCommentSubmit}
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {language === 'ar' ? t('postComment') : 'Post Comment'}
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-muted-foreground">
                  {language === 'ar' ? t('noCommentsYet') : 'No comments yet. Be the first to comment!'}
                </p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      {/* Comment Text - Left Side */}
                      <div className="flex-1 mr-4">
                        {editingCommentIndex === index ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              className="bg-muted border-border text-foreground placeholder-muted-foreground"
                              rows={2}
                            />
                          </div>
                        ) : (
                          <p className="text-foreground text-sm leading-relaxed">{comment.text}</p>
                        )}
                      </div>
                      
                      {/* User Info - Right Side */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={comment.user?.image || '/placeholder-user.jpg'}
                            alt={comment.user?.name || 'User'}
                            className="w-10 h-10 rounded-full object-cover border-2 border-border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-user.jpg'
                            }}
                          />
                        </div>
                        {/* User Info */}
                        <div className="flex flex-col items-start">
                          <span className="text-foreground font-semibold text-sm">
                            {comment.user?.name || 'Anonymous User'}
                          </span>
                          <span className="text-muted-foreground text-xs mt-1">
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
                    </div>
                    
                    {/* Edit/Delete Buttons - Below */}
                    {user && (comment.userId === user.id || comment.userId === user.email) && (
                      <div className="flex gap-2 mt-3">
                        {editingCommentIndex === index ? (
                          <>
                            <Button
                              onClick={handleSaveEdit}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-primary-foreground text-xs px-3 py-1"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => handleCancelEdit}
                              size="sm"
                              variant="outline"
                              className="border-border text-foreground hover:bg-muted text-xs px-3 py-1"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleEditComment(index, comment.text)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-xs px-3 py-1"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteComment(index)}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-primary-foreground text-xs px-3 py-1"
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Other Songs */}
        <div className="mt-12">
          <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-2xl font-bold text-foreground">
              {language === 'ar' ? t('otherSongs') : 'Other Songs'}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                onClick={() => scroll(otherSongsScrollRef, 'left')}
              >
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                onClick={() => scroll(otherSongsScrollRef, 'right')}
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div ref={otherSongsScrollRef} className="w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row flex-nowrap gap-6 pb-2 whitespace-nowrap">
              {otherSongs.length === 0 ? (
                <div className="text-muted-foreground">No other songs found.</div>
              ) : (
                otherSongs.map(s => (
                  <Link key={s.id} href={`/songs/${s.id}`} className="min-w-[280px] max-w-[280px] block group border border-border rounded-lg p-4 bg-card hover:border-primary transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={getSingerImagePath(s.imageName)}
                        alt={s.singer}
                        className="w-20 h-20 object-cover rounded bg-muted flex-shrink-0"
                        onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-bold text-lg mb-1 group-hover:text-primary transition-colors truncate">{s.songName}</div>
                        <div className="text-muted-foreground text-sm truncate">{s.singer}</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Other Singers */}
        <div className="mt-12">
          <div className={`flex items-center justify-between mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-2xl font-bold text-foreground">
              {language === 'ar' ? t('otherSingers') : 'Other Singers'}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                onClick={() => scroll(otherSingersScrollRef, 'left')}
              >
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-border text-foreground bg-transparent border-2 hover:bg-transparent hover:text-primary focus-visible:ring-0"
                onClick={() => scroll(otherSingersScrollRef, 'right')}
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div ref={otherSingersScrollRef} className="w-full overflow-x-auto scrollbar-hide" style={{ overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-row flex-nowrap gap-6 pb-2 whitespace-nowrap">
              {otherSingers.length === 0 ? (
                <div className="text-muted-foreground">No other singers found.</div>
              ) : (
                otherSingers.map(s => (
                  <Link key={s.id} href={`/songs/${s.id}`} className="min-w-[280px] max-w-[280px] block group border border-border rounded-lg p-4 bg-card hover:border-primary transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={getSingerImagePath(s.imageName)}
                        alt={s.singer}
                        className="w-20 h-20 object-cover rounded bg-muted flex-shrink-0"
                        onError={ev => { (ev.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-bold text-lg mb-1 group-hover:text-primary transition-colors truncate">{s.singer}</div>
                        <div className="text-muted-foreground text-sm truncate">{s.category}</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        songName={song.songName}
        singerName={song.singer}
        singerImage={getSingerImagePath(song.imageName)}
        currentUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  )
}
