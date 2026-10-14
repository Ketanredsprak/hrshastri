import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type CursorMode = 'default' | 'hover' | 'hidden'

/**
 * Ambient cursor follower halo that glides behind the native main cursor.
 * The native cursor remains fully visible, responsive, and functional everywhere.
 * Desktop / fine-pointer only. Disabled for touch devices and reduced-motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const fine = window.matchMedia('(pointer: fine)').matches
    const noTouch = window.matchMedia('(hover: hover)').matches
    return fine && noTouch
  })
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [badgeText, setBadgeText] = useState('')

  const ringRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const fine = window.matchMedia('(pointer: fine)').matches
      const noTouch = window.matchMedia('(hover: hover)').matches
      const next = fine && noTouch && !reduced
      setEnabled((prev) => (prev === next ? prev : next))
    }, 0)
    return () => window.clearTimeout(timer)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    const modeRef = { current: 'default' as CursorMode }
    const badgeStateRef = { current: '' }
    const visibleRef = { current: false }
    let running = false

    const tick = () => {
      // Smooth spring lerp behind the native cursor
      ring.current.x += (mouse.current.x - ring.current.x) * 0.22
      ring.current.y += (mouse.current.y - ring.current.y) * 0.22

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${ring.current.x + 16}px, ${ring.current.y + 14}px, 0)`
      }

      const settled =
        Math.abs(mouse.current.x - ring.current.x) < 0.2 &&
        Math.abs(mouse.current.y - ring.current.y) < 0.2
      if (settled) {
        running = false
        return
      }
      raf.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      raf.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
      start()
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }

    const interactiveSelector =
      'a, button, [role="button"], label, summary, [data-cursor], .group\\/card, article'
    const hideFollowerSelector =
      'input, textarea, select, [contenteditable="true"], iframe, .no-custom-cursor'

    const applyState = (nextMode: CursorMode, nextBadge: string) => {
      if (modeRef.current === nextMode && badgeStateRef.current === nextBadge) return
      modeRef.current = nextMode
      badgeStateRef.current = nextBadge
      setMode(nextMode)
      setBadgeText(nextBadge)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Hide follower on text inputs, textareas, or iframes so native text beam is unobstructed
      if (target.closest?.(hideFollowerSelector)) {
        applyState('hidden', '')
        return
      }

      // Check if hovering over interactive element
      const interactive = target.closest?.(interactiveSelector) as HTMLElement | null
      if (interactive) {
        const custom = interactive.getAttribute('data-cursor') || ''
        applyState('hover', custom)
      } else {
        applyState('default', '')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  const isHovering = mode === 'hover'
  const isHidden = mode === 'hidden' || !visible
  const hasBadge = Boolean(badgeText)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden"
      aria-hidden
    >
      {/* Trailing ambient halo ring that tracks smoothly behind native cursor */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full transition-all duration-200 ease-out will-change-transform ${
          isHovering
            ? 'h-11 w-11 border-2 border-brand-purple/45 bg-brand-purple/[0.08] shadow-[0_0_20px_rgba(81,69,157,0.18)] scale-110'
            : 'h-7 w-7 border border-brand-blue/30 bg-brand-blue/[0.02] scale-100'
        } ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Floating contextual tag badge (e.g. "DEMO", "EXPLORE", "PLAY") */}
      <div
        ref={badgeRef}
        className={`absolute top-0 left-0 rounded-full gradient-brand px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-soft transition-all duration-150 will-change-transform ${
          hasBadge && !isHidden ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        {badgeText}
      </div>
    </div>
  )
}
