import { Metadata } from 'next'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MaloofDetail from "@/components/maloof-detail"
import { getMaloofEntryById } from "@/lib/server-data"
import { getEntryTypeImagePath } from "@/lib/data"
import MaloofPageClient from "./maloof-page-client"

interface MaloofPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: MaloofPageProps): Promise<Metadata> {
  const { id } = await params
  const entry = await getMaloofEntryById(id)
  
  if (!entry) {
    return {
      title: 'Maloof Entry Not Found - Berwel',
      description: 'The requested maloof entry could not be found.',
    }
  }

  // Add cache-busting parameter to force social media platforms to re-fetch
  const simpleImageUrl = `https://www.berwel.ly/images/maloof/${entry.typeEntryImage}?v=2`
  


  return {
    title: `${entry.entryName} - Maloof Entry - Berwel`,
    description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
    openGraph: {
      title: `${entry.entryName} - Maloof Entry`,
      description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
      type: 'article',
      siteName: 'Berwel',
      url: `https://www.berwel.ly/maloof/${entry.id}`,
      images: [
        {
          url: simpleImageUrl,
          width: 1200,
          height: 630,
          alt: `${entry.entryName} - Maloof Entry`,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entry.entryName} - Maloof Entry`,
      description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
      images: [simpleImageUrl],
      creator: '@berwel_ly',
    },
    other: {
      'image:width': '1200',
      'image:height': '630',
      'og:image': simpleImageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'og:image:secure_url': simpleImageUrl,
      'twitter:image:alt': `${entry.entryName} - Maloof Entry`,
    },
  }
}

export default async function MaloofPage({ params }: MaloofPageProps) {
  const { id } = await params
  
  return <MaloofPageClient entryId={id} />
}
