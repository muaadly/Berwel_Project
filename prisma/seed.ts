import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to fetch data from API routes
async function fetchLibyanSongs(): Promise<any[]> {
  try {
    // Start a local server to fetch data
    const response = await fetch('http://localhost:3002/api/libyan-songs')
    if (!response.ok) {
      throw new Error('Failed to fetch Libyan songs')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Libyan songs:', error)
    return []
  }
}

async function fetchMaloofEntries(): Promise<any[]> {
  try {
    const response = await fetch('http://localhost:3002/api/maloof-entries')
    if (!response.ok) {
      throw new Error('Failed to fetch Maloof entries')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching Maloof entries:', error)
    return []
  }
}

async function main() {
  console.log('🌱 Starting comprehensive database seed...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.songComment.deleteMany()
  await prisma.songLike.deleteMany()
  await prisma.song.deleteMany()
  
  await prisma.maloofComment.deleteMany()
  await prisma.maloofLike.deleteMany()
  await prisma.maloofEntry.deleteMany()

  // Fetch real data from API routes
  console.log('📡 Fetching Libyan songs from API...')
  const songs = await fetchLibyanSongs()
  
  console.log('📡 Fetching Maloof entries from API...')
  const maloofEntries = await fetchMaloofEntries()

  console.log(`📝 Seeding ${songs.length} songs...`)
  
  // Seed songs
  for (const song of songs) {
    try {
      await prisma.song.create({
        data: {
          id: String(song.id),
          songName: song.songName,
          singer: song.singer,
          category: song.category,
          year: song.year,
          writer: song.writer || null,
          composer: song.composer || null,
          recordingStatus: song.recordingStatus,
          lyricsStatus: song.lyricsStatus,
          imageName: song.imageName
        }
      })
    } catch (error) {
      console.error(`Error seeding song ${song.id}:`, error)
    }
  }

  console.log(`📝 Seeding ${maloofEntries.length} maloof entries...`)
  
  // Seed maloof entries
  for (const entry of maloofEntries) {
    try {
      await prisma.maloofEntry.create({
        data: {
          id: String(entry.id),
          entryName: entry.entryName,
          entryType: entry.entryType,
          entryRhythm: entry.entryRhythm,
          typeEntryImage: entry.typeEntryImage
        }
      })
    } catch (error) {
      console.error(`Error seeding maloof entry ${entry.id}:`, error)
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Summary:`)
  console.log(`   - Songs: ${songs.length}`)
  console.log(`   - Maloof Entries: ${maloofEntries.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 