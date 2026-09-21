import { TRUST_STATS } from '../../data/testimonials'
import { Container } from '../ui/Container'
import { RevealGroup, RevealItem } from '../ui/MotionReveal'

export function StatsSection() {
  return (
    <section className="gradient-brand py-14 text-white">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((stat, index) => (
            <RevealItem key={stat.label} className="relative text-center">
              {index > 0 ? (
                <span
                  className="pointer-events-none absolute top-1/2 -left-4 hidden h-2 w-2 -translate-y-1/2 rotate-45 bg-white/40 md:block"
                  aria-hidden
                />
              ) : null}
              <p className="text-3xl font-extrabold md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white/85">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
