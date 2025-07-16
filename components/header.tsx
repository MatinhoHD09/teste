"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Coins, User } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (href: string) => {
    // Fecha o menu mobile se estiver aberto
    setIsMenuOpen(false)

    // Navega para a página
    router.push(href)

    // Scroll para o topo com um pequeno delay para garantir que a página carregou
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <button onClick={() => handleNavigation("/")} className="flex items-center group cursor-pointer">
            <div className="relative transform transition-all duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Rede Paradox Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/")}
              className="text-white font-semibold text-sm uppercase tracking-wide hover:text-purple-200 transition-colors duration-200"
            >
              INÍCIO
            </button>
            <button
              onClick={() => handleNavigation("/sobre-nos")}
              className="text-white font-semibold text-sm uppercase tracking-wide hover:text-purple-200 transition-colors duration-200"
            >
              SOBRE NÓS
            </button>
            <button
              onClick={() => handleNavigation("/noticias")}
              className="text-white font-semibold text-sm uppercase tracking-wide hover:text-purple-200 transition-colors duration-200"
            >
              NOTÍCIAS
            </button>
            <button
              onClick={() => handleNavigation("/downloads")}
              className="text-white font-semibold text-sm uppercase tracking-wide hover:text-purple-200 transition-colors duration-200"
            >
              BAIXAR AGORA
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Coins className="w-4 h-4 mr-2" />
              RECARREGAR MOEDAS
            </Button>
            <Button
              variant="outline"
              className="bg-purple-500/50 border-2 border-purple-300/50 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-purple-400/50 hover:border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <User className="w-4 h-4 mr-2" />
              MINHA CONTA
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-xl transition-all duration-300 text-white hover:text-purple-200 hover:bg-white/10"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 bg-purple-800/95 backdrop-blur-xl rounded-b-3xl shadow-xl">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("/")}
                className="text-white hover:text-purple-200 transition-colors font-semibold py-2 px-4 rounded-xl hover:bg-purple-700/50 text-left uppercase tracking-wide"
              >
                INÍCIO
              </button>
              <button
                onClick={() => handleNavigation("/sobre-nos")}
                className="text-white hover:text-purple-200 transition-colors font-semibold py-2 px-4 rounded-xl hover:bg-purple-700/50 text-left uppercase tracking-wide"
              >
                SOBRE NÓS
              </button>
              <button
                onClick={() => handleNavigation("/noticias")}
                className="text-white hover:text-purple-200 transition-colors font-semibold py-2 px-4 rounded-xl hover:bg-purple-700/50 text-left uppercase tracking-wide"
              >
                NOTÍCIAS
              </button>
              <button
                onClick={() => handleNavigation("/downloads")}
                className="text-white hover:text-purple-200 transition-colors font-semibold py-2 px-4 rounded-xl hover:bg-purple-700/50 text-left uppercase tracking-wide"
              >
                BAIXAR AGORA
              </button>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 px-4 pt-4">
                <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-sm rounded-full shadow-lg">
                  <Coins className="w-4 h-4 mr-2" />
                  RECARREGAR MOEDAS
                </Button>
                <Button
                  variant="outline"
                  className="bg-purple-500/50 border-2 border-purple-300/50 text-white font-semibold text-sm rounded-full hover:bg-purple-400/50 hover:border-purple-200/50 shadow-lg backdrop-blur-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  MINHA CONTA
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
