import { motion } from 'framer-motion';
import { Shield, Leaf, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const trustItems = [
  {
    icon: Shield,
    title: 'Adviser Reviewed',
    description: 'Every recommendation is vetted by certified skin care professionals.',
  },
  {
    icon: Leaf,
    title: 'Pure Botanicals',
    description: 'Sourced sustainably from African farms with full traceability.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Care',
    description: 'Tailored routines based on your unique skin profile and goals.',
  },
];

export default function TrustBar() {
  return (
    <section className="relative py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem()}
              className="glass-warm rounded-2xl px-6 py-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-light-sage/60 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-luxury-green" />
              </div>
              <div>
                <h3 className="font-jost font-medium text-sm text-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="font-jost font-light text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
