import type { SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { MotionReveal, RevealGroup, RevealItem } from '../ui/MotionReveal'
import { NAV_LINKS, SITE, SOCIAL } from '../../lib/constants'
import { BrandLogo } from './BrandLogo'

const footerSections = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Features: [
    { label: 'All Features', href: '/features' },
    { label: 'Payroll & Compliance', href: '/modules#payroll' },
    { label: 'Mobile App', href: '/#mobile-app' },
  ],
  Modules: [
    { label: 'Employee Database', href: '/modules#employee-database' },
    { label: 'Attendance', href: '/modules#attendance' },
    { label: 'Recruitment', href: '/modules#recruitment' },
  ],
  Resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Product Overview', href: '/features' },
    { label: 'Book Demo', href: '/contact?intent=demo' },
  ],
  Support: [
    { label: SITE.phone, href: SITE.phoneHref },
    { label: SITE.email, href: `mailto:${SITE.email}` },
    { label: SITE.hours, href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms of use', href: '/terms-of-use' },
  ],
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const footerStoreBadgeClass =
  'inline-flex h-11 w-[148px] items-center gap-2 rounded-lg border border-white/25 bg-black/35 px-2.5 text-white transition hover:border-white/45 hover:bg-black/50'

function FooterGooglePlayBadge() {
  return (
    <a
      href={SITE.playStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={footerStoreBadgeClass}
      aria-label="Get HR Shastri on Google Play"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
        <path
          fill="#EA4335"
          d="M3.6 2.2c-.4.2-.6.6-.6 1.1v17.4c0 .5.2.9.6 1.1l9.7-9.8L3.6 2.2z"
        />
        <path fill="#FBBC04" d="M16.5 10.1 13.3 12l3.2 1.9 3.5-2c.7-.4.7-1.1 0-1.5l-3.5-2z" />
        <path fill="#4285F4" d="M13.3 12 3.6 21.8c.2.1.4.2.7.2.3 0 .5-.1.8-.2l11.4-6.5L13.3 12z" />
        <path fill="#34A853" d="M13.3 12 16.5 10.1 5.1 3.6c-.3-.2-.5-.2-.8-.2-.3 0-.5.1-.7.2L13.3 12z" />
      </svg>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[8px] font-medium uppercase tracking-[0.1em] text-white/70">
          Get it on
        </span>
        <span className="block text-xs font-bold tracking-wide">Google Play</span>
      </span>
    </a>
  )
}

function FooterAppStoreBadge() {
  return (
    <a
      href={SITE.appStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={footerStoreBadgeClass}
      aria-label="Download HR Shastri on the App Store"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-white" aria-hidden>
        <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.5-3.7zm-2.3-6.5c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2.1-.5 2.8-1.4z" />
      </svg>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[8px] font-medium uppercase tracking-[0.1em] text-white/70">
          Download on the
        </span>
        <span className="block text-xs font-bold tracking-wide">App Store</span>
      </span>
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300/95">
      <Container className="section-padding pb-10">
        <RevealGroup className="grid gap-10 lg:grid-cols-12">
          <RevealItem className="lg:col-span-4">
            <BrandLogo className="mb-4 h-9 w-auto max-w-[160px] object-contain brightness-0 invert sm:h-10" />
            <p className="max-w-sm text-sm leading-relaxed">
              Complete HR, payroll, and people operations — built for Indian businesses. From hire
              to retire in one secure cloud platform.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer"
                className="gradient-brand inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noreferrer"
                className="gradient-brand inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
                aria-label="X"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                className="gradient-brand inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-white/80">
                Get the app
              </p>
              <div className="flex flex-wrap gap-2.5">
                <FooterGooglePlayBadge />
                <FooterAppStoreBadge />
              </div>
            </div>
          </RevealItem>

          <RevealItem className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 lg:col-span-8 xl:grid-cols-6">
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title} className="min-w-0">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                  {title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('http') ||
                      link.href.startsWith('mailto') ||
                      link.href.startsWith('tel') ? (
                        <a
                          href={link.href}
                          className="inline-block break-words py-0.5 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="inline-block break-words py-0.5 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealItem>
        </RevealGroup>

        <MotionReveal className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className="py-1 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </MotionReveal>
      </Container>
    </footer>
  )
}
