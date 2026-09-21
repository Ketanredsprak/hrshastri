import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { DETAILED_MODULES } from '../../data/modules'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

function ModuleVisual({
  title,
  index,
  image,
}: {
  title: string
  index: number
  image?: { src: string; webp: string; width: number; height: number }
}) {
  if (image) {
    return (
      <div className="overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-card">
        <picture>
          <source type="image/webp" srcSet={image.webp} />
          <img
            src={image.src}
            alt={title}
            title={title}
            width={image.width}
            height={image.height}
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    )
  }

  const hues = ['from-brand-purple/20 to-brand-magenta/20', 'from-brand-blue/20 to-brand-purple/20']
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${hues[index % 2]} p-6 shadow-card`}
    >
      <div className="rounded-2xl border border-white/60 bg-white/90 p-5 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple">{title}</p>
        <div className="mt-4 space-y-3">
          <div className="h-3 w-3/4 rounded-full bg-slate-200" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="h-3 w-5/6 rounded-full bg-slate-100" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 rounded-xl gradient-brand-soft" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MODULE_IMAGES: Record<string, { src: string; webp: string; width: number; height: number }> = {
  'employee-database': {
    src: '/images/hr-shastri-employee-database.png',
    webp: '/images/hr-shastri-employee-database.webp',
    width: 1024,
    height: 505,
  },
  attendance: {
    src: '/images/hr-shastri-attendance-tracking.png',
    webp: '/images/hr-shastri-attendance-tracking.webp',
    width: 1024,
    height: 501,
  },
  leave: {
    src: '/images/hr-shastri-leave-management.png',
    webp: '/images/hr-shastri-leave-management.webp',
    width: 1024,
    height: 505,
  },
}

type ModulesAlternatingSectionProps = {
  limit?: number
}

export function ModulesAlternatingSection({ limit }: ModulesAlternatingSectionProps) {
  const modules = limit ? DETAILED_MODULES.slice(0, limit) : DETAILED_MODULES

  return (
    <section className="section-padding bg-surface-1" id="modules">
      <Container>
        <SectionHeading
          eyebrow="Product modules"
          title="Deep modules for every stage of the employee lifecycle"
          description="Hire to retire — attendance, leave, payroll, talent, finance, and analytics in one connected system."
        />
        <div className="space-y-16 md:space-y-24">
          {modules.map((module, index) => {
            const reversed = index % 2 === 1
            return (
              <motion.div
                key={module.id}
                id={module.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className={`grid items-center gap-8 sm:gap-10 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <ModuleVisual title={module.title} index={index} image={MODULE_IMAGES[module.id]} />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-brand-navy sm:text-2xl md:text-3xl">{module.title}</h3>
                  <p className="mt-2 text-base text-muted sm:mt-3 sm:text-lg">{module.subtitle}</p>
                  <ul className="mt-5 space-y-3 sm:mt-6">
                    {module.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-slate-700 md:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 sm:mt-8">
                    <Button to="/contact?intent=demo" variant="outline" size="sm" className="w-full sm:w-auto">
                      Book demo for {module.title}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        {limit ? (
          <div className="mt-12 text-center">
            <Link
              to="/modules"
              className="inline-flex items-center rounded-full border border-border-subtle bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm hover:border-brand-blue/30"
            >
              View all {DETAILED_MODULES.length} modules →
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
