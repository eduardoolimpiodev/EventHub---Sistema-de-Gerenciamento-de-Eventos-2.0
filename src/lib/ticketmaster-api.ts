import type { 
  TicketmasterEventsResponse, 
  TicketmasterEvent,
  EventSearchParams 
} from '@/types/event'

const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

if (!API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_TICKETMASTER_API_KEY não está configurada')
}

export async function fetchEvents(params: EventSearchParams = {}): Promise<TicketmasterEventsResponse> {
  const {
    keyword = '',
    city = '',
    startDateTime = '',
    endDateTime = '',
    classificationName = '',
    page = 0,
    size = 20
  } = params

  const queryParams = new URLSearchParams({
    apikey: API_KEY || '',
    locale: '*',
    page: page.toString(),
    size: size.toString()
  })

  if (keyword) queryParams.append('keyword', keyword)
  if (city) queryParams.append('city', city)
  if (startDateTime) queryParams.append('startDateTime', startDateTime)
  if (endDateTime) queryParams.append('endDateTime', endDateTime)
  if (classificationName) queryParams.append('classificationName', classificationName)

  try {
    const response = await fetch(`${BASE_URL}/events.json?${queryParams}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    throw error
  }
}

export async function fetchEventById(eventId: string): Promise<TicketmasterEvent> {
  const queryParams = new URLSearchParams({
    apikey: API_KEY || '',
    locale: '*'
  })

  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}.json?${queryParams}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar detalhes do evento:', error)
    throw error
  }
}

export async function fetchPopularEvents(): Promise<TicketmasterEventsResponse> {
  return fetchEvents({ size: 12 })
}
