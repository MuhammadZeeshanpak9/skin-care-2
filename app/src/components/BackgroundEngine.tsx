import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Petal3D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  tilt: number;      // simulates 3D perspective tilt
  tiltSpeed: number;
  opacity: number;
  color: string;
  highlightColor: string;
  shadowColor: string;
  layer: number;
}

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: number;
}

/* ─────────────────────────────────────────
   Molecule Shapes
───────────────────────────────────────── */
const SHAPES = [
  { nodes: [[0, 0], [0, -1], [0.866, 0.5], [-0.866, 0.5]] as [number, number][], edges: [[0,1],[0,2],[0,3]] as [number,number][] },
  { nodes: [[-1, 0.15], [0, -0.15], [1, 0.15]] as [number, number][], edges: [[0,1],[1,2]] as [number,number][] },
  { nodes: [[0, 0]] as [number, number][], edges: [] as [number, number][] },
];

/* ─────────────────────────────────────────
   3D Petal Colors (warm skin tones + subtle pink accents)
───────────────────────────────────────── */
const PETAL_PALETTES = [
  { body: 'rgba(210,180,160,', hl: 'rgba(245,235,225,', sh: 'rgba(180,150,130,' }, // warm skin
  { body: 'rgba(200,170,150,', hl: 'rgba(240,228,218,', sh: 'rgba(170,140,120,' }, // deeper skin
  { body: 'rgba(220,185,170,', hl: 'rgba(250,240,232,', sh: 'rgba(190,158,140,' }, // rosy skin
  { body: 'rgba(215,160,165,', hl: 'rgba(245,220,222,', sh: 'rgba(185,130,135,' }, // subtle pink accent
  { body: 'rgba(195,175,155,', hl: 'rgba(235,225,215,', sh: 'rgba(165,145,125,' }, // sand
];

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const rnd = () => Math.random();
const rndR = (a: number, b: number) => a + rnd() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];

const PETAL_COUNT = 22;
const MOL_COUNT = 8; // Very few molecules, subtle

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function BackgroundEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal3D[]>([]);
  const molsRef = useRef<Molecule[]>([]);
  const rafRef = useRef(0);
  const visRef = useRef(true);
  const tRef = useRef(0);

  const initPetals = useCallback((w: number, h: number) => {
    petalsRef.current = Array.from({ length: PETAL_COUNT }, (_, i) => {
      const layer = i % 3;
      const sizeMult = [0.8, 1.5, 2.5][layer];
      const palette = pick(PETAL_PALETTES);
      return {
        x: rnd() * w,
        y: rnd() * h,
        vx: rndR(-0.3, 0.3),
        vy: -rndR(0.15, 0.5) * [0.4, 0.8, 1.2][layer],
        size: rndR(15, 30) * sizeMult,
        rotation: rnd() * Math.PI * 2,
        rotSpeed: rndR(-0.012, 0.012),
        tilt: rnd() * Math.PI * 2,
        tiltSpeed: rndR(0.008, 0.025),
        opacity: [0.4, 0.85, 0.7][layer], // highly visible
        color: palette.body,
        highlightColor: palette.hl,
        shadowColor: palette.sh,
        layer,
      };
    });
  }, []);

  const initMols = useCallback((w: number, h: number) => {
    molsRef.current = Array.from({ length: MOL_COUNT }, () => ({
      x: rnd() * w,
      y: rnd() * h,
      vx: rndR(-0.15, 0.15),
      vy: rndR(-0.25, -0.05),
      scale: rndR(14, 28),
      rotation: rnd() * Math.PI * 2,
      rotSpeed: rndR(-0.005, 0.005),
      opacity: rndR(0.08, 0.18),
      type: Math.floor(rnd() * SHAPES.length),
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPetals(canvas.width, canvas.height);
      initMols(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onVis = () => { visRef.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVis);

    /* ─── Draw a Rose Petal (curled, layered, realistic) ─── */
    const drawRosePetal = (x: number, y: number, r: number, rot: number, tilt: number, p: Petal3D) => {
      const squeeze = Math.abs(Math.cos(tilt));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(Math.max(squeeze, 0.2), 1);

      // Drop shadow
      ctx.beginPath();
      ctx.ellipse(r * 0.06, r * 0.12, r * 0.55, r * 0.9, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.shadowColor + (p.opacity * 0.15) + ')';
      ctx.fill();

      // Main petal shape — wide, cupped, like a real rose petal
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.65, -r * 0.75, r * 0.85, -r * 0.2, r * 0.7, r * 0.25);
      ctx.bezierCurveTo(r * 0.55, r * 0.55, r * 0.2, r * 0.75, 0, r * 0.8);
      ctx.bezierCurveTo(-r * 0.2, r * 0.75, -r * 0.55, r * 0.55, -r * 0.7, r * 0.25);
      ctx.bezierCurveTo(-r * 0.85, -r * 0.2, -r * 0.65, -r * 0.75, 0, -r);
      const grd = ctx.createRadialGradient(0, -r * 0.2, 0, 0, 0, r * 1.1);
      grd.addColorStop(0, p.highlightColor + (p.opacity * 0.95) + ')');
      grd.addColorStop(0.35, p.color + (p.opacity * 0.75) + ')');
      grd.addColorStop(0.7, p.color + (p.opacity * 0.55) + ')');
      grd.addColorStop(1, p.shadowColor + (p.opacity * 0.35) + ')');
      ctx.fillStyle = grd;
      ctx.fill();

      // Soft edge outline
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = p.shadowColor + (p.opacity * 0.4) + ')';
      ctx.stroke();

      // Inner curl shadow (gives 3D cupped look)
      ctx.beginPath();
      ctx.moveTo(-r * 0.15, -r * 0.3);
      ctx.bezierCurveTo(r * 0.3, -r * 0.1, r * 0.35, r * 0.3, 0, r * 0.5);
      ctx.bezierCurveTo(-r * 0.35, r * 0.3, -r * 0.3, -r * 0.1, -r * 0.15, -r * 0.3);
      ctx.fillStyle = p.shadowColor + (p.opacity * 0.12) + ')';
      ctx.fill();

      // Central vein + branching veins
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = p.shadowColor + (p.opacity * 0.4) + ')';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.85);
      ctx.quadraticCurveTo(0, 0, 0, r * 0.65);
      ctx.stroke();
      // Side veins
      for (let v = 0; v < 4; v++) {
        const yPos = -r * 0.5 + v * r * 0.3;
        const spread = r * (0.15 + v * 0.08);
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.quadraticCurveTo(spread * 0.6, yPos - r * 0.05, spread, yPos + r * 0.06);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.quadraticCurveTo(-spread * 0.6, yPos - r * 0.05, -spread, yPos + r * 0.06);
        ctx.stroke();
      }

      // Top gloss highlight
      ctx.beginPath();
      ctx.ellipse(r * 0.05, -r * 0.55, r * 0.22, r * 0.12, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = p.highlightColor + (p.opacity * 0.6) + ')';
      ctx.fill();

      ctx.restore();
    };

    /* ─── Draw a Cherry Blossom (5 petals + center) ─── */
    const drawCherryBlossom = (x: number, y: number, r: number, rot: number, tilt: number, p: Petal3D) => {
      const squeeze = Math.abs(Math.cos(tilt));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(Math.max(squeeze, 0.25), 1);

      const petalR = r * 0.65;
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * r * 0.35;
        const py = Math.sin(angle) * r * 0.35;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle + Math.PI / 2);

        // Petal shape — rounded with notch at tip (iconic cherry blossom)
        ctx.beginPath();
        ctx.moveTo(0, petalR * 0.1);
        ctx.bezierCurveTo(petalR * 0.45, petalR * 0.05, petalR * 0.5, -petalR * 0.5, petalR * 0.12, -petalR);
        ctx.lineTo(0, -petalR * 0.85); // Notch
        ctx.lineTo(-petalR * 0.12, -petalR);
        ctx.bezierCurveTo(-petalR * 0.5, -petalR * 0.5, -petalR * 0.45, petalR * 0.05, 0, petalR * 0.1);

        const grd = ctx.createLinearGradient(0, petalR * 0.1, 0, -petalR);
        grd.addColorStop(0, p.color + (p.opacity * 0.8) + ')');
        grd.addColorStop(0.5, p.highlightColor + (p.opacity * 0.7) + ')');
        grd.addColorStop(1, p.highlightColor + (p.opacity * 0.9) + ')');
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = p.shadowColor + (p.opacity * 0.3) + ')';
        ctx.stroke();

        // Petal vein
        ctx.beginPath();
        ctx.moveTo(0, petalR * 0.05);
        ctx.lineTo(0, -petalR * 0.8);
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = p.shadowColor + (p.opacity * 0.3) + ')';
        ctx.stroke();

        ctx.restore();
      }

      // Center stamens (tiny dots)
      for (let s = 0; s < 6; s++) {
        const sa = (s / 6) * Math.PI * 2;
        const sr = r * 0.12;
        const sx = Math.cos(sa) * sr;
        const sy = Math.sin(sa) * sr;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,167,106,${p.opacity * 0.8})`;
        ctx.fill();
      }
      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.06, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,150,100,${p.opacity * 0.7})`;
      ctx.fill();

      ctx.restore();
    };

    /* ─── Draw a single loose petal (like fallen from a flower) ─── */
    const drawLoosePetal = (x: number, y: number, r: number, rot: number, tilt: number, p: Petal3D) => {
      const squeeze = Math.abs(Math.cos(tilt));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(Math.max(squeeze, 0.2), 1);

      // Rounded petal with gentle curl
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.55, -r * 0.8, r * 0.75, -r * 0.15, r * 0.5, r * 0.35);
      ctx.bezierCurveTo(r * 0.3, r * 0.65, r * 0.1, r * 0.8, 0, r * 0.85);
      ctx.bezierCurveTo(-r * 0.1, r * 0.8, -r * 0.3, r * 0.65, -r * 0.5, r * 0.35);
      ctx.bezierCurveTo(-r * 0.75, -r * 0.15, -r * 0.55, -r * 0.8, 0, -r);
      const grd = ctx.createLinearGradient(-r * 0.3, -r, r * 0.3, r * 0.85);
      grd.addColorStop(0, p.highlightColor + (p.opacity * 0.9) + ')');
      grd.addColorStop(0.3, p.color + (p.opacity * 0.7) + ')');
      grd.addColorStop(0.7, p.color + (p.opacity * 0.6) + ')');
      grd.addColorStop(1, p.shadowColor + (p.opacity * 0.4) + ')');
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = p.shadowColor + (p.opacity * 0.3) + ')';
      ctx.stroke();

      // Central vein (curved)
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.9);
      ctx.quadraticCurveTo(r * 0.05, 0, 0, r * 0.75);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = p.shadowColor + (p.opacity * 0.4) + ')';
      ctx.stroke();

      // 3 side veins each side
      for (let v = 0; v < 3; v++) {
        const yy = -r * 0.4 + v * r * 0.35;
        const sp = r * (0.15 + v * 0.1);
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.quadraticCurveTo(sp * 0.5, yy - r * 0.04, sp, yy + r * 0.08);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.quadraticCurveTo(-sp * 0.5, yy - r * 0.04, -sp, yy + r * 0.08);
        ctx.stroke();
      }

      // Gloss
      ctx.beginPath();
      ctx.ellipse(r * 0.05, -r * 0.5, r * 0.2, r * 0.1, -0.15, 0, Math.PI * 2);
      ctx.fillStyle = p.highlightColor + (p.opacity * 0.55) + ')';
      ctx.fill();

      ctx.restore();
    };

    /* ─── Master draw function picks the flower type ─── */
    const draw3DPetal = (p: Petal3D) => {
      const flowerType = p.layer; // 0 = rose petal, 1 = cherry blossom, 2 = loose petal
      if (flowerType === 0) {
        drawRosePetal(p.x, p.y, p.size, p.rotation, p.tilt, p);
      } else if (flowerType === 1) {
        drawCherryBlossom(p.x, p.y, p.size * 1.3, p.rotation, p.tilt, p);
      } else {
        drawLoosePetal(p.x, p.y, p.size, p.rotation, p.tilt, p);
      }
    };

    /* ─── Draw glass molecule atom (skin/gold tone) ─── */
    const drawAtom = (x: number, y: number, r: number, alpha: number) => {
      const bodyGrd = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
      bodyGrd.addColorStop(0, `rgba(220,200,175,${alpha * 0.5})`);
      bodyGrd.addColorStop(0.7, `rgba(200,180,155,${alpha * 0.3})`);
      bodyGrd.addColorStop(1, `rgba(190,170,145,${alpha * 0.05})`);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrd;
      ctx.fill();

      // Specular
      const hx = x - r * 0.28, hy = y - r * 0.28, hr = r * 0.3;
      const hlGrd = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
      hlGrd.addColorStop(0, `rgba(255,255,255,${alpha * 0.8})`);
      hlGrd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, Math.PI * 2);
      ctx.fillStyle = hlGrd;
      ctx.fill();
    };

    const drawBond = (x1: number, y1: number, x2: number, y2: number, r: number, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = r * 0.3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(210,190,165,${alpha * 0.3})`;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = r * 0.08;
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
      ctx.stroke();
    };

    /* ─── Ambient warm glow ─── */
    const drawAmbient = (t: number) => {
      const w = canvas.width, h = canvas.height;

      // Warm golden glow top-right
      const p1 = 0.18 + 0.06 * Math.sin(t * 0.4);
      const g1 = ctx.createRadialGradient(w * 0.82, h * 0.12, 0, w * 0.82, h * 0.12, w * 0.5);
      g1.addColorStop(0, `rgba(212,185,140,${p1})`);
      g1.addColorStop(1, 'rgba(212,185,140,0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);

      // Subtle rose accent bottom-left
      const p2 = 0.1 + 0.05 * Math.sin(t * 0.3 + 1.5);
      const g2 = ctx.createRadialGradient(w * 0.15, h * 0.85, 0, w * 0.15, h * 0.85, w * 0.55);
      g2.addColorStop(0, `rgba(215,170,170,${p2})`);
      g2.addColorStop(1, 'rgba(215,170,170,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);

      // Warm center bloom
      const p3 = 0.06 + 0.03 * Math.sin(t * 0.25 + 3);
      const g3 = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
      g3.addColorStop(0, `rgba(245,235,220,${p3})`);
      g3.addColorStop(1, 'rgba(245,235,220,0)');
      ctx.fillStyle = g3; ctx.fillRect(0, 0, w, h);
    };

    /* ─── Main Loop ─── */
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!visRef.current) return;

      tRef.current += 0.016;
      const t = tRef.current;
      const w = canvas.width, h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      drawAmbient(t);

      // Draw molecules first (behind petals)
      for (const m of molsRef.current) {
        m.x += m.vx; m.y += m.vy; m.rotation += m.rotSpeed;
        if (m.y < -120) { m.y = h + 120; m.x = rnd() * w; }
        if (m.x < -120) m.x = w + 120;
        if (m.x > w + 120) m.x = -120;

        const shape = SHAPES[m.type];
        const s = m.scale;
        const cosR = Math.cos(m.rotation), sinR = Math.sin(m.rotation);
        const tx: number[] = [], ty: number[] = [];
        for (let n = 0; n < shape.nodes.length; n++) {
          const nx = shape.nodes[n][0] * s, ny = shape.nodes[n][1] * s;
          tx[n] = m.x + nx * cosR - ny * sinR;
          ty[n] = m.y + nx * sinR + ny * cosR;
        }
        for (const [a, b] of shape.edges) drawBond(tx[a], ty[a], tx[b], ty[b], s, m.opacity);
        for (let n = 0; n < tx.length; n++) drawAtom(tx[n], ty[n], s * 0.4, m.opacity);
      }

      // Draw 3D petals on top
      for (const p of petalsRef.current) {
        p.x += p.vx + Math.sin(p.tilt * 0.5) * 0.3;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y < -80) { p.y = h + 80; p.x = rnd() * w; }
        if (p.x < -80) p.x = w + 80;
        if (p.x > w + 80) p.x = -80;

        draw3DPetal(p);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [initPetals, initMols]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Warm skin-tone base */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 80% at 30% 10%, #FFF9F3 0%, #F6EFE6 45%, rgba(232,215,184,0.4) 75%, #FFF9F3 100%)'
      }} />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
}
