import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAssessmentStore } from '@/store/assessmentStore'
import { fadeUp } from '@/lib/animations'

interface Props {
  onComplete: () => void
}

export function EmailCapture({ onComplete }: Props) {
  const setUserCapture = useAssessmentStore((s) => s.setUserCapture)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail) {
      setError('Please enter both your name and email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error: dbError } = await supabase
        .from('users')
        .upsert(
          { name: trimmedName, email: trimmedEmail },
          { onConflict: 'email' }
        )

      if (dbError) {
        setError(`Database error: ${dbError.message}`)
        setLoading(false)
        return
      }

      setUserCapture({ name: trimmedName, email: trimmedEmail })
      onComplete()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Connection error: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
        className="glass-warm rounded-3xl p-8 md:p-12 w-full max-w-md"
      >
        <p className="font-jost text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted mb-4">
          Personalised Skin Assessment
        </p>
        <h1 className="font-cormorant text-h2 text-text-primary leading-tight mb-3">
          Let&apos;s discover
          <br />
          <em>your skin story</em>
        </h1>
        <p className="font-jost text-sm text-text-muted leading-relaxed mb-8">
          Enter your details so we can save your personalised skin profile
          and send you your routine.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-3.5 rounded-2xl border border-[rgba(46,41,35,0.15)]
              bg-white/70 font-jost text-sm text-text-primary
              placeholder:text-text-light focus:outline-none
              focus:border-solar-gold/50 transition disabled:opacity-60"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-3.5 rounded-2xl border border-[rgba(46,41,35,0.15)]
              bg-white/70 font-jost text-sm text-text-primary
              placeholder:text-text-light focus:outline-none
              focus:border-solar-gold/50 transition disabled:opacity-60"
          />

          {error && (
            <p className="font-jost text-sm text-dusty-rose">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-text-primary text-white
              font-jost text-sm tracking-wide
              hover:bg-text-primary/90 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'One moment...' : 'Begin My Assessment'}
          </button>
        </form>

        <p className="font-jost text-xs text-text-light text-center mt-6 leading-relaxed">
          Your information is private and will only be used to
          personalise your skincare routine.
        </p>
      </motion.div>
    </div>
  )
}
