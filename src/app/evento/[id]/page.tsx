import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchEventById, fetchPopularEvents } from '@/lib/ticketmaster-api'
import { 
  formatDate, 
  formatPrice, 
  getEventImage, 
  getEventCategories, 
  getEventPrice, 
  getEventStatus 
} from '@/lib/helpers'
import { EventCountdown } from '@/components/event-countdown'
import { SaveEventButton } from '@/components/save-event-button'

interface EventDetailsPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  try {
    const data = await fetchPopularEvents()
    const events = data._embedded?.events || []
    
    return events.slice(0, 20).map((event) => ({
      id: event.id,
    }))
  } catch (error) {
    console.error('Erro ao gerar params estáticos:', error)
    return []
  }
}

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
  try {
    const event = await fetchEventById(params.id)
    const eventImage = getEventImage(event.images)
    
    return {
      title: `${event.name} | EventHub`,
      description: `Detalhes do evento ${event.name}. ${event.dates?.start?.localDate ? `Data: ${formatDate(event.dates.start.dateTime || event.dates.start.localDate)}` : ''}`,
      openGraph: {
        title: event.name,
        description: `Evento: ${event.name}`,
        images: [eventImage],
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Evento não encontrado | EventHub',
    }
  }
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  let event
  
  try {
    event = await fetchEventById(params.id)
  } catch (error) {
    console.error('Erro ao carregar evento:', error)
    notFound()
  }

  const eventImage = getEventImage(event.images)
  const eventPrice = getEventPrice(event.priceRanges)
  const eventStatus = getEventStatus(event)
  const categories = getEventCategories(event.classifications)
  const venue = event._embedded?.venues?.[0]
  const attraction = event._embedded?.attractions?.[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inscrições abertas':
        return 'bg-green-500'
      case 'Esgotado':
        return 'bg-red-500'
      case 'Encerrado':
        return 'bg-gray-500'
      case 'Cancelado':
        return 'bg-red-700'
      case 'Adiado':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[400px] bg-gray-900">
        <Image
          src={eventImage}
          alt={event.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className={`${getStatusColor(eventStatus)} text-white px-4 py-1.5 rounded-md text-sm font-semibold uppercase tracking-wide`}>
                {eventStatus}
              </span>
              {categories.map((cat, idx) => (
                <span key={idx} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {event.name}
            </h1>
            {attraction && (
              <p className="text-xl text-white/90">{attraction.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {event.dates?.start?.dateTime && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contagem Regressiva</h2>
                <EventCountdown dateTime={event.dates.start.dateTime} />
              </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Informações do Evento</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium text-gray-900">Data e Hora</p>
                    <p className="text-gray-600">
                      {formatDate(event.dates.start.dateTime || event.dates.start.localDate)}
                    </p>
                  </div>
                </div>

                {venue && (
                  <>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-medium text-gray-900">Local</p>
                        <p className="text-gray-600">{venue.name}</p>
                        {venue.address?.line1 && (
                          <p className="text-gray-500 text-sm">{venue.address.line1}</p>
                        )}
                        <p className="text-gray-500 text-sm">
                          {venue.city?.name}, {venue.state?.stateCode} {venue.postalCode}
                        </p>
                      </div>
                    </div>

                    {venue.parkingDetail && (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🅿️</span>
                        <div>
                          <p className="font-medium text-gray-900">Estacionamento</p>
                          <p className="text-gray-600 text-sm">{venue.parkingDetail}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-medium text-gray-900">Preço</p>
                    <p className="text-gray-600">
                      {eventPrice.min > 0 
                        ? `${formatPrice(eventPrice.min)} - ${formatPrice(eventPrice.max)}`
                        : 'Grátis'}
                    </p>
                  </div>
                </div>

                {event.info && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">ℹ️</span>
                    <div>
                      <p className="font-medium text-gray-900">Informações Adicionais</p>
                      <p className="text-gray-600 text-sm">{event.info}</p>
                    </div>
                  </div>
                )}

                {event.pleaseNote && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-medium text-gray-900">Observações Importantes</p>
                      <p className="text-gray-600 text-sm">{event.pleaseNote}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {event.seatmap?.staticUrl && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Mapa de Assentos</h2>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={event.seatmap.staticUrl}
                    alt="Mapa de assentos"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <SaveEventButton event={event} />
              
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors mt-4"
                >
                  Comprar Ingressos 🎫
                </a>
              )}

              <Link
                href="/buscar"
                className="block w-full text-center py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors mt-2"
              >
                ← Voltar para busca
              </Link>
            </div>

            {event.priceRanges && event.priceRanges.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Dica:</strong> Os preços podem variar. Confira os valores atualizados no site oficial.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
