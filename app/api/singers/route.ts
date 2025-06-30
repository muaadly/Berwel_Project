import { NextResponse } from 'next/server'
import { getUniqueSingers } from '@/lib/server-data'

export async function GET() {
  try {
    const singers = getUniqueSingers()
    return NextResponse.json(singers)
  } catch (error) {
    console.error('Error fetching singers:', error)
    return NextResponse.json({ error: 'Failed to fetch singers' }, { status: 500 })
  }
} 