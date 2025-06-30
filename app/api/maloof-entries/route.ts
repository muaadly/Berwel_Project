import { NextResponse } from 'next/server'
import { getMaloofEntries } from '@/lib/server-data'

export async function GET() {
  try {
    const entries = getMaloofEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching Maloof entries:', error)
    return NextResponse.json({ error: 'Failed to fetch Maloof entries' }, { status: 500 })
  }
} 