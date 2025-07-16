"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Download, Crown, Truck, Music, Zap, Settings, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RequirementsModal from "@/components/requirements-modal"
import PcRequirementsModal from "@/components/pc-requirements-modal"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const gameFeatures = [
  {
    id: 0,
    title: "SEJA UM POLICIAL",
    description:
      "Entre para a força policial e mantenha a ordem em Los Santos. Patrulhe as ruas, investigue crimes e proteja os cidadãos. Suba na hierarquia e torne-se um detetive respeitado.",
    image: "/images/be_a_cop.webp",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 1,
    title: "GUERRA DO MORRO",
    description:
      "Participe de uma intensa guerra que ocorre em horários específicos em uma área especialmente modelada para nosso servidor. Lute para conquistar o morro ou defenda seu domínio com unhas e dentes.",
    image: "/images/hill_war.webp",
    icon: Zap,
    color: "from-red-500 to-red-600",
  },
  {
    id: 2,
    title: "MONTE SUA GANGUE",
    description:
      "Crie ou junte-se a uma organização criminosa. Planeje assaltos, controle territórios e construa um império do crime. Forme alianças ou declare guerra contra outras facções.",
    image: "/images/build_gang.webp",
    icon: Crown,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    title: "ROUBE CARROS FORTES",
    description:
      "Organize heists épicos contra carros blindados cheios de dinheiro. Planeje cada detalhe, reúna sua equipe e execute o roubo perfeito. Mas cuidado com a polícia!",
    image: "/images/armored_truck.webp",
    icon: Truck,
    color: "from-green-500 to-green-600",
  },
  {
    id: 4,
    title: "EVENTOS ESPECIAIS",
    description:
      "Participe de eventos únicos como shows, competições de drift, torneios de tiro e muito mais. Ganhe prêmios exclusivos e divirta-se com a comunidade.",
    image: "/images/events.webp",
    icon: Music,
    color: "from-yellow-500 to-orange-500",
  },
]

const faqItems = [
  {
    id: 1,
    question: "O QUE É SA:MP?",
    answer:
      "É um mod (modificação) que permite aos jogadores acessarem o modo multiplayer GTA-SA. Os jogadores podem se conectar a servidores dedicados e interagir com outros jogadores em tempo real no mundo aberto do GTA San Andreas.",
  },
  {
    id: 2,
    question: "O QUE É EAGLE VISION?",
    answer: "Eagle Vision é uma empresa de rede servidores SA:MP, e o Shox faz parte dessa rede.",
  },
  {
    id: 3,
    question: "COMO COMPRAR MOEDAS?",
    answer: "Clique no botão Recarregar Moedas, ele fica no canto superior direito.",
  },
  {
    id: 4,
    question: "COMO ME TORNAR UM ADMINISTRADOR?",
    answer:
      "Mensalmente abrimos inscrições para helpers, e esse é o primeiro passo para ser um administrador, conforme o seu desempenho, você irá evoluindo de cargo na administração.",
  },
]

const socialMediaLinks = [
  {
    name: "YouTube",
    icon: "/images/youtube-logo.webp",
    url: "https://youtube.com/@redeparadox",
    hoverColor: "hover:bg-red-500/20",
  },
  {
    name: "Facebook",
    icon: "/images/facebook-logo.webp",
    url: "https://facebook.com/redeparadox",
    hoverColor: "hover:bg-blue-500/20",
  },
  {
    name: "Instagram",
    icon: "/images/instagram-logo.webp",
    url: "https://instagram.com/redeparadox",
    hoverColor: "hover:bg-pink-500/20",
  },
]

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [nextFeature, setNextFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false)
  const [isPcRequirementsModalOpen, setIsPcRequirementsModalOpen] = useState(false)
  const [openFaqItem, setOpenFaqItem] = useState<number[] | null>(null)

  // Scroll reveal hooks with bidirectional animations
  const heroReveal = useScrollReveal({ threshold: 0.1, reverseOnExit: true })
  const featuresReveal = useScrollReveal({ threshold: 0.2, reverseOnExit: true })
  const mobileReveal = useScrollReveal({ threshold: 0.3, reverseOnExit: true })
  const pcReveal = useScrollReveal({ threshold: 0.3, reverseOnExit: true })
  const faqReveal = useScrollReveal({ threshold: 0.3, reverseOnExit: true })
  const socialReveal = useScrollReveal({ threshold: 0.3, reverseOnExit: true })

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleFeatureTransition((activeFeature + 1) % gameFeatures.length)
          return 0
        }
        return prev + 1 // Aumenta 1% a cada 100ms = 10 segundos total (mais lento)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeFeature])

  const handleFeatureTransition = (newIndex: number) => {
    if (newIndex === activeFeature) return

    setIsTransitioning(true)
    setNextFeature(newIndex)

    // Após a animação de saída, muda o conteúdo
    setTimeout(() => {
      setActiveFeature(newIndex)

      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400) // Metade da duração da transição
  }

  const handleFeatureClick = (index: number) => {
    if (index === activeFeature || isTransitioning) return

    setIsAutoPlaying(false)
    setProgress(0)
    handleFeatureTransition(index)

    // Reativa o autoplay após a transição completa
    setTimeout(() => {
      setIsAutoPlaying(true)
      setProgress(0)
    }, 900) // Aguarda a transição completa
  }

  const toggleAllFaqItems = () => {
    if (openFaqItem && openFaqItem.length === faqItems.length) {
      setOpenFaqItem(null) // Close all
    } else {
      setOpenFaqItem(faqItems.map((item) => item.id)) // Open all
    }
  }

  const toggleFaqItem = (id: number) => {
    setOpenFaqItem((prev) => {
      if (prev === null) {
        // If all were closed, open this one
        return [id]
      } else if (prev.includes(id)) {
        // If this one was open, close it
        const newOpen = prev.filter((itemId) => itemId !== id)
        return newOpen.length === 0 ? null : newOpen // If no items are open, set to null
      } else {
        // If this one was closed, open it
        return [...prev, id]
      }
    })
  }

  const currentFeature = gameFeatures[activeFeature]

  // Helper function to get animation classes
  const getAnimationClass = (baseClass: string, isVisible: boolean, hasBeenVisible: boolean) => {
    if (!hasBeenVisible) {
      return baseClass // Initial hidden state
    }
    if (isVisible) {
      return `${baseClass} scroll-reveal-visible` // Entering
    } else {
      return `${baseClass} scroll-reveal-exit` // Exiting
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3b0764] via-[#4c1d95] to-[#3b0764]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div
          ref={heroReveal.ref}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-left">
            <div
              className={`${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "0ms" }}
            ></div>

            <div
              className={`${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "200ms" }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                VENHA FAZER PARTE
                <br />
                <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                  DESSA FAMÍLIA
                </span>
              </h1>
            </div>

            <div
              className={`w-16 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 mb-8 ${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "400ms" }}
            ></div>

            <div
              className={`${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "600ms" }}
            >
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed">
                Venha fazer parte do mundo virtual que você sempre desejou! No Rede Paradox GTA SA-MP RPG, a diversão
                não tem limites. Mergulhe na adrenalina das ruas, onde sua imaginação ganha vida em um universo cheio de
                possibilidades.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 ${getAnimationClass("scroll-reveal-right", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "800ms" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold border-0 rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                <Link href="/downloads">BAIXAR AGORA</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Character */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className={`relative ${getAnimationClass("scroll-reveal-zoom", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "1000ms" }}
            >
              {/* Glow effect behind character */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-3xl scale-110 animate-pulse"></div>

              {/* Character Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/character.webp"
                  alt="Personagem RPG Feminina"
                  width={500}
                  height={600}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating elements around character */}
              <div className="absolute top-20 -left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-40 -right-8 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-32 -left-6 w-5 h-5 bg-purple-300 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
          style={{ animationDelay: "1200ms" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-[#3b0764] to-slate-900 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-40 w-20 h-20 bg-purple-500 rounded-full opacity-30 animate-pulse delay-500"></div>
        <div className="absolute top-60 right-60 w-16 h-16 bg-purple-400 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-600 rounded-full opacity-20 animate-pulse delay-700"></div>

        <div ref={featuresReveal.ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl scale-110 animate-pulse"></div>

              {/* Container para as imagens com crossfade */}
              <div
                className={`relative z-10 w-[500px] h-[400px] ${getAnimationClass("scroll-reveal-left", featuresReveal.isVisible, featuresReveal.hasBeenVisible)}`}
              >
                <Image
                  src={currentFeature.image || "/placeholder.svg"}
                  alt={currentFeature.title}
                  width={500}
                  height={400}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-all duration-800 ease-in-out ${
                    isTransitioning ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
                  }`}
                  key={`feature-${activeFeature}`}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left">
            <div
              className={`transition-all duration-800 ease-in-out transform ${getAnimationClass("scroll-reveal-right", featuresReveal.isVisible, featuresReveal.hasBeenVisible)} ${
                isTransitioning ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-8 leading-tight">
                {currentFeature.title}
              </h2>

              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">{currentFeature.description}</p>
            </div>

            {/* Progress Bar */}
            <div
              className={`w-full h-3 bg-slate-700/50 rounded-full mb-8 overflow-hidden backdrop-blur-sm border border-slate-600/30 ${getAnimationClass("scroll-reveal-up", featuresReveal.isVisible, featuresReveal.hasBeenVisible)}`}
              style={{ animationDelay: "600ms" }}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 blur-sm"></div>
              </div>
            </div>

            {/* Feature Icons */}
            <div
              className={`flex justify-center lg:justify-start gap-4 flex-wrap mb-6 ${getAnimationClass("scroll-reveal-up", featuresReveal.isVisible, featuresReveal.hasBeenVisible)}`}
              style={{ animationDelay: "800ms" }}
            >
              {gameFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                const isActive = index === activeFeature

                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureClick(index)}
                    disabled={isTransitioning}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-br ${feature.color} scale-110 shadow-2xl`
                        : "bg-gradient-to-br from-slate-700 to-slate-800 hover:from-purple-600 hover:to-purple-700"
                    } ${isTransitioning ? "pointer-events-none opacity-75" : ""}`}
                  >
                    {/* Active indicator ring */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
                    )}

                    {/* Icon with smooth transition */}
                    <IconComponent
                      className={`w-8 h-8 text-white transition-all duration-300 ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                    />

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                )
              })}
            </div>

            {/* Feature indicator dots */}
            <div
              className={`flex justify-center lg:justify-start gap-3 ${getAnimationClass("scroll-reveal-up", featuresReveal.isVisible, featuresReveal.hasBeenVisible)}`}
              style={{ animationDelay: "1000ms" }}
            >
              {gameFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-500 transform ${
                    index === activeFeature
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-125 shadow-lg"
                      : "bg-slate-600 hover:bg-purple-600 hover:scale-110"
                  } ${isTransitioning ? "pointer-events-none opacity-75" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Gaming Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0764] via-[#4c1d95] to-[#3b0764]"></div>
        <div className="absolute top-0 left-0 right-0 h-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div ref={mobileReveal.ref} className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Phone mockup */}
            <div className="relative flex justify-center lg:justify-start">
              <div
                className={`relative transform hover:scale-105 transition-all duration-500 ${getAnimationClass("scroll-reveal-left", mobileReveal.isVisible, mobileReveal.hasBeenVisible)}`}
              >
                {/* Phone glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-[3rem] blur-2xl scale-110 animate-pulse"></div>

                {/* Phone container */}
                <div className="relative z-10 w-[320px] h-[640px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-2 shadow-2xl border border-slate-700">
                  {/* Screen */}
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between px-6 text-white text-xs z-20">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* Game screenshot */}
                    <Image
                      src="/images/rede-paradox-launcher-screenshot.avif"
                      alt="Rede Paradox Launcher"
                      width={320}
                      height={640}
                      className="w-full h-full object-cover"
                    />

                    {/* Screen overlay for better integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                </div>

                {/* Floating elements around phone */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-300 flex items-center justify-center">
                  <span className="text-black text-lg">🎮</span>
                </div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-700"></div>
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-pink-400 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="text-white text-sm">📱</span>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="text-center lg:text-left text-white">
              <div
                className={`${getAnimationClass("scroll-reveal-right", mobileReveal.isVisible, mobileReveal.hasBeenVisible)}`}
                style={{ animationDelay: "300ms" }}
              >
                <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-0 rounded-full px-6 py-2 shadow-lg animate-bounce">
                  📱 Novidade Exclusiva
                </Badge>

                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                  JOGUE SA-MP
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                    NO SEU CELULAR
                  </span>
                </h2>

                <p className="text-xl text-purple-100 mb-12 max-w-2xl leading-relaxed">
                  Agora o que você sempre sonhou pode ser realidade! SA-MP na palma da sua mão. Baixe um de nossos
                  launchers exclusivos para dispositivos Android, diretamente da Google Play, e com poucos cliques,
                  mergulhe em uma experiência sem limites.
                </p>
              </div>

              {/* Download button */}
              <div
                className={`flex flex-col sm:flex-row gap-6 mb-8 ${getAnimationClass("scroll-reveal-up", mobileReveal.isVisible, mobileReveal.hasBeenVisible)}`}
                style={{ animationDelay: "600ms" }}
              >
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-purple-50 border-0 rounded-2xl px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-bold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  BAIXAR AGORA
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsRequirementsModalOpen(true)}
                  className="border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                >
                  📋 VER REQUISITOS MÍNIMOS
                </Button>
              </div>

              {/* Platform badges */}
              <div
                className={`flex items-center justify-center lg:justify-start gap-6 ${getAnimationClass("scroll-reveal-up", mobileReveal.isVisible, mobileReveal.hasBeenVisible)}`}
                style={{ animationDelay: "800ms" }}
              >
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">▶</span>
                  </div>
                  <span className="text-white font-medium">Google Play</span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🦅</span>
                  </div>
                  <span className="text-white font-medium">Rede Paradox</span>
                </div>
              </div>

              {/* Additional info */}
              <div
                className={`mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 ${getAnimationClass("scroll-reveal-up", mobileReveal.isVisible, mobileReveal.hasBeenVisible)}`}
                style={{ animationDelay: "1000ms" }}
              >
                <p className="text-purple-200 text-sm leading-relaxed">
                  <strong className="text-white">💡 Dica:</strong> Para a melhor experiência, recomendamos dispositivos
                  com Android 8.0+ e pelo menos 3GB de RAM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PC Gaming Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-slate-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div ref={pcReveal.ref} className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left text-white">
              <div
                className={`${getAnimationClass("scroll-reveal-left", pcReveal.isVisible, pcReveal.hasBeenVisible)}`}
                style={{ animationDelay: "200ms" }}
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50">
                    <Image
                      src="/images/samp_logo_avatar.webp"
                      alt="SA-MP Avatar"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                      JOGUE NO
                      <br />
                      <span className="text-transparent bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text">
                        COMPUTADOR
                      </span>
                    </h2>
                    <p className="text-slate-400 text-lg">Jogue da velha e boa moda antiga.</p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 ${getAnimationClass("scroll-reveal-up", pcReveal.isVisible, pcReveal.hasBeenVisible)}`}
                style={{ animationDelay: "400ms" }}
              >
                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50 mb-4 mx-auto">
                    <Image
                      src="/images/gta_sa_avatar.webp"
                      alt="GTA SA"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">Baixe e instale</p>
                  <h3 className="text-white font-bold text-lg">GTA SA</h3>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50 mb-4 mx-auto">
                    <Image
                      src="/images/samp_logo_avatar_2.webp"
                      alt="SA:MP"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">Baixe e instale</p>
                  <h3 className="text-white font-bold text-lg">SA:MP</h3>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50 mb-4 mx-auto">
                    <Image
                      src="/images/samp_logo_avatar.webp"
                      alt="Servidor"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">Escolha um</p>
                  <h3 className="text-white font-bold text-lg">Servidor</h3>
                </div>
              </div>

              {/* Requirements Button */}
              <div
                className={`${getAnimationClass("scroll-reveal-up", pcReveal.isVisible, pcReveal.hasBeenVisible)}`}
                style={{ animationDelay: "600ms" }}
              >
                <Button
                  variant="outline"
                  onClick={() => setIsPcRequirementsModalOpen(true)}
                  className="border-2 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm transform hover:scale-105 font-medium"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  VER REQUISITOS MÍNIMOS
                </Button>
              </div>
            </div>

            {/* Right side - PC Gaming Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className={`relative transform hover:scale-105 transition-all duration-500 ${getAnimationClass("scroll-reveal-right", pcReveal.isVisible, pcReveal.hasBeenVisible)}`}
                style={{ animationDelay: "800ms" }}
              >
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-700/50 rounded-3xl blur-2xl scale-110 animate-pulse"></div>

                {/* PC Gaming Image */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/saltando_paradox.png"
                    alt="Jogando GTA SA-MP no PC"
                    width={600}
                    height={400}
                    className="drop-shadow-2xl rounded-2xl object-cover"
                    priority
                  />
                </div>

                {/* Floating elements around image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-slate-400 rounded-full animate-bounce delay-300 flex items-center justify-center">
                  <span className="text-black text-lg">🖥️</span>
                </div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-slate-500 rounded-full animate-bounce delay-700"></div>
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-slate-600 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="text-white text-sm">🎮</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-slate-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div ref={faqReveal.ref} className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - 3D Character */}
            <div className="relative flex justify-center lg:justify-start">
              <div
                className={`relative transform hover:scale-105 transition-all duration-500 ${getAnimationClass("scroll-reveal-left", faqReveal.isVisible, faqReveal.hasBeenVisible)}`}
              >
                {/* Character glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-700/50 rounded-full blur-3xl scale-110 animate-pulse"></div>

                {/* 3D Character */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/faq-avatar.webp"
                    alt="FAQ Character"
                    width={400}
                    height={500}
                    className="drop-shadow-2xl object-contain"
                    priority
                  />
                </div>

                {/* Floating elements around character */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-slate-400 rounded-full animate-bounce delay-300 flex items-center justify-center">
                  <span className="text-white text-lg">❓</span>
                </div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-slate-500 rounded-full animate-bounce delay-700"></div>
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-slate-600 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="text-white text-sm">💬</span>
                </div>
              </div>
            </div>

            {/* Right side - FAQ Content */}
            <div className="text-center lg:text-left text-white">
              <div
                className={`${getAnimationClass("scroll-reveal-right", faqReveal.isVisible, faqReveal.hasBeenVisible)}`}
                style={{ animationDelay: "300ms" }}
              >
                <Badge className="mb-6 bg-slate-700/50 backdrop-blur-sm text-slate-200 border-0 rounded-full px-6 py-2 shadow-lg animate-bounce">
                  ❓ Tire suas dúvidas
                </Badge>

                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                  <span className="text-transparent bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text">
                    FAQ
                  </span>
                  <br />
                  PERGUNTAS FREQUENTES
                </h2>
              </div>

              {/* FAQ Accordion */}
              <div
                className={`space-y-3 mb-6 ${getAnimationClass("scroll-reveal-up", faqReveal.isVisible, faqReveal.hasBeenVisible)}`}
                style={{ animationDelay: "600ms" }}
              >
                {faqItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <button
                      onClick={() => toggleFaqItem(item.id)}
                      className="w-full px-5 py-3 text-left flex items-center justify-between hover:bg-slate-700/20 transition-all duration-300"
                    >
                      <span className="text-white font-bold text-lg">{item.question}</span>
                      {openFaqItem?.includes(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-slate-300 transform transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-300 transform transition-transform duration-300" />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openFaqItem?.includes(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 pb-3">
                        <p className="text-slate-200 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div
                className={`${getAnimationClass("scroll-reveal-up", faqReveal.isVisible, faqReveal.hasBeenVisible)}`}
                style={{ animationDelay: "1000ms" }}
              >
                <Button
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border-0 rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold"
                  onClick={toggleAllFaqItems}
                >
                  {openFaqItem && openFaqItem.length === faqItems.length
                    ? "FECHAR TODAS AS PERGUNTAS"
                    : "VER TODAS AS PERGUNTAS"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-[#3b0764] via-[#4c1d95] to-[#3b0764] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div ref={socialReveal.ref} className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center text-white">
              <div
                className={`${getAnimationClass("scroll-reveal-left", socialReveal.isVisible, socialReveal.hasBeenVisible)}`}
                style={{ animationDelay: "200ms" }}
              >
                <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-0 rounded-full px-6 py-2 shadow-lg animate-bounce">
                  📱 Siga a gente
                </Badge>

                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                  SIGA A GENTE NAS
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                    REDES SOCIAIS
                  </span>
                </h2>

                <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nos acompanhe nas redes sociais e fique por dentro de todas as novidades em primeira mão! Além disso,
                  ao nos seguir, você terá a chance de concorrer a eventos exclusivos e receber cupons de desconto
                  especiais. Não perca a oportunidade de participar e aproveitar vantagens únicas!
                </p>
              </div>

              {/* Social Media Icons */}
              <div
                className={`flex justify-center gap-6 ${getAnimationClass("scroll-reveal-up", socialReveal.isVisible, socialReveal.hasBeenVisible)}`}
                style={{ animationDelay: "600ms" }}
              >
                {socialMediaLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 ${social.hoverColor} group`}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <Image
                      src={social.icon || "/placeholder.svg"}
                      alt={`${social.name} Logo`}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - 3D Character */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className={`relative transform hover:scale-105 transition-all duration-500 ${getAnimationClass("scroll-reveal-right", socialReveal.isVisible, socialReveal.hasBeenVisible)}`}
                style={{ animationDelay: "800ms" }}
              >
                {/* Character glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-3xl scale-110 animate-pulse"></div>

                {/* 3D Character - Adjusted size and positioning to show full character */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/character.webp"
                    alt="Social Media Character"
                    width={500}
                    height={600}
                    className="drop-shadow-2xl object-contain"
                    priority
                  />
                </div>

                {/* Floating social media elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-bounce delay-300 flex items-center justify-center">
                  <span className="text-white text-lg">📺</span>
                </div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-700 flex items-center justify-center">
                  <span className="text-white text-xs">f</span>
                </div>
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="text-white text-sm">📷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Modals */}
      <RequirementsModal isOpen={isRequirementsModalOpen} onClose={() => setIsRequirementsModalOpen(false)} />
      <PcRequirementsModal isOpen={isPcRequirementsModalOpen} onClose={() => setIsPcRequirementsModalOpen(false)} />
    </div>
  )
}
