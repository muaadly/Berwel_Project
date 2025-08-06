import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all users
    const users = await prisma.user.findMany()
    
    // Get total likes and comments
    const [songLikes, songComments, maloofLikes, maloofComments] = await Promise.all([
      prisma.songLike.count(),
      prisma.songComment.count(),
      prisma.maloofLike.count(),
      prisma.maloofComment.count()
    ])

    // Calculate statistics
    const totalUsers = users.length
    const activeUsers = users.filter(user => {
      // A user is considered active if they have any likes or comments
      return songLikes > 0 || songComments > 0 || maloofLikes > 0 || maloofComments > 0
    }).length

    const newUsersThisWeek = users.filter(user => {
      const daysSinceJoin = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      return daysSinceJoin <= 7
    }).length

    const engagementRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        newThisWeek: newUsersThisWeek,
        engagementRate: `${engagementRate}%`
      },
      activity: {
        totalLikes: songLikes + maloofLikes,
        totalComments: songComments + maloofComments,
        songLikes,
        songComments,
        maloofLikes,
        maloofComments
      },
      averages: {
        likesPerUser: totalUsers > 0 ? Math.round((songLikes + maloofLikes) / totalUsers) : 0,
        commentsPerUser: totalUsers > 0 ? Math.round((songComments + maloofComments) / totalUsers) : 0
      },
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
} 