'use client'

import Link from 'next/link'
import { useSavedEventsStore } from '@/store/saved-events'
import { EventCard } from '@/components/event-card'

export default function SavedEventsPage() {
  const { savedEvents, clearSavedEvents, maxEvents, remainingSlots } = useSavedEventsStore()

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja remover todos os eventos salvos?')) {
      clearSavedEvents()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meus Eventos</h1>
            <p className="text-gray-600">
              {savedEvents.length} de {maxEvents} eventos salvos
              {remainingSlots > 0 && ` • ${remainingSlots} ${remainingSlots === 1 ? 'vaga disponível' : 'vagas disponíveis'}`}
            </p>
          </div>
          
          {savedEvents.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Limpar todos
            </button>
          )}
        </div>

        {savedEvents.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-semibold mb-2">Nenhum evento salvo ainda</h2>
            <p className="text-gray-600 mb-6">
              Explore eventos e salve seus favoritos para encontrá-los facilmente aqui.
            </p>
            <Link
              href="/buscar"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Explorar Eventos
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                💡 <strong>Dica:</strong> Você pode salvar até {maxEvents} eventos. 
                Clique no ❤️ nos cards para gerenciar seus favoritos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
