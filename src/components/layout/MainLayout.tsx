import { motion, useScroll, useSpring } from 'framer-motion'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { CustomCursor } from '../effects/CustomCursor'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFloat } from './WhatsAppFloat'

function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="gradient-brand pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
      style={{ scaleX }}
    />
  )
}

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <CustomCursor />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollRestoration />
    </div>
  )
}
