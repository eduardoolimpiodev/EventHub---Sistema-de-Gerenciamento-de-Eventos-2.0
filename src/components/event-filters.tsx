'use client'

import { useState } from 'react'

const CATEGORIES = [
  { value: '', label: 'Todas as categorias' },
  { value: 'Music', label: 'Música' },
  { value: 'Sports', label: 'Esportes' },
  { value: 'Arts & Theatre', label: 'Arte e Teatro' },
  { value: 'Family', label: 'Família' },
  { value: 'Film', label: 'Cinema' },
  { value: 'Miscellaneous', label: 'Diversos' }
]

const CITIES = [
  { value: '', label: 'Todas as cidades' },
  { value: 'São Paulo', label: 'São Paulo' },
  { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
  { value: 'Belo Horizonte', label: 'Belo Horizonte' },
  { value: 'Brasília', label: 'Brasília' },
  { value: 'Curitiba', label: 'Curitiba' },
  { value: 'Porto Alegre', label: 'Porto Alegre' },
  { value: 'Recife', label: 'Recife' },
  { value: 'Salvador', label: 'Salvador' }
]

export interface FilterValues {
  city: string
  category: string
  startDate: string
  endDate: string
}

interface EventFiltersProps {
  onFilterChange: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
}

export function EventFilters({ onFilterChange, initialFilters = {} }: EventFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    city: initialFilters.city || '',
    category: initialFilters.category || '',
    startDate: initialFilters.startDate || '',
    endDate: initialFilters.endDate || '',
  })

  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (filterName: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [filterName]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters: FilterValues = {
      city: '',
      category: '',
      startDate: '',
      endDate: '',
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>{showFilters ? '▼' : '▶'}</span>
          Filtros
          {hasActiveFilters && <span className="text-primary">•</span>}
        </button>
        
        {hasActiveFilters && (
          <button
            className="text-sm text-primary hover:text-primary-dark transition-colors"
            onClick={handleReset}
          >
            Limpar filtros
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <select
              id="city-filter"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {CITIES.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="start-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Data início
            </label>
            <input
              id="start-date-filter"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="end-date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Data fim
            </label>
            <input
              id="end-date-filter"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              min={filters.startDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  )
}
