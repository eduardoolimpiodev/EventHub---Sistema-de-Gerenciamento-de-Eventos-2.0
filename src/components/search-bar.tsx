'use client'

import { useState, useEffect, useCallback } from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  initialValue?: string
}

export function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)

  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      onSearch(value)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [onSearch])

  useEffect(() => {
    const cleanup = debouncedSearch(searchTerm)
    return cleanup
  }, [searchTerm, debouncedSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        <input
          type="text"
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Buscar eventos por nome, artista, local..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar eventos"
        />
        {searchTerm && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={handleClear}
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  )
}
