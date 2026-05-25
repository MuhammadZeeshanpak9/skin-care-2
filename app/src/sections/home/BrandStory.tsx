import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Overline } from '@/components/ui/typography';
import { fadeUp } from '@/lib/animations';

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F6EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Image */}
          <motion.div
            style={{ y: imageY }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden glass-gold relative">
              <img
                src="/images/brand-story.jpg"
                alt="African botanical farm"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Decorative frames */}
              <div className="absolute top-8 left-8 right-8 bottom-8 border border-white/20 rounded-2xl" />
              <div className="absolute top-12 left-12 right-12 bottom-12 border border-white/10 rounded-xl" />
            </div>
          </motion.div>

          {/* Right: Editorial text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
            className="w-full lg:w-1/2"
          >
            <Overline className="text-text-light mb-4">OUR MISSION</Overline>

            <h2 className="font-cormorant text-h2 text-text-primary mb-6">
              Rooted in Africa,{' '}
              <em className="font-cormorant italic">Crafted for You</em>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-jost font-light text-base text-text-muted leading-relaxed">
                aïaaïa was born from a simple belief: that the purest skincare comes from the earth.
                We journey across East Africa — from the rolling hills of Uganda to the vibrant
                markets of Nigeria — to source the most potent botanical ingredients nature has to offer.
              </p>
              <p className="font-jost font-light text-base text-text-muted leading-relaxed">
                Each product in our collection is a testament to the healing power of African flora.
                Our formulations combine centuries of traditional wisdom with modern clinical science,
                creating skincare that is both effective and deeply connected to its origins.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-solar-gold/40 pl-6">
              <p className="font-cormorant italic text-xl text-text-primary leading-relaxed">
                "We don't just make skincare. We preserve a legacy of botanical wisdom
                and share it with the world."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
