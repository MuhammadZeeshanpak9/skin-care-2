import { motion } from 'framer-motion'
import { TOTAL_STEPS } from '@/constants/questions'

interface Props {
  currentStep: number
}

export function ProgressBar({ currentStep }: Props) {
  const pct = Math.round((currentStep / TOTAL_STEPS) * 100)

  return (
    <div className="w-full px-6 pt-8 pb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted">
          Skin Assessment
        </span>
        <span className="font-jost text-xs text-text-muted">
          {currentStep} / {TOTAL_STEPS}
        </span>
      </div>
      <div className="h-px bg-champagne/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-solar-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
