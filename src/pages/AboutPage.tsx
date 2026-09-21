import { PageHero } from '../components/marketing/PageHero'
import { CtaBand } from '../components/marketing/CtaBand'
import { SEO } from '../components/seo/SEO'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

const values = [
  {
    title: 'In Sync',
    text: 'Efficiently integrating HR processes and data for optimal performance, fostering teamwork, and enhancing organizational effectiveness.',
  },
  {
    title: 'Frugal',
    text: 'Prioritizing cost-effective HRMS operations while maintaining quality services and optimizing resource utilization.',
  },
  {
    title: 'Adaptable',
    text: 'Flexible and responsive to changing HR needs and technology, ensuring seamless adaptation and continuous improvement.',
  },
  {
    title: 'Customer Delight',
    text: 'Exceeding customer expectations with exceptional HRMS services, satisfaction, and long-lasting relationships.',
  },
]

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="About HR Shastri — 30+ HR experts, 50+ clients, and a comprehensive cloud HRMS built with industry input for Indian businesses."
        path="/about"
      />
      <PageHero
        eyebrow="About us"
        title="About HR Shastri"
        description="Industry experts collaborated to build a robust HRMS that streamlines workforce management, talent acquisition, and employee engagement."
      />
      <section className="section-padding bg-white">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Card variant="soft">
            <h3 className="text-2xl font-bold text-brand-ink">Who we are</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Introducing HR Shastri, a dedicated team of 30+ HR experts with over a decade of
              experience, committed to enhancing and simplifying Human Resource Management Systems.
              With a proven track record of serving 50+ clients across Manufacturing, Service, Stock
              Markets, Immigration, and more, we deliver cutting-edge solutions tailored to your
              unique HR needs.
            </p>
          </Card>
          <Card variant="soft">
            <h3 className="text-2xl font-bold text-brand-ink">What we offer</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              Our end-to-end customized HR solutions provide a comprehensive approach from
              recruitment and onboarding to performance management and payroll. Our expert team
              optimizes every aspect of your HR processes so you can focus on core business
              priorities.
            </p>
            <Button to="/contact?intent=demo" className="mt-6">
              Talk to our team
            </Button>
          </Card>
        </Container>
      </section>
      <section className="section-padding bg-surface-1">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Our core values"
            description="Customer delight, adaptability, efficiency, data integrity, and collaboration shape every release of HR Shastri."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={value.title} hover>
                <span className="text-gradient-brand text-2xl font-extrabold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-xl font-bold text-brand-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
