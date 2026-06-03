import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollFlower() {
  const { scrollYProgress } = useScroll();

  // The flower rotates continuously as you scroll down
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // The flower subtly scales/breathes as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  // Opacity adjustments: maybe fade out slightly when reaching the footer
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.15, 0.15, 0.05]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden mix-blend-multiply">
      <motion.div
        style={{ rotate, scale, opacity }}
        className="relative w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] lg:w-[100vw] lg:h-[100vw] text-solar-gold/20 flex items-center justify-center"
      >
        {/* Intricate Geometric Botanical Mandala SVG */}
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(400, 400)" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Outer rings */}
            <circle r="380" strokeDasharray="4 8" opacity="0.3" />
            <circle r="360" strokeDasharray="1 15" strokeWidth="3" opacity="0.4" />
            <circle r="340" opacity="0.15" />

            {/* 16-petal outer layer */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <path
                  key={`outer-${i}`}
                  d="M0,0 Q120,-300 0,-340 Q-120,-300 0,0"
                  transform={`rotate(${angle})`}
                  opacity="0.3"
                />
              );
            })}

            {/* 8-petal mid layer */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5; // offset
              return (
                <g key={`mid-${i}`} transform={`rotate(${angle})`}>
                  <path
                    d="M0,0 Q80,-200 0,-260 Q-80,-200 0,0"
                    opacity="0.5"
                  />
                  {/* Internal leaf vein */}
                  <line x1="0" y1="0" x2="0" y2="-250" opacity="0.4" strokeDasharray="5 5" />
                </g>
              );
            })}

            {/* 12-petal inner detailed layer */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <path
                  key={`inner-${i}`}
                  d="M0,0 Q40,-120 0,-160 Q-40,-120 0,0"
                  transform={`rotate(${angle})`}
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}

            {/* Center Core */}
            <circle r="60" strokeDasharray="2 4" strokeWidth="2" opacity="0.7" />
            <circle r="40" opacity="0.5" />
            <circle r="20" fill="currentColor" opacity="0.2" />

            {/* Expanding radiant lines */}
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i * 360) / 32;
              return (
                <line
                  key={`ray-${i}`}
                  x1="0"
                  y1="-65"
                  x2="0"
                  y2="-90"
                  transform={`rotate(${angle})`}
                  opacity="0.4"
                />
              );
            })}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
