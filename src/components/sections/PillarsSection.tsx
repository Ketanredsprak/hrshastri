import { BadgeIndianRupee, Smartphone, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Link } from 'react-router-dom'

const pillars = [
  {
    icon: Users,
    title: 'People & organization',
    description:
      'Branches, departments, designations, employee profiles, documents, and HR letters — one employee master for your entire workforce.',
    href: '/modules#employee-database',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Payroll & compliance',
    description:
      'India-ready pay slabs, statutory deductions (EPF, ESI, PT), payslip PDFs, and wage or ESIC-oriented reports from a single payroll run.',
    href: '/modules#payroll',
  },
  {
    icon: Smartphone,
    title: 'Employee app & self-service',
    description:
      'Mobile punch, leave, payslips, WFH, gate pass, visits, claims, policies, and announcements — empowering every employee on the go.',
    href: '/#mobile-app',
  },
]

export function PillarsSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Platform pillars"
          title="Complete HR, payroll, and people operations"
          description="From hire to retire — attendance, leave, payroll, and compliance in one place. Built for Indian businesses."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-soft"
              >
                <div className="inline-flex rounded-xl bg-brand-blue/10 p-3 text-brand-blue transition group-hover:gradient-brand group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-navy">{pillar.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
                <Link
                  to={pillar.href}
                  className="mt-5 text-sm font-semibold text-brand-blue hover:text-brand-purple"
                >
                  Learn more →
                </Link>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
