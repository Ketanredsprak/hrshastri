import { ModulesHero } from '../components/sections/ModulesHero'
import { CtaBand } from '../components/marketing/CtaBand'
import { SEO } from '../components/seo/SEO'
import { ModulesPageContent } from '../components/sections/ModulesPageContent'

export default function ModulesPage() {
  return (
    <>
      <SEO
        title="Modules"
        description="HR Shastri modules: employee database, attendance, leave, payroll, recruitment, performance, expense claims, reports, and mobile app."
        path="/modules"
      />
      <ModulesHero />
      <ModulesPageContent />
      <CtaBand
        title="Need help choosing modules?"
        description="Our team will map HR Shastri to your branches, payroll structure, and headcount — with a guided walkthrough."
      />
    </>
  )
}
