import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { SEO } from '../components/seo/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" />
      <section className="section-padding pt-32">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-purple">404</p>
          <h1 className="mt-3 text-4xl font-bold text-brand-navy">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            The page you are looking for may have moved. Explore features, pricing, or contact our
            team for help.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/">Back to home</Button>
            <Link to="/contact" className="text-sm font-semibold text-brand-purple hover:underline">
              Contact support
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
