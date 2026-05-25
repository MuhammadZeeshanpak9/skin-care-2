import { Link } from 'react-router';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const footerLinks = {
  explore: [
    { label: 'Shop All', href: '/products' },
    { label: 'Boutique', href: '/boutique' },
    { label: 'Skin Assessment', href: '/assessment' },
    { label: 'Journal', href: '/journal' },
  ],
  clientCare: [
    { label: 'Contact Us', href: '#' },
    { label: 'Shipping & Returns', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Track Order', href: '#' },
  ],
  ingredients: [
    { label: 'Canola', href: '#' },
    { label: 'Hibiscus', href: '#' },
    { label: 'Moringa', href: '#' },
    { label: 'Black Seed', href: '#' },
  ],
  join: [
    { label: 'Inner Circle', href: '#' },
    { label: 'Wholesale', href: '#' },
    { label: 'Affiliates', href: '#' },
    { label: 'Careers', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-panel overflow-hidden">
      {/* Botanical floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 20 + Math.random() * 40,
              height: 20 + Math.random() * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(199,167,106,0.15) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative glass-dark mx-4 sm:mx-6 lg:mx-10 rounded-t-3xl mt-20">
        <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          {/* Top: Logo + tagline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
            className="text-center mb-16"
          >
            <Link to="/" className="font-cormorant italic text-4xl text-cream inline-block mb-4">
              aïaaïa
            </Link>
            <p className="font-jost font-light text-cream/50 text-sm tracking-wide">
              Discover Your Skin Story
            </p>
          </motion.div>

          {/* Columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16"
          >
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={staggerItem()}>
                <h4 className="font-jost font-medium text-xs uppercase tracking-[0.15em] text-cream/40 mb-6">
                  {category === 'join' ? 'Join Inner Circle' : category === 'clientCare' ? 'Client Care' : category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="font-jost font-light text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 max-w-lg mx-auto"
          >
            <div className="glass-dark rounded-full flex-1 flex items-center w-full px-6 py-3 border border-solar-gold/20">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent flex-1 text-sm font-jost text-cream placeholder:text-cream/30 outline-none"
              />
            </div>
            <button className="bg-solar-gold text-cream font-jost font-medium text-sm px-6 py-3 rounded-full hover:bg-solar-gold/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
            className="flex justify-center gap-4 mb-12"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="glass-dark rounded-full w-10 h-10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-solar-gold/30 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-jost text-xs text-cream/30">
              © 2025 aïaaïa. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="font-jost text-xs text-cream/30 hover:text-cream/60 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="font-jost text-xs text-cream/30 hover:text-cream/60 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="font-jost text-xs text-cream/30 hover:text-cream/60 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
