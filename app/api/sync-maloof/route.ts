import { NextRequest, NextResponse } from 'next/server'
import { syncMaloofEntriesToDatabase } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting Maloof entries sync...')
    await syncMaloofEntriesToDatabase()
    return NextResponse.json({ success: true, message: 'Maloof entries synced successfully' })
  } catch (error) {
    console.error('Error syncing Maloof entries:', error)
    return NextResponse.json(
      { error: 'Failed to sync Maloof entries', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
