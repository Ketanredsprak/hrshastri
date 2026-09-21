import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { FaqItem } from '../../data/faq'

type AccordionProps = {
  items: FaqItem[]
  singleOpen?: boolean
}

export function Accordion({ items, singleOpen = true }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    if (singleOpen) {
      setOpenIndex(openIndex === index ? null : index)
    } else {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.question}
            className={`rounded-2xl border bg-white transition ${
              isOpen ? 'border-brand-blue/25 shadow-card ring-1 ring-brand-blue/10' : 'border-border-subtle'
            }`}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-5 md:px-6 md:py-5"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 text-sm font-semibold leading-snug text-brand-ink sm:text-base md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 text-brand-blue transition sm:mt-0 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6 md:pb-6 md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
