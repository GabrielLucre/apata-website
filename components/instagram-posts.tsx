"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ExternalLink, Heart, Instagram, MessageCircle, Share } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

// Skeleton component for loading state
const InstagramPostSkeleton = () => (
  <Card className="overflow-hidden border-2 border-gray-100 dark:border-gray-800">
    <CardContent className="p-0">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>

        {/* Actions skeleton */}
        <div className="p-4">
          <div className="flex gap-4 mb-3">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function InstagramPosts() {
  const [isLoading, setIsLoading] = useState(true)
  const [embedsProcessed, setEmbedsProcessed] = useState(false)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState<string[]>([])

  useEffect(() => {
    const cachedPosts = localStorage.getItem("instagramPosts")
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts))
      setIsLoading(false)
    } else {
      fetch("/api/instagram?username=apatataquarituba")
        .then(res => res.json())
        .then(data => {
          setPosts(data.links)
          localStorage.setItem("instagramPosts", JSON.stringify(data.links))
        })
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }
  }, [])

  useEffect(() => {
    if (posts.length === 0) return

    const processInstagramEmbeds = () => {
      try {
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function") {
          window.instgrm.Embeds.process()
          setEmbedsProcessed(true)
          setTimeout(() => setIsLoading(false), 2000)
        }
      } catch (err) {
        console.error("Erro ao processar embeds do Instagram:", err)
        setError(true)
        setIsLoading(false)
      }
    }

    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]')

    if (!existingScript) {
      const script = document.createElement("script")
      script.setAttribute("src", "https://www.instagram.com/embed.js")
      script.setAttribute("async", "")
      script.onload = processInstagramEmbeds
      script.onerror = () => {
        setError(true)
        setIsLoading(false)
      }
      document.body.appendChild(script)
    } else {
      processInstagramEmbeds()
    }

    const timeoutId = setTimeout(() => {
      if (isLoading) setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [posts])

  return (
    <section className="py-20 bg-gray-50 dark:bg-secondary/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Instagram size={16} />
            <span className="font-medium">Siga-nos no Instagram</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
            Nossos <span className="text-primary">Posts</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Acompanhe nosso dia a dia, conheça os animais resgatados e veja as histórias de sucesso através do nosso
            Instagram.
          </p>

          {/* Follow Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link
                href="https://www.instagram.com/apatataquarituba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                <span>Seguir @apatataquarituba</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md mx-auto">
              <Instagram className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">Erro ao carregar posts</h3>
              <p className="text-red-700 dark:text-red-300 text-sm mb-4">
                Não foi possível carregar os posts do Instagram no momento.
              </p>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20 bg-transparent"
                asChild
              >
                <Link href="https://www.instagram.com/apatataquarituba/" target="_blank" rel="noopener noreferrer">
                  Ver no Instagram
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <InstagramPostSkeleton />
                </motion.div>
              ))
              : posts.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl"
                  >
                    <blockquote
                      className="instagram-media w-full"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 rounded-xl pointer-events-none" />
                </motion.div>
              ))}
          </div>
        )}

        {/* Call to Action */}
        {!error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="bg-white dark:bg-secondary/80 rounded-2xl p-8 shadow-lg border-2 border-primary/10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <MessageCircle className="h-6 w-6 text-blue-500" />
                <Share className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">Ajude a Espalhar a Palavra!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Curta, comente e compartilhe nossos posts para ajudar mais pessoas a conhecerem nosso trabalho e os
                animais que precisam de um lar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/80 text-secondary" asChild>
                  <Link href="https://www.instagram.com/apatataquarituba/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                    Seguir no Instagram
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
