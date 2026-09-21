import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { DETAILED_MODULES } from '../../data/modules'
import { MODULE_ICONS } from '../../data/module-icons'
import { ModuleExploreCard } from '../modules/ModuleExploreCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easePremium, fadeUp, staggerContainer } from '../../lib/motion-presets'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const MODULE_EXTRAS: Record<string, string[]> = {
  'employee-database': [
    'Single source of truth for every branch and designation.',
    'Role-based visibility for HR, managers, and employees.',
    'Document expiry reminders keep compliance on track.',
  ],
  attendance: [
    'Geofenced punches validate field and site attendance.',
    'Supervisors approve bulk entries in one queue.',
    'Monthly registers export straight into payroll prep.',
  ],
  leave: [
    'Encashment and carry-forward rules per leave type.',
    'Short leave and gate pass without breaking attendance.',
    'WFH requests share the same approval chain as leave.',
  ],
  payroll: [
    'Run payroll by branch, department, or pay group.',
    'Loan EMI and commission lines on every payslip.',
    'Statutory challans backed by audit-friendly registers.',
  ],
  recruitment: [
    'Career page captures applications into one pipeline.',
    'Interview scorecards stay linked to the candidate record.',
    'Offer accepted → employee profile created automatically.',
  ],
  performance: [
    '360° and manager reviews in structured cycles.',
    'Goals roll up from teams to company OKRs.',
    'Training recommendations from appraisal gaps.',
  ],
  'expense-claim': [
    'Receipt uploads and visit logs in one submission.',
    'Finance sees approved claims ready for reimbursement.',
    'Policy limits enforced before managers approve.',
  ],
  reports: [
    'Live dashboards — no overnight batch spreadsheets.',
    'Attrition, headcount, and cost trends for leadership.',
    'Registers formatted for ESIC, PF, and internal audit.',
  ],
  mobile: [
    'Same policies as web — punches, leave, payslips on phone.',
    'Push-friendly announcements and policy acknowledgements.',
    'Support tickets without waiting on HR desk queues.',
  ],
}

export function ModulesExploreSection() {
  const reduced = useReducedMotion()

  return (
    <section id="module-library" className="relative section-padding overflow-hidden bg-surface-1 scroll-mt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgb(0 51 204 / 0.06), transparent 45%), radial-gradient(circle at 80% 100%, rgb(81 69 157 / 0.07), transparent 40%)',
        }}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Module library"
          title="Every module, designed to scan fast and read deep"
          description="All capabilities listed clearly on each card — shapes instead of screenshots, so you can scan quickly and compare modules side by side."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
        >
          {DETAILED_MODULES.map((module, index) => {
            const Icon = MODULE_ICONS[module.id] ?? Users
            return (
              <motion.div key={module.id} variants={fadeUp} transition={easePremium} className="h-full">
                <ModuleExploreCard
                  module={module}
                  index={index}
                  Icon={Icon}
                  extras={MODULE_EXTRAS[module.id] ?? []}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
