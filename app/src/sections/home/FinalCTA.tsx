import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
        {/* Left: Image */}
        <motion.div
          style={{ y: imageY }}
          className="lg:w-1/2 relative min-h-[300px] lg:min-h-full"
        >
          <img
            src="/images/journal-3.jpg"
            alt="Skincare ritual"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-panel/10" />
        </motion.div>

        {/* Right: Dark panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp()}
          className="lg:w-1/2 bg-dark-panel flex items-center"
        >
          <div className="px-8 sm:px-12 lg:px-20 py-16 lg:py-24 w-full max-w-lg">
            <h2 className="font-jost font-black text-3xl lg:text-4xl text-cream uppercase tracking-tight mb-4">
              HEAR MORE FROM US
            </h2>
            <p className="font-jost font-light text-sm text-cream/55 leading-relaxed mb-8">
              Join the Inner Circle for exclusive skincare tips, early access to new products,
              and personalized advice from our Skin Care Advisers.
            </p>

            {/* Email input */}
            <div className="flex items-center gap-3 mb-6">
              <div className="glass-dark rounded-full flex-1 flex items-center px-6 py-3.5 border border-white/5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent flex-1 text-sm font-jost text-cream placeholder:text-cream/30 outline-none"
                />
              </div>
              <button className="glass-dark rounded-full w-12 h-12 flex items-center justify-center text-cream/70 hover:text-cream hover:border-solar-gold/30 transition-all flex-shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary CTA */}
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 font-jost text-sm text-cream/50 hover:text-cream transition-colors"
            >
              or Start Your Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
