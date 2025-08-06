import { NextRequest, NextResponse } from 'next/server'
import { addMaloofComment, getMaloofComments, editMaloofComment, deleteMaloofComment } from '@/lib/database'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, text } = await request.json()
    const { id } = await params
    
    if (!userId || !text) {
      return NextResponse.json(
        { error: 'User ID and text are required' },
        { status: 400 }
      )
    }

    const comment = await addMaloofComment(id, userId, text)
    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error adding maloof comment:', error)
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const comments = await getMaloofComments(id)
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching maloof comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { commentId, userId, text } = await request.json()
    const { id } = await params
    
    if (!commentId || !userId || !text) {
      return NextResponse.json(
        { error: 'Comment ID, user ID, and text are required' },
        { status: 400 }
      )
    }

    const comment = await editMaloofComment(commentId, userId, text)
    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error editing maloof comment:', error)
    return NextResponse.json(
      { error: 'Failed to edit comment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { commentId, userId } = await request.json()
    const { id } = await params
    
    if (!commentId || !userId) {
      return NextResponse.json(
        { error: 'Comment ID and user ID are required' },
        { status: 400 }
      )
    }

    await deleteMaloofComment(commentId, userId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting maloof comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
} 