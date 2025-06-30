import { NextResponse } from 'next/server'
import { getMaloofEntryById } from '@/lib/server-data'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const entry = getMaloofEntryById(params.id)
    
    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }
    
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error fetching Maloof entry:', error)
    return NextResponse.json({ error: 'Failed to fetch Maloof entry' }, { status: 500 })
  }
} 