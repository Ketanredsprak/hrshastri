import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MotionReveal } from '../ui/MotionReveal'

type CtaBandProps = {
  title?: string
  description?: string
}

export function CtaBand({
  title = 'Ready to simplify your HR operations?',
  description = 'Book a free demo with our implementation team — payroll, attendance, leave, and compliance configured for your organization.',
}: CtaBandProps) {
  return (
    <section className="section-padding-tight bg-surface-1">
      <Container>
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl gradient-brand px-8 py-12 text-white shadow-soft md:px-14 md:py-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/95 md:text-base">{description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact?intent=demo" variant="inverse" size="lg" className="w-full sm:w-auto">
                  Book a free demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button to="/contact" variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  )
}
