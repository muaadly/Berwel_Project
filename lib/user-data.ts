export interface Comment {
  userId: string
  text: string
  name: string
  timestamp: string
}

export interface SongData {
  likes: string[]
  comments: Comment[]
}

export interface MaloofData {
  likes: string[]
  comments: Comment[]
}

// Get likes and comments for a song
export function getSongData(songId: string): SongData {
  if (typeof window === 'undefined') return { likes: [], comments: [] }
  
  const data = localStorage.getItem(`song_${songId}`)
  return data ? JSON.parse(data) : { likes: [], comments: [] }
}

// Get likes and comments for a maloof entry
export function getMaloofData(entryId: string): MaloofData {
  if (typeof window === 'undefined') return { likes: [], comments: [] }
  
  const data = localStorage.getItem(`maloof_${entryId}`)
  return data ? JSON.parse(data) : { likes: [], comments: [] }
}

// Toggle like for a song
export function toggleSongLike(songId: string, userId: string): SongData {
  const data = getSongData(songId)
  const newLikes = data.likes.includes(userId)
    ? data.likes.filter(id => id !== userId)
    : [...data.likes, userId]
  
  const newData = { ...data, likes: newLikes }
  localStorage.setItem(`song_${songId}`, JSON.stringify(newData))
  return newData
}

// Toggle like for a maloof entry
export function toggleMaloofLike(entryId: string, userId: string): MaloofData {
  const data = getMaloofData(entryId)
  const newLikes = data.likes.includes(userId)
    ? data.likes.filter(id => id !== userId)
    : [...data.likes, userId]
  
  const newData = { ...data, likes: newLikes }
  localStorage.setItem(`maloof_${entryId}`, JSON.stringify(newData))
  return newData
}

// Add comment to a song
export function addSongComment(songId: string, userId: string, text: string, name: string): SongData {
  const data = getSongData(songId)
  const newComment: Comment = {
    userId,
    text,
    name,
    timestamp: new Date().toISOString()
  }
  
  const newData = { ...data, comments: [...data.comments, newComment] }
  localStorage.setItem(`song_${songId}`, JSON.stringify(newData))
  return newData
}

// Add comment to a maloof entry
export function addMaloofComment(entryId: string, userId: string, text: string, name: string): MaloofData {
  const data = getMaloofData(entryId)
  const newComment: Comment = {
    userId,
    text,
    name,
    timestamp: new Date().toISOString()
  }
  
  const newData = { ...data, comments: [...data.comments, newComment] }
  localStorage.setItem(`maloof_${entryId}`, JSON.stringify(newData))
  return newData
} 