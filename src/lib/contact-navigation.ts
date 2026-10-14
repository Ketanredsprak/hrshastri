import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type ContactIntent = 'demo' | 'trial' | 'sales' | 'inquiry'

export const CONTACT_TRIGGER_EVENT = 'hr:contact-trigger'

export const INTENT_ALIASES: Record<string, ContactIntent> = {
  demo: 'demo',
  trial: 'trial',
  sales: 'sales',
  enterprise: 'sales',
  inquiry: 'inquiry',
  contact: 'inquiry',
}

export function normalizeIntent(raw?: string | null): ContactIntent {
  if (!raw) return 'demo'
  const clean = raw.toLowerCase().trim()
  return INTENT_ALIASES[clean] ?? 'demo'
}

export function dispatchContactIntent(intent: ContactIntent) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(CONTACT_TRIGGER_EVENT, {
      detail: { intent, timestamp: Date.now() },
    }),
  )
}

export function scrollToContactElement(_intent?: ContactIntent, headerOffset = 76) {
  if (typeof window === 'undefined') return

  const el = document.getElementById('contact')
  if (el) {
    const rect = el.getBoundingClientRect()
    const targetY = window.pageYOffset + rect.top - headerOffset
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    })

    // Auto-focus the first input after the smooth scroll completes
    window.setTimeout(() => {
      const nameInput = document.getElementById('contact-name-input') as HTMLInputElement | null
      if (nameInput) {
        nameInput.focus({ preventScroll: true })
      }
    }, 650)
  }
}

export function triggerContactScroll(
  intent: ContactIntent = 'demo',
  options: { updateUrl?: boolean; headerOffset?: number } = {},
) {
  if (typeof window === 'undefined') return
  const { updateUrl = true, headerOffset = 76 } = options

  if (updateUrl) {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('intent', intent)
      url.hash = 'contact'
      window.history.pushState(null, '', url.toString())
    } catch {
      // Ignore URL parsing errors
    }
  }

  dispatchContactIntent(intent)

  // Immediate scroll attempt
  scrollToContactElement(intent, headerOffset)

  // Fallback retry in case sections are rendering
  let attempts = 0
  const timer = window.setInterval(() => {
    attempts++
    const el = document.getElementById('contact')
    if (el) {
      window.clearInterval(timer)
      scrollToContactElement(intent, headerOffset)
    } else if (attempts > 12) {
      window.clearInterval(timer)
    }
  }, 60)
}

/**
 * Hook to navigate to the contact section from anywhere with smooth scroll & intent animation.
 */
export function useContactRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (intent: ContactIntent = 'demo', e?: React.SyntheticEvent) => {
      if (e) {
        e.preventDefault()
      }

      const isHome = location.pathname === '/' || location.pathname === ''
      const isContact = location.pathname === '/contact'

      if (isHome || isContact) {
        triggerContactScroll(intent, { updateUrl: true })
      } else {
        // Navigate to home page with hash and query param
        navigate(`/#contact?intent=${intent}`)
      }
    },
    [location.pathname, navigate],
  )
}
