import { TRUSTED_LOGOS } from '../../data/testimonials'
import { Container } from '../ui/Container'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { SectionHeading } from '../ui/SectionHeading'

export function TrustedSection() {
  return (
    <section className="border-y border-border-subtle bg-white section-padding-tight">
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow="Social proof"
            title="Trusted by HR teams across India"
            description="Manufacturing, services, stock markets, immigration, and more run daily HR on HR Shastri."
          />
        </MotionReveal>
        <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {TRUSTED_LOGOS.map((name) => (
            <RevealItem key={name}>
              <div className="flex h-[4.5rem] items-center justify-center rounded-2xl border border-border-subtle bg-surface-1 px-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition hover:border-brand-blue/25 hover:bg-white hover:text-brand-ink md:text-xs">
                {name}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
