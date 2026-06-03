import { motion } from 'framer-motion';
import { Overline } from '@/components/ui/typography';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';

const categories = [
  { name: 'Daily Wellness', description: 'Everyday essentials for healthy skin' },
  { name: 'Cleansing Rituals', description: 'Deep purification routines' },
  { name: 'Lip Care Edit', description: 'Nourishing lip treatments' },
  { name: 'Body Glow', description: 'Head-to-toe radiance' },
  { name: 'Inner Beauty', description: 'Wellness from within' },
];

const credentials = [
  'Vegan & Cruelty Free',
  '100% Transparent',
  'African Botanicals',
  'Adviser Reviewed',
  'Clean & Pure',
];

export default function WellnessEdit() {
  return (
    <section className="relative py-24 lg:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp()}
          className="text-center mb-16"
        >
          <Overline className="text-text-light mb-4">WELLNESS EDIT</Overline>
          <h2 className="font-cormorant text-h2 text-text-primary">
            Curated <em className="font-cormorant italic">Collections</em>
          </h2>
        </motion.div>

        {/* Category cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={staggerItem()}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE6] to-champagne/40 group-hover:scale-105 transition-transform duration-700" />

              {/* Glass overlay */}
              <div className="absolute inset-0 glass-warm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="font-cormorant italic text-lg text-text-primary mb-1">
                  {cat.name}
                </h3>
                <p className="font-jost font-light text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cat.description}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-solar-gold/20 group-hover:bg-solar-gold/10 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust credential bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {credentials.map((cred, i) => (
            <span key={cred} className="flex items-center gap-2">
              <span className="font-jost text-xs text-text-muted tracking-wide">
                {cred}
              </span>
              {i < credentials.length - 1 && (
                <span className="text-solar-gold/40 text-xs">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
