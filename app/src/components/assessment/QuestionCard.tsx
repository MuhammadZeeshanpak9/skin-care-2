import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Question, AssessmentAnswer } from '@/types/assessment'

interface Props {
  question: Question
  currentAnswer: AssessmentAnswer | undefined
  onAnswer: (value: unknown, isNotSure?: boolean) => void
  direction: 1 | -1
}

export function QuestionCard({ question, currentAnswer, onAnswer, direction }: Props) {
  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -32 }),
  }

  const selectedValues = (() => {
    if (!currentAnswer) return []
    if (Array.isArray(currentAnswer.value)) return currentAnswer.value as string[]
    return [currentAnswer.value as string]
  })()

  const handleMultiToggle = (optValue: string, isNotSure?: boolean) => {
    if (isNotSure) {
      onAnswer([optValue], true)
      return
    }
    const withoutNotSure = selectedValues.filter((v) => {
      const opt = question.options?.find((o) => o.value === v)
      return !opt?.isNotSure
    })
    if (withoutNotSure.includes(optValue)) {
      onAnswer(withoutNotSure.filter((v) => v !== optValue))
    } else {
      const max = question.maxSelections ?? 99
      if (withoutNotSure.length < max) {
        onAnswer([...withoutNotSure, optValue])
      }
    }
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 px-6 py-6"
      >
        <p className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted mb-4">
          Step {question.step}
        </p>

        <h2
          className="font-cormorant leading-tight text-text-primary mb-3"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {question.question}
        </h2>

        {question.subtext && (
          <p className="font-jost text-sm text-text-muted leading-relaxed mb-8 max-w-lg">
            {question.subtext}
          </p>
        )}

        {!question.subtext && <div className="mb-8" />}

        {/* Single select */}
        {question.type === 'single-select' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {question.options.map((opt) => {
              const isSelected = selectedValues[0] === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(opt.value, opt.isNotSure)}
                  className={cn(
                    'text-left px-5 py-4 rounded-2xl border transition-all duration-200',
                    'font-jost text-sm leading-snug',
                    isSelected
                      ? 'border-solar-gold bg-solar-gold/10 text-text-primary'
                      : opt.isNotSure
                      ? 'border-[rgba(46,41,35,0.10)] bg-champagne/20 text-text-muted hover:border-[rgba(46,41,35,0.2)]'
                      : 'border-[rgba(46,41,35,0.12)] bg-white/60 text-text-primary hover:border-solar-gold/40'
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Multi select */}
        {question.type === 'multi-select' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {question.options.map((opt) => {
              const isSelected = selectedValues.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => handleMultiToggle(opt.value, opt.isNotSure)}
                  className={cn(
                    'text-left px-5 py-4 rounded-2xl border transition-all duration-200',
                    'font-jost text-sm flex items-start gap-3',
                    isSelected
                      ? 'border-solar-gold bg-solar-gold/10 text-text-primary'
                      : opt.isNotSure
                      ? 'border-[rgba(46,41,35,0.10)] bg-champagne/20 text-text-muted'
                      : 'border-[rgba(46,41,35,0.12)] bg-white/60 text-text-primary hover:border-solar-gold/40'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                      isSelected ? 'bg-solar-gold border-solar-gold' : 'border-[rgba(46,41,35,0.2)]'
                    )}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 10 8"
                        className="w-2.5 h-2 text-white fill-none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="1 4 3.5 6.5 9 1" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Radio */}
        {question.type === 'radio' && question.options && (
          <div className="flex flex-col gap-3 max-w-md">
            {question.options.map((opt) => {
              const isSelected = selectedValues[0] === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(opt.value, opt.isNotSure)}
                  className={cn(
                    'text-left px-5 py-4 rounded-2xl border transition-all duration-200',
                    'font-jost text-sm flex items-center gap-4',
                    isSelected
                      ? 'border-solar-gold bg-solar-gold/10 text-text-primary'
                      : 'border-[rgba(46,41,35,0.12)] bg-white/60 text-text-primary hover:border-solar-gold/40'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                      isSelected ? 'border-solar-gold' : 'border-[rgba(46,41,35,0.2)]'
                    )}
                  >
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-solar-gold" />
                    )}
                  </span>
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Slider */}
        {question.type === 'slider' && question.range && (
          <div className="max-w-sm">
            <div className="flex justify-between mb-3">
              <span className="font-jost text-xs text-text-muted">{question.range.minLabel}</span>
              <span className="font-jost text-base font-medium text-text-primary">
                {(currentAnswer?.value as number) ?? question.range.min}
              </span>
              <span className="font-jost text-xs text-text-muted">{question.range.maxLabel}</span>
            </div>
            <input
              type="range"
              min={question.range.min}
              max={question.range.max}
              step={1}
              value={(currentAnswer?.value as number) ?? question.range.min}
              onChange={(e) => onAnswer(Number(e.target.value))}
              className="w-full accent-solar-gold cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              {Array.from(
                { length: question.range.max - question.range.min + 1 },
                (_, i) => i + question.range!.min
              ).map((n) => (
                <span key={n} className="font-jost text-xs text-text-light w-4 text-center">
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
