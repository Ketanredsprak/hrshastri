export type PricingPlan = {
  name: string
  price: string
  period: string
  description: string
  users: string
  employees: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: '/ month',
    description: 'For growing teams getting off spreadsheets.',
    users: 'Up to 5 admin users',
    employees: 'Up to 50 employees',
    features: [
      'Employee & attendance management',
      'Leave & timesheet workflows',
      'Basic payroll & payslips',
      'Employee self-service portal',
      'Email support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: '₹9,999',
    period: '/ month',
    description: 'Most popular for multi-branch Indian companies.',
    users: 'Up to 15 admin users',
    employees: 'Up to 250 employees',
    highlighted: true,
    features: [
      'Everything in Starter',
      'Recruitment & performance modules',
      'Claims, visits & finance tracking',
      'Advanced reports & exports',
      'Custom roles & permissions',
      'Priority implementation support',
    ],
    cta: 'Book a Demo',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large workforces and SaaS operators.',
    users: 'Unlimited users (custom)',
    employees: 'Unlimited employees (custom)',
    features: [
      'Everything in Business',
      'Multi-company SaaS controls',
      'Dedicated success manager',
      'SSO & advanced security options',
      'Custom integrations & SLA',
      'On-site training available',
    ],
    cta: 'Talk to Sales',
  },
]
