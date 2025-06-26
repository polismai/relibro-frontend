import CarouselTextBanner from "@/components/carousel-text-banner";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <section>
          <CarouselTextBanner />
        </section>
        <section className="w-full mx-auto">
          <Hero />
        </section>
      </main>
    </div>
  )
}
