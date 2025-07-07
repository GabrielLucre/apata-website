import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "APATA - Proteção e Adoção de Animais",
  description: "APATA é uma organização sem fins lucrativos dedicada a ajudar os animais perdidos a encontrar lares amorosos.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
