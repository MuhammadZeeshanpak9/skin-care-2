import { motion } from 'framer-motion';

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#FFFDFB]">
      {/* 
        Ultra-Premium Fluid Aurora Effect 
        Created using massive, blurred, slow-moving orbs. 
        CSS filters are hardware accelerated and perfectly smooth.
      */}
      <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply filter blur-[100px] sm:blur-[140px] lg:blur-[200px]">
        
        {/* Orb 1: Warm Champagne / Gold */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E8D7B8]"
          animate={{
            x: ['0vw', '20vw', '-10vw', '0vw'],
            y: ['0vh', '15vh', '-5vh', '0vh'],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Orb 2: Soft Rose / Blush */}
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#E6D0D2]"
          animate={{
            x: ['0vw', '-30vw', '10vw', '0vw'],
            y: ['0vh', '-20vh', '10vh', '0vh'],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Orb 3: Very Subtle Sage / Botanical Green */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#DCE3DD]"
          animate={{
            x: ['0vw', '-15vw', '20vw', '0vw'],
            y: ['0vh', '30vh', '-10vh', '0vh'],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Orb 4: Deep Mauve / Contrast Glow */}
        <motion.div
          className="absolute bottom-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#DFD2D2] opacity-80"
          animate={{
            x: ['0vw', '25vw', '-20vw', '0vw'],
            y: ['0vh', '-15vh', '20vh', '0vh'],
            scale: [1, 1.1, 0.8, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Luxury Noise / Grain Texture (Subtle) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
