export type QuestionType =
  | 'single-select'
  | 'multi-select'
  | 'slider'
  | 'radio'

export interface QuestionOption {
  value: string
  label: string
  isNotSure?: boolean
}

export interface Question {
  id: string
  step: number
  type: QuestionType
  question: string
  subtext?: string
  options?: QuestionOption[]
  range?: {
    min: number
    max: number
    minLabel: string
    maxLabel: string
  }
  maxSelections?: number
  required: boolean
  branchKey?: string
}

export interface AssessmentAnswer {
  questionId: string
  value: unknown
  isNotSure: boolean
  timestamp: number
}

export interface AssessmentFlags {
  isPregnancySafeRequired: boolean
  hasPrescriptionConflict: boolean
  requiresConsultation: boolean
  notSureCount: number
  severityTriggered: boolean
}

export interface UserCapture {
  name: string
  email: string
}
