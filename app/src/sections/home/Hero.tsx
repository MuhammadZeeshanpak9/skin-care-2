import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
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

  const renderAnimatedText = (text: string) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.2em]">
        {word.split('').map((char, i) => (
          <span key={`char-${wordIndex}-${i}`} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section className="relative min-h-[95dvh] lg:min-h-[100dvh] w-full flex items-center overflow-hidden bg-transparent pt-20">
      {/* --- Background Image & Blending --- */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/hero-photo.jpg"
          alt="AiaAia Skincare Glowing Skin Model"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] opacity-95"
        />
        {/* Soft mask gradient over the image itself for a softer look */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent w-full lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* --- 2D Animated Silk & Liquid Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-60">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, var(--dusty-rose) 0%, transparent 60%)',
            top: '0%',
            left: '-10%',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, var(--champagne) 0%, transparent 60%)',
            bottom: '5%',
            right: '25%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Flowing Silk Ribbon overlaying the background */}
      <motion.svg
        className="absolute top-0 right-[35%] w-[35vw] h-full pointer-events-none overflow-visible opacity-30 z-0 hidden lg:block"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
        animate={{
          d: [
            "M 100 0 C 300 200, -100 600, 200 800 C 250 800, 50 600, 150 0 Z",
            "M 150 0 C 250 250, 0 550, 250 800 C 300 800, 100 550, 200 0 Z",
            "M 100 0 C 300 200, -100 600, 200 800 C 250 800, 50 600, 150 0 Z"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path fill="url(#silk-gradient-hero-main)" />
        <defs>
          <linearGradient id="silk-gradient-hero-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--dusty-rose)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="var(--deep-mauve)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* --- Content Area --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-16 flex flex-col justify-center">
        <div className="w-full lg:w-[50%] flex flex-col text-left">
          {/* Overline */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overline text-deep-mauve block mb-4 tracking-[0.25em] font-medium"
          >
            DISCOVER · ASSESS · TRANSFORM
          </motion.span>

          {/* Title with character reveal fixed word wrap */}
          <div ref={titleRef} className="mb-6 text-left" style={{ perspective: '1000px' }}>
            <h1 className="font-cormorant font-light text-display text-text-primary tracking-[-0.03em] leading-[0.95] flex flex-wrap">
              {renderAnimatedText(titleLine1)}
            </h1>
            <h1 className="font-cormorant font-light italic text-display text-deep-mauve tracking-[-0.03em] leading-[0.95] mt-2 flex flex-wrap">
              {renderAnimatedText(titleLine2)}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-jost font-light text-lg lg:text-xl text-text-primary/80 max-w-md mb-8 leading-relaxed drop-shadow-sm"
          >
            Personalized skincare guidance inspired by nature, reviewed by your Skin Care Adviser. We combine organic African botanicals with modern diagnostics to reveal your healthiest skin.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-10 w-full sm:w-auto"
          >
            <Link
              to="/assessment"
              className="btn-liquid bg-deep-mauve text-cream font-jost font-medium tracking-wide px-8 py-4 rounded-full hover:bg-[#4E3232] transition-colors duration-300 text-center shadow-lg hover:shadow-xl"
            >
              Begin Your Assessment
            </Link>
            <Link
              to="/products"
              className="glass-warm text-deep-mauve border-dusty-rose/30 hover:border-dusty-rose/60 hover:text-deep-mauve font-jost font-medium tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg text-center"
            >
              Explore Wellness Edit
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 1.2)}
            className="flex flex-wrap gap-3 max-w-lg"
          >
            {['Skin Care Adviser Reviewed', 'African Botanicals', 'Personalised Routines'].map(
              (pill) => (
                <motion.span
                  key={pill}
                  variants={staggerItem()}
                  className="glass-warm border-dusty-rose/30 rounded-full px-5 py-2.5 text-xs lg:text-sm font-jost tracking-wide text-text-primary/80 font-medium"
                >
                  {pill}
                </motion.span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

