import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

export default function Assessment() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
        className="text-center max-w-lg mx-auto px-4"
      >
        <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-6">
          <ClipboardList className="w-7 h-7 text-solar-gold" />
        </div>
        <h1 className="font-cormorant text-h1 text-text-primary mb-4">
          Skin Assessment
        </h1>
        <p className="font-jost font-light text-text-muted leading-relaxed mb-8">
          Our intelligent assessment engine is coming soon. Take the first step toward
          your personalized skincare routine — backed by science, powered by nature.
        </p>
        <div className="glass-warm rounded-2xl p-6">
          <p className="font-jost text-sm text-text-muted">
            The assessment will analyze your skin type, concerns, and lifestyle to create
            a tailored regimen using our African botanical formulations.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
