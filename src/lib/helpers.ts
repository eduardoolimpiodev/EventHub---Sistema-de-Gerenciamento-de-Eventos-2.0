import type {
  TicketmasterImage,
  TicketmasterClassification,
  TicketmasterPriceRange,
  TicketmasterEvent,
  EventStatus,
  EventPrice,
  Countdown
} from '@/types/event'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return date.toLocaleDateString('pt-BR', options)
}

export function formatPrice(value: number): string {
  if (!value || value === 0) return 'Grátis'
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function getEventImage(images: TicketmasterImage[] | undefined): string {
  if (!images || images.length === 0) {
    return 'https://via.placeholder.com/400x300?text=Sem+Imagem'
  }
  
  const largeImage = images.find(img => img.ratio === '16_9' && img.width > 1000)
  const mediumImage = images.find(img => img.ratio === '16_9' && img.width > 500)
  
  return largeImage?.url || mediumImage?.url || images[0].url
}

export function getEventCategories(classifications: TicketmasterClassification[] | undefined): string[] {
  if (!classifications || classifications.length === 0) return []
  
  const categories: string[] = []
  const classification = classifications[0]
  
  if (classification.segment?.name) categories.push(classification.segment.name)
  if (classification.genre?.name) categories.push(classification.genre.name)
  if (classification.subGenre?.name) categories.push(classification.subGenre.name)
  
  return categories
}

export function getEventPrice(priceRanges: TicketmasterPriceRange[] | undefined): EventPrice {
  if (!priceRanges || priceRanges.length === 0) {
    return { min: 0, max: 0, currency: 'BRL' }
  }
  
  const price = priceRanges[0]
  return {
    min: price.min || 0,
    max: price.max || 0,
    currency: price.currency || 'BRL'
  }
}

export function getEventStatus(event: TicketmasterEvent): EventStatus {
  const startDate = new Date(event.dates?.start?.dateTime || event.dates?.start?.localDate)
  const now = new Date()
  
  if (event.dates?.status?.code === 'cancelled') {
    return 'Cancelado'
  }
  
  if (event.dates?.status?.code === 'postponed') {
    return 'Adiado'
  }
  
  if (startDate < now) {
    return 'Encerrado'
  }
  
  if (event.sales?.public?.endDateTime) {
    const salesEnd = new Date(event.sales.public.endDateTime)
    if (salesEnd < now) {
      return 'Esgotado'
    }
  }
  
  return 'Inscrições abertas'
}

export function getCountdown(dateString: string): Countdown {
  const eventDate = new Date(dateString)
  const now = new Date()
  const diff = eventDate.getTime() - now.getTime()
  
  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return { days, hours, minutes, expired: false }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
