"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PcDownloadsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PcDownloadsModal({ isOpen, onClose }: PcDownloadsModalProps) {
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

  const downloadSteps = [
    {
      step: "PASSO 1",
      title: "GTASA",
      description: "Download da pasta do GTA San Andreas completa sem nenhuma modificação.",
      icon: "/images/gta_sa_logo.webp",
    },
    {
      step: "PASSO 2",
      title: "SAMP",
      description: "Modificação para GTA: San Andreas que permite o jogo online em servidores.",
      icon: "/images/samp_logo.webp",
    },
    {
      step: "PASSO 3",
      title: "Voice Chat",
      description:
        "Modificação que adiciona a comunicação por voz em tempo real no jogo para imitar proximidade entre jogadores, tornando a experiência mais imersiva.",
      icon: "/images/voice-chat.webp",
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
        className={`relative w-full max-w-4xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 ease-out transform ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-purple-700/20 to-purple-800/10 animate-gradient-x"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-white">Downloads para PC</h2>
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
        <div className="relative z-10 p-6 space-y-6">
          {downloadSteps.map((step, index) => (
            <div
              key={step.step}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-purple-600/30 transition-all duration-300 transform hover:-translate-y-1 ${
                isAnimating ? "animate-slide-in-from-bottom" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-600/50">
                    <Image
                      src={step.icon || "/placeholder.svg"}
                      alt={step.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <span className="text-sm text-purple-400 font-semibold">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">{step.description}</p>
                </div>

                {/* Download Button */}
                <div className="flex-shrink-0">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold">
                    BAIXAR
                  </Button>
                </div>
              </div>
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
              ENTENDI
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
