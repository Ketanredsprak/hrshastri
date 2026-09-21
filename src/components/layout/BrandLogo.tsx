import { SITE } from '../../lib/constants'

type BrandLogoProps = {
  className?: string
  priority?: boolean
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <picture>
      <source type="image/webp" srcSet="/logo.webp" />
      <img
        src="/logo.png"
        alt={SITE.name}
        width={402}
        height={94}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
      />
    </picture>
  )
}
