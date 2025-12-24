export interface TicketmasterImage {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
}

export interface TicketmasterDate {
  start: {
    localDate: string
    localTime?: string
    dateTime?: string
  }
  timezone?: string
  status?: {
    code: string
  }
}

export interface TicketmasterVenue {
  name: string
  type?: string
  id: string
  url?: string
  locale?: string
  postalCode?: string
  timezone?: string
  parkingDetail?: string
  city?: {
    name: string
  }
  state?: {
    name: string
    stateCode: string
  }
  country?: {
    name: string
    countryCode: string
  }
  address?: {
    line1: string
  }
  location?: {
    longitude: string
    latitude: string
  }
}

export interface TicketmasterAttraction {
  id: string
  name: string
  type: string
  url?: string
  locale?: string
  images?: TicketmasterImage[]
  classifications?: TicketmasterClassification[]
}

export interface TicketmasterClassification {
  primary: boolean
  segment?: {
    id: string
    name: string
  }
  genre?: {
    id: string
    name: string
  }
  subGenre?: {
    id: string
    name: string
  }
}

export interface TicketmasterPriceRange {
  type: string
  currency: string
  min: number
  max: number
}

export interface TicketmasterSales {
  public?: {
    startDateTime: string
    startTBD: boolean
    startTBA: boolean
    endDateTime: string
  }
}

export interface TicketmasterSeatmap {
  staticUrl: string
}

export interface TicketmasterEvent {
  id: string
  name: string
  type: string
  url: string
  locale: string
  images: TicketmasterImage[]
  sales?: TicketmasterSales
  dates: TicketmasterDate
  classifications?: TicketmasterClassification[]
  priceRanges?: TicketmasterPriceRange[]
  seatmap?: TicketmasterSeatmap
  info?: string
  pleaseNote?: string
  _embedded?: {
    venues?: TicketmasterVenue[]
    attractions?: TicketmasterAttraction[]
  }
}

export interface TicketmasterPage {
  size: number
  totalElements: number
  totalPages: number
  number: number
}

export interface TicketmasterEventsResponse {
  _embedded?: {
    events: TicketmasterEvent[]
  }
  page: TicketmasterPage
}

export interface EventSearchParams {
  keyword?: string
  city?: string
  classificationName?: string
  startDateTime?: string
  endDateTime?: string
  page?: number
  size?: number
}

export interface SavedEvent {
  id: string
  name: string
  images: TicketmasterImage[]
  dates: TicketmasterDate
  _embedded?: {
    venues?: TicketmasterVenue[]
    attractions?: TicketmasterAttraction[]
  }
  priceRanges?: TicketmasterPriceRange[]
  url: string
}

export type EventStatus = 'Inscrições abertas' | 'Esgotado' | 'Encerrado' | 'Cancelado' | 'Adiado'

export interface EventPrice {
  min: number
  max: number
  currency: string
}

export interface Countdown {
  days: number
  hours: number
  minutes: number
  expired: boolean
}
