import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SavedEvent } from '@/types/event'

const MAX_SAVED_EVENTS = 5

interface SavedEventsState {
  savedEvents: SavedEvent[]
  saveEvent: (event: SavedEvent) => { success: boolean; message: string }
  removeEvent: (eventId: string) => void
  isEventSaved: (eventId: string) => boolean
  clearSavedEvents: () => void
  maxEvents: number
  remainingSlots: number
}

export const useSavedEventsStore = create<SavedEventsState>()(
  persist(
    (set, get) => ({
      savedEvents: [],
      maxEvents: MAX_SAVED_EVENTS,
      
      get remainingSlots() {
        return MAX_SAVED_EVENTS - get().savedEvents.length
      },
      
      saveEvent: (event) => {
        const { savedEvents } = get()
        
        if (savedEvents.some(e => e.id === event.id)) {
          return { success: false, message: 'Evento já está nos favoritos!' }
        }

        if (savedEvents.length >= MAX_SAVED_EVENTS) {
          return { 
            success: false, 
            message: `Limite de ${MAX_SAVED_EVENTS} eventos salvos atingido!` 
          }
        }

        set({ savedEvents: [...savedEvents, event] })
        return { success: true, message: 'Evento salvo com sucesso!' }
      },
      
      removeEvent: (eventId) => {
        set(state => ({
          savedEvents: state.savedEvents.filter(e => e.id !== eventId)
        }))
      },
      
      isEventSaved: (eventId) => {
        return get().savedEvents.some(e => e.id === eventId)
      },
      
      clearSavedEvents: () => {
        set({ savedEvents: [] })
      },
    }),
    {
      name: 'eventhub-saved-events',
    }
  )
)
