import { TRUST_STATS } from '../../data/testimonials'
import { Container } from '../ui/Container'
import { RevealGroup, RevealItem } from '../ui/MotionReveal'

export function StatsSection() {
  return (
    <section className="gradient-brand py-14 text-white">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white/85">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
