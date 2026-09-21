import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Container } from '../ui/Container'

type Crumb = { name: string; path: string }

type BreadcrumbsProps = {
  items: Crumb[]
}

/** Visible breadcrumbs — keep in sync with BreadcrumbList JSON-LD via SEO page config */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border-subtle bg-white">
      <Container>
        <ol className="flex flex-wrap items-center gap-1 py-3 text-xs text-muted sm:text-sm">
          {items.map((item, index) => {
            const last = index === items.length - 1
            return (
              <li key={item.path} className="flex items-center gap-1">
                {index > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
                ) : null}
                {last ? (
                  <span className="font-medium text-brand-ink" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-brand-blue">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
