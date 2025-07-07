"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Heart, PawPrint } from "lucide-react"
import { FaPaw } from "react-icons/fa";
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0 paw-print-bg opacity-5"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit mt-6 lg:mt-0">
              <PawPrint size={16} />
              <span className="font-medium">Ajudando Patas, Mudando Vidas</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary dark:text-white">
              Dé a Animais de Rua uma <span className="text-primary">Segunda Chance</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              APATA é dedicata a resgatar, reabilitar e realocação de animais de rua. Junte-se a nós em nossa missão de proporcionar a cada animal o amor e o cuidado que eles merecem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-secondary" asChild>
                <Link href="#report">
                  <span>Reportar Animal de Rua</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white dark:border-secondary flex items-center justify-center"
                  >
                    <PawPrint size={16} className="text-primary" style={{ transform: `rotate(${i * 45}deg)` }} />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-bold">50+</span> animais resgatados esse ano
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-white dark:bg-secondary/80 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="min-w-full min-h-full">
                    <img
                      src="/apata-pet.png?height=300&width=300"
                      alt="Animais dentro de uma pata amarela"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
