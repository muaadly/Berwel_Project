import { NextRequest, NextResponse } from 'next/server'
import { toggleSongLike, getSongLikes, getUserSongLike } from '@/lib/database'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('POST /api/songs/[id]/likes - Starting request')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { userId } = body
    const { id } = await params
    
    console.log('Extracted userId:', userId, 'songId:', id)
    
    if (!userId) {
      console.log('Error: User ID is missing')
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    console.log('Calling toggleSongLike with songId:', id, 'userId:', userId)
    const result = await toggleSongLike(id, userId)
    console.log('toggleSongLike result:', result)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error toggling song like:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
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