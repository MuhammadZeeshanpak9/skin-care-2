import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Character reveal animation on mount
    const chars = titleRef.current?.querySelectorAll('.char');
    if (chars) {
      chars.forEach((char, i) => {
        const el = char as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px) rotateX(-90deg)';
        setTimeout(() => {
          el.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) rotateX(0)';
        }, 300);
      });
    }
  }, []);

  const titleLine1 = 'Discover Your';
  const titleLine2 = 'Skin Story';

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-[#F6EFE6] to-champagne/30" />

      {/* Animated radial gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124,154,120,0.3) 0%, transparent 70%)',
            top: '10%',
            right: '5%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(199,167,106,0.25) 0%, transparent 70%)',
            bottom: '10%',
            left: '10%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Overline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overline text-text-primary/50 block mb-8 tracking-[0.25em]"
        >
          DISCOVER · ASSESS · TRANSFORM
        </motion.span>

        {/* Title with character reveal */}
        <div ref={titleRef} className="mb-8" style={{ perspective: '1000px' }}>
          <div className="font-cormorant font-light text-display text-text-primary tracking-[-0.03em] leading-none">
            {titleLine1.split('').map((char, i) => (
              <span
                key={`l1-${i}`}
                className="char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <div className="font-cormorant font-light italic text-display text-text-primary tracking-[-0.03em] leading-none mt-2">
            {titleLine2.split('').map((char, i) => (
              <span
                key={`l2-${i}`}
                className="char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-jost font-light text-lg text-text-primary/65 max-w-md mx-auto mb-10 leading-relaxed"
        >
          Personalized skincare guidance inspired by nature, reviewed by your Skin Care Adviser.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            to="/assessment"
            className="btn-liquid bg-text-primary text-cream font-jost font-medium tracking-wide px-8 py-4 rounded-full hover:shadow-card-lift transition-shadow duration-400"
          >
            Begin Your Assessment
          </Link>
          <Link
            to="/products"
            className="glass-warm text-text-primary/70 hover:text-text-primary font-jost font-medium tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:shadow-gold-glow"
          >
            Explore Wellness Edit
          </Link>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 1.2)}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {['Skin Care Adviser Reviewed', 'African Botanicals', 'Personalised Routines'].map(
            (pill) => (
              <motion.span
                key={pill}
                variants={staggerItem()}
                className="glass-warm rounded-full px-4 py-2 text-xs font-jost tracking-wide text-text-primary/60"
              >
                {pill}
              </motion.span>
            )
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-jost text-xs tracking-[0.2em] text-text-light uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-text-light" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--cream))',
        }}
      />
    </section>
  );
}
