"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AndroidDownloadsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AndroidDownloadsModal({ isOpen, onClose }: AndroidDownloadsModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 50)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isVisible) return null

  const androidApps = [
    {
      title: "Eagle SA-MP Launcher",
      description: (
        <>
          Baixe oficialmente na <span className="text-blue-400 font-semibold">Play Store</span> e comece a jogar em
          qualquer servidor da rede <span className="text-blue-400 font-semibold">Eagle Vision</span>.
        </>
      ),
      icon: "/images/samp-launcher.webp",
    },
    {
      title: "Rede Paradox Mobile",
      description: (
        <>
          Baixe nosso aplicativo oficialmente na <span className="text-blue-400 font-semibold">Play Store</span> e
          comece a jogar em qualquer servidor <span className="text-blue-400 font-semibold">Rede Paradox</span>.
        </>
      ),
      icon: "/images/channels4_profile.jpg",
    },
  ]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isAnimating ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 ease-out transform ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-purple-700/20 to-purple-800/10 animate-gradient-x"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white">Downloads para Android</h2>
            <p className="text-slate-400 text-sm mt-1">Selecione o arquivo que deseja baixar</p>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 space-y-4">
          {androidApps.map((app, index) => (
            <div
              key={app.title}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-purple-600/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
                isAnimating ? "animate-slide-in-from-bottom" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* App Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50 group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={app.icon || "/placeholder.svg"}
                      alt={app.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {app.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {app.description}
                  </p>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-2 border-purple-600/50 text-purple-400 hover:bg-purple-600/10 rounded-2xl px-8 py-3 transition-all duration-300 backdrop-blur-sm font-medium bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              VER VÍDEO TUTORIAL
            </Button>
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold"
            >
              OK
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-4 left-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
