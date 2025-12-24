'use client'

import { useState, useEffect } from 'react'
import { getCountdown } from '@/lib/helpers'

interface EventCountdownProps {
  dateTime: string
}

export function EventCountdown({ dateTime }: EventCountdownProps) {
  const [countdown, setCountdown] = useState(getCountdown(dateTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(dateTime))
    }, 60000)

    return () => clearInterval(interval)
  }, [dateTime])

  if (countdown.expired) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Este evento já aconteceu</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-4">
        <div className="text-4xl font-bold mb-1">{countdown.days}</div>
        <div className="text-sm uppercase tracking-wide">Dias</div>
      </div>
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-4">
        <div className="text-4xl font-bold mb-1">{countdown.hours}</div>
        <div className="text-sm uppercase tracking-wide">Horas</div>
      </div>
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-4">
        <div className="text-4xl font-bold mb-1">{countdown.minutes}</div>
        <div className="text-sm uppercase tracking-wide">Minutos</div>
      </div>
    </div>
  )
}
