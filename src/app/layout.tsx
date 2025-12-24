import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EventHub - Descubra eventos incríveis',
  description: 'Descubra eventos incríveis perto de você. Shows, festivais, esportes e muito mais.',
  keywords: ['eventos', 'shows', 'festivais', 'esportes', 'teatro', 'ingressos'],
  authors: [{ name: 'EventHub Team' }],
  openGraph: {
    title: 'EventHub - Descubra eventos incríveis',
    description: 'Descubra eventos incríveis perto de você. Shows, festivais, esportes e muito mais.',
    type: 'website',
    locale: 'pt_BR',
  },
}

import { Navbar } from '@/components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600 text-sm"> 2025 EventHub - Todos os direitos reservados</p>
            <p className="text-gray-500 text-xs mt-1">
              Dados fornecidos pela Ticketmaster Discovery API
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
