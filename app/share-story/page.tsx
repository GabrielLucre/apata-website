"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { firestore } from "@/lib/firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { motion } from "framer-motion"
import { ArrowLeft, Camera, CheckCircle, Heart, PawPrint, Star, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface FormData {
  // Pet Information
  petName: string
  petType: string
  petBreed: string
  adoptionDate: string

  // Adopter Information
  adopterName: string
  adopterEmail: string
  adopterPhone: string
  adopterLocation: string

  // Story Details
  storyTitle: string
  storyContent: string
  favoriteMemory: string
  adviceForAdopters: string

  // Additional Info
  allowContact: boolean
  allowPublicShare: boolean

  // Files
  photos: File[]
}

const ShareStoryPage = () => {
  const [formData, setFormData] = useState<FormData>({
    petName: "",
    petType: "",
    petBreed: "",
    adoptionDate: "",
    adopterName: "",
    adopterEmail: "",
    adopterPhone: "",
    adopterLocation: "",
    storyTitle: "",
    storyContent: "",
    favoriteMemory: "",
    adviceForAdopters: "",
    allowContact: false,
    allowPublicShare: true,
    photos: [],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const totalSteps = 4

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => {
      const isImage = file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isImage && isValidSize
    })

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newFiles].slice(0, 5), // Max 5 photos
    }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "ml_default")

    const res = await fetch("https://api.cloudinary.com/v1_1/apata/image/upload", {
      method: "POST",
      body: data,
    })

    const json = await res.json()
    return json.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const photoUrls = await Promise.all(formData.photos.map(uploadToCloudinary))

      await addDoc(collection(firestore, "stories"), {
        ...formData,
        photos: photoUrls,
        createdAt: Timestamp.now(),
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar história:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.petName && formData.petType && formData.adoptionDate
      case 2:
        return formData.adopterName && formData.adopterEmail && formData.adopterLocation
      case 3:
        return formData.storyTitle && formData.storyContent
      case 4:
        return true
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-secondary dark:text-white mb-4">História Enviada com Sucesso! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Obrigado por compartilhar a história de {formData.petName}! Nossa equipe irá revisar sua submissão e entrar
            em contato em breve. Sua história pode inspirar outras pessoas a adotarem um animal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/80 text-secondary" asChild>
              <Link href="/#stories">Ver Outras Histórias</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-4">
              <Link
                href="/#stories"
                className="inline-flex items-center gap-2 mx-4 text-primary hover:text-primary/80 mb-6 transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar para Histórias
              </Link>
              <div className="inline-flex items-center gap-2 mx-4 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
                <Heart size={16} />
                <span className="font-medium">Compartilhe Sua História</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-4">
              Conte a História do Seu <span className="text-primary">Pet Adotado</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Sua história de adoção pode inspirar outras pessoas a darem uma segunda chance a um animal necessitado.
              Compartilhe como seu pet transformou sua vida!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${step <= currentStep
                    ? "bg-primary text-secondary"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                >
                  {step < currentStep ? <CheckCircle size={20} /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 w-10 md:w-24 transition-all duration-300 ${step < currentStep ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-secondary dark:text-white">
              {currentStep === 1 && "Informações do Pet"}
              {currentStep === 2 && "Suas Informações"}
              {currentStep === 3 && "Conte Sua História"}
              {currentStep === 4 && "Fotos e Finalização"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Passo {currentStep} de {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Pet Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="petName">Nome do Pet *</Label>
                        <Input
                          id="petName"
                          placeholder="Ex: Max, Luna, Bella..."
                          value={formData.petName}
                          onChange={(e) => handleInputChange("petName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="petType">Tipo de Animal *</Label>
                        <select
                          id="petType"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={formData.petType}
                          onChange={(e) => handleInputChange("petType", e.target.value)}
                          required
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="Cão">Cão</option>
                          <option value="Gato">Gato</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="petBreed">Raça (se souber)</Label>
                        <Input
                          id="petBreed"
                          placeholder="Ex: SRD, Golden Retriever, Siamês..."
                          value={formData.petBreed}
                          onChange={(e) => handleInputChange("petBreed", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adoptionDate">Data da Adoção *</Label>
                        <Input
                          id="adoptionDate"
                          type="date"
                          value={formData.adoptionDate}
                          onChange={(e) => handleInputChange("adoptionDate", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <PawPrint className="text-primary h-5 w-5 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-secondary dark:text-white">Dica</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Essas informações nos ajudam a organizar melhor as histórias e mostrar a diversidade dos
                            animais que encontram lares amorosos através da APATA.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Adopter Information */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adopterName">Seu Nome *</Label>
                        <Input
                          id="adopterName"
                          placeholder="Nome completo"
                          value={formData.adopterName}
                          onChange={(e) => handleInputChange("adopterName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adopterEmail">Seu Email *</Label>
                        <Input
                          id="adopterEmail"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.adopterEmail}
                          onChange={(e) => handleInputChange("adopterEmail", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="adopterPhone">Telefone (opcional)</Label>
                        <Input
                          id="adopterPhone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.adopterPhone}
                          onChange={(e) => handleInputChange("adopterPhone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adopterLocation">Cidade/Estado *</Label>
                        <Input
                          id="adopterLocation"
                          placeholder="Ex: São Paulo, SP"
                          value={formData.adopterLocation}
                          onChange={(e) => handleInputChange("adopterLocation", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
                      <div className="flex items-start gap-3">
                        <Heart className="text-blue-500 h-5 w-5 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">Privacidade</h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Suas informações pessoais são mantidas em segurança. Você pode escolher se deseja ser
                            contatado e como sua história será compartilhada na próxima etapa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Story Content */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="storyTitle">Título da História *</Label>
                      <Input
                        id="storyTitle"
                        placeholder="Ex: Como o Max mudou minha vida, A jornada da Luna..."
                        value={formData.storyTitle}
                        onChange={(e) => handleInputChange("storyTitle", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storyContent">Conte sua história *</Label>
                      <Textarea
                        id="storyContent"
                        placeholder="Conte como foi o processo de adoção, como seu pet se adaptou, que mudanças trouxe para sua vida, momentos especiais que viveram juntos..."
                        value={formData.storyContent}
                        onChange={(e) => handleInputChange("storyContent", e.target.value)}
                        rows={6}
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Mínimo 100 caracteres ({formData.storyContent.length}/100)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="favoriteMemory">Memória Favorita (opcional)</Label>
                      <Textarea
                        id="favoriteMemory"
                        placeholder="Qual é sua memória favorita com seu pet? Um momento especial, engraçado ou emocionante..."
                        value={formData.favoriteMemory}
                        onChange={(e) => handleInputChange("favoriteMemory", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adviceForAdopters">Conselho para Futuros Adotantes (opcional)</Label>
                      <Textarea
                        id="adviceForAdopters"
                        placeholder="Que conselho você daria para alguém que está pensando em adotar um animal?"
                        value={formData.adviceForAdopters}
                        onChange={(e) => handleInputChange("adviceForAdopters", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-primary p-4">
                      <div className="flex items-start gap-3">
                        <Star className="text-primary h-5 w-5 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-secondary dark:text-white">Dicas para uma boa história</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                            <li>• Seja autêntico e conte com suas próprias palavras</li>
                            <li>• Inclua detalhes sobre a personalidade do seu pet</li>
                            <li>• Mencione os desafios e como os superaram</li>
                            <li>• Destaque os momentos de alegria e transformação</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Photos and Final Settings */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <Label>Fotos do seu Pet (opcional, máximo 5)</Label>

                      {/* File Upload Area */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${dragActive
                          ? "border-primary bg-primary/10"
                          : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5"
                          }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center gap-4">
                            <div className="bg-primary/10 rounded-full p-4">
                              <Camera className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-lg font-medium text-secondary dark:text-white">
                                Clique para selecionar fotos
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">ou arraste e solte aqui</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              JPG, PNG até 1MB cada
                            </Badge>
                          </div>
                        </label>
                      </div>

                      {/* Photo Preview */}
                      {formData.photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {formData.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <img
                                  src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removePhoto(index)}
                              >
                                <X size={12} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Privacy Settings */}
                    <div className="space-y-4 pt-6 border-t">
                      <h4 className="font-medium text-secondary dark:text-white">Configurações de Privacidade</h4>

                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.allowPublicShare}
                            onChange={(e) => handleInputChange("allowPublicShare", e.target.checked)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-medium text-sm">Permitir compartilhamento público</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Sua história pode ser exibida no site da APATA e redes sociais para inspirar outras
                              pessoas
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.allowContact}
                            onChange={(e) => handleInputChange("allowContact", e.target.checked)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-medium text-sm">Permitir contato da APATA</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              A APATA pode entrar em contato para mais detalhes ou atualizações sobre sua história
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900 dark:text-green-100">Quase pronto!</h4>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            Revise suas informações e clique em "Enviar História" para compartilhar sua experiência com
                            a comunidade APATA.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextStep();
                      }}
                      disabled={!isStepValid()}
                      className="bg-primary hover:bg-primary/80 text-secondary"
                    >
                      Próximo
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isStepValid()}
                      className="bg-primary hover:bg-primary/80 text-secondary"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-4 w-4" />
                          Enviar História
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ShareStoryPage
