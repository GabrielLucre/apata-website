"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Reportar", href: "/#report" },
    { name: "Sobre Nós", href: "/#about" },
    { name: "Histórias", href: "/#stories" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-secondary dark:bg-secondary/90 backdrop-blur-md shadow-md" : "bg-secondary"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="APATA Logo" width={50} height={50} className="w-10 h-10 md:w-12 md:h-12" />
          <span className="font-bold text-xl text-primary dark:text-primary">APATA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-primary hover:bg-primary/80 text-secundary">
            <Link href="/donate" prefetch={true}>Doe Agora</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-secondary dark:bg-secondary shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white dark:text-white hover:text-primary dark:hover:text-primary py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-primary hover:bg-primary/80 text-secondary w-full mt-2">
              <Link href="/donate" prefetch={true}>Doe Agora</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
