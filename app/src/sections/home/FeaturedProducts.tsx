import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Overline } from '@/components/ui/typography';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations';

const collections = [
  'Pure Brilliance',
  'Varnaya Blends',
  'Daily Dew',
  'Clear Difference',
];

const products = [
  {
    name: 'Radiance Serum',
    collection: 'Pure Brilliance',
    price: 48,
    image: '/images/product-serum.jpg',
    badge: 'sage' as const,
  },
  {
    name: 'Botanical Cleanser',
    collection: 'Daily Dew',
    price: 32,
    image: '/images/product-cleanser.jpg',
    badge: 'rose' as const,
  },
  {
    name: 'Night Repair Oil',
    collection: 'Varnaya Blends',
    price: 64,
    image: '/images/product-oil.jpg',
    badge: 'gold' as const,
  },
  {
    name: 'Hydrating Mist',
    collection: 'Daily Dew',
    price: 28,
    image: '/images/product-mist.jpg',
    badge: 'sage' as const,
  },
  {
    name: 'Clarifying Mask',
    collection: 'Clear Difference',
    price: 42,
    image: '/images/product-mask.jpg',
    badge: 'rose' as const,
  },
  {
    name: 'Glow Elixir',
    collection: 'Pure Brilliance',
    price: 56,
    image: '/images/product-elixir.jpg',
    badge: 'gold' as const,
  },
];

export default function FeaturedProducts() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const filteredProducts = activeCollection
    ? products.filter((p) => p.collection === activeCollection)
    : products;

  return (
    <section className="relative py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar (desktop) */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block w-48 flex-shrink-0"
          >
            <Overline className="text-text-light mb-6">Collections</Overline>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setActiveCollection(null)}
                  className={`font-jost text-sm transition-colors ${
                    activeCollection === null
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  All Collections
                </button>
              </li>
              {collections.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setActiveCollection(c)}
                    className={`font-jost text-sm transition-colors ${
                      activeCollection === c
                        ? 'text-text-primary font-medium'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp()}
              className="mb-12"
            >
              <span className="font-jost font-light text-sm text-text-muted block mb-2">
                For Glowing & Healthy Skin,
              </span>
              <h2 className="font-cormorant font-light italic text-h2 text-text-primary underline decoration-solar-gold/30 underline-offset-8">
                Pure Brilliance
              </h2>
            </motion.div>

            {/* Mobile collection filter */}
            <div className="flex lg:hidden flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveCollection(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-jost transition-colors ${
                  activeCollection === null
                    ? 'bg-text-primary text-cream'
                    : 'glass-warm text-text-muted'
                }`}
              >
                All
              </button>
              {collections.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCollection(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-jost transition-colors ${
                    activeCollection === c
                      ? 'bg-text-primary text-cream'
                      : 'glass-warm text-text-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.name}
                  variants={staggerItem()}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl aspect-[3/4] relative overflow-hidden card-lift mb-4">
                    {/* Product image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover img-zoom"
                      loading="lazy"
                    />

                    {/* Top bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <Badge variant={product.badge} className="text-[10px]">
                        {product.collection}
                      </Badge>
                      <button className="w-8 h-8 rounded-full glass-warm flex items-center justify-center text-text-primary/60 hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Gold edge glow on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-solar-gold/20 rounded-2xl transition-all duration-500" />
                  </div>

                  {/* Product info */}
                  <h3 className="font-cormorant text-lg text-text-primary group-hover:text-solar-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-jost font-medium text-sm text-text-muted">
                    ${product.price}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
