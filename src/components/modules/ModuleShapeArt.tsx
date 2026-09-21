import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const float = (delay: number) =>
  ({
    animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
    transition: { duration: 5 + delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
  }) as const

type ModuleShapeArtProps = {
  moduleId: string
  Icon?: LucideIcon
  index: number
  compact?: boolean
  /** Banner: full-width header strip without centered icon */
  layout?: 'default' | 'banner'
}

export function ModuleShapeArt({
  moduleId,
  Icon,
  index,
  compact,
  layout = 'default',
}: ModuleShapeArtProps) {
  const reduced = useReducedMotion()
  const motionProps = reduced ? {} : float(index * 0.15)
  const isBanner = layout === 'banner'

  const sizeClass = isBanner
    ? 'absolute inset-0 min-h-0'
    : compact
      ? 'min-h-[120px]'
      : 'min-h-[220px] md:min-h-[260px]'

  return (
    <div
      className={`relative overflow-hidden ${isBanner ? '' : 'rounded-2xl'} ${sizeClass} w-full`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/12 via-white to-brand-purple/15" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(0 51 204 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(81 69 157 / 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <motion.div
        className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl"
        {...(reduced ? {} : { animate: { scale: [1, 1.08, 1] }, transition: { duration: 6, repeat: Infinity } })}
      />
      <motion.div
        className="absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-brand-magenta/15 blur-2xl"
        {...(reduced ? {} : { animate: { scale: [1, 1.12, 1] }, transition: { duration: 7, repeat: Infinity, delay: 0.5 } })}
      />

      <ShapeVariant moduleId={moduleId} index={index} reduced={reduced} banner={isBanner} />

      {!isBanner && Icon ? (
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lift backdrop-blur"
          {...motionProps}
        >
          <span className="gradient-brand inline-flex rounded-xl p-3 text-white shadow-soft">
            <Icon className={compact ? 'h-6 w-6' : 'h-8 w-8'} strokeWidth={1.75} />
          </span>
        </motion.div>
      ) : null}
    </div>
  )
}

function ShapeVariant({
  moduleId,
  index,
  reduced,
  banner,
}: {
  moduleId: string
  index: number
  reduced: boolean
  banner?: boolean
}) {
  const scale = banner ? 'scale-90 opacity-80' : ''
  const spin = reduced
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: 48 + index * 4, repeat: Infinity, ease: 'linear' as const },
      }

  switch (moduleId) {
    case 'employee-database':
      return (
        <div className={`absolute inset-0 flex items-center justify-center p-8 ${scale}`}>
          <div className="grid grid-cols-4 gap-3 opacity-90">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-3 w-3 rounded-full bg-brand-blue/35"
                initial={{ opacity: 0.4 }}
                animate={reduced ? undefined : { opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        </div>
      )
    case 'attendance':
      return (
        <motion.div className="absolute inset-0 flex items-center justify-center" {...spin}>
          <div className="relative h-44 w-44 rounded-full border-[10px] border-dashed border-brand-blue/25">
            <div className="absolute left-1/2 top-1/2 h-0.5 w-[42%] origin-left -translate-y-1/2 bg-brand-purple/50" />
            <div className="absolute left-1/2 top-1/2 h-[38%] w-0.5 origin-bottom -translate-x-1/2 bg-brand-blue/60" />
          </div>
        </motion.div>
      )
    case 'leave':
      return (
        <div className="absolute inset-8 grid grid-cols-3 grid-rows-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`rounded-lg ${i === 4 ? 'gradient-brand opacity-80' : 'bg-brand-purple/15'}`}
            />
          ))}
        </div>
      )
    case 'payroll':
      return (
        <div className="absolute inset-x-10 bottom-10 top-16 flex items-end justify-center gap-2">
          {[40, 65, 50, 80, 55].map((h, i) => (
            <motion.div
              key={i}
              className="w-7 rounded-t-lg bg-gradient-to-t from-brand-purple/50 to-brand-blue/40"
              initial={{ height: h * 0.6 }}
              animate={reduced ? { height: h } : { height: [h * 0.7, h, h * 0.85] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )
    case 'recruitment':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-28 rounded-full bg-brand-blue/25" />
            <div className="h-10 w-20 rounded-full bg-brand-purple/30" />
            <div className="h-12 w-14 rounded-full bg-brand-magenta/35" />
          </div>
        </div>
      )
    case 'performance':
      return (
        <svg className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" viewBox="0 0 200 120" fill="none">
          <motion.path
            d="M10 100 L50 70 L90 85 L130 40 L190 20"
            stroke="url(#perfGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={reduced ? { pathLength: 1 } : { pathLength: [0.3, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="perfGrad" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#0033cc" />
              <stop offset="1" stopColor="#51459d" />
            </linearGradient>
          </defs>
        </svg>
      )
    case 'expense-claim':
      return (
        <div className="absolute inset-x-12 top-14 space-y-2">
          {[100, 85, 92, 70].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-brand-blue/20" style={{ width: `${w}%` }} />
          ))}
          <div className="mt-4 h-16 rounded-xl border-2 border-dashed border-brand-purple/30" />
        </div>
      )
    case 'reports':
      return (
        <motion.div
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgb(0 51 204 / 0.35), rgb(81 69 157 / 0.4), rgb(184 63 129 / 0.35), rgb(0 51 204 / 0.2))',
          }}
          {...spin}
        />
      )
    case 'mobile':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-44 w-24 rounded-[1.75rem] border-[3px] border-brand-ink/15 bg-white/50 p-2 shadow-card">
            <div className="h-full w-full rounded-[1.25rem] gradient-brand-soft p-2">
              <div className="h-2 w-8 rounded-full bg-brand-ink/10 mx-auto" />
              <div className="mt-3 space-y-1.5">
                <div className="h-2 rounded bg-brand-blue/25" />
                <div className="h-2 rounded bg-brand-purple/20" />
                <div className="h-2 w-2/3 rounded bg-brand-blue/15" />
              </div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rotate-45 rounded-3xl border-2 border-brand-blue/25 bg-brand-purple/10" />
        </div>
      )
  }
}
