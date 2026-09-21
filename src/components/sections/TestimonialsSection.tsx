import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS } from '../../data/testimonials'
import { easeFast } from '../../lib/motion-presets'
import { Container } from '../ui/Container'
import { QuoteMark } from '../ui/SectionMotif'
import { SectionHeading } from '../ui/SectionHeading'

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const item = TESTIMONIALS[index]

  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by HR leaders"
          description="Outcomes from teams that replaced spreadsheets and disconnected tools with one HRMS platform."
        />
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 p-5 sm:rounded-3xl sm:p-8 md:p-12">
          <QuoteMark className="pointer-events-none absolute -left-2 -top-1 h-16 w-20 text-brand-purple/10 sm:h-20 sm:w-24" />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={easeFast}
            >
              <div className="mb-4 flex gap-1 sm:mb-6">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5" aria-hidden />
                ))}
              </div>
              <blockquote className="text-base font-medium leading-relaxed text-brand-ink sm:text-xl md:text-2xl">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white sm:h-12 sm:w-12">
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-brand-ink">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8 sm:gap-4">
            <div className="flex flex-wrap gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition ${i === index ? 'w-8 bg-brand-blue' : 'w-2.5 bg-border-subtle'}`}
                  aria-label={`Show testimonial from ${t.name}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle bg-white text-brand-ink hover:border-brand-blue/30"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle bg-white text-brand-ink hover:border-brand-blue/30"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
