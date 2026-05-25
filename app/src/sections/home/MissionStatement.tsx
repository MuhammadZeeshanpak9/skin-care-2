import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  { text: 'KNOW YOUR', style: 'font-jost font-black uppercase' },
  { text: 'skin.', style: 'font-cormorant font-light italic' },
  { text: 'TRUST YOUR', style: 'font-jost font-black uppercase' },
  { text: 'adviser.', style: 'font-cormorant font-light italic' },
];

const trustStatements = [
  {
    title: 'Science-Backed Formulations',
    body: 'Every product is developed with clinical research and tested for efficacy on diverse skin types.',
  },
  {
    title: 'Botanical-First Philosophy',
    body: 'We prioritize natural ingredients sourced sustainably from African ecosystems.',
  },
];

export default function MissionStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F6EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Giant typography */}
        <div className="relative">
          {lines.map((line, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [80, 0, -40]
            );
            const opacity = useTransform(
              scrollYProgress,
              [0, 0.3, 0.7, 1],
              [0, 1, 1, 0.8]
            );

            return (
              <motion.div
                key={index}
                style={{ y, opacity }}
                className="overflow-hidden"
              >
                <p
                  className={`${line.style} text-[12vw] lg:text-[15vw] leading-[0.9] tracking-[-2px] text-text-primary`}
                >
                  {line.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right column trust statements (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-64 space-y-8"
        >
          {trustStatements.map((stmt) => (
            <div key={stmt.title}>
              <h4 className="font-jost font-semibold text-sm text-text-primary mb-2">
                {stmt.title}
              </h4>
              <p className="font-jost font-light text-xs text-text-muted leading-relaxed">
                {stmt.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile trust statements */}
      <div className="lg:hidden max-w-lg mx-auto px-4 mt-12 space-y-6">
        {trustStatements.map((stmt) => (
          <div key={stmt.title}>
            <h4 className="font-jost font-semibold text-sm text-text-primary mb-2">
              {stmt.title}
            </h4>
            <p className="font-jost font-light text-xs text-text-muted leading-relaxed">
              {stmt.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
