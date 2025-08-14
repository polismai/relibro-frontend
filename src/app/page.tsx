import CarouselTextBanner from "@/components/carousel-text-banner";
import Hero from "@/components/hero";
import Advantages from "@/components/advantages";

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
        <section>
          <Advantages />
        </section>
      </main>
    </div>
  )
}
