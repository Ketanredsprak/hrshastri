import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'

const HomePage = lazy(() => import('../pages/HomePage'))
const FeaturesPage = lazy(() => import('../pages/FeaturesPage'))
const ModulesPage = lazy(() => import('../pages/ModulesPage'))
const PricingPage = lazy(() => import('../pages/PricingPage'))
const FAQPage = lazy(() => import('../pages/FAQPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'))
const TermsOfUsePage = lazy(() => import('../pages/TermsOfUsePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple" />
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
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'features', element: withSuspense(<FeaturesPage />) },
      { path: 'modules', element: withSuspense(<ModulesPage />) },
      { path: 'pricing', element: withSuspense(<PricingPage />) },
      { path: 'faq', element: withSuspense(<FAQPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'privacy-policy', element: withSuspense(<PrivacyPolicyPage />) },
      { path: 'terms-of-use', element: withSuspense(<TermsOfUsePage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
