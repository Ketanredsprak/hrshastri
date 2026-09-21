type MotifProps = {
  className?: string
}

/** Soft dot field — trusted logos */
export function DotField({ className = '' }: MotifProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-70 ${className}`}
      aria-hidden
      style={{
        backgroundImage: 'radial-gradient(rgb(0 51 204 / 0.14) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 72%)',
      }}
    />
  )
}

/** Concentric rings — HRMS explainer */
export function RingField({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden>
      <circle cx="160" cy="60" r="48" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="60" r="78" stroke="currentColor" strokeWidth="1" opacity="0.65" />
      <circle cx="160" cy="60" r="108" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="160" cy="60" r="4" fill="currentColor" />
    </svg>
  )
}

/** Diagonal hatch — why teams choose */
export function HatchField({ className = '' }: MotifProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
      style={{
        backgroundImage:
          'repeating-linear-gradient(-32deg, rgb(81 69 157 / 0.045) 0 1px, transparent 1px 14px)',
        maskImage: 'linear-gradient(90deg, black, transparent 70%)',
      }}
    />
  )
}

/** Orbit lines — mobile app */
export function OrbitField({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" aria-hidden>
      <ellipse cx="140" cy="140" rx="90" ry="36" stroke="currentColor" strokeWidth="1" transform="rotate(-18 140 140)" />
      <ellipse cx="140" cy="140" rx="120" ry="48" stroke="currentColor" strokeWidth="1" opacity="0.55" transform="rotate(24 140 140)" />
      <circle cx="210" cy="96" r="3" fill="currentColor" />
      <circle cx="62" cy="176" r="2.2" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

export function DotRule({ className = 'text-brand-blue/40' }: MotifProps) {
  return (
    <svg viewBox="0 0 180 12" className={`mx-auto h-3 w-44 ${className}`} fill="none" aria-hidden>
      <path d="M4 6 H70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="90" cy="6" r="2.4" fill="currentColor" />
      <circle cx="78" cy="6" r="1.3" fill="currentColor" opacity="0.7" />
      <circle cx="102" cy="6" r="1.3" fill="currentColor" opacity="0.7" />
      <path d="M110 6 H176" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export function DiamondRule({ className = 'text-brand-purple/45' }: MotifProps) {
  return (
    <svg viewBox="0 0 140 16" className={`mx-auto h-4 w-32 ${className}`} fill="none" aria-hidden>
      <path d="M4 8 H52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M70 2 L78 8 L70 14 L62 8 Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M88 8 H136" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function WaveRule({ className = 'text-brand-magenta/40' }: MotifProps) {
  return (
    <svg viewBox="0 0 180 20" className={`mx-auto h-4 w-40 ${className}`} fill="none" aria-hidden>
      <path
        d="M4 12 C20 4 32 4 48 12 C64 20 76 20 92 12 C108 4 120 4 136 12 C152 20 164 18 176 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChevronRule({ className = 'text-white/50' }: MotifProps) {
  return (
    <svg viewBox="0 0 120 16" className={`h-4 w-28 ${className}`} fill="none" aria-hidden>
      <path d="M4 12 L16 4 L28 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 12 L48 4 L60 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M68 12 L80 4 L92 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
    </svg>
  )
}

/** Print-style crop marks around a frame */
export function CropMarks({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 100 100" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} fill="none" aria-hidden>
      <path d="M2 18 V2 H18" stroke="currentColor" strokeWidth="1.2" />
      <path d="M82 2 H98 V18" stroke="currentColor" strokeWidth="1.2" />
      <path d="M98 82 V98 H82" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 98 H2 V82" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/** Small leaf sprig for the top-right of a card */
export function LeafCorner({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden>
      <path
        d="M66 8 C50 20 38 36 26 60"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M58 16 C48 11 39 18 43 28 C52 26 58 22 58 16 Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M58 16 C48 11 39 18 43 28 C52 26 58 22 58 16 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M46 30 C36 24 27 32 31 42 C40 40 46 36 46 30 Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M46 30 C36 24 27 32 31 42 C40 40 46 36 46 30 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.45"
      />
      <path
        d="M36 44 C28 38 20 44 22 54 C30 52 36 48 36 44 Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M36 44 C28 38 20 44 22 54 C30 52 36 48 36 44 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <path d="M50 22 L44 24" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      <path d="M38 36 L33 38" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
    </svg>
  )
}

export function CornerDiamond({ className = 'text-brand-purple/30' }: MotifProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path d="M10 2 L18 10 L10 18 L2 10 Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function QuoteMark({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="currentColor" aria-hidden>
      <path d="M18 36c0-10 6-18 16-22l2 5c-6 3-9 8-9 14h9v22H8V36h10zm36 0c0-10 6-18 16-22l2 5c-6 3-9 8-9 14h9v22H44V36h10z" opacity="0.9" />
    </svg>
  )
}

export function CornerSquares({ className = 'text-brand-blue/35' }: MotifProps) {
  return (
    <>
      <span className={`pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 bg-current ${className}`} aria-hidden />
      <span className={`pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 bg-current ${className}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-3 left-3 h-1.5 w-1.5 bg-current ${className}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 bg-current ${className}`} aria-hidden />
    </>
  )
}

export function PinRings({ className = '' }: MotifProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  )
}
