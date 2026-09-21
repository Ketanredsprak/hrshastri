import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { NAV_LINKS, SITE } from '../../lib/constants'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled
          ? 'border-b border-border-subtle bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-lg'
          : 'border-b border-transparent bg-white/90 backdrop-blur-sm'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.25rem] md:h-[4.75rem]">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.png"
              alt={SITE.name}
              className="h-8 w-auto max-w-[140px] object-contain sm:h-10 sm:max-w-none md:h-11"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-2 text-sm font-medium transition xl:px-3 ${
                    isActive
                      ? 'bg-brand-blue/10 text-brand-blue'
                      : 'text-slate-600 hover:bg-surface-2 hover:text-brand-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={SITE.loginUrl}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-surface-2 hover:text-brand-ink xl:px-3"
            >
              Login
            </a>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button to="/contact?intent=demo" variant="outline" className="!px-4 !py-2.5 !text-sm" data-cursor="Demo">
              Book demo
            </Button>
            <Button to="/contact?intent=trial" className="!px-4 !py-2.5 !text-sm" data-cursor="Trial">
              Free trial
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-brand-ink hover:bg-surface-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-50 overflow-hidden border-t border-border-subtle bg-white lg:hidden"
            >
              <Container className="flex max-h-[min(80vh,560px)] flex-col gap-1 overflow-y-auto py-4 pb-6">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-3 text-base font-medium ${
                        isActive ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-700 hover:bg-surface-1'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href={SITE.loginUrl}
                  className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-surface-1"
                >
                  Login
                </a>
                <div className="mt-3 flex flex-col gap-2.5 border-t border-border-subtle pt-4">
                  <Button to="/contact?intent=demo" variant="outline" className="w-full !py-3">
                    Book demo
                  </Button>
                  <Button to="/contact?intent=trial" className="w-full !py-3">
                    Free trial
                  </Button>
                </div>
              </Container>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
