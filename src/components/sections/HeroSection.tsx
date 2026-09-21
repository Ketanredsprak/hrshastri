import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'
import { HeroCursorGlow } from '../effects/HeroCursorGlow'
import { HeroDashboard } from '../product/HeroDashboard'
import { TrustBar } from '../marketing/TrustBar'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  const reduced = useReducedMotion()

  return (
    <section className="hero-mesh relative overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-24 md:pt-14">
      <HeroCursorGlow />
      <Container className="relative">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <motion.div
            variants={staggerContainer}
            initial={reduced ? false : 'hidden'}
            animate="visible"
            className="max-w-xl lg:max-w-none"
          >
            <motion.div variants={fadeUp} transition={easePremium}>
              <Badge variant="blue">Modern HR management platform</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 text-display font-extrabold text-brand-ink sm:mt-5"
            >
              Automate HR, payroll &{' '}
              <span className="text-gradient-brand">workforce management</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 text-lead text-muted sm:mt-6"
            >
              HR Shastri unifies employee records, attendance, leave, Indian payroll, recruitment,
              and mobile self-service — with secure role-based access for HR, managers, and
              employees.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={easePremium}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
            >
              <Button to="/contact?intent=demo" size="lg" className="w-full sm:w-auto" data-cursor="Demo">
                Book a free demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                to="/features"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                data-cursor="Explore"
              >
                Explore features
              </Button>
            </motion.div>
            <motion.p
              variants={fadeUp}
              transition={easePremium}
              className="mt-3 text-xs text-muted sm:mt-4 sm:text-sm"
            >
              No credit card required for trial inquiry · Implementation support included
            </motion.p>
            <motion.div variants={fadeUp} transition={easePremium} className="mt-2 sm:mt-0">
              <TrustBar />
            </motion.div>
          </motion.div>
          <div className="min-w-0">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  )
}
