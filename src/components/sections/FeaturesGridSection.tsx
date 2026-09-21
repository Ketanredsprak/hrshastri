import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MAIN_FEATURES } from '../../data/features'
import { staggerContainer, fadeUp, easeOut } from '../../lib/motion-presets'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

type FeaturesGridSectionProps = {
  showViewAll?: boolean
}

export function FeaturesGridSection({ showViewAll = true }: FeaturesGridSectionProps) {
  return (
    <section className="section-padding bg-white" id="features">
      <Container>
        <SectionHeading
          eyebrow="Platform capabilities"
          title="Every HR workflow in one connected system"
          description="From employee master data to Indian payroll compliance — modules share one secure source of truth."
        />
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {MAIN_FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={fadeUp} transition={easeOut}>
                <Card hover className="group h-full !p-5">
                  <div className="mb-4 inline-flex rounded-xl bg-brand-blue/10 p-3 text-brand-blue ring-1 ring-brand-blue/10 transition group-hover:gradient-brand group-hover:text-white group-hover:ring-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
        {showViewAll ? (
          <p className="mt-10 text-center">
            <Link to="/features" className="text-sm font-semibold text-brand-blue hover:text-brand-purple">
              Explore all features →
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  )
}
