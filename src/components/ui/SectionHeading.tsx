import { Badge } from './Badge'
import { MotionReveal } from './MotionReveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** Use onDark when the section background is navy/dark */
  tone?: 'default' | 'onDark'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'default',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  const isDark = tone === 'onDark'

  return (
    <MotionReveal className={`mb-8 flex max-w-3xl flex-col sm:mb-10 md:mb-12 ${alignment}`}>
      {eyebrow ? (
        <Badge variant={isDark ? 'onDark' : 'blue'}>{eyebrow}</Badge>
      ) : null}
      <h2
        className={`mt-4 text-section font-bold ${isDark ? 'text-white' : 'text-brand-ink'}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lead ${isDark ? 'text-slate-300' : 'text-muted'}`}>
          {description}
        </p>
      ) : null}
    </MotionReveal>
  )
}
