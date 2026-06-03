import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useAssessmentStore } from '@/store/assessmentStore'
import { QUESTIONS, TOTAL_STEPS } from '@/constants/questions'
import { supabase } from '@/lib/supabase'
import { ProgressBar } from '@/components/assessment/ProgressBar'
import { QuestionCard } from '@/components/assessment/QuestionCard'
import { BranchNotice } from '@/components/assessment/BranchNotice'
import { EmailCapture } from '@/components/assessment/EmailCapture'
import { ResumeModal } from '@/components/assessment/ResumeModal'

type Stage = 'capture' | 'resume-modal' | 'questions' | 'processing'

export default function Assessment() {
  const navigate = useNavigate()
  const {
    currentStep,
    answers,
    flags,
    userCapture,
    setAnswer,
    nextStep,
    prevStep,
    resetAssessment,
    hasExistingDraft,
    getAnswerForQuestion,
  } = useAssessmentStore()

  const [stage, setStage] = useState<Stage>('capture')
  const [direction, setDirection] = useState<1 | -1>(1)

  useEffect(() => {
    if (!userCapture) {
      setStage('capture')
    } else if (hasExistingDraft()) {
      setStage('resume-modal')
    } else {
      setStage('questions')
    }
  }, [])

  const currentQuestion = QUESTIONS[currentStep - 1]
  const currentAnswer = currentQuestion
    ? getAnswerForQuestion(currentQuestion.id)
    : undefined

  const canContinue = (() => {
    if (!currentQuestion) return false
    if (!currentQuestion.required) return true
    if (!currentAnswer) return false
    if (currentQuestion.type === 'multi-select') {
      const val = currentAnswer.value as string[] | undefined
      return Boolean(val && val.length > 0)
    }
    if (currentQuestion.type === 'slider') return currentAnswer.value !== undefined
    return Boolean(currentAnswer.value)
  })()

  const handleNext = async () => {
    if (!canContinue) return
    if (currentStep === TOTAL_STEPS) {
      await handleSubmit()
      return
    }
    setDirection(1)
    nextStep()
  }

  const handleBack = () => {
    setDirection(-1)
    prevStep()
  }

  const handleSubmit = async () => {
    setStage('processing')

    try {
      let userId: string | null = null

      if (userCapture?.email) {
        const { data: userData } = await supabase
          .from('users')
          .select('id')
          .eq('email', userCapture.email)
          .single()
        userId = userData?.id ?? null
      }

      const skinTypeAnswer = answers.find((a) => a.questionId === 'q2')
      const concernsAnswer = answers.find((a) => a.questionId === 'q3')
      const sensitivityAnswer = answers.find((a) => a.questionId === 'q6')
      const climateAnswer = answers.find((a) => a.questionId === 'q10')
      const budgetAnswer = answers.find((a) => a.questionId === 'q13')

      const { data: assessment, error } = await supabase
        .from('assessments')
        .insert({
          user_id: userId,
          answers: answers,
          flags: flags,
          skin_type: (skinTypeAnswer?.value as string) ?? null,
          top_concerns: Array.isArray(concernsAnswer?.value)
            ? (concernsAnswer!.value as string[])
            : [],
          sensitivity_level: (sensitivityAnswer?.value as number) ?? null,
          is_pregnant: flags.isPregnancySafeRequired,
          has_prescription: flags.hasPrescriptionConflict,
          requires_consultation: flags.requiresConsultation,
          climate: (climateAnswer?.value as string) ?? null,
          budget_range: (budgetAnswer?.value as string) ?? null,
        })
        .select()
        .single()

      if (error) {
        console.error('Assessment save error:', error)
        navigate('/results/demo')
        return
      }

      navigate(`/results/${assessment.id}`)
    } catch (err) {
      console.error('Submit error:', err)
      navigate('/results/demo')
    }
  }

  if (stage === 'capture') {
    return (
      <EmailCapture
        onComplete={() => {
          if (hasExistingDraft()) {
            setStage('resume-modal')
          } else {
            setStage('questions')
          }
        }}
      />
    )
  }

  if (stage === 'resume-modal') {
    return (
      <ResumeModal
        onResume={() => setStage('questions')}
        onStartFresh={() => {
          resetAssessment()
          setStage('questions')
        }}
      />
    )
  }

  if (stage === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted mb-4">
            Analysing your skin profile
          </p>
          <h2
            className="font-cormorant text-text-primary leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Preparing your <em>personalised routine</em>
          </h2>
          <div className="w-8 h-8 border-2 border-solar-gold/25 border-t-solar-gold rounded-full animate-spin mx-auto" />
        </motion.div>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full pb-8">
        <ProgressBar currentStep={currentStep} />
        <BranchNotice flags={flags} />
        <QuestionCard
          question={currentQuestion}
          currentAnswer={currentAnswer}
          onAnswer={(value, isNotSure) =>
            setAnswer(currentQuestion.id, value, isNotSure)
          }
          direction={direction}
        />

        <div className="px-6 pb-6 flex items-center justify-between mt-auto">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="font-jost text-sm text-text-muted hover:text-text-primary
              transition disabled:opacity-30 flex items-center gap-2"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current strokeWidth-1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-text-primary text-white font-jost text-sm tracking-wide
              hover:bg-text-primary/90 transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentStep === TOTAL_STEPS ? 'Complete' : 'Continue'}
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="text-center pb-4">
          <button
            onClick={() => navigate('/')}
            className="font-jost text-xs text-text-light hover:text-text-muted transition"
          >
            Save and exit
          </button>
        </p>
      </div>
    </div>
  )
}
