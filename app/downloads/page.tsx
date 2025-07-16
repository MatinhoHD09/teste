"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor } from "lucide-react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import PcDownloadsModal from "@/components/pc-downloads-modal"
import AndroidDownloadsModal from "@/components/android-downloads-modal"

export default function DownloadsPage() {
  const [isPcModalOpen, setIsPcModalOpen] = useState(false)
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false)
  const heroReveal = useScrollReveal({ threshold: 0.2, reverseOnExit: true })

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div
          ref={heroReveal.ref}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-left">
            <div
              className={`${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "200ms" }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                BAIXE AGORA
                <br />
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text">
                  MESMO
                </span>
              </h1>
            </div>

            <div
              className={`w-16 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mb-8 ${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "400ms" }}
            ></div>

            <div
              className={`${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "600ms" }}
            >
              <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Todos os nossos servidores são multiplataformas, garantindo que você possa jogar tanto em seu computador
                quanto no seu dispositivo Android. E a melhor parte é que oferecemos uma experiência totalmente
                integrada, permitindo que você jogue com pessoas em diferentes plataformas.
              </p>

              <p className="text-lg text-slate-400 mb-12 max-w-2xl leading-relaxed">
                Isso significa que você pode jogar no seu Android e competir com amigos que estão usando computadores,
                ou vice-versa. Aproveite a diversão sem limites, não importa onde você esteja ou qual dispositivo esteja
                usando! O Shox com certeza estará ao seu alcance.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 ${getAnimationClass("scroll-reveal-right", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "800ms" }}
            >
              <Button
                size="lg"
                onClick={() => setIsAndroidModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-bold"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                ANDROID DOWNLOAD
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsPcModalOpen(true)}
                className="border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm transform hover:scale-105 font-bold"
              >
                <Monitor className="w-5 h-5 mr-2" />
                PC DOWNLOAD
              </Button>
            </div>
          </div>

          {/* Right Content - Character */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className={`relative ${getAnimationClass("scroll-reveal-zoom", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
              style={{ animationDelay: "1200ms" }}
            >
              {/* Purple blob background effect */}
              <div className="absolute inset-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/30 to-purple-800/50 rounded-full blur-2xl animate-pulse transform -translate-x-8"></div>

              {/* Character Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/avatar-downloads.webp"
                  alt="Personagem com rádio e headphones"
                  width={600}
                  height={600}
                  className="drop-shadow-2xl object-contain"
                  priority
                />
              </div>

              {/* Floating elements around character */}
              <div className="absolute top-20 -left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-40 -right-8 w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-32 -left-6 w-5 h-5 bg-purple-300 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
          style={{ animationDelay: "1400ms" }}
        >
          <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-purple-400/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PC Downloads Modal */}
      <PcDownloadsModal isOpen={isPcModalOpen} onClose={() => setIsPcModalOpen(false)} />

      {/* Android Downloads Modal */}
      <AndroidDownloadsModal isOpen={isAndroidModalOpen} onClose={() => setIsAndroidModalOpen(false)} />
    </div>
  )
}
