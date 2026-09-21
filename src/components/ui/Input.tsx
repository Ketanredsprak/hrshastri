import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <label className="block text-sm" htmlFor={inputId}>
      <span className="mb-1.5 block font-medium text-brand-ink">{label}</span>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border-subtle focus:border-brand-blue focus:ring-brand-blue/20'
        } ${className}`}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="mt-1 block text-xs font-medium text-error">
          {error}
        </span>
      ) : null}
    </label>
  )
}
