import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Start Assessment', href: '/assessment' },
];

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const rafPending = useRef(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        setVisible(y < lastScrollY.current || y < 100);
        lastScrollY.current = y;
        rafPending.current = false;
      });
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full',
          scrolled || !isHome
            ? 'glass-warm shadow-sm py-2 lg:py-3'
            : 'bg-transparent py-4 lg:py-6'
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="w-full mx-auto flex items-center justify-between px-6 sm:px-12 lg:px-20">
          {/* Animated Logo */}
          <Link
            to="/"
            className="group relative font-cormorant italic text-3xl text-deep-mauve tracking-tight outline-none"
          >
            <motion.span
              className="inline-block transition-transform duration-500 group-hover:scale-105"
            >
              aïaaïa
            </motion.span>
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-[1px] bg-deep-mauve transition-all duration-500 group-hover:w-full opacity-50"
            />
          </Link>

          {/* Desktop Nav */}
          <div 
            className="hidden lg:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, i) => (
              <div 
                key={link.label} 
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    'relative z-10 block font-jost text-[15px] tracking-[0.05em] px-5 py-2.5 transition-colors duration-300',
                    (scrolled || !isHome)
                      ? 'text-text-primary/70 hover:text-deep-mauve'
                      : 'text-text-primary/80 hover:text-deep-mauve'
                  )}
                >
                  {link.label}
                </Link>
                
                {/* Framer Motion Shared Layout Animation for Hover State (Crystal Effect) */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 backdrop-blur-md z-0"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right side: account + cart */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'hidden sm:flex items-center gap-3 rounded-full px-5 py-2.5 transition-all duration-300 border border-transparent hover:border-dusty-rose/30',
                scrolled || !isHome ? 'glass-warm shadow-sm' : 'bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
              )}
            >
              <Link
                to="/auth"
                className="text-text-primary/70 hover:text-deep-mauve transition-colors"
                aria-label="Account"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
              <span className="w-px h-4 bg-text-primary/10" />
              <Link
                to="/cart"
                className="text-text-primary/70 hover:text-deep-mauve transition-colors relative group"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-deep-mauve text-cream text-[9px] font-medium rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-primary/70 hover:text-deep-mauve transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
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
                  className="font-cormorant text-4xl text-text-primary hover:text-deep-mauve transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center gap-8 mt-10">
              <Link to="/auth" className="flex items-center gap-2 text-text-primary/70 hover:text-deep-mauve transition-colors">
                <User className="w-5 h-5" />
                <span className="font-jost text-sm uppercase tracking-widest">Account</span>
              </Link>
              <Link to="/cart" className="flex items-center gap-2 text-text-primary/70 hover:text-deep-mauve transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-jost text-sm uppercase tracking-widest">Cart</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
