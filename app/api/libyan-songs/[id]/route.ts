import { NextResponse } from 'next/server'
import { getLibyanSongById } from '@/lib/server-data'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const song = getLibyanSongById(id)
    
    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }
    
    return NextResponse.json(song)
  } catch (error) {
    console.error('Error fetching Libyan song:', error)
    return NextResponse.json({ error: 'Failed to fetch Libyan song' }, { status: 500 })
  }
} 