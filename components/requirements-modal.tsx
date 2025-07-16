"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RequirementsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RequirementsModal({ isOpen, onClose }: RequirementsModalProps) {
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isAnimating ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-md bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 rounded-3xl shadow-2xl border border-purple-700/50 overflow-hidden transition-all duration-500 ease-out transform ${
          isAnimating ? "opacity-100 scale-100 translate-y-0 rotate-0" : "opacity-0 scale-75 translate-y-8 -rotate-2"
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-700/30 to-purple-800/20 animate-gradient-x"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-xl"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-purple-700/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">REQUISITOS MÍNIMOS</h2>
              <p className="text-sm text-purple-200">Confira os requisitos mínimos para rodar</p>
            </div>
          </div>

          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 text-purple-300 hover:text-white hover:bg-purple-700/50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 space-y-4">
          {/* Sistema */}
          <div className="flex items-center justify-between py-3 border-b border-purple-700/20">
            <span className="text-purple-200 font-medium">SISTEMA</span>
            <span className="text-white font-bold">ANDROID</span>
          </div>

          {/* Versão Android */}
          <div className="flex items-center justify-between py-3 border-b border-purple-700/20">
            <span className="text-purple-200 font-medium">VERSÃO ANDROID</span>
            <span className="text-white font-bold">5.0</span>
          </div>

          {/* Processador */}
          <div className="flex items-center justify-between py-3 border-b border-purple-700/20">
            <span className="text-purple-200 font-medium">PROCESSADOR</span>
            <span className="text-white font-bold">DUAL CORE 1GHZ</span>
          </div>

          {/* Memória RAM */}
          <div className="flex items-center justify-between py-3 border-b border-purple-700/20">
            <span className="text-purple-200 font-medium">MEMÓRIA RAM</span>
            <span className="text-white font-bold">2GB</span>
          </div>

          {/* Armazenamento */}
          <div className="flex items-center justify-between py-3">
            <span className="text-purple-200 font-medium">ARMAZENAMENTO LIVRE</span>
            <span className="text-white font-bold">1GB</span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 p-6 pt-0">
          <div className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-4 border border-purple-700/30">
            <p className="text-purple-200 text-sm text-center leading-relaxed">
              <span className="text-white font-semibold">💡 Dica:</span> Para melhor performance, recomendamos
              dispositivos com especificações superiores.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
