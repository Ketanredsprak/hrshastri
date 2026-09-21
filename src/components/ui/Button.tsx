import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'inverse'
  | 'outlineOnDark'

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  href?: string
  to?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  /** Label shown inside custom cursor ring on hover */
  'data-cursor'?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'gradient-brand text-white shadow-soft hover:brightness-[1.04] active:brightness-[0.98] focus-visible:ring-brand-purple disabled:opacity-50',
  secondary:
    'bg-brand-blue text-white hover:bg-brand-blue-hover active:bg-brand-purple-dark focus-visible:ring-brand-blue disabled:opacity-50',
  outline:
    'border-2 border-brand-blue/25 bg-white text-brand-blue hover:border-brand-blue hover:bg-brand-blue-light active:bg-brand-blue-light/80 focus-visible:ring-brand-blue disabled:opacity-50',
  ghost:
    'text-brand-ink hover:bg-surface-2 active:bg-surface-1 focus-visible:ring-brand-blue disabled:opacity-50',
  inverse:
    'bg-white text-brand-ink hover:bg-surface-1 active:bg-surface-2 focus-visible:ring-white disabled:opacity-50',
  outlineOnDark:
    'border-2 border-white/50 bg-transparent text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-white disabled:opacity-50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  children,
  href,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  'data-cursor': dataCursor,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} data-cursor={dataCursor}>
        {children}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        data-cursor={dataCursor}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-cursor={dataCursor}
    >
      {children}
    </button>
  )
}
