import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Overline } from '@/components/ui/typography';

const services = [
  { name: 'Personal Skin Consultation', duration: '45 min', price: 85 },
  { name: 'Botanical Facial Treatment', duration: '60 min', price: 120 },
  { name: 'Deep Hydration Therapy', duration: '75 min', price: 150 },
  { name: 'Anti-Aging Ritual', duration: '90 min', price: 180 },
];

export default function Boutique() {
  return (
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="text-center mb-16">
          <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-6">
            <Store className="w-7 h-7 text-solar-gold" />
          </div>
          <Overline className="text-text-light mb-3">EXPERIENCE</Overline>
          <h1 className="font-cormorant text-h1 text-text-primary mb-4">
            The <em className="italic">Boutique</em>
          </h1>
          <p className="font-jost font-light text-text-muted max-w-lg mx-auto">
            Visit our luxury spa boutiques for personalized treatments using our signature botanical formulations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map(s => (
            <motion.div
              key={s.name}
              variants={staggerItem()}
              className="glass-warm rounded-2xl p-6 flex items-center justify-between group cursor-pointer card-lift"
            >
              <div>
                <h3 className="font-cormorant text-xl text-text-primary group-hover:text-solar-gold transition-colors">{s.name}</h3>
                <p className="font-jost text-xs text-text-muted mt-1">{s.duration}</p>
              </div>
              <span className="font-jost font-medium text-lg text-solar-gold">${s.price}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
