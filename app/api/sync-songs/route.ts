import { NextRequest, NextResponse } from 'next/server'
import { syncSongsToDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting song sync...')
    await syncSongsToDatabase()
    return NextResponse.json({ success: true, message: 'Songs synced successfully' })
  } catch (error) {
    console.error('Error syncing songs:', error)
    return NextResponse.json(
      { error: 'Failed to sync songs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
