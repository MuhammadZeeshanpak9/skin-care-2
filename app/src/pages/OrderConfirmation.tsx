import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { Link } from 'react-router';
import { fadeUp } from '@/lib/animations';

export default function OrderConfirmation() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
        className="text-center max-w-lg mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-light-sage/60 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-luxury-green" />
        </motion.div>

        <h1 className="font-cormorant text-h1 text-text-primary mb-4">
          Order Confirmed
        </h1>
        <p className="font-jost font-light text-text-muted leading-relaxed mb-8">
          Thank you for your purchase! Your order has been received and is being prepared.
          You will receive a confirmation email shortly.
        </p>

        <div className="glass-warm rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-center gap-4 mb-4">
            <Package className="w-5 h-5 text-solar-gold" />
            <div>
              <p className="font-jost text-sm text-text-primary">Order #AIA-2025-004</p>
              <p className="font-jost text-xs text-text-muted">3 items · $112.00</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Truck className="w-5 h-5 text-luxury-green" />
            <div>
              <p className="font-jost text-sm text-text-primary">Estimated Delivery</p>
              <p className="font-jost text-xs text-text-muted">May 28 - June 2, 2025</p>
            </div>
          </div>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-text-primary text-cream font-jost font-medium px-8 py-4 rounded-full hover:shadow-card-lift transition-shadow"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </section>
  );
}
