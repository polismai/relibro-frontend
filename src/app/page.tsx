import ChooseCategory from "@/components/choose-category";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <section className="w-full mx-auto">
          <Hero />
        </section>
        <section>
          <ChooseCategory />
        </section>
      </main>
    </div>
  )
}
