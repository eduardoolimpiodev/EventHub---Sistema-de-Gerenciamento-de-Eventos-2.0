import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎭</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Evento não encontrado
        </h2>
        <p className="text-gray-600 mb-6">
          O evento que você está procurando não existe ou foi removido.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Ir para Início
          </Link>
          <Link
            href="/buscar"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Buscar Eventos
          </Link>
        </div>
      </div>
    </div>
  )
}
