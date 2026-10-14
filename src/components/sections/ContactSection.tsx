import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Zap,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { submitContactForm } from '../../lib/contact-api'
import {
  CONTACT_TRIGGER_EVENT,
  normalizeIntent,
  type ContactIntent,
} from '../../lib/contact-navigation'
import { SITE, SOCIAL } from '../../lib/constants'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Input } from '../ui/Input'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { PinRings } from '../ui/SectionMotif'

type ContactSectionProps = {
  showMap?: boolean
  showHeading?: boolean
  ornament?: boolean
}

type IntentConfig = {
  id: ContactIntent
  label: string
  pillLabel: string
  icon: typeof CalendarCheck
  subject: string
  badge: string
  helper: string
  cta: string
  bannerBg: string
  bannerBorder: string
  badgeColor: string
}

const INTENT_CONFIGS: Record<ContactIntent, IntentConfig> = {
  demo: {
    id: 'demo',
    label: 'Book a Demo',
    pillLabel: 'Book Demo',
    icon: CalendarCheck,
    subject: 'Book a free demo',
    badge: '🎯 1-on-1 Product Demo',
    helper:
      'Schedule a personalized walkthrough with our HR specialists. See payroll, attendance, and mobile app tailored to your team.',
    cta: 'Schedule Free Demo',
    bannerBg: 'bg-brand-blue/5',
    bannerBorder: 'border-brand-blue/20',
    badgeColor: 'text-brand-blue',
  },
  trial: {
    id: 'trial',
    label: 'Start Free Trial',
    pillLabel: 'Free Trial',
    icon: Sparkles,
    subject: 'Start free trial',
    badge: '⚡ 21-Day Full Access Trial',
    helper:
      'Instant access to all HR modules. Set up employees, attendance, and leave workflows immediately — no credit card required.',
    cta: 'Activate 21-Day Free Trial',
    bannerBg: 'bg-brand-magenta/5',
    bannerBorder: 'border-brand-magenta/20',
    badgeColor: 'text-brand-magenta',
  },
  sales: {
    id: 'sales',
    label: 'Enterprise & Sales',
    pillLabel: 'Enterprise',
    icon: Building2,
    subject: 'Enterprise / sales inquiry',
    badge: '🏢 Custom Enterprise Solution',
    helper:
      'Custom employee scale, multi-branch compliance, custom roles, API integrations, and dedicated account manager.',
    cta: 'Request Enterprise Quote',
    bannerBg: 'bg-brand-purple/5',
    bannerBorder: 'border-brand-purple/20',
    badgeColor: 'text-brand-purple',
  },
  inquiry: {
    id: 'inquiry',
    label: 'General Inquiry',
    pillLabel: 'Inquiry',
    icon: HelpCircle,
    subject: 'General inquiry',
    badge: '💬 Have a Question?',
    helper:
      'Ask about features, migration, implementation timelines, or custom requirements. Our team responds promptly.',
    cta: 'Send Message',
    bannerBg: 'bg-slate-50',
    bannerBorder: 'border-slate-200',
    badgeColor: 'text-slate-700',
  },
}

type FormErrors = Partial<Record<'name' | 'company' | 'email' | 'phone' | 'employees', string>>

function DeferredMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShow(true)
        observer.disconnect()
      },
      { rootMargin: '240px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="h-64 overflow-hidden rounded-3xl border border-border-subtle bg-surface-2 shadow-card md:h-72"
    >
      {show ? (
        <iframe
          title="HR Shastri office location"
          src="https://www.google.com/maps?q=Darshanam+Oxypark+Vadodara&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  )
}

export function ContactSection({
  showMap = true,
  showHeading = true,
  ornament = false,
}: ContactSectionProps) {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  // Active intent state
  const [selectedIntent, setSelectedIntent] = useState<ContactIntent>(() =>
    normalizeIntent(searchParams.get('intent')),
  )
  const [isHighlighted, setIsHighlighted] = useState(false)
  const highlightTimeoutRef = useRef<number | null>(null)

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const activeConfig = INTENT_CONFIGS[selectedIntent] ?? INTENT_CONFIGS.demo

  const triggerHighlight = useCallback(() => {
    setIsHighlighted(true)
    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current)
    }
    highlightTimeoutRef.current = window.setTimeout(() => {
      setIsHighlighted(false)
    }, 2800)
  }, [])

  // Sync when search params or hash change
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const paramIntent = searchParams.get('intent')
      if (paramIntent) {
        const normalized = normalizeIntent(paramIntent)
        setSelectedIntent((prev) => (prev === normalized ? prev : normalized))
        triggerHighlight()
      } else if (window.location.hash === '#contact') {
        triggerHighlight()
      }
    }, 10)
    return () => window.clearTimeout(timer)
  }, [searchParams, location.hash, triggerHighlight])

  // Listen to custom cross-component navigation event
  useEffect(() => {
    const onContactTrigger = (e: Event) => {
      const custom = e as CustomEvent<{ intent?: ContactIntent }>
      if (custom.detail?.intent) {
        setSelectedIntent(custom.detail.intent)
      }
      triggerHighlight()
    }

    window.addEventListener(CONTACT_TRIGGER_EVENT, onContactTrigger)
    return () => {
      window.removeEventListener(CONTACT_TRIGGER_EVENT, onContactTrigger)
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current)
      }
    }
  }, [triggerHighlight])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    const fd = new FormData(event.currentTarget)
    const nextErrors: FormErrors = {}
    const name = String(fd.get('name') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const employees = String(fd.get('employees') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const website = String(fd.get('website') ?? '').trim()

    if (!name) nextErrors.name = 'Please enter your name'
    if (!company) nextErrors.company = 'Please enter your company name'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = 'Enter a valid email'
    if (!phone) nextErrors.phone = 'Please enter a phone number'
    if (!employees) {
      nextErrors.employees = 'Please enter approx. employee count'
    } else if (!/^\d+$/.test(employees) || Number(employees) <= 0) {
      nextErrors.employees = 'Please enter a valid number (digits only)'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await submitContactForm({
        name,
        company,
        email,
        phone,
        employees,
        message,
        subject: activeConfig.subject,
        website,
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="relative section-padding scroll-mt-20 overflow-hidden bg-surface-1"
      id="contact"
    >
      {ornament ? (
        <>
          <PinRings className="pointer-events-none absolute -left-4 top-6 h-28 w-28 text-brand-blue/20" />
          <PinRings className="pointer-events-none absolute -right-6 bottom-4 h-32 w-32 rotate-180 text-brand-magenta/15" />
        </>
      ) : null}
      <Container className="relative">
        {showHeading ? (
          <MotionReveal className="mb-12 max-w-2xl">
            <h2 className="text-section font-bold text-brand-ink">Contact & demo requests</h2>
            <p className="mt-4 text-lead text-muted">
              Ready to modernize your HR operations? Book a personalized live demo or start your
              21-day trial today.
            </p>
          </MotionReveal>
        ) : null}

        <RevealGroup className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Contact details & map */}
          <RevealItem className="space-y-6">
            <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-card md:p-8">
              <h3 className="text-xl font-bold text-brand-ink">Talk to HR Shastri</h3>
              <p className="mt-2 text-sm text-muted">
                Vadodara headquarters · Serving companies across India
              </p>
              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
                  {SITE.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
                  <a href={SITE.phoneHref} className="font-medium hover:text-brand-blue">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
                  <a href={`mailto:${SITE.email}`} className="font-medium hover:text-brand-blue">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
                  {SITE.hours}
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  Facebook
                </a>
                <a
                  href={SOCIAL.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  X
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  Instagram
                </a>
              </div>
            </div>
            {showMap ? <DeferredMap /> : null}
          </RevealItem>

          {/* Right Column: Contact form with animated tabs & attention glow */}
          <RevealItem>
            <motion.div
              animate={
                isHighlighted
                  ? {
                      scale: [1, 1.015, 1],
                      transition: { duration: 0.5, ease: 'easeOut' },
                    }
                  : {}
              }
              className={`relative overflow-hidden rounded-3xl border bg-white p-6 md:p-8 transition-all duration-700 ${
                isHighlighted
                  ? 'border-brand-purple ring-4 ring-brand-purple/25 shadow-[0_0_50px_rgba(81,69,157,0.28)]'
                  : 'border-border-subtle shadow-card'
              }`}
            >
              {/* Shimmer sweep effect when highlighted */}
              <AnimatePresence>
                {isHighlighted ? (
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '220%', opacity: [0, 0.6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 z-30 -skew-x-12 bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
                  />
                ) : null}
              </AnimatePresence>

              {/* Floating active selection beacon */}
              <AnimatePresence>
                {isHighlighted ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute -top-3.5 right-6 z-30 flex items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-soft"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    <span>Ready: {activeConfig.label}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-brand-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    Fast Response · No Obligation
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-ink sm:text-2xl">
                  {selectedIntent === 'demo'
                    ? 'Book a Live 1-on-1 Demo'
                    : selectedIntent === 'trial'
                      ? 'Start 21-Day Free Trial'
                      : selectedIntent === 'sales'
                        ? 'Request Enterprise Consultation'
                        : 'Send Us a Message'}
                </h3>
              </div>

              {/* Interactive Intent Tabs */}
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-surface-2 p-1.5 sm:grid-cols-4">
                  {(Object.keys(INTENT_CONFIGS) as ContactIntent[]).map((key) => {
                    const config = INTENT_CONFIGS[key]
                    const isSelected = selectedIntent === key
                    const Icon = config.icon

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedIntent(key)
                          triggerHighlight()
                        }}
                        className={`relative flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition ${
                          isSelected
                            ? 'text-white'
                            : 'text-slate-600 hover:text-brand-ink hover:bg-white/60'
                        }`}
                      >
                        {isSelected ? (
                          <motion.div
                            layoutId="contact-active-pill"
                            className="gradient-brand absolute inset-0 rounded-xl shadow-sm"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        ) : null}
                        <span className="relative z-10 flex items-center gap-1 truncate">
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{config.pillLabel}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Animated Intent Description Banner */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIntent}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className={`mt-3 flex items-start gap-2.5 rounded-2xl border p-3 text-xs leading-relaxed ${activeConfig.bannerBg} ${activeConfig.bannerBorder}`}
                  >
                    <Zap className={`mt-0.5 h-4 w-4 shrink-0 ${activeConfig.badgeColor}`} />
                    <div>
                      <span className={`font-semibold mr-1.5 ${activeConfig.badgeColor}`}>
                        {activeConfig.badge}
                      </span>
                      <span className="text-slate-600">{activeConfig.helper}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-2xl border border-success/30 bg-emerald-50/90 p-6 text-center"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950">
                    Thank you! Your {activeConfig.label.toLowerCase()} request is received.
                  </h4>
                  <p className="mt-1.5 text-xs text-emerald-800">
                    Our team will reach out at your provided contact details within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <Input
                    id="contact-name-input"
                    name="name"
                    label="Full name"
                    placeholder="e.g. Rahul Sharma"
                    required
                    error={errors.name}
                    disabled={submitting}
                  />
                  <Input
                    name="company"
                    label="Company name"
                    placeholder="e.g. Acme Tech Solutions"
                    required
                    error={errors.company}
                    disabled={submitting}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      name="email"
                      type="email"
                      label="Work email"
                      placeholder="rahul@company.com"
                      required
                      error={errors.email}
                      disabled={submitting}
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label="Phone number"
                      placeholder="+91 98765 43210"
                      required
                      error={errors.phone}
                      disabled={submitting}
                    />
                  </div>
                  <Input
                    name="employees"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    maxLength={7}
                    label="Approx. employee count"
                    placeholder="e.g. 50"
                    required
                    error={errors.employees}
                    disabled={submitting}
                    onKeyDown={(e) => {
                      // Allow navigation and editing keys
                      if (
                        e.key === 'Backspace' ||
                        e.key === 'Delete' ||
                        e.key === 'Tab' ||
                        e.key === 'Escape' ||
                        e.key === 'Enter' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowDown' ||
                        e.key === 'Home' ||
                        e.key === 'End' ||
                        e.ctrlKey ||
                        e.metaKey
                      ) {
                        return
                      }
                      // Block any character that is not a digit (0-9)
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    onInput={(e) => {
                      // Strip non-digits on paste, autofill, or drag-and-drop
                      const target = e.currentTarget
                      const cleanVal = target.value.replace(/\D/g, '')
                      if (target.value !== cleanVal) {
                        target.value = cleanVal
                      }
                    }}
                  />
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-brand-ink">
                      Message / specific requirements (optional)
                    </span>
                    <textarea
                      name="message"
                      rows={3}
                      disabled={submitting}
                      placeholder={
                        selectedIntent === 'demo'
                          ? 'Tell us what modules you want to focus on during the demo...'
                          : selectedIntent === 'trial'
                            ? 'Any specific branch/payroll configuration needed for your trial?'
                            : 'Describe your organization and timeline...'
                      }
                      className="w-full cursor-text rounded-xl border border-border-subtle px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60 placeholder:text-slate-400"
                    />
                  </label>
                  {submitError ? (
                    <p
                      className="rounded-xl border border-error/30 bg-red-50 p-3 text-sm text-error"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  ) : null}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full shadow-soft sm:w-auto"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting…' : `${activeConfig.cta} →`}
                    </Button>
                    <p className="mt-2.5 text-[11px] text-muted">
                      🔒 Your data is private. No credit card required. We respond within business
                      hours.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  )
}
