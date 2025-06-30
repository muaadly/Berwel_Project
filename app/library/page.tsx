import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LibraryContent from "@/components/library-content"
import { Suspense } from "react"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <LibraryContent />
      </Suspense>
      <Footer />
    </div>
  )
}
