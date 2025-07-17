"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Home, Scissors, Stethoscope, Truck } from "lucide-react"
import Link from "next/link"

const AboutSection = () => {
  const stats = [
    { value: "50+", label: "Animais Resgatados" },
    { value: "20+", label: "Adoções" },
    { value: "10+", label: "Voluntários" },
    { value: "10+", label: "Anos de Serviço" },
  ]

  const services = [
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "Abrigo e cuidado",
      description: "Fornecemos abrigo seguro, alimentos nutritivos e cuidados amorosos para todos os animais necessitados.",
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-primary" />,
      title: "Serviços veterinários",
      description: "Nossa equipe de veterinários garante que todos os animais recebam atenção médica adequada.",
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Operações de resgate",
      description: "Nossa equipe de resgate responde rapidamente a relatos de animais perdidos ou feridos.",
    },
    {
      icon: <Scissors className="h-10 w-10 text-primary" />,
      title: "Castramento gratuito",
      description: "Oferecemos castração gratuita para ajudar no controle populacional e bem-estar dos animais.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-secondary/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
            Sobre <span className="text-primary">APATA</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Somos uma organização sem fins lucrativos dedicada e comprometida em resgatar, reabilitar e realocar animais abandonados
            em nossa comunidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-6">Nossa Missão</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Na APATA, nossa missão é criar um mundo onde cada animal tenha um lar amoroso e receba o cuidado que
              merece. Trabalhamos incansavelmente para resgatar animais abandonados, fornecer-lhes cuidados médicos e encontrar
              lares permanentes e amorosos para eles.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Fundada em 2013, a APATA cresceu de um pequeno grupo de voluntários apaixonados para uma reconhecida organização sem fins lucrativos
              com instalações dedicadas e equipe profissional. Nosso compromisso com o bem-estar animal impulsiona
              tudo o que fazemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/80 text-secondary" asChild>
                <Link href="#stories">
                  <Heart className="mr-2 h-4 w-4" />
                  Nossas Histórias
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg overflow-hidden h-40">
                  <img
                    src="/equipe/equipe2.jpg?height=300&width=300"
                    alt="APATA Team"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg overflow-hidden h-64">
                  <img
                    src="/equipe/equipe1.jpg?height=300&width=300"
                    alt="APATA Facility"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg overflow-hidden h-64">
                  <img
                    src="/equipe/equipe5.jpg?height=300&width=300"
                    alt="Rescued Animals"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg overflow-hidden h-40">
                  <img
                    src="/equipe/equipe6.jpg?height=300&width=300"
                    alt="Adoption Day"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-full w-24 h-24 flex items-center justify-center text-secondary font-bold text-xl leading-none shadow-lg">
              <span className="pl-4">Desde 2013</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-secondary/80 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">Nossos Serviços</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Oferecemos cuidados abrangentes para animais necessitados por meio de nossos vários programas e serviços.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-primary transition-all duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-300">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
