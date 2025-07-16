"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Crown, Shield, Star } from "lucide-react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function SobreNosPage() {
  const heroReveal = useScrollReveal({ threshold: 0.2, reverseOnExit: true })
  const teamReveal = useScrollReveal({ threshold: 0.3, reverseOnExit: true })

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

  const teamMembers = [
    {
      name: "120Domini_Paradox",
      role: "FUNDADOR",
      avatar: "https://i.imgur.com/1tcihV9.png",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "SeeK_Paradox",
      role: "FUNDADOR",
      avatar: "https://i.imgur.com/G44wHFZ.png",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Main Content Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div ref={heroReveal.ref} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="text-left space-y-8">
              {/* Question Mark Icon */}

              {/* Title */}
              <div
                className={`relative ${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                style={{ animationDelay: "200ms" }}
              >
                {/* Question Mark Icon - Behind Title */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 opacity-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-4xl font-bold">?</span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight relative z-10">
                  Quem somos?
                </h1>
              </div>

              {/* Description */}
              <div
                className={`${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                style={{ animationDelay: "400ms" }}
              >
                <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                  Somos o maior servidor de GTA SA-MP da América Latina, oferecendo uma experiência de jogo
                  incomparável. Estamos sempre inovando, trazendo atualizações frequentes para garantir a diversão
                  constante dos nossos jogadores. Agora, você pode mergulhar nesse mundo incrível tanto pelo seu
                  computador quanto pelo seu smartphone Android. Prepare-se para uma jornada emocionante no nosso
                  universo.
                </p>
              </div>

              {/* CTA Button */}
              <div
                className={`${getAnimationClass("scroll-reveal-right", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                style={{ animationDelay: "600ms" }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-bold"
                >
                  Conheça nossa equipe
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Team Members - Small Cards */}
              <div
                className={`${getAnimationClass("scroll-reveal-up", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                style={{ animationDelay: "800ms" }}
              >
                <div className="flex flex-wrap gap-4 mt-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.name}
                      className={`${getAnimationClass("scroll-reveal-left", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-3 min-w-[200px]">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              <Image
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-sm group-hover:text-purple-100 transition-colors duration-300 truncate">
                              {member.name}
                            </h3>
                            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 rounded-full px-2 py-0.5 text-xs font-bold mt-1">
                              {member.role}
                            </Badge>
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Avatar */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className={`relative ${getAnimationClass("scroll-reveal-zoom", heroReveal.isVisible, heroReveal.hasBeenVisible)}`}
                style={{ animationDelay: "1000ms" }}
              >
                {/* Purple circular background */}
                <div className="absolute inset-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/30 to-purple-800/50 rounded-full blur-2xl animate-pulse"></div>

                {/* Main circular container */}
                <div className="relative w-[400px] h-[400px] bg-gradient-to-br from-purple-600 to-purple-800 rounded-full p-2 shadow-2xl">
                  {/* Inner circle */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full overflow-hidden relative">
                    {/* Avatar Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/images/avatar-leader.png"
                        alt="Líder da Rede Paradox"
                        width={350}
                        height={350}
                        className="object-contain scale-110 transform hover:scale-115 transition-transform duration-500"
                        priority
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Floating elements around avatar */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full animate-bounce delay-300 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-1/3 -left-6 w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-700 flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-purple-600 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
