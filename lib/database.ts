import { prisma } from './prisma'
import { User, Song, MaloofEntry, SongLike, SongComment, MaloofLike, MaloofComment } from '@prisma/client'

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
  const existingLike = await prisma.songLike.findUnique({
    where: {
      userId_songId: {
        userId,
        songId
      }
    }
  })

  if (existingLike) {
    // Unlike
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

  return {
    liked: !existingLike,
    count
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
  const existingLike = await prisma.maloofLike.findUnique({
    where: {
      userId_entryId: {
        userId,
        entryId
      }
    }
  })

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