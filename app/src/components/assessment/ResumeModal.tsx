import { motion } from 'framer-motion'
import { useAssessmentStore } from '@/store/assessmentStore'

interface Props {
  onResume: () => void
  onStartFresh: () => void
}

export function ResumeModal({ onResume, onStartFresh }: Props) {
  const currentStep = useAssessmentStore((s) => s.currentStep)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/25 backdrop-blur-sm px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-warm rounded-3xl p-8 md:p-10 w-full max-w-sm"
      >
        <p className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase
          text-text-muted mb-3">
          Welcome back
        </p>
        <h2 className="font-cormorant text-h3 text-text-primary mb-2 leading-tight">
          You left off at step {currentStep}
        </h2>
        <p className="font-jost text-sm text-text-muted leading-relaxed mb-8">
          Your progress has been saved. Would you like to continue
          your skin assessment?
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onResume}
            className="w-full py-3.5 rounded-full bg-text-primary text-white
              font-jost text-sm tracking-wide
              hover:bg-text-primary/90 transition"
          >
            Continue where I left off
          </button>
          <button
            onClick={onStartFresh}
            className="w-full py-3.5 rounded-full border border-[rgba(46,41,35,0.15)]
              text-text-muted font-jost text-sm
              hover:text-text-primary hover:border-[rgba(46,41,35,0.3)] transition"
          >
            Start a new assessment
          </button>
        </div>
      </motion.div>
    </div>
  )
}
