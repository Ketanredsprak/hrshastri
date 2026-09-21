import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Building2, Layers, Users } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'
import { Container } from '../ui/Container'

type StatDef = {
  label: string
  value: number
  suffix: string
  display?: string
  Icon: typeof Layers
  accent: string
  shape: 'rings' | 'bars' | 'dots'
}

const STATS: StatDef[] = [
  {
    label: 'Modules',
    value: 9,
    suffix: '+',
    Icon: Layers,
    accent: 'from-brand-blue/20 to-brand-purple/10',
    shape: 'rings',
  },
  {
    label: 'Employees managed',
    value: 50000,
    suffix: '+',
    display: '50,000',
    Icon: Users,
    accent: 'from-brand-purple/20 to-brand-magenta/10',
    shape: 'bars',
  },
  {
    label: 'Companies',
    value: 500,
    suffix: '+',
    Icon: Building2,
    accent: 'from-brand-magenta/15 to-brand-blue/15',
    shape: 'dots',
  },
]

function formatCount(n: number, display?: string) {
  if (display && n >= 50000) return display
  return n.toLocaleString('en-IN')
}

function AnimatedValue({
  value,
  suffix,
  display,
  reduced,
}: {
  value: number
  suffix: string
  display?: string
  reduced: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 22 })

  useEffect(() => {
    if (reduced) {
      motionValue.set(value)
      return
    }
    if (inView) motionValue.set(value)
  }, [inView, value, reduced, motionValue])

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      if (!ref.current) return
      ref.current.textContent = `${formatCount(Math.round(latest), display)}${suffix}`
    })
    return unsub
  }, [spring, suffix, display])

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? `${display ?? value.toLocaleString('en-IN')}${suffix}` : `0${suffix}`}
    </span>
  )
}

function ShapeBackdrop({ shape }: { shape: StatDef['shape'] }) {
  if (shape === 'rings') {
    return (
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-50" aria-hidden>
        <div className="h-24 w-24 rounded-full border-2 border-brand-blue/25" />
        <div className="absolute left-4 top-4 h-16 w-16 rounded-full border-2 border-dashed border-brand-purple/30" />
      </div>
    )
  }
  if (shape === 'bars') {
    return (
      <div className="pointer-events-none absolute bottom-3 right-4 flex items-end gap-1 opacity-40" aria-hidden>
        {[10, 16, 12, 20, 14].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-t bg-brand-purple/50"
            initial={{ height: 4 }}
            whileInView={{ height: h }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.5 }}
          />
        ))}
      </div>
    )
  }
  return (
    <div className="pointer-events-none absolute right-3 top-3 grid grid-cols-3 gap-1 opacity-40" aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-brand-magenta/60"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}

export function ModulesStatsBand() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden section-padding-tight">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/[0.04] via-white to-brand-purple/[0.06]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-brand-magenta/10 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1 }}
        aria-hidden
      />

      <Container className="relative">
        <motion.div
          variants={staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 md:grid-cols-3"
        >
          {STATS.map((stat) => {
            const Icon = stat.Icon
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={easePremium}
                whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-white/90 p-6 shadow-card backdrop-blur-sm ring-1 ring-black/[0.02] transition hover:border-brand-blue/25 hover:shadow-lift"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 transition group-hover:opacity-100`}
                  aria-hidden
                />
                <ShapeBackdrop shape={stat.shape} />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl gradient-brand p-2.5 text-white shadow-soft">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue/40 transition group-hover:scale-150 group-hover:bg-brand-magenta" />
                </div>

                <p className="relative mt-5 text-3xl font-extrabold tracking-tight text-gradient-brand md:text-4xl">
                  <AnimatedValue
                    value={stat.value}
                    suffix={stat.suffix}
                    display={stat.display}
                    reduced={reduced}
                  />
                </p>
                <p className="relative mt-1.5 text-sm font-medium text-muted">{stat.label}</p>

                <motion.div
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left gradient-brand"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...easePremium, delay: 0.2 }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
