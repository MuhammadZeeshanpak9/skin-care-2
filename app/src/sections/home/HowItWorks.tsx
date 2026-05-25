import { motion } from 'framer-motion';
import { ClipboardCheck, FlaskConical, Heart } from 'lucide-react';
import { Overline } from '@/components/ui/typography';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Take the Assessment',
    description:
      'Answer a few questions about your skin type, concerns, and lifestyle. Our AI-powered system analyzes your responses to understand your unique skin profile.',
  },
  {
    number: '02',
    icon: FlaskConical,
    title: 'Get Your Formula',
    description:
      'Receive a personalized skincare routine crafted from our botanical collections, reviewed by a certified Skin Care Adviser for optimal results.',
  },
  {
    number: '03',
    icon: Heart,
    title: 'Transform Your Skin',
    description:
      'Follow your tailored regimen and watch your skin flourish. Track your progress and adjust your routine as your skin evolves.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp()}
          className="text-center mb-16"
        >
          <Overline className="text-text-light mb-4">THE RITUAL</Overline>
          <h2 className="font-cormorant text-h2 text-text-primary">
            Your Journey to{' '}
            <em className="font-cormorant italic">Perfect Skin</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.15)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={staggerItem()}
              className="glass-warm rounded-3xl p-8 relative overflow-hidden group card-lift"
            >
              {/* Large step number */}
              <span className="absolute top-4 right-4 font-cormorant text-7xl text-solar-gold/10 leading-none select-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-light-sage/60 flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-luxury-green" />
              </div>

              {/* Content */}
              <h3 className="font-cormorant italic text-xl text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-jost font-light text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
