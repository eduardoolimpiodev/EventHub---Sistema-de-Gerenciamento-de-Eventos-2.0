'use client'

import { useSavedEventsStore } from '@/store/saved-events'
import type { TicketmasterEvent, SavedEvent } from '@/types/event'

interface SaveEventButtonProps {
  event: TicketmasterEvent
}

export function SaveEventButton({ event }: SaveEventButtonProps) {
  const { saveEvent, removeEvent, isEventSaved } = useSavedEventsStore()
  const isSaved = isEventSaved(event.id)

  const handleToggle = () => {
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

  return (
    <button
      onClick={handleToggle}
      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
        isSaved
          ? 'bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
      }`}
    >
      {isSaved ? '❤️ Remover dos Favoritos' : '🤍 Salvar Evento'}
    </button>
  )
}
