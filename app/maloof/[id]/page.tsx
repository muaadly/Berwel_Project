import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MaloofDetail from "@/components/maloof-detail"

interface MaloofPageProps {
  params: {
    id: string
  }
}

export default async function MaloofPage({ params }: MaloofPageProps) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <MaloofDetail entryId={id} />
      <Footer />
    </div>
  )
}
