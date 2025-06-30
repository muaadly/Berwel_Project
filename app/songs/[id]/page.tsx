import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SongDetail from "@/components/song-detail"

interface SongPageProps {
  params: {
    id: string
  }
}

export default function SongPage({ params }: SongPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <SongDetail songId={params.id} />
      <Footer />
    </div>
  )
}
