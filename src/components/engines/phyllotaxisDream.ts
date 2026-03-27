/**
 * Phyllotaxis Dream Engine
 * Golden angle spiral growth pattern
 */

import { SeededRandom, hexToRgb, lerp, rgba } from "../utils/noise";

// True golden angle in radians: 2π(2−φ) ≈ 2.39996 rad ≈ 137.508°
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export interface PhyllotaxisDreamParams {
  seed: number;
  numPoints: number;
  spread: number;
  angleScale: number;
  morph: number;
  rotSpeed: number;
  dotSize: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
}

export interface PhyllotaxisDreamState {
  rng: SeededRandom;
  frameCount: number;
  width: number;
  height: number;
}

export function initPhyllotaxisDream(
  width: number,
  height: number,
  params: PhyllotaxisDreamParams
): PhyllotaxisDreamState {
  const rng = new SeededRandom(params.seed);

  return {
    rng,
    frameCount: 0,
    width,
    height,
  };
}

export function drawPhyllotaxisDream(
  ctx: CanvasRenderingContext2D,
  state: PhyllotaxisDreamState,
  params: PhyllotaxisDreamParams
): void {
  const { frameCount, width, height } = state;

  // Clear background every frame
  const bg = hexToRgb(params.bgColor);
  ctx.fillStyle = rgba(bg.r, bg.g, bg.b, 255);
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const t = frameCount * params.rotSpeed * 0.004;

  const col1 = hexToRgb(params.colorA);
  const col2 = hexToRgb(params.colorB);
  const col3 = hexToRgb(params.colorC);

  const angleScale = params.angleScale + Math.sin(t * 0.18) * 0.004 * params.morph;
  const N = params.numPoints;

  // Draw points
  for (let n = 0; n < N; n++) {
    const angle = n * GOLDEN * angleScale + t;
    const r = Math.sqrt(n) * params.spread;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    // Skip if out of bounds
    if (x < 0 || x > width || y < 0 || y > height) continue;

    const ct = n / N;
    let r1: number, g1: number, b1: number;

    // Color interpolation
    if (ct < 0.5) {
      const f = ct / 0.5;
      r1 = lerp(col1.r, col2.r, f);
      g1 = lerp(col1.g, col2.g, f);
      b1 = lerp(col1.b, col2.b, f);
    } else {
      const f = (ct - 0.5) / 0.5;
      r1 = lerp(col2.r, col3.r, f);
      g1 = lerp(col2.g, col3.g, f);
      b1 = lerp(col2.b, col3.b, f);
    }

    const alpha = 190 + 55 * Math.sin(ct * Math.PI * 6 + t * 2);
    const sz = params.dotSize * (1 - ct * 0.55);

    // Draw glow
    ctx.fillStyle = rgba(r1, g1, b1, alpha * 0.25);
    ctx.beginPath();
    ctx.arc(x, y, sz * 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw core
    ctx.fillStyle = rgba(r1, g1, b1, alpha);
    ctx.beginPath();
    ctx.arc(x, y, sz, 0, Math.PI * 2);
    ctx.fill();
  }

  state.frameCount++;
}

export function resetPhyllotaxisDream(
  state: PhyllotaxisDreamState,
  params: PhyllotaxisDreamParams
): void {
  const newState = initPhyllotaxisDream(state.width, state.height, params);
  state.rng = newState.rng;
  state.frameCount = 0;
}
