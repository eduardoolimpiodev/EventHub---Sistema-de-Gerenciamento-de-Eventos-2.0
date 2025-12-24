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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
