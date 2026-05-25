import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Overline } from '@/components/ui/typography';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';

const allProducts = [
  { name: 'Radiance Serum', price: 48, collection: 'Pure Brilliance', badge: 'sage' as const, image: '/images/product-serum.jpg' },
  { name: 'Botanical Cleanser', price: 32, collection: 'Daily Dew', badge: 'rose' as const, image: '/images/product-cleanser.jpg' },
  { name: 'Night Repair Oil', price: 64, collection: 'Varnaya Blends', badge: 'gold' as const, image: '/images/product-oil.jpg' },
  { name: 'Hydrating Mist', price: 28, collection: 'Daily Dew', badge: 'sage' as const, image: '/images/product-mist.jpg' },
  { name: 'Clarifying Mask', price: 42, collection: 'Clear Difference', badge: 'rose' as const, image: '/images/product-mask.jpg' },
  { name: 'Glow Elixir', price: 56, collection: 'Pure Brilliance', badge: 'gold' as const, image: '/images/product-elixir.jpg' },
  { name: 'Vitamin C Drops', price: 52, collection: 'Varnaya Blends', badge: 'gold' as const, image: '/images/product-serum.jpg' },
  { name: 'Calming Toner', price: 36, collection: 'Clear Difference', badge: 'sage' as const, image: '/images/product-mist.jpg' },
];

const filters = ['All', 'Pure Brilliance', 'Varnaya Blends', 'Daily Dew', 'Clear Difference'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? allProducts : allProducts.filter(p => p.collection === activeFilter);

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="mb-12">
          <Overline className="text-text-light mb-3">SHOP ALL</Overline>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="font-cormorant text-h1 text-text-primary">
              Our <em className="italic">Collection</em>
            </h1>
            <div className="flex items-center gap-3">
              <div className="glass-warm rounded-full flex items-center px-4 py-2.5">
                <Search className="w-4 h-4 text-text-light mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm font-jost text-text-primary placeholder:text-text-light outline-none w-40"
                />
              </div>
              <button className="glass-warm rounded-full w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-jost transition-colors ${
                activeFilter === f ? 'bg-text-primary text-cream' : 'glass-warm text-text-muted hover:text-text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.map(p => (
            <motion.div key={p.name} variants={staggerItem()} className="group cursor-pointer">
              <div className="rounded-2xl aspect-[3/4] relative overflow-hidden card-lift mb-3">
                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover img-zoom" loading="lazy" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <Badge variant={p.badge} className="text-[10px]">{p.collection}</Badge>
                </div>
              </div>
              <h3 className="font-cormorant text-lg text-text-primary group-hover:text-solar-gold transition-colors">{p.name}</h3>
              <p className="font-jost font-medium text-sm text-text-muted">${p.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
