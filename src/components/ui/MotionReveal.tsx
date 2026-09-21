import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easeOut, fadeUp } from '../../lib/motion-presets'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Above-the-fold heroes: animate on mount, not on scroll */
  eager?: boolean
}

export function MotionReveal({ children, className = '', delay = 0, eager = false }: MotionRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...(eager ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, margin: '-60px' } })}
      variants={fadeUp}
      transition={{ ...easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}
