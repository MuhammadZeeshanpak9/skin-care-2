import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const cartItems = [
  { name: 'Radiance Serum', price: 48, qty: 1, image: '/images/product-serum.jpg' },
  { name: 'Botanical Cleanser', price: 32, qty: 2, image: '/images/product-cleanser.jpg' },
];

export default function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="mb-12">
          <h1 className="font-cormorant text-h1 text-text-primary mb-2">Your Cart</h1>
          <p className="font-jost font-light text-text-muted">{cartItems.length} items</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1)}
            className="flex-1 space-y-4"
          >
            {cartItems.map(item => (
              <motion.div
                key={item.name}
                variants={staggerItem()}
                className="glass-warm rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-cormorant text-lg text-text-primary">{item.name}</h3>
                  <p className="font-jost font-medium text-sm text-solar-gold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full glass-warm flex items-center justify-center text-text-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-jost text-sm w-6 text-center">{item.qty}</span>
                  <button className="w-8 h-8 rounded-full glass-warm flex items-center justify-center text-text-muted">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button className="text-text-light hover:text-text-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:w-80"
          >
            <div className="glass-warm rounded-2xl p-6">
              <h3 className="font-cormorant text-xl text-text-primary mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-jost text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text-primary">${subtotal}</span>
                </div>
                <div className="flex justify-between font-jost text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="text-text-primary">Free</span>
                </div>
              </div>
              <div className="border-t border-border-warm pt-4 mb-6 flex justify-between font-jost font-medium">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">${subtotal}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-text-primary text-cream text-center font-jost font-medium py-4 rounded-full hover:shadow-card-lift transition-shadow"
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
