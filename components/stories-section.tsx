"use client"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// This would come from your CMS in a real application
const storiesMockData = [
  {
    id: 1,
    title: "A Guerreira Amarula",
    content:
      "Amarula é uma cachorrinha que foi atropelada e teve fraturas nas pernas. Após semanas de atendimento e reabilitação, ela se transformou em um cachorro saudável e amoroso.",
    image: "/historias/amarula.png?height=300&width=300",
    petName: "Amarula",
    petType: "Cachorro",
    adopter: {
      name: "Flavia Carvalho",
      location: "Taquarituba - SP",
    },
    date: "17 Fevereiro, 2024",
  },
]

const StoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextStory = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % storiesMockData.length)
  }

  const prevStory = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + storiesMockData.length) % storiesMockData.length)
  }

  const activeStory = storiesMockData[activeIndex]

  return (
    <section id="stories" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
            Histórias de <span className="text-primary">Sucesso</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cada animal tem uma história. Aqui estão algumas histórias emocionantes de resgate, reabilitação e a jornada para
            encontrar um lar definitivo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={`image-${activeIndex}`}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src={activeStory.image || "/placeholder.svg"}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <Badge className="mb-2 bg-primary text-secondary">{activeStory.petType}</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">{activeStory.petName}</h3>
                  <p className="text-white/80">{activeStory.date}</p>
                </div>
              </div>
            </div>

            {storiesMockData.length > 1 && <div className="absolute -bottom-6 -right-6 flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-white dark:bg-secondary shadow-lg hover:bg-primary hover:text-secondary"
                onClick={prevStory}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-white dark:bg-secondary shadow-lg hover:bg-primary hover:text-secondary"
                onClick={nextStory}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>}
          </motion.div>

          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/20 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Quote className="text-primary h-6 w-6" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">História de Sucesso</span>
                </div>
                <CardTitle className="text-2xl">{activeStory.title}</CardTitle>
                <CardDescription>Uma jornada de resgate para um lar definitivo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{activeStory.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-secondary dark:text-white">{activeStory.adopter.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activeStory.adopter.location}</p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activeIndex + 1} de {storiesMockData.length} histórias
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tem uma história de sucesso para compartilhar? Adoraríamos saber sua experiência pela APATA.
          </p>
          <Button className="bg-primary hover:bg-primary/80 text-secondary" size="lg">
            <Link href="/share-story" prefetch={true}>Compartilhe Sua História</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default StoriesSection
