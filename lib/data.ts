// Types for our data structures
export interface LibyanSong {
  id: number
  songName: string
  singer: string
  lyrics: string
  lyricsStatus: string
  writer: string
  composer: string
  category: string
  imageName: string
  year: string
  recordingStatus: string
  soundcloudLink: string
}

export interface MaloofEntry {
  id: string
  entryNumber: number
  entryName: string
  entryType: string
  entryRhythm: string
  entryLyrics: string
  noteImageName: string
  typeEntryImage: string
}

// Client-side functions (for React components)
export async function fetchLibyanSongs(): Promise<LibyanSong[]> {
  try {
    const response = await fetch('/api/libyan-songs')
    if (!response.ok) {
      throw new Error('Failed to fetch Libyan songs')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Libyan songs:', error)
    return []
  }
}

export async function fetchMaloofEntries(): Promise<MaloofEntry[]> {
  try {
    const response = await fetch('/api/maloof-entries')
    if (!response.ok) {
      throw new Error('Failed to fetch Maloof entries')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Maloof entries:', error)
    return []
  }
}

export async function fetchLibyanSongById(id: string): Promise<LibyanSong | null> {
  try {
    const response = await fetch(`/api/libyan-songs/${id}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Libyan song:', error)
    return null
  }
}

export async function fetchMaloofEntryById(id: string): Promise<MaloofEntry | null> {
  try {
    const response = await fetch(`/api/maloof-entries/${id}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Maloof entry:', error)
    return null
  }
}

// Function to get image path for singer
export function getSingerImagePath(imageName: string): string {
  if (!imageName) return '/placeholder-user.jpg'
  return `/Data/Berwel Data Org/R_Images/Singers_Images/${imageName}`
}

// Function to get image path for entry type
export function getEntryTypeImagePath(imageName: string): string {
  if (!imageName) return '/placeholder.svg'
  const trimmedName = imageName.trim()
  return `/Data/Berwel Data Org/R_Images/Entry_Images/${trimmedName}`
}

// Function to get image path for note
export function getNoteImagePath(imageName: string): string {
  if (!imageName) return '/placeholder.svg'
  return `/Data/Berwel Data Org/R_Images/Notes_Images/${imageName}`
}

export async function fetchSingers(): Promise<{ name: string, imageName: string }[]> {
  try {
    const response = await fetch('/api/singers')
    if (!response.ok) {
      throw new Error('Failed to fetch singers')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching singers:', error)
    return []
  }
} 