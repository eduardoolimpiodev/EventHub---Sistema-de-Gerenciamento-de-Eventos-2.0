'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { EventCard } from '@/components/event-card'
import { SearchBar } from '@/components/search-bar'
import { EventFilters, type FilterValues } from '@/components/event-filters'
import { fetchEvents } from '@/lib/ticketmaster-api'
import type { TicketmasterEvent } from '@/types/event'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [events, setEvents] = useState<TicketmasterEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  })

  const keyword = searchParams.get('q') || ''
  const city = searchParams.get('city') || ''
  const category = searchParams.get('category') || ''
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const page = parseInt(searchParams.get('page') || '0')

  useEffect(() => {
    loadEvents()
  }, [keyword, city, category, startDate, endDate, page])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = {
        keyword,
        city,
        classificationName: category,
        startDateTime: startDate ? `${startDate}T00:00:00Z` : '',
        endDateTime: endDate ? `${endDate}T23:59:59Z` : '',
        page,
        size: 12
      }

      const data = await fetchEvents(params)

      if (data._embedded?.events) {
        setEvents(data._embedded.events)
        setPagination({
          currentPage: data.page.number,
          totalPages: data.page.totalPages,
          totalElements: data.page.totalElements
        })
      } else {
        setEvents([])
        setPagination({ currentPage: 0, totalPages: 0, totalElements: 0 })
      }
    } catch (err) {
      setError('Erro ao buscar eventos. Tente novamente.')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    params.delete('page')
    router.push(`/buscar?${params.toString()}`)
  }

  const handleFilterChange = (filters: FilterValues) => {
    const params = new URLSearchParams()
    
    if (keyword) params.set('q', keyword)
    if (filters.city) params.set('city', filters.city)
    if (filters.category) params.set('category', filters.category)
    if (filters.startDate) params.set('startDate', filters.startDate)
    if (filters.endDate) params.set('endDate', filters.endDate)
    
    router.push(`/buscar?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/buscar?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Buscar Eventos</h1>
          <SearchBar onSearch={handleSearch} initialValue={keyword} />
        </div>

        <div className="mb-6">
          <EventFilters 
            onFilterChange={handleFilterChange}
            initialFilters={{ city, category, startDate, endDate }}
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Buscando eventos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={loadEvents}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 bg-white p-4 rounded-lg">
              {pagination.totalElements > 0 ? (
                <p className="text-gray-700">
                  Encontrados <strong>{pagination.totalElements}</strong> eventos
                  {keyword && ` para "${keyword}"`}
                </p>
              ) : (
                <p className="text-gray-500">Nenhum evento encontrado. Tente ajustar os filtros.</p>
              )}
            </div>

            {events.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-lg">
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 0}
                    >
                      ← Anterior
                    </button>
                    
                    <span className="text-gray-700">
                      Página {page + 1} de {pagination.totalPages}
                    </span>
                    
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= pagination.totalPages - 1}
                    >
                      Próxima →
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
