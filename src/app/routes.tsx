import { lazy, Suspense, useEffect, type ComponentType, type ReactNode } from 'react'
import { createBrowserRouter, useRouteError } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'

const CHUNK_RELOAD_KEY = 'hr-chunk-reload'

function lazyPage(importer: () => Promise<{ default: ComponentType }>) {
  return lazy(async () => {
    try {
      const module = await importer()
      sessionStorage.removeItem(CHUNK_RELOAD_KEY)
      return module
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      const chunkFailed = /dynamically imported module|Importing a module script failed|Failed to fetch/i.test(
        message,
      )
      if (chunkFailed && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
        window.location.reload()
      }
      throw error
    }
  })
}

const FeaturesPage = lazyPage(() => import('../pages/FeaturesPage'))
const ModulesPage = lazyPage(() => import('../pages/ModulesPage'))
const PricingPage = lazyPage(() => import('../pages/PricingPage'))
const FAQPage = lazyPage(() => import('../pages/FAQPage'))
const AboutPage = lazyPage(() => import('../pages/AboutPage'))
const PrivacyPolicyPage = lazyPage(() => import('../pages/PrivacyPolicyPage'))
const TermsOfUsePage = lazyPage(() => import('../pages/TermsOfUsePage'))
const NotFoundPage = lazyPage(() => import('../pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
    </div>
  )
}

function RouteError() {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : 'This page could not be loaded.'

  useEffect(() => {
    const chunkFailed = /dynamically imported module|Importing a module script failed|Failed to fetch/i.test(
      message,
    )
    if (chunkFailed && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
      sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
      window.location.reload()
    }
  }, [message])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-brand-ink">Page failed to load</h1>
      <p className="mt-3 max-w-md text-sm text-muted">{message}</p>
      <button
        type="button"
        className="mt-6 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white"
        onClick={() => window.location.reload()}
      >
        Reload page
      </button>
    </div>
  )
}
function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: withSuspense(<FeaturesPage />) },
      { path: 'modules', element: withSuspense(<ModulesPage />) },
      { path: 'pricing', element: withSuspense(<PricingPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'privacy-policy', element: withSuspense(<PrivacyPolicyPage />) },
      { path: 'terms-of-use', element: withSuspense(<TermsOfUsePage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
