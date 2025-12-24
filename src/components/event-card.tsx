'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSavedEventsStore } from '@/store/saved-events'
import { formatDate, formatPrice, getEventImage, getEventPrice, getEventStatus } from '@/lib/helpers'
import type { TicketmasterEvent, SavedEvent } from '@/types/event'

interface EventCardProps {
  event: TicketmasterEvent | SavedEvent
}

export function EventCard({ event }: EventCardProps) {
  const { saveEvent, removeEvent, isEventSaved } = useSavedEventsStore()
  const isSaved = isEventSaved(event.id)

  const eventImage = getEventImage(event.images)
  const eventPrice = getEventPrice(event.priceRanges)
  const eventStatus = getEventStatus(event)
  const venue = event._embedded?.venues?.[0]

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isSaved) {
      removeEvent(event.id)
    } else {
      const savedEvent: SavedEvent = {
        id: event.id,
        name: event.name,
        images: event.images,
        dates: event.dates,
        _embedded: event._embedded,
        priceRanges: event.priceRanges,
        url: event.url
      }
      
      const result = saveEvent(savedEvent)
      if (!result.success) {
        alert(result.message)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inscrições abertas':
        return 'bg-green-500/90'
      case 'Esgotado':
        return 'bg-red-500/90'
      case 'Encerrado':
        return 'bg-gray-500/90'
      case 'Cancelado':
        return 'bg-red-700/90'
      case 'Adiado':
        return 'bg-yellow-500/90'
      default:
        return 'bg-gray-500/90'
    }
  }

  return (
    <Link 
      href={`/evento/${event.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={eventImage}
          alt={event.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <button
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
          aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar evento'}
        >
          <span className="text-xl">{isSaved ? '❤️' : '🤍'}</span>
        </button>

        <span className={`absolute bottom-3 left-3 ${getStatusColor(eventStatus)} text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide`}>
          {eventStatus}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {event.name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span className="truncate">
              {formatDate(event.dates.start.dateTime || event.dates.start.localDate)}
            </span>
          </div>

          {venue && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="truncate">
                {venue.city?.name}, {venue.state?.stateCode}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span>💰</span>
            <span className="truncate">
              {eventPrice.min > 0 
                ? `${formatPrice(eventPrice.min)} - ${formatPrice(eventPrice.max)}`
                : 'Grátis'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
