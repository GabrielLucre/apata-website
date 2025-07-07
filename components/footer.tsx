"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowUp, Facebook, Instagram, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="APATA Logo" width={50} height={50} className="w-10 h-10" />
              <span className="font-bold text-xl text-primary">APATA</span>
            </Link>
            <p className="text-gray-300">
              APATA é uma organização sem fins lucrativos dedicada a resgatar, reabilitar e realocar animais abandonados em nossa comunidade.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-secondary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-secondary">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-primary">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Reportar Animal", href: "/#report" },
                { name: "Sobre Nós", href: "/#about" },
                { name: "Histórias de Sucesso", href: "/#stories" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-primary">Entre em Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="text-primary h-5 w-5" />
                <span className="text-gray-300">(14) 99822-5253</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-primary">Ajude Nossa Causa</h3>
            <p className="text-gray-300">
              Sua doação nos ajuda a continuar nossa missão de resgatar e cuidar de animais abandonados.
            </p>
            <Button className="w-full bg-primary hover:bg-primary/80 text-secondary">
              <Link href="/donate" prefetch={true}>Doe Agora</Link>
            </Button>
            <p className="text-gray-300 text-sm">
              A APATA é uma organização sem fins lucrativos. Todas as doações são dedutíveis do imposto de renda.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} APATA. Todos os direitos reservados. Desenvolvido por{" "}
            <a href="https://gabriellucre.vercel.app" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
              Gabriel L.
            </a>
          </p>
        </div>
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 rounded-full bg-primary text-secondary shadow-lg hover:bg-primary/80 z-40"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  )
}

export default Footer
