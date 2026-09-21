import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { SITE } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'

const features = [
  'Attendance punch with geofencing patterns',
  'Leave, WFH, and gate pass requests',
  'Payslips and claim submissions',
  'Announcements, policies, and tickets',
]

const storeBadgeClass =
  'group inline-flex h-12 w-full max-w-[180px] shrink-0 items-center gap-2.5 rounded-xl border border-white/30 bg-black/40 px-3 text-white shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-black/55 sm:h-[52px] sm:w-[168px] sm:gap-3 sm:px-3.5'

function GooglePlayBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="Play"
      className={storeBadgeClass}
      aria-label="Get HR Shastri on Google Play"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
        <path
          fill="#EA4335"
          d="M3.6 2.2c-.4.2-.6.6-.6 1.1v17.4c0 .5.2.9.6 1.1l9.7-9.8L3.6 2.2z"
        />
        <path fill="#FBBC04" d="M16.5 10.1 13.3 12l3.2 1.9 3.5-2c.7-.4.7-1.1 0-1.5l-3.5-2z" />
        <path fill="#4285F4" d="M13.3 12 3.6 21.8c.2.1.4.2.7.2.3 0 .5-.1.8-.2l11.4-6.5L13.3 12z" />
        <path fill="#34A853" d="M13.3 12 16.5 10.1 5.1 3.6c-.3-.2-.5-.2-.8-.2-.3 0-.5.1-.7.2L13.3 12z" />
      </svg>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-white/70">
          Get it on
        </span>
        <span className="block text-[13px] font-bold tracking-wide">Google Play</span>
      </span>
    </a>
  )
}

function AppStoreBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="App Store"
      className={storeBadgeClass}
      aria-label="Download HR Shastri on the App Store"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-white" aria-hidden>
        <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.5-3.7zm-2.3-6.5c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2.1-.5 2.8-1.4z" />
      </svg>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-white/70">
          Download on the
        </span>
        <span className="block text-[13px] font-bold tracking-wide">App Store</span>
      </span>
    </a>
  )
}

function PhoneMock({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px]">
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-blue/25 blur-3xl sm:-inset-8" aria-hidden />
      <div className="pointer-events-none absolute -right-4 top-10 h-32 w-32 rounded-full bg-brand-magenta/20 blur-2xl sm:-right-6 sm:h-40 sm:w-40" aria-hidden />

      <motion.div
        className="absolute -right-4 top-10 hidden w-[160px] rotate-[8deg] rounded-[2rem] border-[8px] border-white/20 bg-white/10 p-1.5 opacity-50 backdrop-blur sm:-right-6 sm:block sm:w-[200px]"
        aria-hidden
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="h-56 overflow-hidden rounded-[1.4rem]">
          <img
            src="/images/mobile-app-screen.png"
            alt=""
            className="h-full w-full object-cover object-top opacity-70"
          />
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 overflow-hidden rounded-[2.25rem] border-[10px] border-[#111827] bg-[#111827] shadow-lift ring-1 ring-white/10"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute left-1/2 top-2.5 z-20 h-4 w-[88px] -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[1.55rem] bg-white">
          <img
            src="/images/mobile-app-screen.png"
            alt="HR Shastri mobile app — clock in, leave, and announcements"
            className="block h-auto w-full"
            loading="lazy"
            width={320}
            height={666}
          />
        </div>
      </motion.div>
    </div>
  )
}

export function MobileAppSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="mobile-app"
      className="relative section-padding overflow-hidden bg-brand-navy text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-brand-magenta/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp} transition={easePremium}>
              <Badge variant="onDark">Mobile app</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 text-section font-bold tracking-tight text-white"
            >
              HR workflows in every employee&apos;s pocket
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={easePremium}
              className="mt-4 max-w-lg text-lead text-slate-300"
            >
              Punch attendance, apply leave, download payslips, and stay on top of announcements —
              from anywhere. Built for field teams and office staff alike.
            </motion.p>

            <motion.ul variants={fadeUp} transition={easePremium} className="mt-6 space-y-2.5">
              {features.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              transition={easePremium}
              className="mt-8 flex w-full flex-wrap items-center gap-3"
            >
              <GooglePlayBadge href={SITE.playStoreUrl} />
              <AppStoreBadge href={SITE.appStoreUrl} />
            </motion.div>
            <motion.p variants={fadeUp} transition={easePremium} className="mt-3 text-xs text-slate-400">
              Free on Google Play and the App Store
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={easePremium}
          >
            <PhoneMock reduced={reduced} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
