import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium } from '../../lib/motion-presets'

const HERO_DASHBOARD_SRC = '/images/hero-dashboard.png'

export function HeroDashboard() {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-blue/15 to-brand-purple/20 blur-2xl"
        aria-hidden
      />
        <motion.div
        initial={reduced ? false : { y: 16 }}
        animate={{ y: 0 }}
        transition={{ ...easePremium, delay: 0.08 }}
        className="browser-frame relative overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-1 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          <span className="ml-1 truncate text-[11px] font-medium text-muted">
            HR Shastri — Company dashboard
          </span>
        </div>
        <div className="relative max-h-[min(280px,48vh)] overflow-hidden bg-surface-1 sm:max-h-[min(360px,52vh)] lg:max-h-[480px]">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/hero-dashboard-640.webp 640w, /images/hero-dashboard.webp 1024w"
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
            />
            <img
              src={HERO_DASHBOARD_SRC}
              alt="HR Shastri HRMS dashboard with staff metrics, calendar, attendance modules, and workforce overview"
              className="block h-full w-full object-cover object-left-top"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1024}
              height={501}
            />
          </picture>
        </div>
      </motion.div>
    </div>
  )
}
