export type PricingPlan = {
  name: string
  badge: string
  price: string
  period: string
  subtitle: string
  description: string
  users: string
  employees: string
  billingCycle: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Unlimited Plan with Monthly Invoice',
    badge: 'UNLIMITED PLAN WITH MONTHLY INVOICE',
    price: '₹150',
    period: '/ user / mo',
    subtitle: '₹0 base · ₹150 per user with monthly invoicing',
    description: 'Dynamic pay-as-you-grow workforce plan with unlimited scalability.',
    users: 'Unlimited Users Capacity',
    employees: 'Unlimited Employees Capacity',
    billingCycle: 'Monthly Invoice',
    highlighted: true,
    features: [
      'Unlimited admin users capacity',
      'Unlimited employee capacity',
      'Real-time biometric & geofence attendance',
      'Leave workflows & multi-tier approvals',
      'Indian statutory payroll (PF, ESI, TDS, PT)',
      'Monthly consolidated invoice billing',
      'Android & iOS mobile self-service app',
      'Priority implementation & chat support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Points Plan',
    badge: 'POINTS',
    price: '₹6,000',
    period: '/ month',
    subtitle: 'Points plan is basic',
    description: 'Cost-effective points package tailored for core HR workflows.',
    users: '10 Users Capacity',
    employees: '50 Employees Capacity',
    billingCycle: 'Month',
    features: [
      '10 Users Capacity',
      '50 Employees Capacity',
      'Attendance & shift management',
      'Leave management & tracking',
      'Standard payroll & automated payslips',
      'Employee self-service portal',
      'Email & ticket support',
    ],
    cta: 'Choose Points Plan',
  },
  {
    name: 'Yearly Plan',
    badge: 'YEARLY PLAN',
    price: '₹10,000',
    period: '/ year',
    subtitle: 'Annual small team package',
    description: 'Predictable annual flat subscription for small offices and startups.',
    users: '5 Users Capacity',
    employees: '5 Employees Capacity',
    billingCycle: 'Year',
    features: [
      '5 Users Capacity',
      '5 Employees Capacity',
      'Full 12-month uninterrupted access',
      'Central employee database & records',
      'Attendance & leave tracking',
      'Basic payroll calculation',
      'Standard support during business hours',
    ],
    cta: 'Choose Yearly Plan',
  },
  {
    name: 'Monthly Plan',
    badge: 'MONTHLY',
    price: '₹12,000',
    period: '/ month',
    subtitle: 'Flexible monthly billing with higher capacity',
    description: 'High-capacity monthly plan for expanding mid-size organizations.',
    users: '20 Users Capacity',
    employees: '100 Employees Capacity',
    billingCycle: 'Month',
    features: [
      '20 Users Capacity',
      '100 Employees Capacity',
      'Biometric attendance & shift scheduling',
      'Multi-level leave approval hierarchies',
      'Automated Indian payroll & statutory taxes',
      'Claims & reimbursement workflows',
      'Priority implementation assistance',
    ],
    cta: 'Choose Monthly Plan',
  },
]
