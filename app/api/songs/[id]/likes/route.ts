import { NextRequest, NextResponse } from 'next/server'
import { toggleSongLike, getSongLikes, getUserSongLike } from '@/lib/database'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await request.json()
    const { id } = await params
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = await toggleSongLike(id, userId)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error toggling song like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const { id } = await params
    
    if (userId) {
      const userLiked = await getUserSongLike(id, userId)
      const { count } = await getSongLikes(id)
      return NextResponse.json({ count, userLiked })
    } else {
      const { count, userLiked } = await getSongLikes(id)
      return NextResponse.json({ count, userLiked })
    }
  } catch (error) {
    console.error('Error fetching song likes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    )
  }
} 