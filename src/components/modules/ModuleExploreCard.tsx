import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ModuleDetail } from '../../data/modules'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium } from '../../lib/motion-presets'
import { ModuleShapeArt } from './ModuleShapeArt'
import { Button } from '../ui/Button'

type ModuleExploreCardProps = {
  module: ModuleDetail
  index: number
  Icon: LucideIcon
  extras: string[]
}

export function ModuleExploreCard({ module, index, Icon, extras }: ModuleExploreCardProps) {
  const allPoints = [...module.bullets, ...extras]
  const reduced = useReducedMotion()

  return (
    <motion.article
      id={module.id}
      className="group/card scroll-mt-28 flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-card"
      whileHover={
        reduced
          ? undefined
          : {
              y: -4,
              boxShadow: '0 16px 40px -20px rgb(15 23 42 / 0.2)',
              borderColor: 'rgb(0 51 204 / 0.28)',
            }
      }
      transition={{ duration: 0.22 }}
    >
      <div className="relative h-16 shrink-0 overflow-hidden">
        <ModuleShapeArt moduleId={module.id} index={index} layout="banner" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/50" />
        <div className="absolute inset-0 flex items-center gap-3 px-4">
          <span className="inline-flex shrink-0 rounded-lg bg-brand-blue-light p-2 text-brand-blue ring-1 ring-brand-blue/10">
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tabular-nums text-brand-purple">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="truncate text-[15px] font-bold leading-tight text-brand-ink">
                {module.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 gradient-brand opacity-80" />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="text-xs leading-relaxed text-muted">{module.subtitle}</p>

        <ul className="mt-3 flex-1 space-y-2">
          {allPoints.map((point, i) => (
            <motion.li
              key={point}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...easePremium, delay: 0.03 * i }}
              className="flex gap-2 text-[13px] leading-snug text-slate-700"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" strokeWidth={2} />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-3 border-t border-border-subtle pt-3">
          <Button to="/contact?intent=demo" size="sm" className="!px-3 !py-1.5 !text-xs">
            Book demo
          </Button>
          <Link
            to="/contact?intent=trial"
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand-blue transition group-hover/card:gap-1.5 hover:text-brand-purple"
          >
            Free trial
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
