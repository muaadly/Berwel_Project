import { NextResponse } from 'next/server'
import { getLibyanSongs, getMaloofEntries } from '@/lib/server-data'

export async function GET() {
  try {
    console.log('=== TESTING DATA LOADING ===')
    
    // Test Libyan Songs
    console.log('Loading Libyan songs...')
    const songs = getLibyanSongs()
    console.log('Libyan songs loaded:', songs.length)
    console.log('First song:', songs[0])
    
    // Test Maloof Entries
    console.log('Loading Maloof entries...')
    const entries = getMaloofEntries()
    console.log('Maloof entries loaded:', entries.length)
    console.log('First entry:', entries[0])
    
    return NextResponse.json({
      success: true,
      songs: {
        count: songs.length,
        first: songs[0] || null
      },
      entries: {
        count: entries.length,
        first: entries[0] || null
      }
    })
  } catch (error) {
    console.error('Error in test-data API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
