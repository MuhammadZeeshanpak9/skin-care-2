import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AssessmentAnswer,
  AssessmentFlags,
  UserCapture,
} from '@/types/assessment'
import { NOT_SURE_THRESHOLD, TOTAL_STEPS } from '@/constants/questions'

const DEFAULT_FLAGS: AssessmentFlags = {
  isPregnancySafeRequired: false,
  hasPrescriptionConflict: false,
  requiresConsultation: false,
  notSureCount: 0,
  severityTriggered: false,
}

interface AssessmentStore {
  currentStep: number
  answers: AssessmentAnswer[]
  flags: AssessmentFlags
  sessionId: string
  isComplete: boolean
  userCapture: UserCapture | null
  setUserCapture: (user: UserCapture) => void
  setAnswer: (questionId: string, value: unknown, isNotSure?: boolean) => void
  nextStep: () => void
  prevStep: () => void
  applyBranchRules: (questionId: string, value: unknown, isNotSure: boolean) => void
  resetAssessment: () => void
  hasExistingDraft: () => boolean
  getAnswerForQuestion: (questionId: string) => AssessmentAnswer | undefined
}

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      answers: [],
      flags: { ...DEFAULT_FLAGS },
      sessionId: crypto.randomUUID(),
      isComplete: false,
      userCapture: null,

      setUserCapture: (user) => set({ userCapture: user }),

      setAnswer: (questionId, value, isNotSure = false) => {
        const filtered = get().answers.filter(
          (a) => a.questionId !== questionId
        )
        const newAnswer: AssessmentAnswer = {
          questionId,
          value,
          isNotSure,
          timestamp: Date.now(),
        }
        const answers = [...filtered, newAnswer]
        set({ answers })
        get().applyBranchRules(questionId, value, isNotSure)
      },

      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < TOTAL_STEPS) {
          set({ currentStep: currentStep + 1 })
        } else {
          set({ isComplete: true })
        }
      },

      prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) set({ currentStep: currentStep - 1 })
      },

      applyBranchRules: (questionId, value, isNotSure) => {
        const flags = { ...get().flags }
        const answers = get().answers

        if (questionId === 'q8' && value === 'yes') {
          flags.isPregnancySafeRequired = true
          flags.requiresConsultation = true
        }
        if (questionId === 'q9' && value === 'yes') {
          flags.hasPrescriptionConflict = true
          flags.requiresConsultation = true
        }
        if (questionId === 'q4' && value === 'severe') {
          flags.severityTriggered = true
          flags.requiresConsultation = true
        }

        const notSureCount = [
          ...answers.filter((a) => a.questionId !== questionId),
          { questionId, value, isNotSure, timestamp: 0 },
        ].filter((a) => a.isNotSure).length

        flags.notSureCount = notSureCount
        if (notSureCount >= NOT_SURE_THRESHOLD) {
          flags.requiresConsultation = true
        }

        set({ flags })
      },

      resetAssessment: () =>
        set({
          currentStep: 1,
          answers: [],
          flags: { ...DEFAULT_FLAGS },
          sessionId: crypto.randomUUID(),
          isComplete: false,
          userCapture: null,
        }),

      hasExistingDraft: () => {
        const { answers, currentStep } = get()
        return answers.length > 0 && currentStep > 1
      },

      getAnswerForQuestion: (questionId) =>
        get().answers.find((a) => a.questionId === questionId),
    }),
    { name: 'aiaaia-assessment-v1' }
  )
)
