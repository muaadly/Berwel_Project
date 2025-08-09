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

  const entryImageUrl = getEntryTypeImagePath(entry.typeEntryImage)
  const fullImageUrl = `https://www.berwel.ly${entryImageUrl}`

  return {
    title: `${entry.entryName} - Maloof Entry - Berwel`,
    description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
    openGraph: {
      title: `${entry.entryName} - Maloof Entry`,
      description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
      type: 'article',
      siteName: 'Berwel',
      images: [
        {
          url: fullImageUrl,
          width: 400,
          height: 400,
          alt: `${entry.entryName} - Maloof Entry`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entry.entryName} - Maloof Entry`,
      description: `Explore "${entry.entryName}" - A Maloof Entry on Berwel - A Website for Libyan Music. Type: ${entry.entryType}, Rhythm: ${entry.entryRhythm}`,
      images: [fullImageUrl],
    },
  }
}

export default async function MaloofPage({ params }: MaloofPageProps) {
  const { id } = await params
  
  return <MaloofPageClient entryId={id} />
}
