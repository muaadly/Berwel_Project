import { NextRequest, NextResponse } from 'next/server'
import { toggleMaloofLike, getUserMaloofLike } from '@/lib/database'

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

    const result = await toggleMaloofLike(id, userId)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error toggling maloof like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (userId) {
      const userLiked = await getUserMaloofLike(params.id, userId)
      return NextResponse.json({ userLiked })
    } else {
      return NextResponse.json({ userLiked: false })
    }
  } catch (error) {
    console.error('Error fetching maloof likes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    )
  }
} 