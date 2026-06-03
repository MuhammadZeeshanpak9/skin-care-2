import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Overline } from '@/components/ui/typography';
import { fadeUp } from '@/lib/animations';

const ingredients = [
  {
    name: 'Canola',
    origin: 'EAST AFRICA',
    description:
      'Rich in omega fatty acids, canola oil provides deep nourishment and helps strengthen the skin\'s natural barrier. Our cold-pressed canola is sourced from sustainable farms in Uganda.',
    image: '/images/ingredient-canola.jpg',
    textColor: 'text-rose',
  },
  {
    name: 'Hibiscus',
    origin: 'NIGERIA & GHANA',
    description:
      'Known as the "Botox plant," hibiscus delivers natural exfoliation and radiance. Its AHAs gently resurface skin while antioxidants protect against environmental stressors.',
    image: '/images/ingredient-hibiscus.jpg',
    textColor: 'text-luxury-green',
  },
  {
    name: 'Moringa',
    origin: 'KENYA',
    description:
      'A powerhouse of antioxidants and vitamins A, C, and E. Moringa protects skin from free radical damage while its anti-inflammatory properties soothe and calm irritated skin.',
    image: '/images/ingredient-moringa.jpg',
    textColor: 'text-solar-gold',
  },
  {
    name: 'Black Seed',
    origin: 'ETHIOPIA',
    description:
      'Revered since ancient times for its healing properties, black seed oil clarifies and balances skin. Its thymoquinone content promotes clear, healthy-looking complexion.',
    image: '/images/ingredient-blackseed.jpg',
    textColor: 'text-deep-green',
  },
];

function IngredientCard({
  ingredient,
  index,
}: {
  ingredient: (typeof ingredients)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp(index * 0.15)}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-20 last:mb-0 ${
        isLeft ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Image block */}
      <div
        className={`w-full lg:w-[55%] relative ${
          isLeft ? 'lg:-mr-12' : 'lg:-ml-12'
        }`}
      >
        <div className="rounded-3xl aspect-[4/3] relative overflow-hidden glass-gold">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Decorative overlay */}
          <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full border border-white/10" />
        </div>
      </div>

      {/* Text block */}
      <div className={`w-full lg:w-[45%] ${isLeft ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <span className="overline text-text-light block mb-3">
          {ingredient.origin}
        </span>
        <h3 className="font-cormorant font-light italic text-5xl lg:text-6xl text-text-primary mb-4">
          {ingredient.name}
        </h3>
        <p className="font-jost font-light text-base text-text-muted leading-relaxed mb-6">
          {ingredient.description}
        </p>
        <Link
          to={`/products?ingredient=${ingredient.name.toLowerCase()}`}
          className={`inline-flex items-center gap-2 font-jost text-sm ${ingredient.textColor} hover:opacity-70 transition-opacity`}
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Ingredients() {
  return (
    <section className="relative py-24 lg:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp()}
          className="text-center mb-20"
        >
          <Overline className="text-text-light mb-4">BOTANICAL POWER</Overline>
          <h2 className="font-cormorant text-h2 text-text-primary">
            Super <em className="font-cormorant italic">Ingredients</em>
          </h2>
        </motion.div>

        {/* Asymmetric ingredient blocks */}
        {ingredients.map((ingredient, index) => (
          <IngredientCard key={ingredient.name} ingredient={ingredient} index={index} />
        ))}
      </div>
    </section>
  );
}
