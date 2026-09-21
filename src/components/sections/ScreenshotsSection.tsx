import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const slides = [
  { title: 'Dashboard', caption: 'Role-aware workforce insights and quick actions' },
  { title: 'Attendance', caption: 'Monthly attendance, geofencing, and late-coming views' },
  { title: 'Payroll', caption: 'Slabs, statutory deductions, and payslip generation' },
  { title: 'Reports', caption: 'Exports for HR, finance, and compliance teams' },
  { title: 'Mobile App', caption: 'Punch, leave, payslip, and claims on the go' },
]

export function ScreenshotsSection() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <section className="section-padding bg-brand-navy text-white">
      <Container>
        <SectionHeading
          tone="onDark"
          eyebrow="Product screenshots"
          title="See HR Shastri in action"
          description="Modern dashboards and mobile workflows designed for HR teams and every employee."
          align="center"
        />
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 md:p-8">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-soft transition hover:scale-[1.01]">
              <div className="border-b border-white/10 px-4 py-3 text-xs text-slate-300">{slide.title}</div>
              <div className="aspect-[16/10] bg-gradient-to-br from-brand-purple/40 via-brand-magenta/30 to-brand-blue/40 p-6">
                <div className="grid h-full grid-cols-4 gap-3">
                  <div className="col-span-1 space-y-3 rounded-xl bg-white/10 p-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-2 rounded bg-white/30" />
                    ))}
                  </div>
                  <div className="col-span-3 rounded-xl bg-white/10 p-4">
                    <div className="mb-4 h-4 w-1/3 rounded bg-white/40" />
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-lg bg-white/20" />
                      ))}
                    </div>
                    <div className="mt-4 h-28 rounded-lg bg-white/15" />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-300">{slide.caption}</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                className="rounded-full border border-white/20 p-2 hover:bg-white/10"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition ${i === index ? 'w-8 gradient-brand' : 'w-2.5 bg-white/30'}`}
                    aria-label={`Show ${s.title}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                className="rounded-full border border-white/20 p-2 hover:bg-white/10"
                aria-label="Next screenshot"
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
