import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium } from '../../lib/motion-presets'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { MotionReveal } from '../ui/MotionReveal'
import { CropMarks } from '../ui/SectionMotif'

const SHOWCASE_IMAGE = '/images/product-showcase-dashboard.png'

export function ProductShowcaseSection() {
  const reduced = useReducedMotion()

  return (
    <section className="section-padding bg-brand-navy text-white" id="product-showcase">
      <Container>
        <MotionReveal className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center sm:mb-10 md:mb-12">
          <Badge variant="onDark">Product tour</Badge>
          <p className="mt-4 text-lead text-slate-300">
            Role-aware home with calendars, attendance punch, approvals, and workforce visibility —
            staff, payroll, recruitment, finance, and reports in one navigation.
          </p>
        </MotionReveal>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={easePremium}
          className="relative mx-auto max-w-6xl px-3 py-3 sm:px-4"
        >
          <CropMarks className="text-white/35" />
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
                alt="HR Shastri company dashboard"
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
