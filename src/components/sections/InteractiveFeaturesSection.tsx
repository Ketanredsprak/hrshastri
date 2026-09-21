import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MAIN_FEATURES } from '../../data/features'
import { easeFast } from '../../lib/motion-presets'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const FEATURE_KEYS = [
  'Employee Management',
  'Attendance',
  'Leave Management',
  'Payroll',
  'Performance Management',
  'Recruitment',
  'Expense Management',
  'Document Management',
] as const

const features = MAIN_FEATURES.filter((f) =>
  FEATURE_KEYS.includes(f.title as (typeof FEATURE_KEYS)[number]),
)

function FeaturePreview({ title }: { title: string }) {
  return (
    <div className="browser-frame h-full min-h-[240px] p-3 sm:min-h-[280px] sm:p-4 md:min-h-[320px] md:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{title}</p>
      <p className="mt-1 text-base font-bold text-brand-ink sm:text-lg">Module preview</p>
      <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
        <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 sm:p-4">
          <div className="h-2 w-1/2 rounded bg-surface-2" />
          <div className="mt-3 h-14 rounded-lg bg-gradient-to-br from-brand-blue/15 to-brand-purple/10 sm:h-16" />
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 sm:p-4">
          <div className="h-2 w-2/3 rounded bg-surface-2" />
          <div className="mt-3 space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-2 rounded bg-surface-2" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle p-3">
        <div className="flex gap-1.5 sm:gap-2">
          {[40, 65, 50, 78, 60].map((w, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-brand-blue/80"
              style={{ height: `${Math.max(28, w * 0.7)}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function InteractiveFeaturesSection() {
  const [active, setActive] = useState(0)
  const current = features[active]
  const Icon = current.icon

  return (
    <section className="section-padding bg-surface-1" id="features">
      <Container>
        <SectionHeading
          eyebrow="HRMS features"
          title="Explore the platform by capability"
          description="Select a module to preview how HR Shastri presents data to your HR team — one system for daily operations."
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-10">
          {/* Mobile: horizontal chip scroller; Desktop: vertical list */}
          <div className="min-w-0">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-thin lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0">
              {features.map((feature, index) => {
                const FIcon = feature.icon
                const isActive = index === active
                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-3 text-left transition lg:w-full lg:items-start lg:gap-3 lg:px-4 lg:py-3.5 ${
                      isActive
                        ? 'border-brand-blue/30 bg-white shadow-card ring-1 ring-brand-blue/10'
                        : 'border-border-subtle bg-white/80 lg:border-transparent lg:bg-transparent lg:hover:bg-white/70'
                    }`}
                  >
                    <span
                      className={`inline-flex rounded-lg p-2 ${
                        isActive ? 'bg-brand-blue text-white' : 'bg-brand-blue-light text-brand-blue'
                      }`}
                    >
                      <FIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block whitespace-nowrap text-sm font-semibold text-brand-ink lg:whitespace-normal">
                        {feature.title}
                      </span>
                      <span className="mt-0.5 hidden text-xs leading-relaxed text-muted lg:line-clamp-2 lg:block">
                        {feature.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <Link
              to="/features"
              className="mt-3 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-purple lg:mt-2"
            >
              View all 13+ modules →
            </Link>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={easeFast}
              className="min-w-0"
            >
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="blue">{current.title}</Badge>
                <Icon className="h-4 w-4 text-brand-blue" aria-hidden />
              </div>
              <FeaturePreview title={current.title} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
