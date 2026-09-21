export type ModuleDetail = {
  id: string
  title: string
  subtitle: string
  bullets: string[]
  imageAlt: string
}

export type HowItWorksItem = {
  title: string
  description: string
  bullets: string[]
}

export const DETAILED_MODULES: ModuleDetail[] = [
  {
    id: 'employee-database',
    title: 'Employee Database',
    subtitle: 'One employee master linked to attendance, leave, payroll, and documents.',
    bullets: [
      'Branches, departments, designations, and manager hierarchy',
      'Documents, letters, and statutory configuration per employee',
      'Web and mobile login control with exit status tracking',
    ],
    imageAlt: 'Employee database dashboard preview',
  },
  {
    id: 'attendance',
    title: 'Attendance Tracking',
    subtitle: 'Accurate time data for payroll, leave logic, and field teams.',
    bullets: [
      'Punch, bulk attendance, and timesheet approvals',
      'Week-offs, shifts, and advanced geofencing reports',
      'Late-coming and monthly attendance analytics',
    ],
    imageAlt: 'Attendance tracking module preview',
  },
  {
    id: 'leave',
    title: 'Leave Management',
    subtitle: 'Policy-driven leave with WFH, short leave, and gate pass workflows.',
    bullets: [
      'Leave types tied to pay slabs with balance visibility',
      'Manager approval queues and automated monthly credits',
      'Extra/unpaid day handling connected to payroll runs',
    ],
    imageAlt: 'Leave management module preview',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    subtitle: 'India-ready payroll with statutory compliance built in.',
    bullets: [
      'Allowances, loans, commissions, and custom deductions',
      'EPF, ESI, PT configuration and payslip PDF generation',
      'Wage reports and ESIC-oriented exports for compliance',
    ],
    imageAlt: 'Payroll module preview',
  },
  {
    id: 'recruitment',
    title: 'Recruitment',
    subtitle: 'Hire faster with an integrated ATS and career page.',
    bullets: [
      'Job posts, applications, interviews, and onboarding',
      'Custom application questions and candidate archive',
      'Reference lists and hiring pipeline reporting',
    ],
    imageAlt: 'Recruitment module preview',
  },
  {
    id: 'performance',
    title: 'Performance Review',
    subtitle: 'Connect goals, appraisals, and development plans.',
    bullets: [
      'Performance indicators and structured appraisal cycles',
      'Goal tracking aligned to departments and roles',
      'Training needs surfaced from review outcomes',
    ],
    imageAlt: 'Performance review module preview',
  },
  {
    id: 'expense-claim',
    title: 'Expense Claim',
    subtitle: 'Visits, claims, and reimbursements without email chains.',
    bullets: [
      'Employee self-service for visit and claim submission',
      'Approver queues with finance integration for payouts',
      'Claim reporting for audit and cost optimization',
    ],
    imageAlt: 'Expense claim module preview',
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    subtitle: 'Actionable HR and payroll insights from live data.',
    bullets: [
      'Attendance, leave, timesheet, and income vs expense',
      'Birthdays, anniversaries, new joinees, and attrition views',
      'Export-ready registers for statutory and management reporting',
    ],
    imageAlt: 'Reports and analytics module preview',
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    subtitle: 'Empower every employee with self-service on the go.',
    bullets: [
      'Secure API login with attendance punch patterns',
      'Leave, payslip, WFH, gate pass, and claim workflows',
      'Announcements, policies, and support tickets in pocket',
    ],
    imageAlt: 'Mobile application preview',
  },
]

export const HOW_IT_WORKS: HowItWorksItem[] = [
  {
    title: 'Payroll Management',
    description:
      'HR Shastri streamlines payroll management, reducing manual effort and improving accuracy across your organization.',
    bullets: [
      'Automation streamlines payroll tasks and reduces errors',
      'Centralized employee data ensures consistency',
      'Tax and labour compliance workflows minimize risk',
      'Self-service portals for payslip access',
      'Reporting and analytics for cost optimization',
    ],
  },
  {
    title: 'Claims and Reimbursement Management',
    description:
      'End-to-end expense claims and reimbursements with policy checks, approvals, and finance integration.',
    bullets: [
      'Employees submit claims through self-service portals',
      'Policy compliance verification before approval',
      'Faster HR review and automated reimbursement processing',
      'Less paperwork and greater transparency',
      'Improved employee satisfaction and financial control',
    ],
  },
  {
    title: 'Employee Management',
    description:
      'Centralized employee data, automated workflows, and self-service for a more engaged workforce.',
    bullets: [
      'Centralized data for profiles, performance, and training history',
      'Automated recruitment, onboarding, and appraisal workflows',
      'Employee self-service for leaves and personal information',
      'Performance management with goals and appraisals',
      'Workforce analytics for talent and retention decisions',
    ],
  },
  {
    title: 'Timesheet Management',
    description:
      'Real-time hour logging with policy compliance and supervisor approvals.',
    bullets: [
      'Automated timesheet entry reduces manual work',
      'Real-time tracking through web and mobile',
      'Overtime and policy rules handled in-system',
      'Centralized supervisor approval queues',
      'Reports for attendance, projects, and resource allocation',
    ],
  },
  {
    title: 'Training Management',
    description:
      'Plan, schedule, and measure training programs with centralized records.',
    bullets: [
      'Centralized training schedules and attendance',
      'Skill gap analysis from performance data',
      'Track progress and completion per employee',
      'Budget and cost insights across programs',
      'Outcome reporting for HR and leadership',
    ],
  },
  {
    title: 'Recruitment Management',
    description:
      'Central candidate data, automated hiring workflows, and collaboration for faster hiring.',
    bullets: [
      'Centralized candidate database and applicant tracking',
      'Automated screening and interview scheduling',
      'Collaboration between HR and hiring managers',
      'Public career page and onboarding handoff',
      'Recruitment metrics and pipeline analytics',
    ],
  },
  {
    title: 'Reports Management',
    description:
      'Automated HR and payroll reports with exports for compliance and leadership decisions.',
    bullets: [
      'Attendance, leave, payroll, and timesheet reporting',
      'ESIC register, wage reports, and statutory exports',
      'Birthdays, anniversaries, late coming, and attrition lists',
      'Income vs expense and claim reporting',
      'Data-driven insights without manual spreadsheet work',
    ],
  },
]
