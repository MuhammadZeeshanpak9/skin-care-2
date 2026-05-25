import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Users, BarChart3, Settings } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const stats = [
  { label: 'Total Orders', value: '1,248', change: '+12%' },
  { label: 'Revenue', value: '$48,520', change: '+8%' },
  { label: 'Customers', value: '3,642', change: '+15%' },
  { label: 'Products', value: '86', change: '+3' },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'Products' },
  { icon: Users, label: 'Customers' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export default function Admin() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-56 flex-shrink-0"
          >
            <div className="glass-warm rounded-2xl p-4">
              <div className="flex items-center gap-3 px-3 py-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-solar-gold/20 flex items-center justify-center">
                  <span className="font-cormorant italic text-sm text-solar-gold">a</span>
                </div>
                <span className="font-jost font-medium text-sm text-text-primary">Admin</span>
              </div>
              <nav className="space-y-1">
                {sidebarItems.map(item => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-jost text-sm transition-colors ${
                      item.active
                        ? 'bg-text-primary text-cream'
                        : 'text-text-muted hover:text-text-primary hover:bg-champagne/20'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main */}
          <div className="flex-1">
            <motion.div initial="hidden" animate="visible" variants={fadeUp()} className="mb-8">
              <h1 className="font-cormorant text-h1 text-text-primary">Dashboard</h1>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.08)}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem()}
                  className="glass-warm rounded-2xl p-5"
                >
                  <p className="font-jost text-xs text-text-muted mb-1">{stat.label}</p>
                  <p className="font-jost font-semibold text-xl text-text-primary">{stat.value}</p>
                  <span className="font-jost text-xs text-luxury-green">{stat.change}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent orders placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-warm rounded-2xl p-6"
            >
              <h3 className="font-jost font-medium text-text-primary mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {['#AIA-2025-001', '#AIA-2025-002', '#AIA-2025-003'].map((order, i) => (
                  <div
                    key={order}
                    className="flex items-center justify-between py-3 border-b border-border-soft last:border-0"
                  >
                    <div>
                      <p className="font-jost text-sm text-text-primary">{order}</p>
                      <p className="font-jost text-xs text-text-muted">May {20 - i}, 2025</p>
                    </div>
                    <span className="font-jost text-xs px-3 py-1 rounded-full bg-light-sage/40 text-luxury-green">
                      Processing
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
