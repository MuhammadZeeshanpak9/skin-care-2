import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

export default function Results() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
        className="text-center max-w-lg mx-auto px-4"
      >
        <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-solar-gold" />
        </div>
        <h1 className="font-cormorant text-h1 text-text-primary mb-4">
          Your Results
        </h1>
        <p className="font-jost font-light text-text-muted leading-relaxed">
          Your personalized skincare results will appear here after completing the assessment.
        </p>
      </motion.div>
    </section>
  );
}
