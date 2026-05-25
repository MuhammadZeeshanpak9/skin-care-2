import { useEffect, useRef, useCallback } from 'react';

/* ───────────── Types ───────────── */
interface Flower {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  sway: number;
  swaySpeed: number;
  swayAmp: number;
  type: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  hasGlow: boolean;
}

interface RiverLine {
  points: { x: number; y: number }[];
  speed: number;
  opacity: number;
  width: number;
  dashOffset: number;
  shimmerPositions: number[];
}

/* ───────────── Constants ───────────── */
const FLOWER_COLORS = ['#D9B6AA', '#F6EFE6', '#C4817A', '#7C9A78', '#E8D7B8'];
const PARTICLE_COLORS = ['#C7A76A', '#E8D7B8', '#FFFFFF'];
const FLOWER_COUNT = 28;
const PARTICLE_COUNT = 50;
const RIVER_LINE_COUNT = 10;

/* ───────────── SVG Flower Paths ───────────── */
const FLOWER_PATHS = [
  // Cherry blossom petal (5 petals)
  (s: number) => {
    const r = s / 2;
    return `M0,${-r} C${r*0.6},${-r} ${r},${-r*0.6} ${r},0 C${r},${r*0.6} ${r*0.6},${r} 0,${r} C${-r*0.6},${r} ${-r},${r*0.6} ${-r},0 C${-r},${-r*0.6} ${-r*0.6},${-r} 0,${-r} Z`;
  },
  // Daisy (8 petals radiating)
  (s: number) => {
    const r = s / 2;
    let d = '';
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const x1 = Math.cos(angle) * r * 0.3;
      const y1 = Math.sin(angle) * r * 0.3;
      const x2 = Math.cos(angle) * r;
      const y2 = Math.sin(angle) * r;
      const nx = -Math.sin(angle) * r * 0.25;
      const ny = Math.cos(angle) * r * 0.25;
      d += `M${x1},${y1} Q${x2+nx},${y2+ny} ${x2},${y2} Q${x2-nx},${y2-ny} ${x1},${y1} `;
    }
    return d + `M0,0 m-${r*0.15},0 a${r*0.15},${r*0.15} 0 1,0 ${r*0.3},0 a${r*0.15},${r*0.15} 0 1,0 -${r*0.3},0`;
  },
  // Hibiscus petal (5 pointed petals)
  (s: number) => {
    const r = s / 2;
    let d = '';
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const innerR = r * 0.2;
      const outerR = r;
      const midR = r * 0.7;
      const x1 = Math.cos(angle) * innerR;
      const y1 = Math.sin(angle) * innerR;
      const x2 = Math.cos(angle - 0.3) * midR;
      const y2 = Math.sin(angle - 0.3) * midR;
      const x3 = Math.cos(angle) * outerR;
      const y3 = Math.sin(angle) * outerR;
      const x4 = Math.cos(angle + 0.3) * midR;
      const y4 = Math.sin(angle + 0.3) * midR;
      d += `M${x1},${y1} Q${x2},${y2} ${x3},${y3} Q${x4},${y4} ${x1},${y1} `;
    }
    return d;
  },
  // Leaf shape
  (s: number) => {
    const r = s / 2;
    return `M0,${-r} C${r*0.5},${-r*0.5} ${r},0 ${r*0.3},${r*0.5} C${r*0.1},${r*0.7} ${-r*0.1},${r*0.7} ${-r*0.3},${r*0.5} C${-r},0 ${-r*0.5},${-r*0.5} 0,${-r} Z`;
  },
  // Jasmine (small 6-petal)
  (s: number) => {
    const r = s / 2;
    let d = '';
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const cx = Math.cos(angle) * r * 0.5;
      const cy = Math.sin(angle) * r * 0.5;
      d += `M${cx},${cy} m0,${-r*0.3} a${r*0.25},${r*0.3} 0 1,0 0,${r*0.6} a${r*0.25},${r*0.3} 0 1,0 0,${-r*0.6} `;
    }
    return d;
  },
];

/* ───────────── Component ───────────── */
export default function BackgroundEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const riverLinesRef = useRef<RiverLine[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  /* ── Initialize flowers ── */
  const initFlowers = useCallback(() => {
    const flowers: Flower[] = [];
    for (let i = 0; i < FLOWER_COUNT; i++) {
      flowers.push({
        x: Math.random() * 100,
        y: Math.random() * 120,
        size: 8 + Math.random() * 24,
        speed: 8 + Math.random() * 12,
        opacity: 0.35 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 40,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.5 + Math.random() * 1.5,
        swayAmp: 10 + Math.random() * 20,
        type: Math.floor(Math.random() * FLOWER_PATHS.length),
        color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
      });
    }
    flowersRef.current = flowers;
  }, []);

  /* ── Initialize particles ── */
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const size = 2 + Math.random() * 4;
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 110,
        size,
        speed: 6 + Math.random() * 12,
        opacity: 0.4 + Math.random() * 0.45,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 1.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        hasGlow: size > 3.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  /* ── Initialize river lines ── */
  const initRiverLines = useCallback(() => {
    const lines: RiverLine[] = [];
    for (let i = 0; i < RIVER_LINE_COUNT; i++) {
      const points: { x: number; y: number }[] = [];
      const segments = 8;
      const startX = -10 + Math.random() * 20;
      const startY = -5 + (i / RIVER_LINE_COUNT) * 110;
      for (let j = 0; j <= segments; j++) {
        points.push({
          x: startX + (j / segments) * 120,
          y: startY + Math.sin(j * 0.8 + i) * 15 + Math.random() * 8,
        });
      }
      lines.push({
        points,
        speed: 4 + Math.random() * 8,
        opacity: 0.2 + Math.random() * 0.25,
        width: 1 + Math.random() * 2,
        dashOffset: Math.random() * 1000,
        shimmerPositions: Array.from({ length: 3 }, () => Math.random()),
      });
    }
    riverLinesRef.current = lines;
  }, []);

  /* ── Main animation loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    initFlowers();
    initParticles();
    initRiverLines();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isVisible) return;

      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Draw River Lines ──
      const lines = riverLinesRef.current;
      for (const line of lines) {
        if (prefersReducedMotion) {
          line.dashOffset = 0;
        } else {
          line.dashOffset += line.speed * 0.5;
        }

        ctx.save();
        ctx.globalAlpha = prefersReducedMotion ? line.opacity * 0.3 : line.opacity;
        ctx.strokeStyle = '#DCE9E4';
        ctx.lineWidth = line.width;
        ctx.setLineDash([20, 30, 10, 40]);
        ctx.lineDashOffset = -line.dashOffset;
        ctx.lineCap = 'round';

        ctx.beginPath();
        const pts = line.points;
        ctx.moveTo((pts[0].x / 100) * w, (pts[0].y / 100) * h);
        for (let j = 1; j < pts.length; j++) {
          const prev = pts[j - 1];
          const curr = pts[j];
          const cpx = ((prev.x + curr.x) / 2 / 100) * w;
          const cpy = ((prev.y + curr.y) / 2 / 100) * h;
          const endX = (curr.x / 100) * w;
          const endY = (curr.y / 100) * h;
          ctx.quadraticCurveTo(cpx, cpy, endX, endY);
        }
        ctx.stroke();

        // Shimmer highlights
        if (!prefersReducedMotion) {
          for (const sp of line.shimmerPositions) {
            const shimmerPhase = (t * line.speed * 0.1 + sp * 10) % 1;
            if (shimmerPhase < 0.3) {
              const shimmerIdx = Math.floor(sp * (pts.length - 1));
              const pt = pts[Math.min(shimmerIdx, pts.length - 1)];
              const sx = (pt.x / 100) * w + Math.sin(t + sp * 10) * 20;
              const sy = (pt.y / 100) * h;
              const shimmerOpacity = (1 - shimmerPhase / 0.3) * 0.4;
              ctx.globalAlpha = shimmerOpacity;
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = line.width * 1.5;
              ctx.setLineDash([5, 80]);
              ctx.lineDashOffset = -line.dashOffset + shimmerPhase * 100;
              ctx.beginPath();
              ctx.moveTo(sx - 30, sy);
              ctx.lineTo(sx + 30, sy);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // ── Draw Particles ──
      const particles = particlesRef.current;
      for (const p of particles) {
        const speedMult = prefersReducedMotion ? 0 : 1;
        p.y -= (p.speed * 0.005) * speedMult;
        p.drift += p.driftSpeed * 0.01;
        const x = (p.x / 100) * w + Math.sin(p.drift) * 30;
        const y = (p.y / 100) * h;

        if (p.y < -5) {
          p.y = 110;
          p.x = Math.random() * 100;
        }

        const twinkle = Math.sin(t * p.twinkleSpeed + p.twinkleOffset);
        const opacity = p.opacity * (0.5 + 0.5 * ((twinkle + 1) / 2));

        ctx.save();
        ctx.globalAlpha = prefersReducedMotion ? p.opacity * 0.3 : opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow for larger particles
        if (p.hasGlow && !prefersReducedMotion) {
          ctx.globalAlpha = opacity * 0.3;
          ctx.shadowColor = '#C7A76A';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.restore();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
    };
  }, [initFlowers, initParticles, initRiverLines]);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Layer 1: Warm gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,249,243,1) 0%, rgba(246,239,230,1) 40%, rgba(232,215,184,0.3) 70%, rgba(255,249,243,1) 100%)',
          zIndex: 0,
        }}
      />

      {/* Layer 2: River Flow (Canvas) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* Layer 3: Botanical floating flowers (SVG) */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {flowersRef.current.length === 0 &&
          // Pre-render initial flowers (will be replaced by useEffect init)
          Array.from({ length: FLOWER_COUNT }).map((_, i) => {
            const flower: Flower = {
              x: Math.random() * 100,
              y: Math.random() * 120,
              size: 8 + Math.random() * 24,
              speed: 8 + Math.random() * 12,
              opacity: 0.35 + Math.random() * 0.3,
              rotation: Math.random() * 360,
              rotSpeed: (Math.random() - 0.5) * 40,
              sway: Math.random() * Math.PI * 2,
              swaySpeed: 0.5 + Math.random() * 1.5,
              swayAmp: 10 + Math.random() * 20,
              type: i % FLOWER_PATHS.length,
              color: FLOWER_COLORS[i % FLOWER_COLORS.length],
            };
            const duration = flower.speed;
            const delay = -(Math.random() * flower.speed);
            return (
              <svg
                key={`flower-${i}`}
                className="absolute"
                style={{
                  left: `${flower.x}%`,
                  width: flower.size,
                  height: flower.size,
                  opacity: prefersReducedMotion ? flower.opacity * 0.3 : undefined,
                  animation: prefersReducedMotion
                    ? 'none'
                    : `float-up ${duration}s linear ${delay}s infinite`,
                  animationDelay: `${delay}s`,
                }}
                viewBox={`-${flower.size / 2} -${flower.size / 2} ${flower.size} ${flower.size}`}
              >
                <g
                  style={{
                    transform: `rotate(${flower.rotation}deg)`,
                    transformOrigin: 'center',
                    animation: prefersReducedMotion
                      ? 'none'
                      : `spin ${flower.speed * 2}s linear infinite`,
                  }}
                >
                  <path
                    d={FLOWER_PATHS[flower.type](flower.size)}
                    fill={flower.color}
                    opacity={flower.opacity}
                  />
                </g>
              </svg>
            );
          })}

        {/* Animated flowers after init */}
        {flowersRef.current.map((flower, i) => {
          const duration = flower.speed;
          const delay = -(Math.random() * flower.speed);
          return (
            <svg
              key={`flower-live-${i}`}
              className="absolute"
              style={{
                left: `${flower.x}%`,
                width: flower.size,
                height: flower.size,
                opacity: prefersReducedMotion ? flower.opacity * 0.3 : undefined,
                animation: prefersReducedMotion
                  ? 'none'
                  : `float-up ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
              viewBox={`-${flower.size / 2} -${flower.size / 2} ${flower.size} ${flower.size}`}
            >
              <g
                style={{
                  transform: `rotate(${flower.rotation}deg)`,
                  transformOrigin: 'center',
                  animation: prefersReducedMotion
                    ? 'none'
                    : `spin ${flower.speed * 2}s linear infinite`,
                }}
              >
                <path
                  d={FLOWER_PATHS[flower.type](flower.size)}
                  fill={flower.color}
                  opacity={flower.opacity}
                />
              </g>
            </svg>
          );
        })}
      </div>

      {/* Layer 4: Gold particles (CSS fallback + canvas overlay) */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 2 + Math.random() * 4;
          const x = Math.random() * 100;
          const duration = 6 + Math.random() * 12;
          const delay = -(Math.random() * 18);
          const hasGlow = size > 3;
          return (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                width: size,
                height: size,
                backgroundColor: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
                opacity: prefersReducedMotion ? 0.12 : undefined,
                boxShadow: hasGlow && !prefersReducedMotion
                  ? '0 0 6px 2px rgba(199,167,106,0.5)'
                  : 'none',
                animation: prefersReducedMotion
                  ? 'none'
                  : `float-particle ${duration}s linear ${delay}s infinite, twinkle ${2 + Math.random()}s ease-in-out ${Math.random() * 2}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Layer 5: Linen texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.025,
          mixBlendMode: 'multiply',
          zIndex: 4,
        }}
      />
    </div>
  );
}
