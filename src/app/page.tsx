import Link from 'next/link'
import { EventCard } from '@/components/event-card'
import { fetchPopularEvents } from '@/lib/ticketmaster-api'

export const revalidate = 3600

import type { TicketmasterEvent } from '@/types/event'

export default async function HomePage() {
  let events: TicketmasterEvent[] = []
  let error: string | null = null

  try {
    const data = await fetchPopularEvents()
    events = data._embedded?.events || []
  } catch (err) {
    error = 'Erro ao carregar eventos. Tente novamente mais tarde.'
    console.error('Erro:', err)
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Descubra eventos incríveis perto de você
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Encontre shows, festivais, esportes e muito mais
          </p>
          <Link
            href="/buscar"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explorar Eventos
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Eventos Populares</h2>
          <Link
            href="/buscar"
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        )}

        {!error && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum evento encontrado no momento.</p>
          </div>
        )}

        {!error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar o EventHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="text-5xl mb-4 block">🎫</span>
              <h3 className="font-semibold text-lg mb-2">Variedade de Eventos</h3>
              <p className="text-gray-600">Shows, esportes, teatro e muito mais em um só lugar</p>
            </div>
            <div className="text-center">
              <span className="text-5xl mb-4 block">📍</span>
              <h3 className="font-semibold text-lg mb-2">Eventos Locais</h3>
              <p className="text-gray-600">Descubra o que está acontecendo na sua cidade</p>
            </div>
            <div className="text-center">
              <span className="text-5xl mb-4 block">❤️</span>
              <h3 className="font-semibold text-lg mb-2">Salve Favoritos</h3>
              <p className="text-gray-600">Guarde seus eventos preferidos para não perder</p>
            </div>
            <div className="text-center">
              <span className="text-5xl mb-4 block">🔔</span>
              <h3 className="font-semibold text-lg mb-2">Fácil de Usar</h3>
              <p className="text-gray-600">Interface simples e intuitiva para encontrar eventos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
