import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';

const articles = [
  {
    title: 'The Science of Canola Oil in Skincare',
    category: 'INGREDIENTS',
    excerpt:
      'Discover why cold-pressed canola oil is becoming the hero ingredient in modern skincare formulations.',
    author: 'Dr. Amina Okoro',
    date: 'May 15, 2025',
    image: '/images/journal-1.jpg',
    featured: true,
  },
  {
    title: 'Understanding Your Skin Type',
    category: 'SKIN SCIENCE',
    excerpt: 'A comprehensive guide to identifying and caring for your unique skin profile.',
    author: 'Sarah Mutesi',
    date: 'May 10, 2025',
    image: '/images/journal-2.jpg',
    featured: false,
  },
  {
    title: 'Morning Rituals for Glowing Skin',
    category: 'WELLNESS',
    excerpt: 'Build a morning skincare routine that sets the tone for your entire day.',
    author: 'Jane Nakato',
    date: 'May 5, 2025',
    image: '/images/journal-3.jpg',
    featured: false,
  },
];

export default function Journal() {
  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured);

  return (
    <section className="relative py-24 lg:py-32 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp()}
          className="mb-16"
        >
          <span className="font-cormorant italic text-lg text-cream/60 block mb-2">
            from the
          </span>
          <h2 className="font-jost font-black text-4xl lg:text-5xl text-cream uppercase tracking-tight">
            JOURNAL
          </h2>
        </motion.div>

        {/* Cards layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.12)}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Featured card */}
          {featured && (
            <motion.div
              variants={staggerItem()}
              className="lg:w-[60%] glass-dark rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-panel via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <Badge variant="dark" className="mb-4">
                  {featured.category}
                </Badge>
                <h3 className="font-cormorant text-2xl lg:text-3xl text-cream mb-3 group-hover:text-solar-gold transition-colors">
                  {featured.title}
                </h3>
                <p className="font-jost font-light text-sm text-cream/60 leading-relaxed mb-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-jost text-xs text-cream/40">
                    {featured.author} · {featured.date}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cream/40 group-hover:text-solar-gold group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Smaller cards */}
          <div className="lg:w-[40%] flex flex-col gap-6">
            {others.map((article) => (
              <motion.div
                key={article.title}
                variants={staggerItem()}
                className="glass-dark rounded-3xl overflow-hidden group cursor-pointer flex-1"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-panel via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <Badge variant="dark" className="mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="font-cormorant text-xl text-cream mb-2 group-hover:text-solar-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-jost font-light text-xs text-cream/60 leading-relaxed mb-3">
                    {article.excerpt}
                  </p>
                  <span className="font-jost text-xs text-cream/40">
                    {article.author} · {article.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
