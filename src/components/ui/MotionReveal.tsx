import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easeOut, fadeUp, staggerContainer } from '../../lib/motion-presets'

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

type RevealGroupProps = {
  children: ReactNode
  className?: string
}

/** Staggers child RevealItem elements as they scroll into view. */
export function RevealGroup({ children, className }: RevealGroupProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
}

export function RevealItem({ children, className }: RevealItemProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={fadeUp} transition={easeOut}>
      {children}
    </motion.div>
  )
}
