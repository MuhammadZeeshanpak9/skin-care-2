import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AssessmentFlags } from '@/types/assessment'

interface Props {
  flags: AssessmentFlags
}

interface Notice {
  key: string
  type: 'safe' | 'warning' | 'adviser'
  message: string
}

export function BranchNotice({ flags }: Props) {
  const notices: Notice[] = []

  if (flags.isPregnancySafeRequired) {
    notices.push({
      key: 'pregnancy',
      type: 'safe',
      message:
        'Pregnancy-safe filter is now active. Retinoids and strong acids have been excluded from your recommendations.',
    })
  }
  if (flags.hasPrescriptionConflict) {
    notices.push({
      key: 'prescription',
      type: 'warning',
      message:
        'Your Skin Care Adviser will review any potential interactions with your prescription treatment.',
    })
  }
  if (flags.severityTriggered) {
    notices.push({
      key: 'severity',
      type: 'adviser',
      message:
        'Based on the severity of your concern, we recommend a Skin Care Adviser consultation alongside your routine.',
    })
  }
  if (!flags.severityTriggered && flags.notSureCount >= 3) {
    notices.push({
      key: 'not-sure',
      type: 'adviser',
      message:
        "It looks like you'd benefit from speaking with one of our advisers for a more personalised consultation.",
    })
  }

  if (notices.length === 0) return null

  return (
    <div className="px-6 pb-4 flex flex-col gap-2">
      <AnimatePresence>
        {notices.map((notice, i) => (
          <motion.div
            key={notice.key}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className={cn(
              'rounded-xl px-4 py-3 font-jost text-sm leading-relaxed',
              notice.type === 'safe' &&
                'bg-luxury-green/10 text-luxury-green border border-luxury-green/20',
              notice.type === 'warning' &&
                'bg-dusty-rose/10 text-deep-mauve border border-dusty-rose/20',
              notice.type === 'adviser' &&
                'bg-solar-gold/10 text-text-primary border border-solar-gold/25'
            )}
          >
            {notice.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
