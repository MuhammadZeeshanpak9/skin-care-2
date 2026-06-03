import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAssessmentStore } from '@/store/assessmentStore'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations'

interface AssessmentRow {
  id: string
  skin_type: string | null
  top_concerns: string[]
  sensitivity_level: number | null
  requires_consultation: boolean
  is_pregnant: boolean
  has_prescription: boolean
  climate: string | null
  budget_range: string | null
}

const SKIN_TYPE_LABELS: Record<string, string> = {
  dry: 'Dry',
  oily: 'Oily',
  combination: 'Combination',
  sensitive: 'Sensitive',
  normal: 'Normal',
  'not-sure': 'To be determined',
}

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne & breakouts',
  dryness: 'Dryness & dehydration',
  pih: 'Dark spots & hyperpigmentation',
  'uneven-tone': 'Uneven tone & dullness',
  aging: 'Fine lines & aging',
  oiliness: 'Excess oil & shine',
  sensitivity: 'Sensitivity & redness',
  pores: 'Large pores',
  'sun-protection': 'Sun protection',
  'not-sure': 'To be determined',
}

export default function Results() {
  const { id } = useParams<{ id: string }>()
  const { userCapture, resetAssessment } = useAssessmentStore()
  const [assessment, setAssessment] = useState<AssessmentRow | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || id === 'demo') {
      setLoading(false)
      return
    }

    supabase
      .from('assessments')
      .select('id, skin_type, top_concerns, sensitivity_level, requires_consultation, is_pregnant, has_prescription, climate, budget_range')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setAssessment(data)
        setLoading(false)
      })
  }, [id])

  const firstName = userCapture?.name?.split(' ')[0] ?? 'there'

  const skinTypeLabel = assessment?.skin_type
    ? (SKIN_TYPE_LABELS[assessment.skin_type] ?? assessment.skin_type)
    : null

  const concernLabels = (assessment?.top_concerns ?? [])
    .filter((c) => c !== 'not-sure')
    .map((c) => CONCERN_LABELS[c] ?? c)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-solar-gold/25 border-t-solar-gold rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg mx-auto">

        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-light-sage/60 flex items-center justify-center mx-auto mb-8"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-luxury-green fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.2)}
          className="text-center mb-10"
        >
          <p className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted mb-3">
            Assessment Complete
          </p>
          <h1 className="font-cormorant text-h1 text-text-primary leading-tight mb-4">
            Thank you, <em>{firstName}</em>
          </h1>
          <p className="font-jost text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
            Your skin profile has been saved. A Skin Care Adviser will review
            your responses and finalise your personalised routine.
          </p>
        </motion.div>

        {/* Profile summary card */}
        {(skinTypeLabel || concernLabels.length > 0 || assessment?.requires_consultation) && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.4)}
            className="glass-warm rounded-3xl p-6 mb-6 space-y-4"
          >
            <motion.p
              variants={staggerItem()}
              className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted"
            >
              Your Skin Profile
            </motion.p>

            {skinTypeLabel && (
              <motion.div variants={staggerItem()} className="flex items-start justify-between">
                <span className="font-jost text-sm text-text-muted">Skin type</span>
                <span className="font-jost text-sm font-medium text-text-primary">{skinTypeLabel}</span>
              </motion.div>
            )}

            {concernLabels.length > 0 && (
              <motion.div variants={staggerItem()} className="flex items-start justify-between gap-4">
                <span className="font-jost text-sm text-text-muted flex-shrink-0">Top concerns</span>
                <div className="flex flex-col items-end gap-1">
                  {concernLabels.map((c) => (
                    <span key={c} className="font-jost text-sm text-text-primary text-right">{c}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {assessment?.sensitivity_level != null && (
              <motion.div variants={staggerItem()} className="flex items-start justify-between">
                <span className="font-jost text-sm text-text-muted">Sensitivity</span>
                <span className="font-jost text-sm font-medium text-text-primary">
                  {assessment.sensitivity_level} / 5
                </span>
              </motion.div>
            )}

            {assessment?.requires_consultation && (
              <motion.div
                variants={staggerItem()}
                className="rounded-xl bg-solar-gold/10 border border-solar-gold/25 px-4 py-3 mt-2"
              >
                <p className="font-jost text-sm text-text-primary leading-relaxed">
                  Based on your answers, a complimentary Skin Care Adviser
                  consultation has been included with your routine.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* What happens next */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08, 0.6)}
          className="glass-warm rounded-3xl p-6 mb-8"
        >
          <motion.p
            variants={staggerItem()}
            className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted mb-4"
          >
            What happens next
          </motion.p>
          {[
            { step: '01', text: 'Your Skin Care Adviser reviews your profile' },
            { step: '02', text: 'A personalised routine is curated from our botanicals' },
            { step: '03', text: 'Your routine is sent to ' + (userCapture?.email ?? 'your email') },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={staggerItem()}
              className="flex items-start gap-4 py-3 border-b border-[rgba(46,41,35,0.06)] last:border-0"
            >
              <span className="font-cormorant italic text-2xl text-solar-gold/50 leading-none mt-0.5">
                {item.step}
              </span>
              <p className="font-jost text-sm text-text-muted leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.9)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/products"
            className="flex-1 py-4 rounded-full bg-text-primary text-white
              font-jost text-sm tracking-wide text-center
              hover:bg-text-primary/90 transition"
          >
            Explore Our Products
          </Link>
          <Link
            to="/"
            onClick={() => resetAssessment()}
            className="flex-1 py-4 rounded-full border border-[rgba(46,41,35,0.15)]
              text-text-muted font-jost text-sm text-center
              hover:text-text-primary hover:border-[rgba(46,41,35,0.3)] transition"
          >
            Back to Home
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
