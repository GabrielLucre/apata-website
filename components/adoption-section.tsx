"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

const AdoptionSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const name = (form.elements.namedItem("reporterName") as HTMLInputElement).value
    const phone = (form.elements.namedItem("reporterPhone") as HTMLInputElement).value
    const location = (form.elements.namedItem("location") as HTMLInputElement).value
    const animalType = (form.elements.namedItem("animalType") as HTMLSelectElement).value
    const condition = (form.elements.namedItem("condition") as HTMLSelectElement).value
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value

    const message = `
🌐 *Mensagem automática do site da ONG APATA - https://apata.site*

📢 *Nova denúncia*

👤 *Nome:* ${name}
📞 *Telefone:* ${phone}
📍 *Local onde o animal foi encontrado:* ${location}
🐾 *Tipo de animal:* ${animalType}
❤️ *Condição do animal:* ${condition}
📝 *Descrição detalhada:* ${description}
`

    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = "5514996927428"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <section id="report" className="py-20 bg-gray-50 dark:bg-secondary/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">Denúncia</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Se você deseja reportar um animal perdido em necessidade, estamos aqui para ajudar a cada passo do caminho.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">Relatar um animal perdido</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Se você encontrou um animal perdido que precisa de ajuda, preencha este formulário com o máximo de detalhes
                possível. Nossa equipe responderá rapidamente para ajudar o animal.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-primary p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary dark:text-white">Emergência?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Se o animal estiver ferido ou em perigo imediato, ligue para nossa linha direta de emergência em<br /> (14) 99692-7428.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="reporterName" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Seu nome
                  </label>
                  <Input id="reporterName" placeholder="Seu nome completo" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reporterPhone" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Telefone
                  </label>
                  <Input id="reporterPhone" type="tel" placeholder="(14) 12345-6789" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Localização onde o animal foi encontrado
                </label>
                <Input id="location" placeholder="Endereço ou marco da rua" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="animalType" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Tipo animal
                  </label>
                  <select
                    id="animalType"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Selecione Tipo</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="condition" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Condição do animal
                  </label>
                  <select
                    id="condition"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Selecione condição</option>
                    <option value="Parece saudável">Parece saudável</option>
                    <option value="Ferido">Ferido</option>
                    <option value="Doente">Doente</option>
                    <option value="Não tenho certeza">Não tenho certeza</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  placeholder="Descreva o animal (raça, cor, tamanho, etc.) e a situação"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-secondary">
                Enviar relatório
              </Button>
              {formSubmitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 dark:text-green-400 text-center mt-2"
                >
                  Obrigado pelo seu relatório!Nossa equipe responderá em breve.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AdoptionSection
