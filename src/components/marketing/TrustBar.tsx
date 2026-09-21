import { Star } from 'lucide-react'

const items = [
  { value: '500+', label: 'Companies' },
  { value: '50,000+', label: 'Employees managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9', label: 'Client rating', icon: true },
]

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 sm:pt-8">
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          {item.icon ? (
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" aria-hidden />
          ) : null}
          <p className="text-xs leading-snug text-muted sm:text-sm">
            <span className="font-bold text-brand-ink">{item.value}</span>{' '}
            <span className="text-muted">{item.label}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
