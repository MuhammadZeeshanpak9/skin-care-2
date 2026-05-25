import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Start Assessment', href: '/assessment' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastScrollY.current || y < 100);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || !isHome
            ? 'glass-warm shadow-sm'
            : 'bg-transparent'
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="font-cormorant italic text-2xl text-text-primary tracking-tight"
          >
            aïaaïa
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link, i) => (
              <span key={link.label} className="flex items-center">
                <Link
                  to={link.href}
                  className={cn(
                    'font-jost text-sm tracking-wide px-4 py-2 transition-colors duration-300',
                    scrolled || !isHome
                      ? 'text-text-primary/60 hover:text-text-primary'
                      : 'text-text-primary/70 hover:text-text-primary'
                  )}
                >
                  {link.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className="text-text-light/40 text-xs mx-1">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Right side: account + cart */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'hidden sm:flex items-center gap-2 rounded-full px-4 py-2',
                scrolled || !isHome ? 'glass-warm' : 'glass-warm/50'
              )}
            >
              <Link
                to="/auth"
                className="p-1.5 text-text-primary/60 hover:text-text-primary transition-colors"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
              <span className="w-px h-4 bg-border-warm" />
              <Link
                to="/cart"
                className="p-1.5 text-text-primary/60 hover:text-text-primary transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-solar-gold text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-primary/70 hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-warm flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-cormorant text-4xl text-text-primary hover:text-solar-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center gap-6 mt-8">
              <Link to="/auth" className="flex items-center gap-2 text-text-muted">
                <User className="w-5 h-5" />
                <span className="font-jost text-sm">Account</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-2 text-text-muted">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-jost text-sm">Cart</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
