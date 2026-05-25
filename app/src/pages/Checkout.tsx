import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

export default function Checkout() {
  return (
    <section className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="mb-12">
          <h1 className="font-cormorant text-h1 text-text-primary">Checkout</h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08)}
            className="flex-1 space-y-8"
          >
            {/* Shipping */}
            <motion.div variants={staggerItem()}>
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-5 h-5 text-luxury-green" />
                <h3 className="font-jost font-medium text-text-primary">Shipping Details</h3>
              </div>
              <div className="glass-warm rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                  <input type="text" placeholder="Last Name" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                </div>
                <input type="text" placeholder="Address" className="w-full glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                  <input type="text" placeholder="Postal Code" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div variants={staggerItem()}>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-solar-gold" />
                <h3 className="font-jost font-medium text-text-primary">Payment</h3>
              </div>
              <div className="glass-warm rounded-2xl p-6 space-y-4">
                <input type="text" placeholder="Card Number" className="w-full glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                  <input type="text" placeholder="CVC" className="glass-warm rounded-xl px-4 py-3 text-sm font-jost outline-none focus:ring-1 focus:ring-solar-gold/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:w-80"
          >
            <div className="glass-warm rounded-2xl p-6">
              <h3 className="font-cormorant text-xl text-text-primary mb-6">Order Total</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-jost text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text-primary">$112</span>
                </div>
                <div className="flex justify-between font-jost text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="text-text-primary">Free</span>
                </div>
              </div>
              <div className="border-t border-border-warm pt-4 mb-6 flex justify-between font-jost font-medium">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">$112</span>
              </div>
              <button className="w-full bg-solar-gold text-cream font-jost font-medium py-4 rounded-full hover:shadow-lg hover:shadow-solar-gold/20 transition-shadow btn-liquid">
                Place Order
              </button>
              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck className="w-4 h-4 text-luxury-green" />
                <span className="font-jost text-xs text-text-muted">Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
