"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  Check,
  Copy,
  DollarSign,
  Heart,
  Home,
  PawPrint,
  QrCode,
  Smartphone,
  Stethoscope
} from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [donationSubmitted, setDonationSubmitted] = useState(false)

  // PIX key for donations (this would be your actual PIX key)
  const pixKey = "12.164.664/0001-75"

  const donationAmounts = [25, 50, 100, 200, 500, 1000]

  const impactData = [
    {
      amount: 25,
      impact: "Alimentar 5 animais por um dia",
      icon: <PawPrint className="h-6 w-6 text-primary" />,
    },
    {
      amount: 50,
      impact: "Fornecer cuidados veterinários básicos",
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
    },
    {
      amount: 100,
      impact: "Abrigar um animal por uma semana",
      icon: <Home className="h-6 w-6 text-primary" />,
    },
    {
      amount: 200,
      impact: "Vacinar 10 animais",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
  ]

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy PIX key:", err)
    }
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDonationSubmitted(true)
    setTimeout(() => setDonationSubmitted(false), 3000)
  }

  const getSelectedAmountValue = () => {
    if (selectedAmount) return selectedAmount
    if (customAmount) return Number.parseFloat(customAmount)
    return 0
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
              <Heart size={16} />
              <span className="font-medium">Faça a Diferença</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-6">
              Ajude a <span className="text-primary">Salvar Vidas</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sua doação ajuda a APATA a continuar resgatando, cuidando e encontrando lares para animais abandonados.
              Cada real faz a diferença na vida de um animal necessitado.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { number: "50+", label: "Animais Resgatados" },
                { number: "20+", label: "Adoções" },
                { number: "10+", label: "Voluntários" },
                { number: "10+", label: "Anos de Serviço" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-secondary/80 rounded-lg p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PIX Donation Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="text-primary" />
                      Doação via PIX
                    </CardTitle>
                    <CardDescription>Forma mais rápida e segura de doar para a APATA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 block">
                        Escolha o valor da doação:
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {donationAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className={`h-12 ${selectedAmount === amount
                              ? "bg-primary hover:bg-primary/80 text-secondary"
                              : "hover:border-primary hover:text-primary"
                              }`}
                            onClick={() => {
                              setSelectedAmount(amount)
                              setCustomAmount("")
                            }}
                          >
                            R$ {amount}
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Ou digite outro valor:
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type="number"
                            placeholder="0,00"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setSelectedAmount(null)
                            }}
                            className="pl-10"
                            min="1"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Impact Display */}
                    {getSelectedAmountValue() > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-secondary dark:text-white mb-2">Impacto da sua doação:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Com R$ {getSelectedAmountValue().toFixed(2)}, você pode ajudar a{" "}
                          {getSelectedAmountValue() >= 200
                            ? `vacinar ${getSelectedAmountValue() * 10 / 200} animais`
                            : getSelectedAmountValue() >= 100
                              ? "abrigar um animal por uma semana"
                              : getSelectedAmountValue() >= 50
                                ? "fornecer cuidados veterinários básicos"
                                : "alimentar 5 animais por um dia"}
                        </p>
                      </motion.div>
                    )}

                    {/* PIX Key */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Chave PIX da APATA:
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-secondary/50 rounded-lg border">
                        <code className="flex-1 text-sm font-mono">{pixKey}</code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyPixKey}
                          className="shrink-0 bg-transparent"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Clique no botão para copiar a chave PIX
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Como doar via PIX:</h4>
                      <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                        <li>Abra o app do seu banco</li>
                        <li>Escolha a opção PIX</li>
                        <li>Cole a chave PIX ou escaneie o QR Code</li>
                        <li>Digite o valor desejado</li>
                        <li>Confirme a transação</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* QR Code */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-primary/20">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <QrCode className="text-primary" />
                      QR Code PIX
                    </CardTitle>
                    <CardDescription>Escaneie com a câmera do seu celular</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                        <Image
                          src="/qrpix-apata.png"
                          alt="QR Code PIX Apata"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover scale-110"
                        />
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Aponte a câmera do seu celular para o QR Code
                      </p>
                      <Badge variant="outline" className="text-xs">
                        PIX Instantâneo • Seguro • Sem taxas
                      </Badge>
                    </div>

                    <div className="w-full space-y-3 pt-[95px]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Beneficiário:</span>
                        <span className="font-medium">APATA - ASSOCIACAO DE PROTECAO DOS ANIMAIS</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">CNPJ:</span>
                        <span className="font-mono">12.164.664/0001-75</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Banco:</span>
                        <span>Banco do Brasil</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section >

      {/* Impact Section */}
      <section className="py-12 bg-gray-50 dark:bg-secondary/90">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
              Veja o <span className="text-primary">Impacto</span> da Sua Doação
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cada real doado faz a diferença na vida dos animais que resgatamos. Veja como sua contribuição ajuda
              diretamente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">{item.icon}</div>
                    <CardTitle className="text-primary">R$ {item.amount}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300">{item.impact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-12" >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">Obrigado por Fazer a Diferença!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Sua doação nos permite continuar nosso trabalho de resgate, cuidado e adoção de animais abandonados.
              Juntos, estamos construindo um mundo melhor para todos os animais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/80 text-secondary" asChild>
                <Link href="/#stories">Ver Histórias de Sucesso</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/#about">Conhecer Mais Sobre Nós</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section >
    </div >
  )
}

export default DonatePage
