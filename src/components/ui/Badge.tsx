import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  variant?: 'default' | 'blue' | 'gradient' | 'onDark'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'border border-border-subtle bg-white text-brand-ink shadow-sm',
    blue: 'bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/15',
    gradient: 'gradient-brand text-white shadow-sm',
    onDark: 'border border-white/25 bg-white/10 text-white ring-1 ring-white/10',
  }[variant]

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${styles}`}
    >
      {children}
    </span>
  )
}
