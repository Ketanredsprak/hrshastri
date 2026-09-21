import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Soft dual-orb glow that gently follows the cursor inside the hero.
 */
export function HeroCursorGlow() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const wrap = wrapRef.current
    if (!wrap) return

    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    let mx = 0.55
    let my = 0.35
    let ax = mx
    let ay = my
    let bx = mx
    let by = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      mx = (e.clientX - rect.left) / rect.width
      my = (e.clientY - rect.top) / rect.height
    }

    const tick = () => {
      ax += (mx - ax) * 0.06
      ay += (my - ay) * 0.06
      bx += (mx - bx) * 0.035
      by += (my - by) * 0.035

      if (aRef.current) {
        aRef.current.style.transform = `translate3d(${(ax - 0.5) * 80}px, ${(ay - 0.5) * 60}px, 0)`
      }
      if (bRef.current) {
        bRef.current.style.transform = `translate3d(${(bx - 0.5) * 120}px, ${(by - 0.5) * 90}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        ref={aRef}
        className="absolute left-[55%] top-[20%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/15 blur-3xl will-change-transform"
      />
      <div
        ref={bRef}
        className="absolute left-[70%] top-[55%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-magenta/12 blur-3xl will-change-transform"
      />
      {/* Soft decorative rings that sit in the hero visual plane */}
      <div className="absolute right-[8%] top-[18%] hidden h-28 w-28 rounded-full border border-brand-blue/15 lg:block" />
      <div className="absolute right-[14%] top-[28%] hidden h-16 w-16 rounded-full border border-dashed border-brand-purple/20 lg:block" />
    </div>
  )
}
