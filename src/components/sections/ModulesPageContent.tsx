import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users } from 'lucide-react'
import { DETAILED_MODULES } from '../../data/modules'
import { MODULE_ICONS } from '../../data/module-icons'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerFast } from '../../lib/motion-presets'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { ModulesExploreSection } from './ModulesExploreSection'
import { ModulesStatsBand } from './ModulesStatsBand'

export function ModulesPageContent() {
  const reduced = useReducedMotion()

  return (
    <>
      <section className="relative overflow-hidden border-b border-border-subtle bg-brand-navy section-padding-tight text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <motion.div
            className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-brand-blue blur-3xl"
            animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[5%] bottom-0 h-72 w-72 rounded-full bg-brand-magenta blur-3xl"
            animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>
        <Container className="relative">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={easePremium}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70"
              animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Connected platform
            </motion.p>
            <p className="mt-4 text-lg leading-relaxed text-white/85 md:text-xl">
              Every module writes to the same employee record — attendance feeds leave, leave feeds payroll,
              recruitment feeds onboarding. No duplicate data entry.
            </p>
          </motion.div>

          <motion.ol
            className="relative mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-4 md:gap-x-0"
            variants={staggerFast}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {DETAILED_MODULES.map((module, i) => {
              const Icon = MODULE_ICONS[module.id] ?? Users
              const isLast = i === DETAILED_MODULES.length - 1
              return (
                <li key={module.id} className="flex items-center">
                  <motion.a
                    href={`#${module.id}`}
                    variants={fadeUp}
                    transition={easePremium}
                    whileHover={reduced ? undefined : { y: -4, scale: 1.05 }}
                    className="group flex flex-col items-center gap-2 rounded-2xl px-2 py-1"
                  >
                    <span className="inline-flex rounded-xl border border-white/20 bg-white/10 p-2.5 transition group-hover:gradient-brand group-hover:border-transparent group-hover:shadow-soft">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="max-w-[4.5rem] text-center text-[10px] font-semibold leading-tight text-white/75 group-hover:text-white">
                      {module.title.split(' ')[0]}
                    </span>
                  </motion.a>
                  {!isLast ? (
                    <motion.span
                      className="mx-1 hidden h-px w-6 bg-gradient-to-r from-white/40 to-white/10 md:block lg:w-10"
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      aria-hidden
                    />
                  ) : null}
                </li>
              )
            })}
          </motion.ol>
        </Container>
      </section>

      <ModulesExploreSection />

      <section className="section-padding-tight border-t border-border-subtle bg-surface-1">
        <Container>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={easePremium}
          >
            <Card variant="soft" className="relative overflow-hidden !p-6 md:!p-8">
              <motion.div
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-blue/10 blur-2xl"
                animate={reduced ? undefined : { scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-hidden
              />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="blue">Platform</Badge>
                  <p className="mt-3 text-lg font-semibold text-brand-ink">
                    One login for HR, managers, and employees
                  </p>
                  <p className="mt-2 max-w-2xl text-sm text-muted">
                    Pick the modules you need today — add recruitment, performance, or mobile when you grow.
                    Permissions stay role-based across every screen.
                  </p>
                </div>
                <Button to="/features" variant="outline">
                  Compare all features
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      <ModulesStatsBand />
    </>
  )
}
