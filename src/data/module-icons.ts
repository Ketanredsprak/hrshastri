import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Briefcase,
  CalendarDays,
  Clock,
  Receipt,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const MODULE_ICONS: Record<string, LucideIcon> = {
  'employee-database': Users,
  attendance: Clock,
  leave: CalendarDays,
  payroll: Wallet,
  recruitment: Briefcase,
  performance: TrendingUp,
  'expense-claim': Receipt,
  reports: BarChart3,
  mobile: Smartphone,
}
