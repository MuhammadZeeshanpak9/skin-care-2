import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.1)}
        className="w-full max-w-md mx-auto px-4"
      >
        {/* Logo */}
        <motion.div variants={staggerItem()} className="text-center mb-10">
          <span className="font-cormorant italic text-3xl text-text-primary">aïaaïa</span>
          <p className="font-jost font-light text-text-muted text-sm mt-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div variants={staggerItem()} className="flex rounded-full glass-warm p-1 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-full text-sm font-jost transition-all ${
              mode === 'login' ? 'bg-text-primary text-cream' : 'text-text-muted'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2.5 rounded-full text-sm font-jost transition-all ${
              mode === 'signup' ? 'bg-text-primary text-cream' : 'text-text-muted'
            }`}
          >
            Join
          </button>
        </motion.div>

        {/* Form */}
        <motion.div variants={staggerItem()} className="glass-warm rounded-2xl p-6 space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-transparent border border-border-soft text-sm font-jost text-text-primary placeholder:text-text-light outline-none focus:border-solar-gold/30 transition-colors"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-transparent border border-border-soft text-sm font-jost text-text-primary placeholder:text-text-light outline-none focus:border-solar-gold/30 transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-transparent border border-border-soft text-sm font-jost text-primary placeholder:text-text-light outline-none focus:border-solar-gold/30 transition-colors"
            />
          </div>
          <button className="w-full bg-text-primary text-cream font-jost font-medium py-4 rounded-full hover:shadow-card-lift transition-shadow flex items-center justify-center gap-2">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Social */}
        <motion.p variants={staggerItem()} className="text-center font-jost text-xs text-text-muted mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </motion.p>
      </motion.div>
    </section>
  );
}
