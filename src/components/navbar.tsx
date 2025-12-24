'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSavedEventsStore } from '@/store/saved-events'

export function Navbar() {
  const pathname = usePathname()
  const savedEvents = useSavedEventsStore(state => state.savedEvents)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            🎉 EventHub
          </Link>

          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/"
                className={`font-medium transition-colors relative ${
                  isActive('/') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Início
                {isActive('/') && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/buscar"
                className={`font-medium transition-colors relative ${
                  isActive('/buscar') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Buscar Eventos
                {isActive('/buscar') && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/salvos"
                className={`font-medium transition-colors relative flex items-center gap-2 ${
                  isActive('/salvos') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Meus Eventos
                {savedEvents.length > 0 && (
                  <span className="bg-secondary text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {savedEvents.length}
                  </span>
                )}
                {isActive('/salvos') && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary rounded-t" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
