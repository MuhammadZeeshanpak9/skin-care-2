import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const menuItems = [
  { icon: Package, label: 'My Orders', desc: 'View order history' },
  { icon: Heart, label: 'Wishlist', desc: 'Saved products' },
  { icon: Settings, label: 'Settings', desc: 'Account preferences' },
  { icon: LogOut, label: 'Sign Out', desc: 'Log out of your account' },
];

export default function Account() {
  return (
    <section className="pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="mb-10">
          <h1 className="font-cormorant text-h1 text-text-primary mb-2">My Account</h1>
          <p className="font-jost font-light text-text-muted">Manage your profile and orders</p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-warm rounded-2xl p-6 flex items-center gap-4 mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-light-sage/60 flex items-center justify-center">
            <User className="w-7 h-7 text-luxury-green" />
          </div>
          <div>
            <h3 className="font-jost font-medium text-text-primary">Guest User</h3>
            <p className="font-jost text-sm text-text-muted">guest@aiaaia.com</p>
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08)}
          className="space-y-3"
        >
          {menuItems.map(item => (
            <motion.button
              key={item.label}
              variants={staggerItem()}
              className="w-full glass-warm rounded-2xl p-5 flex items-center gap-4 text-left hover:shadow-card-lift transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-light-sage/40 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-luxury-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-jost font-medium text-sm text-text-primary">{item.label}</h4>
                <p className="font-jost text-xs text-text-muted">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
