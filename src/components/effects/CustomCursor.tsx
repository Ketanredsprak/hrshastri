import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type CursorMode = 'default' | 'hover' | 'text'

/**
 * Dual-circle custom cursor (dot + lagging ring), similar to premium marketing sites.
 * Desktop / fine-pointer only. Disabled for touch and reduced-motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState('')

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const noTouch = window.matchMedia('(hover: hover)').matches
    setEnabled(fine && noTouch && !reduced)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor]'

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(interactiveSelector)
      if (!target) {
        setMode('default')
        setLabel('')
        return
      }
      const custom = target.getAttribute('data-cursor')
      if (custom) {
        setMode('text')
        setLabel(custom)
      } else if (
        target.matches('input, textarea, select') ||
        (target as HTMLElement).isContentEditable
      ) {
        setMode('text')
        setLabel('')
      } else {
        setMode('hover')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const tick = () => {
      // Fast inner dot
      dot.current.x += (mouse.current.x - dot.current.x) * 0.35
      dot.current.y += (mouse.current.y - dot.current.y) * 0.35
      // Lagging outer ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  const hover = mode === 'hover' || mode === 'text'
  const showLabel = mode === 'text' && Boolean(label)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden
    >
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform ${
          showLabel
            ? 'h-16 w-16 border-brand-purple/40 bg-brand-purple/10'
            : hover
              ? 'h-12 w-12 border-brand-blue/50 bg-brand-blue/5'
              : 'h-9 w-9 border-brand-blue/35 bg-transparent'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ mixBlendMode: showLabel ? 'normal' : 'normal' }}
      />

      {/* Inner fast dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full transition-[width,height,opacity,background-color] duration-150 will-change-transform ${
          showLabel
            ? 'h-0 w-0 opacity-0'
            : hover
              ? 'h-1.5 w-1.5 bg-brand-magenta'
              : 'h-2 w-2 bg-brand-blue'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Optional text inside expanded ring */}
      <div
        ref={labelRef}
        className={`absolute top-0 left-0 flex h-16 w-16 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-purple transition-opacity duration-200 will-change-transform ${
          showLabel && visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </div>
    </div>
  )
}
