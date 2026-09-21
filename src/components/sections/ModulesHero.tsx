import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'

function FloatingShapes({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-8 top-16 h-40 w-40 rounded-full bg-brand-blue/10 blur-2xl" />
        <div className="absolute right-24 bottom-8 h-32 w-32 rounded-3xl bg-brand-purple/10 blur-xl" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-brand-blue/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[18%] top-28 h-36 w-36 rounded-full bg-brand-magenta/12 blur-2xl"
        animate={{ scale: [1, 1.15, 1], x: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute right-16 top-24 h-24 w-24 rounded-3xl border-2 border-brand-blue/20"
        animate={{ rotate: [0, 12, 0], y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-40 top-48 h-16 w-16 rotate-12 rounded-2xl gradient-brand opacity-25"
        animate={{ y: [0, 18, 0], rotate: [12, 28, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-16 right-[28%] h-3 w-3 rounded-full bg-brand-blue"
        animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-28 right-20 h-2 w-2 rounded-full bg-brand-magenta"
        animate={{ y: [0, -16, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute right-8 bottom-20 hidden h-28 w-28 rounded-full border border-dashed border-brand-purple/25 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function ModulesHero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-surface-1 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-80" />
      <FloatingShapes reduced={reduced} />

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div
            variants={staggerContainer}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            className="min-w-0"
          >
            <motion.div variants={fadeUp} transition={easePremium}>
              <Badge variant="blue">Modules</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 max-w-xl text-display font-extrabold tracking-tight text-brand-ink"
            >
              Every HR workflow —{' '}
              <span className="text-gradient-brand">illustrated, not imaged</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 max-w-lg text-lead text-muted"
            >
              Nine connected modules with animated shapes and full feature lists. Clear
              capability stories — no product screenshots.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={easePremium}
              className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
            >
              <Button to="/contact?intent=demo" data-cursor="Demo" className="w-full sm:w-auto">
                Book a guided demo
              </Button>
              <Button href="#module-library" variant="outline" data-cursor="Explore" className="w-full sm:w-auto">
                Explore modules
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
            <motion.ul
              variants={fadeUp}
              transition={easePremium}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted"
            >
              {['Hire to retire', 'India payroll ready', 'Web + mobile'].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Animated visual panel — shapes only */}
          <motion.div
            className="relative mx-auto hidden w-full max-w-md lg:block"
            initial={reduced ? false : { opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ ...easePremium, delay: 0.15 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border-subtle bg-white/70 p-6 shadow-lift backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/8 via-transparent to-brand-purple/10" />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(0 51 204 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(81 69 157 / 0.06) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Orbiting modules preview */}
              <div className="relative flex h-full items-center justify-center">
                <motion.div
                  className="absolute h-40 w-40 rounded-full border border-dashed border-brand-blue/25"
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute h-56 w-56 rounded-full border border-brand-purple/15"
                  animate={reduced ? undefined : { rotate: -360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="z-10 flex h-20 w-20 items-center justify-center rounded-2xl gradient-brand text-sm font-bold text-white shadow-soft"
                  animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  9+
                </motion.div>
                {[
                  { top: '12%', left: '50%', label: 'DB' },
                  { top: '28%', left: '82%', label: 'AT' },
                  { top: '62%', left: '88%', label: 'LV' },
                  { top: '82%', left: '58%', label: 'PY' },
                  { top: '78%', left: '22%', label: 'RC' },
                  { top: '42%', left: '8%', label: 'PF' },
                ].map((node, i) => (
                  <motion.span
                    key={node.label}
                    className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white bg-white text-[10px] font-bold text-brand-blue shadow-card"
                    style={{ top: node.top, left: node.left }}
                    initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...easePremium, delay: 0.35 + i * 0.08 }}
                    whileHover={reduced ? undefined : { scale: 1.12 }}
                  >
                    {node.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
