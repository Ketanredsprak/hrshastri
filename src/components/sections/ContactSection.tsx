import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { submitContactForm } from '../../lib/contact-api'
import { SITE, SOCIAL } from '../../lib/constants'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { Input } from '../ui/Input'
import { PinRings } from '../ui/SectionMotif'

type ContactSectionProps = {
  showMap?: boolean
  showHeading?: boolean
  ornament?: boolean
}

const INTENT_SUBJECTS: Record<string, string> = {
  demo: 'Book a free demo',
  trial: 'Start free trial',
  sales: 'Enterprise / sales inquiry',
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

export function ContactSection({ showMap = true, showHeading = true, ornament = false }: ContactSectionProps) {
  const [searchParams] = useSearchParams()
  const defaultSubject = useMemo(() => {
    const intent = searchParams.get('intent')
    if (intent && INTENT_SUBJECTS[intent]) return INTENT_SUBJECTS[intent]
    return 'General inquiry'
  }, [searchParams])

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

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
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email'
    if (!phone) nextErrors.phone = 'Please enter a phone number'
    if (!employees) nextErrors.employees = 'Approximate employee count helps us recommend a plan'

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
        subject: defaultSubject,
        website,
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative section-padding overflow-hidden bg-surface-1" id="contact">
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
              Still have questions? Call us — we will be happy to help. Our team responds during
              business hours listed below.
            </p>
          </MotionReveal>
        ) : null}

        <RevealGroup className="grid gap-8 lg:grid-cols-2 lg:gap-12">
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
                <a href={SOCIAL.facebook} className="text-brand-blue hover:underline">
                  Facebook
                </a>
                <a href={SOCIAL.twitter} className="text-brand-blue hover:underline">
                  X
                </a>
                <a href={SOCIAL.instagram} className="text-brand-blue hover:underline">
                  Instagram
                </a>
              </div>
            </div>
            {showMap ? <DeferredMap /> : null}
          </RevealItem>

          <RevealItem className="rounded-3xl border border-border-subtle bg-white p-6 shadow-card md:p-8">
            <h3 className="text-xl font-bold text-brand-ink">Book a demo or send a message</h3>
            {submitted ? (
              <p className="mt-6 rounded-xl border border-success/20 bg-emerald-50 p-4 text-sm text-emerald-900">
                Thank you! Our team will reach out shortly at your preferred contact details.
              </p>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <Input name="name" label="Full name" required error={errors.name} disabled={submitting} />
                <Input name="company" label="Company name" required error={errors.company} disabled={submitting} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="email"
                    type="email"
                    label="Work email"
                    required
                    error={errors.email}
                    disabled={submitting}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone number"
                    required
                    error={errors.phone}
                    disabled={submitting}
                  />
                </div>
                <Input
                  name="employees"
                  label="Approx. employee count"
                  placeholder="e.g. 120"
                  required
                  error={errors.employees}
                  disabled={submitting}
                />
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-brand-ink">Message (optional)</span>
                  <textarea
                    name="message"
                    rows={4}
                    disabled={submitting}
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60"
                  />
                </label>
                {submitError ? (
                  <p className="rounded-xl border border-error/30 bg-red-50 p-3 text-sm text-error" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  )
}
