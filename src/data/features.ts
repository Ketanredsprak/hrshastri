import type { LucideIcon } from 'lucide-react'
import {
  BadgeIndianRupee,
  Briefcase,
  CalendarClock,
  ClipboardList,
  FileStack,
  LineChart,
  Smartphone,
  Timer,
  Users,
  Wallet,
  Building2,
  ShieldCheck,
} from 'lucide-react'

export type FeatureItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const MAIN_FEATURES: FeatureItem[] = [
  {
    title: 'Employee Management',
    description:
      'Centralize profiles, documents, salary linkage, and lifecycle from hire to retire.',
    icon: Users,
  },
  {
    title: 'Attendance',
    description:
      'Punch, bulk attendance, geofencing reports, and late-coming insights in real time.',
    icon: Timer,
  },
  {
    title: 'Leave Management',
    description:
      'Policy-driven leave types, balances, approvals, and automated monthly credits.',
    icon: CalendarClock,
  },
  {
    title: 'Payroll',
    description:
      'Indian payroll with slabs, statutory deductions, payslips, and compliance reports.',
    icon: BadgeIndianRupee,
  },
  {
    title: 'Recruitment',
    description:
      'Jobs, applications, interviews, onboarding, and a public career page — end to end.',
    icon: Briefcase,
  },
  {
    title: 'Performance Management',
    description:
      'Indicators, appraisals, and goal tracking to connect daily work with growth.',
    icon: LineChart,
  },
  {
    title: 'Expense Management',
    description:
      'Track company expenses and finance visibility alongside HR operations.',
    icon: Wallet,
  },
  {
    title: 'Claims & Reimbursements',
    description:
      'Employees submit visits and claims; approvers review with full audit trails.',
    icon: ClipboardList,
  },
  {
    title: 'Timesheet',
    description:
      'Log hours, enforce policies, streamline approvals, and export rich reports.',
    icon: FileStack,
  },
  {
    title: 'Shift Management',
    description:
      'Configure week-offs, shifts, and branch-aware schedules for distributed teams.',
    icon: Building2,
  },
  {
    title: 'Asset Management',
    description:
      'Register and assign laptops, IDs, and equipment tied to employee records.',
    icon: ShieldCheck,
  },
  {
    title: 'Document Management',
    description:
      'Store HR letters, policies, and employee documents in one secure place.',
    icon: FileStack,
  },
  {
    title: 'Mobile App',
    description:
      'Attendance punch, leave, payslip, and workflows on Android and iOS.',
    icon: Smartphone,
  },
]

export const WHY_CHOOSE_US = [
  {
    title: 'Easy Setup',
    description: 'Company wizard and HR masters get you live quickly with guided setup.',
  },
  {
    title: 'Secure Data',
    description: 'Role-based access, tenant isolation, and permission-driven navigation.',
  },
  {
    title: 'Cloud Based',
    description: 'Access HR from anywhere with a modern, always-available platform.',
  },
  {
    title: 'Mobile Friendly',
    description: 'Web and mobile API for frontline teams and remote employees.',
  },
  {
    title: 'Multi Company',
    description: 'SaaS-ready multi-tenant architecture with plans and billing.',
  },
  {
    title: 'Custom Roles',
    description: 'Granular Spatie permissions — give managers exactly what they need.',
  },
  {
    title: 'Fast Support',
    description: 'Dedicated experts help you implement, migrate, and scale with confidence.',
  },
] as const

export const CORE_SERVICES = [
  {
    title: 'HR Administrator',
    description:
      'Onboarding, records, benefits, payroll, policies, recruitment, training, compliance, and reporting — managed in one place.',
  },
  {
    title: 'Recruitment Management',
    description:
      'Source, screen, interview, and select candidates with automated workflows and collaboration.',
  },
  {
    title: 'Employee Management',
    description:
      'Oversee performance, training, relations, and records for a productive, engaged workforce.',
  },
  {
    title: 'PMS',
    description:
      'Appraisals, feedback, goals, and compensation decisions backed by structured reviews.',
  },
  {
    title: 'Attendance & Leaves',
    description:
      'Track time-off, approvals, and compliance with labour policies across branches.',
  },
  {
    title: 'HR Reports',
    description:
      'Turnover, recruitment, training, compensation, and diversity metrics for leadership.',
  },
] as const
