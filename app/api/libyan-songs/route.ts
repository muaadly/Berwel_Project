import { NextResponse } from 'next/server'
import { getLibyanSongs, getUniqueSingers } from '@/lib/server-data'

export async function GET(request: Request & { nextUrl: { pathname: string } }) {
  if (request.nextUrl.pathname.endsWith('/api/singers')) {
    try {
      const singers = getUniqueSingers()
      return NextResponse.json(singers)
    } catch (error) {
      console.error('Error fetching singers:', error)
      return NextResponse.json({ error: 'Failed to fetch singers' }, { status: 500 })
    }
  }
  try {
    const songs = getLibyanSongs()
    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error fetching Libyan songs:', error)
    return NextResponse.json({ error: 'Failed to fetch Libyan songs' }, { status: 500 })
  }
} 