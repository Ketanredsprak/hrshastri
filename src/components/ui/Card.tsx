import type { ReactNode } from 'react'

type CardVariant = 'elevated' | 'outline' | 'soft'

type CardProps = {
  children: ReactNode
  className?: string
  variant?: CardVariant
  hover?: boolean
}

const variants: Record<CardVariant, string> = {
  elevated: 'bg-white border border-border-subtle shadow-card',
  outline: 'bg-white border border-border-subtle',
  soft: 'bg-surface-2 border border-transparent',
}

export function Card({ children, className = '', variant = 'elevated', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 transition duration-200 md:p-7 ${variants[variant]} ${
        hover ? 'hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-soft' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
