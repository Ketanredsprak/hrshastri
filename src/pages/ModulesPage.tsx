import { ModulesHero } from '../components/sections/ModulesHero'
import { CtaBand } from '../components/marketing/CtaBand'
import { SEO } from '../components/seo/SEO'
import { PAGE_SEO } from '../data/seo-pages'
import { ModulesPageContent } from '../components/sections/ModulesPageContent'

export default function ModulesPage() {
  return (
    <>
      <SEO
        title={PAGE_SEO.modules.title}
        description={PAGE_SEO.modules.description}
        keywords={PAGE_SEO.modules.keywords}
        breadcrumbs={PAGE_SEO.modules.breadcrumbs}
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
