import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const steps = [
  { step: '01', title: 'Book Demo', text: 'Meet our HR experts and align modules to your workflows.' },
  { step: '02', title: 'Setup Company', text: 'Configure branches, masters, roles, and policies with our wizard.' },
  { step: '03', title: 'Add Employees', text: 'Import staff, assign managers, and enable self-service access.' },
  { step: '04', title: 'Start Managing HR', text: 'Run attendance, leave, payroll, and reports from day one.' },
]

/** Compact mehendi-inspired corner flourish (product-safe, brand-colored) */
function MehendiCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M8 72 C8 48 18 38 36 28 C28 42 22 52 18 72"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M14 72 C16 54 28 42 48 32 C40 46 32 56 28 72"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M36 28 C44 22 54 16 66 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="36" cy="28" r="2.2" fill="currentColor" opacity="0.8" />
      <circle cx="48" cy="32" r="1.5" fill="currentColor" opacity="0.55" />
      <path
        d="M22 48 C26 44 32 42 38 42"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M58 18 C62 14 68 12 72 12 M58 18 C54 22 52 28 52 34"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

function MehendiDivider() {
  return (
    <svg viewBox="0 0 120 24" className="mx-auto h-5 w-28 text-brand-purple/35" fill="none" aria-hidden>
      <path
        d="M4 12 H38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M48 12 C52 6 56 6 60 12 C64 18 68 18 72 12"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle cx="60" cy="12" r="2" fill="currentColor" />
      <path
        d="M82 12 H116"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="42" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="78" cy="12" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function StepConnector() {
  return (
    <div
      className="pointer-events-none absolute top-10 left-[calc(100%-0.25rem)] z-0 hidden w-[calc(100%-1.5rem)] xl:block"
      aria-hidden
    >
      <svg viewBox="0 0 100 20" className="h-5 w-full text-brand-blue/25" fill="none">
        <path
          d="M2 10 H40"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
        <path
          d="M46 10 C50 4 54 4 58 10 C62 16 66 16 70 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="58" cy="10" r="1.8" fill="currentColor" />
        <path
          d="M76 10 H98"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function ProcessSection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative section-padding overflow-hidden bg-surface">
      {/* Soft ornamental backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-16 top-10 opacity-[0.07] text-brand-purple">
          <MehendiCorner className="h-44 w-44" />
        </div>
        <div className="absolute -right-10 bottom-8 rotate-180 opacity-[0.07] text-brand-magenta">
          <MehendiCorner className="h-48 w-48" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgb(81 69 157 / 0.06), transparent 40%), radial-gradient(circle at 85% 80%, rgb(184 63 129 / 0.05), transparent 42%)',
          }}
        />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Go live in four simple steps"
          description="A proven onboarding path from demo to daily HR operations."
        />
        <div className="-mt-4 mb-10">
          <MehendiDivider />
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          variants={staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              transition={easePremium}
              className="relative"
            >
              {index < steps.length - 1 ? <StepConnector /> : null}

              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-lift">
                {/* Card corner mehendi accents */}
                <MehendiCorner className="pointer-events-none absolute -left-1 -top-1 h-16 w-16 text-brand-purple/25 transition group-hover:text-brand-purple/45" />
                <MehendiCorner className="pointer-events-none absolute -bottom-1 -right-1 h-14 w-14 rotate-180 text-brand-magenta/20 transition group-hover:text-brand-magenta/40" />

                {/* Fine inner border motif */}
                <div
                  className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-brand-blue/10 opacity-0 transition group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-gradient-brand text-3xl font-extrabold tracking-tight">
                      {item.step}
                    </span>
                    <span
                      className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-purple/15 bg-brand-blue-light/60 text-[11px] font-bold text-brand-purple"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-ink md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>

                  {/* Bottom vine accent */}
                  <svg
                    viewBox="0 0 140 16"
                    className="mt-5 h-3.5 w-full max-w-[140px] text-brand-blue/30"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 10 C18 4 28 4 40 10 C52 16 62 16 74 10 C86 4 96 4 112 10 C122 14 130 12 138 8"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="10" r="1.4" fill="currentColor" />
                    <circle cx="74" cy="10" r="1.4" fill="currentColor" />
                    <circle cx="112" cy="10" r="1.4" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
