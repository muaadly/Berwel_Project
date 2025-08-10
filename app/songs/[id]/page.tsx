import { Metadata } from 'next'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SongDetail from "@/components/song-detail"
import { getLibyanSongById } from "@/lib/server-data"
import { getSingerImagePath } from "@/lib/data"
import SongPageClient from "./song-page-client"

interface SongPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { id } = await params
  const song = await getLibyanSongById(id)
  
  if (!song) {
    return {
      title: 'Song Not Found - Berwel',
      description: 'The requested song could not be found.',
    }
  }

  const singerImageUrl = getSingerImagePath(song.imageName)
  const fullImageUrl = `https://www.berwel.ly${singerImageUrl}`

  return {
    title: `${song.songName} by ${song.singer} - Berwel`,
    description: `Listen to "${song.songName}" by ${song.singer} on Berwel - A Website for Libyan Music. Category: ${song.category}`,
    openGraph: {
      title: `${song.songName} by ${song.singer}`,
      description: `Listen to "${song.songName}" by ${song.singer} on Berwel - A Website for Libyan Music. Category: ${song.category}`,
      type: 'music.song',
      siteName: 'Berwel',
      url: `https://www.berwel.ly/songs/${song.id}`,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${song.singer} - ${song.songName}`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${song.songName} by ${song.singer}`,
      description: `Listen to "${song.songName}" by ${song.singer} on Berwel - A Website for Libyan Music. Category: ${song.category}`,
      images: [fullImageUrl],
      creator: '@berwel_ly',
    },
    other: {
      'image:width': '1200',
      'image:height': '630',
    },
  }
}

export default async function SongPage({ params }: SongPageProps) {
  const { id } = await params
  
  return <SongPageClient songId={id} />
}
