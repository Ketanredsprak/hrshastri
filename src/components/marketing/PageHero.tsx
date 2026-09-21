import type { ReactNode } from 'react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { MotionReveal } from '../ui/MotionReveal'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-x-clip border-b border-border-subtle bg-surface-1 pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,51,204,0.08),transparent_55%)]" />
      <Container className="relative">
        <MotionReveal eager>
          {eyebrow ? <Badge variant="blue">{eyebrow}</Badge> : null}
          <h1 className="mt-3 max-w-3xl text-display font-extrabold tracking-tight text-brand-ink sm:mt-4">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-lead text-muted sm:mt-4">{description}</p>
          ) : null}
          {children ? <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">{children}</div> : null}
        </MotionReveal>
      </Container>
    </section>
  )
}
