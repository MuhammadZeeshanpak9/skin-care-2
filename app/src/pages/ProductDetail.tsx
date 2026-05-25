import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function ProductDetail() {
  const { slug } = useParams();

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[55%]"
          >
            <div className="aspect-[4/5] rounded-3xl relative overflow-hidden glass-gold">
              <img
                src="/images/product-serum.jpg"
                alt="Product"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1)}
            className="lg:w-[45%] lg:sticky lg:top-32 lg:self-start"
          >
            <motion.div variants={staggerItem()}>
              <Badge variant="sage">Pure Brilliance</Badge>
            </motion.div>

            <motion.h1
              variants={staggerItem()}
              className="font-cormorant text-4xl lg:text-5xl text-text-primary mt-4 mb-2"
            >
              {slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Product Name'}
            </motion.h1>

            <motion.div variants={staggerItem()} className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 text-solar-gold fill-solar-gold" />
                ))}
              </div>
              <span className="font-jost text-xs text-text-muted">48 reviews</span>
            </motion.div>

            <motion.p variants={staggerItem()} className="font-cormorant text-3xl text-text-primary mb-6">
              $48.00
            </motion.p>

            {/* Clinical metrics */}
            <motion.div variants={staggerItem()} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'pH Balanced', value: '5.5' },
                { label: 'Botanical %', value: '97%' },
                { label: 'Dermatologist', value: 'Tested' },
              ].map(m => (
                <div key={m.label} className="glass-warm rounded-xl p-3 text-center">
                  <p className="font-jost font-medium text-sm text-text-primary">{m.value}</p>
                  <p className="font-jost text-[10px] text-text-muted uppercase tracking-wide">{m.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.p variants={staggerItem()} className="font-jost font-light text-sm text-text-muted leading-relaxed mb-8">
              A lightweight serum infused with cold-pressed canola oil and hibiscus extract.
              Designed to brighten, hydrate, and restore your natural radiance.
            </motion.p>

            {/* Add to cart */}
            <motion.div variants={staggerItem()} className="flex items-center gap-3 mb-10">
              <button className="flex-1 bg-solar-gold text-cream font-jost font-medium py-4 rounded-full hover:shadow-lg hover:shadow-solar-gold/20 transition-shadow btn-liquid flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="w-12 h-12 rounded-full glass-warm flex items-center justify-center text-text-muted hover:text-rose transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Accordion */}
            <motion.div variants={staggerItem()} className="space-y-3">
              {['Ingredients', 'How to Use', 'Shipping'].map(item => (
                <button
                  key={item}
                  className="w-full flex items-center justify-between glass-warm rounded-xl px-5 py-4 text-left"
                >
                  <span className="font-jost text-sm text-text-primary">{item}</span>
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
