import { Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ANNOUNCEMENTS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ANNOUNCEMENTS.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="gradient-brand text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
        <Sparkles className="hidden h-3.5 w-3.5 shrink-0 opacity-90 sm:block" aria-hidden />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="line-clamp-2 sm:line-clamp-1"
          >
            {ANNOUNCEMENTS[index]}{' '}
            <Link to="/contact?intent=demo" className="underline underline-offset-2 hover:text-white/90">
              Learn more
            </Link>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
