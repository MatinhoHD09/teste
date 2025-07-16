"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function NoticiasPage() {
  const [loadedNews, setLoadedNews] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const noticias = [
    {
      id: 1,
      titulo: "Cupom Novo Visual e Dia das Crianças!",
      descricao:
        "Este mês é sobre diversão, alegria e relembrar a criança que vive em cada um de nós! Utilize o cupom 'VISUALSK' durante a compra de moedas VIP's em nosso site e receba um adicional de 20% a mais do valor da sua recarga! Cupom estará válido até o dia 15/08/2023.",
      data: "9/10/2023, 10:23:15 AM",
      bannerImage: "/images/teamspean-end.webp",
    },
    {
      id: 2,
      titulo: "Cupom Feriado da Independência",
      descricao:
        "Celebre a liberdade com um cupom especial! Use o código 'INDEPENDENCIASHOX' e ganhe 15% de acréscimo em todas as suas compras de moedas VIP's neste feriado da independência.",
      data: "9/10/2023, 10:23:15 AM",
      bannerImage: "/images/teamspean-end.webp",
    },
    {
      id: 3,
      titulo: "Desban All Extendido",
      descricao:
        "Encerramos as solicitações de desban até em 01/09, se você ainda não solicitou seu desban aproveite essa última oportunidade e solicite agora através do nosso painel.",
      data: "8/26/2023, 12:01:12 PM",
      bannerImage: "/images/teamspean-end.webp",
    },
    {
      id: 4,
      titulo: "Cupom LILI CANTOU",
      descricao:
        "Volte dando a volta por cima com o cupom de desconto 'DESBANALL'. Utilize o usuário durante a compra de moedas VIP's em nosso site e recebam adicional de 20% a mais do valor da sua recarga! Cupom estará válido até o dia 15/08/2023.",
      data: "7/27/2023, 12:07:42 PM",
      bannerImage: "/images/teamspean-end.webp",
    },
    {
      id: 5,
      titulo: "Sobre o TeamSpeak...",
      descricao:
        "Gostaríamos de informar que estamos encerrando nossas atividades no TeamSpeak e migrando para o Discord. Estamos migrando para o Discord, pois acreditamos que essa mudança irá facilitar e tornar mais acessível a todos os usuários da rede PlayShox, aproveitando um sistema já bem estabelecido.",
      data: "6/18/2023, 3:01:27 PM",
      bannerImage: "/images/teamspean-end.webp",
    },
    {
      id: 6,
      titulo: "Novo Inventário",
      descricao: "Fizemos uma remodelagem completa no sistema de inventário. Entre e confira agora mesmo!",
      data: "1/30/2022, 5:01:53 PM",
      bannerImage: "/images/teamspean-end.webp",
    },
  ]

  useEffect(() => {
    // Simula carregamento das notícias
    const loadNews = async () => {
      setIsLoading(true)

      // Carrega as notícias uma por uma com delay
      for (let i = 1; i <= noticias.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setLoadedNews((prev) => [...prev, i])
      }

      setIsLoading(false)
    }

    loadNews()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-900/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Title with purple accent */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">Notícias</h1>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fique por dentro das últimas novidades e eventos do Shox. Nossa página de notícias é seu guia para descobrir
            as últimas atualizações do servidor.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia, index) => {
              const isLoaded = loadedNews.includes(noticia.id)
              const delay = index * 100

              return (
                <div key={noticia.id} className="relative">
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-purple-700/50 flex items-center justify-center animate-pulse">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 text-sm font-medium">Carregando...</p>
                      </div>
                    </div>
                  )}

                  <Card
                    className={`border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group cursor-pointer ${
                      isLoaded ? "animate-slide-in-from-bottom opacity-100" : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${delay}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {/* Top Banner Area */}
                    <div className="relative h-[180px] overflow-hidden rounded-t-3xl">
                      <Image
                        src={noticia.bannerImage || "/placeholder.svg"}
                        alt="News Banner"
                        fill
                        className="object-cover object-center"
                        priority
                      />
                      {/* Dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-b-3xl relative">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                      </div>

                      <CardContent className="p-6 relative z-10">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:scale-105 transform transition-transform duration-300">
                          {noticia.titulo}
                        </h2>

                        {/* Description */}
                        <p className="text-slate-300 leading-relaxed text-sm mb-4 line-clamp-4">{noticia.descricao}</p>

                        {/* Date - At the bottom, separated from description */}
                        <div className="pt-2 border-t border-slate-700/30">
                          <span className="text-xs text-slate-400 font-medium">{noticia.data}</span>
                        </div>
                      </CardContent>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Loading indicator */}
      {isLoading && loadedNews.length > 0 && loadedNews.length < noticias.length && (
        <div className="flex justify-center pb-16">
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <div className="w-5 h-5 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-300 font-medium">Carregando mais notícias...</span>
          </div>
        </div>
      )}
    </div>
  )
}
