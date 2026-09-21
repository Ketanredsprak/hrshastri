import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium } from '../../lib/motion-presets'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const SHOWCASE_IMAGE = '/images/product-showcase-dashboard.png'

export function ProductShowcaseSection() {
  const reduced = useReducedMotion()

  return (
    <section className="section-padding bg-brand-navy text-white" id="product-showcase">
      <Container>
        <SectionHeading
          tone="onDark"
          eyebrow="Product tour"
          title="One dashboard for HR, payroll, and people insights"
          description="Role-aware home with calendars, attendance punch, approvals, and workforce visibility — staff, payroll, recruitment, finance, and reports in one navigation."
          align="center"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={easePremium}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-lift ring-1 ring-white/10">
            <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-1 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
              <span className="ml-1 truncate text-[11px] font-medium text-muted">
                HR Shastri — Company dashboard
              </span>
            </div>
            <div className="relative bg-surface-1">
              <img
                src={SHOWCASE_IMAGE}
                alt="One dashboard for HR, payroll, and people insights"
                title="One dashboard for HR, payroll, and people insights"
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
              />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            Dashboard, payroll, attendance & leaves, recruitment, finance, reports, and more — from
            one secure company workspace.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
