import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LibraryContent from "@/components/library-content"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <LibraryContent />
      <Footer />
    </div>
  )
}
