import Image from "next/image"

export default function Hero() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Image src="/Data/Berwel Data Org/Logoo.png" alt="Berwel Logo" width={300} height={300} className="mx-auto rounded-lg" />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">A Website for Libyan Music</h1>

          <div className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto space-y-4">
            <p>Berwel is an interactive digital platform for Libya's musical heritage.</p>
            <p>
              It allows everyone to explore Libyan songs, listen to them, read their lyrics, and discover the cultural
              stories and contexts behind them.
            </p>
            <p>
              We welcome all contributions in building a rich, living musical library that reflects Libya's diversity
              and authentic voice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
