import fs from 'fs'
import path from 'path'
import { LibyanSong, MaloofEntry } from './data'

// Function to read and parse CSV files with proper quote handling
function parseCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data = []
  
  let currentRow = ''
  let inQuotes = false
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    
    if (!inQuotes) {
      // Start of a new row
      currentRow = line
      
      // Check if this line has unclosed quotes
      const quoteCount = (line.match(/"/g) || []).length
      if (quoteCount % 2 === 1) {
        inQuotes = true
        continue
      }
    } else {
      // Continue building the current row
      currentRow += '\n' + line
      
      // Check if quotes are now closed
      const quoteCount = (currentRow.match(/"/g) || []).length
      if (quoteCount % 2 === 0) {
        inQuotes = false
      } else {
        continue
      }
    }
    
    // Parse the complete row
    if (currentRow.trim()) {
      const values: string[] = []
      let current = ''
      let inFieldQuotes = false
      
      for (let j = 0; j < currentRow.length; j++) {
        const char = currentRow[j]
        
        if (char === '"') {
          inFieldQuotes = !inFieldQuotes
        } else if (char === ',' && !inFieldQuotes) {
          values.push(current.trim().replace(/^"|"$/g, ''))
          current = ''
        } else {
          current += char
        }
      }
      
      // Add the last value
      values.push(current.trim().replace(/^"|"$/g, ''))
      
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      data.push(row)
    }
  }
  
  return data
}

// Server-side functions (for API routes or server components)
export function getLibyanSongs(): LibyanSong[] {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'Data', 'Berwel Data Org', 'LibyanSongs', 'Libyan Songs.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const rawData = parseCSV(csvContent)
    
    return rawData.map((row, index) => ({
      id: parseInt(row['Song Number']) || index + 1,
      songName: row['Song Name'] || '',
      singer: row['Singer'] || '',
      lyrics: row['Lyrics'] || '',
      lyricsStatus: row['Lyrics Status'] || '',
      writer: row['Writer'] || '',
      composer: row['Composer'] || '',
      category: row['Category'] || '',
      imageName: row['Image Name'] || '',
      year: row['Year'] || '',
      recordingStatus: row['Recording Status'] || '',
      soundcloudLink: row['SoundCloud Link'] || '',
    }))
  } catch (error) {
    console.error('Error reading Libyan Songs CSV:', error)
    return []
  }
}

export function getMaloofEntries(): MaloofEntry[] {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'Data', 'Berwel Data Org', 'MaloofEntries', 'Maloof Entries.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const rawData = parseCSV(csvContent)
    
    return rawData.map((row, index) => ({
      id: row['Entry ID'] || `entry-${index + 1}`,
      entryNumber: parseInt(row['Entry Number']) || index + 1,
      entryName: row['Entry Name'] || '',
      entryType: row['Entry Type'] || '',
      entryRhythm: row['Entry Rhythm'] || '',
      entryLyrics: row['Entry Lyrics'] || '',
      noteImageName: row['Note Image Name'] || '',
      typeEntryImage: row['Type Entry Image'] || '',
    }))
  } catch (error) {
    console.error('Error reading Maloof Entries CSV:', error)
    return []
  }
}

// Function to get a specific Libyan Song by ID (server-side)
export function getLibyanSongById(id: string): LibyanSong | null {
  const songs = getLibyanSongs()
  return songs.find(song => song.id.toString() === id) || null
}

// Function to get a specific Maloof Entry by ID (server-side)
export function getMaloofEntryById(id: string): MaloofEntry | null {
  const entries = getMaloofEntries()
  return entries.find(entry => entry.id === id) || null
}

// Extract unique singers and their images from Libyan Songs
export function getUniqueSingers(): { name: string, imageName: string }[] {
  const songs = getLibyanSongs();
  const singerMap = new Map<string, string>();
  songs.forEach(song => {
    if (song.singer && song.imageName && !singerMap.has(song.singer)) {
      singerMap.set(song.singer, song.imageName);
    }
  });
  return Array.from(singerMap.entries()).map(([name, imageName]) => ({ name, imageName }));
} 