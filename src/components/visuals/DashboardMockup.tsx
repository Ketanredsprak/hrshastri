import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function DashboardMockup() {
  const reduced = useReducedMotion()

  return (
    <div className="relative lg:pl-4">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-soft ring-1 ring-black/[0.03]"
      >
        <div className="flex items-center gap-2 border-b border-border-subtle bg-surface-1 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-medium text-muted">HR Shastri · Workforce overview</span>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-5 md:p-6">
          <div className="space-y-2 md:col-span-1">
            {['Dashboard', 'Employees', 'Payroll', 'Reports'].map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0 ? 'bg-brand-blue/10 text-brand-blue' : 'text-muted'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
                    Attendance
                  </p>
                  <p className="text-2xl font-bold text-brand-ink">94.2%</p>
                </div>
                <p className="text-xs text-muted">This month · All branches</p>
              </div>
              <div className="mt-4 flex h-32 items-end gap-1.5">
                {[38, 62, 48, 72, 66, 84, 58, 76, 69, 88, 74, 91].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-blue to-brand-purple/80 opacity-90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
                <p className="text-xs text-muted">Payroll run</p>
                <p className="text-lg font-bold text-brand-ink">₹ 12.4L</p>
                <p className="text-xs font-medium text-emerald-600">Ready to process</p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
                <p className="text-xs text-muted">Pending approvals</p>
                <p className="text-lg font-bold text-brand-ink">18</p>
                <p className="text-xs text-brand-blue">Leave · WFH · Claims</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {!reduced ? (
        <>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute -left-2 top-10 hidden rounded-2xl border border-border-subtle bg-white p-3 shadow-card md:block"
          >
            <p className="text-[10px] font-semibold uppercase text-brand-blue">Live</p>
            <p className="text-sm font-bold text-brand-ink">248 punched in</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute -right-1 bottom-8 hidden rounded-2xl border border-border-subtle bg-white p-3 shadow-card md:block"
          >
            <p className="text-[10px] font-semibold uppercase text-brand-purple">Compliance</p>
            <p className="text-sm font-bold text-brand-ink">EPF · ESI · PT</p>
          </motion.div>
        </>
      ) : null}
    </div>
  )
}
