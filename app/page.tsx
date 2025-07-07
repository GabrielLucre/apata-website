import AboutSection from "@/components/about-section"
import AdoptionSection from "@/components/adoption-section"
import Hero from "@/components/hero"
import InstagramPosts from "@/components/instagram-posts"
import StoriesSection from "@/components/stories-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AdoptionSection />
      <InstagramPosts />
      <AboutSection />
      <StoriesSection />
    </div>
  )
}

// TODO: relatório