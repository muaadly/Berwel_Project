"use client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 pt-16 space-y-8 pb-20">
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h1 className="text-4xl font-bold mb-6 text-center group-hover:text-orange-500 transition-colors duration-200">About Berwel</h1>
          <p className="text-lg mb-4 text-center text-white">
            Berwel is an interactive digital platform dedicated to documenting, preserving, and sharing Libya's musical heritage—from folk songs to Malouf and Muwashahat. Built by a community of music lovers, researchers, and technologists, Berwel brings Libya's diverse sonic history into the digital age.
          </p>
          <p className="mb-4 text-white">
            The platform allows users to listen to Libyan songs, explore lyrics, discover the stories behind them, and learn about the artists, poets, composers, and cultural movements that shaped them. With a searchable and growing database of more than <span className="font-semibold group-hover:text-orange-400 transition-colors duration-200">1,200 songs</span>, <span className="font-semibold group-hover:text-orange-400 transition-colors duration-200">170 Malouf entries</span>, and a rich set of artist profiles and musical metadata, Berwel offers a living archive of Libya's voice—accessible to all.
          </p>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-orange-400 transition-colors duration-200">🎶 The Berwel Project</h2>
          <p className="mb-4 text-white">
            Berwel was born in 2021 from a simple question: Why isn't there a central online space for Libyan music? What started as a passion project among friends—writing down lyrics, collecting songs, and sharing stories—grew into a larger mission to preserve and revitalize Libya's musical identity.
          </p>
          <p className="mb-0 text-white">
            In a time when much of our cultural memory is at risk of being lost or scattered, Berwel offers a new kind of archive: one that is open, participatory, and rooted in love for this art. The project seeks to bridge generations by making traditional music more discoverable, searchable, and meaningful for new audiences.
          </p>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-orange-400 transition-colors duration-200">📚 What You'll Find in this version</h2>
          <ul className="mb-0 text-white list-disc list-inside space-y-2">
            <li>A searchable digital library of Libyan songs</li>
            <li>Song lyrics, artist bios, composer credits, and musical context</li>
            <li>Malouf and Muwashahat entries with maqam, rhythm, and lyrical breakdowns</li>
          </ul>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-orange-400 transition-colors duration-200">🤝 How You Can Contribute</h2>
          <p className="mb-4 text-white">
            Berwel is not a closed archive—it's a living platform. We welcome anyone passionate about Libyan music, language, or cultural history to join us.
          </p>
          <ul className="mb-4 text-white list-disc list-inside space-y-2">
            <li><span className="font-semibold text-white">Add and correct content:</span> If you know lyrics or details we're missing, submit them! Every entry goes through review before publishing.</li>
            <li><span className="font-semibold text-white">Help with transcription:</span> Listen to rare or old recordings and help us write out the lyrics.</li>
            <li><span className="font-semibold text-white">Collect and curate:</span> Help us gather content from books, recordings, social media, or your family's oral history.</li>
            <li><span className="font-semibold text-white">Join our digital team:</span> If you have web, design, or audio editing skills, your help is especially valuable.</li>
          </ul>
          <p className="mb-0 text-white">
            No matter your background—whether you're a student, artist, techie, or someone who just loves Libyan music—your input matters.
          </p>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-orange-400 transition-colors duration-200">🌍 Why It Matters</h2>
          <p className="mb-4 text-white">
            Libya's musical traditions are as diverse as its geography, dialects, and communities. But decades of instability, neglect, and the lack of formal digital archives have left this heritage vulnerable. Berwel aims to change that—not just by saving the past, but by making it part of the future.
          </p>
          <p className="mb-0 text-white">
            Join us in building something meaningful. Let's reconnect the sounds of Libya—together.
          </p>
        </div>
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-6 shadow-lg text-center text-white text-sm transition-colors duration-200 group hover:border-orange-500">
          This is a <span className="font-semibold group-hover:text-orange-400 transition-colors duration-200">Libyan House for Oud Studies</span> project, with support from <span className="font-semibold group-hover:text-orange-400 transition-colors duration-200">Boursa for trading and investment</span>, and <span className="font-semibold group-hover:text-orange-400 transition-colors duration-200">Alfadaia co. for web development</span>.
        </div>
      </div>
      <Footer />
    </main>
  );
} 