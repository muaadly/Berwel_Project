import { prisma } from './prisma'
import { User, Song, MaloofEntry, SongLike, SongComment, MaloofLike, MaloofComment } from '@prisma/client'
import { getLibyanSongs, getMaloofEntries } from './server-data'

// Sync songs from CSV to database
export async function syncSongsToDatabase() {
  try {
    console.log('Starting song sync to database...')
    const songs = getLibyanSongs()
    
    for (const song of songs) {
      await prisma.song.upsert({
        where: { id: String(song.id) },
        update: {
          songName: song.songName,
          singer: song.singer,
          category: song.category,
          year: song.year,
          writer: song.writer || '',
          composer: song.composer || '',
          recordingStatus: song.recordingStatus,
          lyricsStatus: song.lyricsStatus,
          imageName: song.imageName
        },
        create: {
          id: String(song.id),
          songName: song.songName,
          singer: song.singer,
          category: song.category,
          year: song.year,
          writer: song.writer || '',
          composer: song.composer || '',
          recordingStatus: song.recordingStatus,
          lyricsStatus: song.lyricsStatus,
          imageName: song.imageName
        }
      })
    }
    
    console.log(`Synced ${songs.length} songs to database`)
  } catch (error) {
    console.error('Error syncing songs to database:', error)
    throw error
  }
}

// Sync Maloof entries from CSV to database
export async function syncMaloofEntriesToDatabase() {
  try {
    console.log('Starting Maloof entries sync to database...')
    const entries = getMaloofEntries()
    
    for (const entry of entries) {
      await prisma.maloofEntry.upsert({
        where: { id: entry.id },
        update: {
          entryName: entry.entryName,
          entryType: entry.entryType,
          entryRhythm: entry.entryRhythm,
          typeEntryImage: entry.typeEntryImage
        },
        create: {
          id: entry.id,
          entryName: entry.entryName,
          entryType: entry.entryType,
          entryRhythm: entry.entryRhythm,
          typeEntryImage: entry.typeEntryImage
        }
      })
    }
    
    console.log(`Synced ${entries.length} Maloof entries to database`)
  } catch (error) {
    console.error('Error syncing Maloof entries to database:', error)
    throw error
  }
}

// User Management
export async function createOrUpdateUser(email: string, name: string, image?: string): Promise<User> {
  return await prisma.user.upsert({
    where: { email },
    update: { name, image },
    create: { email, name, image: image || null }
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email }
  })
}

// Song Likes
export async function toggleSongLike(songId: string, userId: string): Promise<{ liked: boolean; count: number }> {
  console.log('toggleSongLike called with songId:', songId, 'userId:', userId)
  
  try {
    // First, check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    console.log('User found:', user ? 'Yes' : 'No')
    
    if (!user) {
      console.log('User not found, creating user...')
      // Create user if not exists (this shouldn't happen but let's handle it)
      await prisma.user.create({
        data: {
          id: userId,
          email: `user-${userId}@temp.com`,
          name: `User ${userId}`
        }
      })
    }
    
    // Check if the song exists
    const song = await prisma.song.findUnique({
      where: { id: songId }
    })
    console.log('Song found:', song ? 'Yes' : 'No')
    
    if (!song) {
      console.log(`Song with ID ${songId} not found, attempting to sync...`)
      try {
        await syncSongsToDatabase()
        // Check again after sync
        const songAfterSync = await prisma.song.findUnique({
          where: { id: songId }
        })
        if (!songAfterSync) {
          throw new Error(`Song with ID ${songId} not found even after sync`)
        }
      } catch (syncError) {
        console.error('Error syncing songs:', syncError)
        throw new Error(`Song with ID ${songId} not found and sync failed`)
      }
    }
    
    const existingLike = await prisma.songLike.findUnique({
      where: {
        userId_songId: {
          userId,
          songId
        }
      }
    })
    
    console.log('Existing like found:', existingLike ? 'Yes' : 'No')

    if (existingLike) {
      // Unlike
      console.log('Deleting existing like...')
      await prisma.songLike.delete({
        where: {
          userId_songId: {
            userId,
            songId
          }
        }
      })
    } else {
      // Like
      console.log('Creating new like...')
      await prisma.songLike.create({
        data: {
          userId,
          songId
        }
      })
    }

    // Get updated count
    const count = await prisma.songLike.count({
      where: { songId }
    })
    
    console.log('Final like count:', count)

    return {
      liked: !existingLike,
      count
    }
  } catch (error) {
    console.error('Error in toggleSongLike:', error)
    throw error
  }
}

export async function getSongLikes(songId: string): Promise<{ count: number; userLiked: boolean }> {
  const count = await prisma.songLike.count({ where: { songId } })
  return { count, userLiked: false } // Default to false, will be overridden by getUserSongLike
}

export async function getUserSongLike(songId: string, userId: string): Promise<boolean> {
  const like = await prisma.songLike.findUnique({
    where: {
      userId_songId: {
        userId,
        songId
      }
    }
  })
  return !!like
}

// Song Comments
export async function addSongComment(songId: string, userId: string, text: string): Promise<SongComment> {
  // Check if song exists, sync if needed
  const song = await prisma.song.findUnique({
    where: { id: songId }
  })
  
  if (!song) {
    console.log(`Song with ID ${songId} not found, attempting to sync...`)
    await syncSongsToDatabase()
  }
  
  return await prisma.songComment.create({
    data: {
      songId,
      userId,
      text
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export async function getSongComments(songId: string): Promise<(SongComment & { user: { name: string; image: string | null } })[]> {
  return await prisma.songComment.findMany({
    where: { songId },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function editSongComment(commentId: string, userId: string, text: string): Promise<SongComment & { user: { name: string; image: string | null } }> {
  return await prisma.songComment.update({
    where: {
      id: commentId,
      userId // Ensures user owns the comment
    },
    data: { text },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export async function deleteSongComment(commentId: string, userId: string): Promise<void> {
  await prisma.songComment.delete({
    where: {
      id: commentId,
      userId // Ensures user owns the comment
    }
  })
}

// Maloof Likes
export async function toggleMaloofLike(entryId: string, userId: string): Promise<{ liked: boolean; count: number }> {
  console.log('toggleMaloofLike called with entryId:', entryId, 'userId:', userId)
  
  try {
    // First, check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    console.log('User found:', user ? 'Yes' : 'No')
    
    if (!user) {
      console.log('User not found, creating user...')
      // Create user if not exists (this shouldn't happen but let's handle it)
      await prisma.user.create({
        data: {
          id: userId,
          email: `user-${userId}@temp.com`,
          name: `User ${userId}`
        }
      })
    }
    
    // Check if the entry exists
    const entry = await prisma.maloofEntry.findUnique({
      where: { id: entryId }
    })
    console.log('Entry found:', entry ? 'Yes' : 'No')
    
    if (!entry) {
      console.log(`Entry with ID ${entryId} not found, attempting to sync...`)
      try {
        await syncMaloofEntriesToDatabase()
        // Check again after sync
        const entryAfterSync = await prisma.maloofEntry.findUnique({
          where: { id: entryId }
        })
        if (!entryAfterSync) {
          throw new Error(`Entry with ID ${entryId} not found even after sync`)
        }
      } catch (syncError) {
        console.error('Error syncing entries:', syncError)
        throw new Error(`Entry with ID ${entryId} not found and sync failed`)
      }
    }
    
    const existingLike = await prisma.maloofLike.findUnique({
      where: {
        userId_entryId: {
          userId,
          entryId
        }
      }
    })
    
    console.log('Existing like found:', existingLike ? 'Yes' : 'No')

    if (existingLike) {
    // Unlike
    await prisma.maloofLike.delete({
      where: {
        userId_entryId: {
          userId,
          entryId
        }
      }
    })
  } else {
    // Like
    await prisma.maloofLike.create({
      data: {
        userId,
        entryId
      }
    })
  }

  // Get updated count
  const count = await prisma.maloofLike.count({
    where: { entryId }
  })

  return {
    liked: !existingLike,
    count
  }
}

export async function getUserMaloofLike(entryId: string, userId: string): Promise<boolean> {
  const like = await prisma.maloofLike.findUnique({
    where: {
      userId_entryId: {
        userId,
        entryId
      }
    }
  })
  return !!like
}

// Maloof Comments
export async function addMaloofComment(entryId: string, userId: string, text: string): Promise<MaloofComment> {
  // Check if entry exists, sync if needed
  const entry = await prisma.maloofEntry.findUnique({
    where: { id: entryId }
  })
  
  if (!entry) {
    console.log(`Entry with ID ${entryId} not found, attempting to sync...`)
    await syncMaloofEntriesToDatabase()
  }
  
  return await prisma.maloofComment.create({
    data: {
      entryId,
      userId,
      text
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export async function getMaloofComments(entryId: string): Promise<(MaloofComment & { user: { name: string; image: string | null } })[]> {
  return await prisma.maloofComment.findMany({
    where: { entryId },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function editMaloofComment(commentId: string, userId: string, text: string): Promise<MaloofComment & { user: { name: string; image: string | null } }> {
  return await prisma.maloofComment.update({
    where: {
      id: commentId,
      userId // Ensures user owns the comment
    },
    data: { text },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}

export async function deleteMaloofComment(commentId: string, userId: string): Promise<void> {
  await prisma.maloofComment.delete({
    where: {
      id: commentId,
      userId // Ensures user owns the comment
    }
  })
}

// Admin Functions
export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getUserStats(userId: string) {
  const [songLikes, songComments, maloofLikes, maloofComments] = await Promise.all([
    prisma.songLike.count({ where: { userId } }),
    prisma.songComment.count({ where: { userId } }),
    prisma.maloofLike.count({ where: { userId } }),
    prisma.maloofComment.count({ where: { userId } })
  ])

  return {
    songLikes,
    songComments,
    maloofLikes,
    maloofComments,
    totalActivity: songLikes + songComments + maloofLikes + maloofComments
  }
} 