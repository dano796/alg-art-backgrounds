/**
 * Voronoi Mosaic Engine
 * Moving seed points creating dynamic Voronoi tessellation
 */

import { SeededRandom } from "../utils/noise";

export interface VoronoiMosaicParams {
  seed: number;
  seedCount: number;
  moveSpeed: number;
  edgeContrast: number;
  bgColor: string;
}

interface VoronoiSeed {
  x: number;
  y: number;
  vx: number;
  vy: number;
  col: { r: number; g: number; b: number };
}

export interface VoronoiMosaicState {
  VW: number;
  VH: number;
  seeds: VoronoiSeed[];
  rng: SeededRandom;
  imageData: ImageData | null;
  width: number;
  height: number;
}

function hsb2rgb(h: number, s: number, b: number): { r: number; g: number; b: number } {
  h /= 60;
  s /= 100;
  b /= 100;
  const i = Math.floor(h);
  const f = h - i;
  const pp = b * (1 - s);
  const qq = b * (1 - s * f);
  const tt = b * (1 - s * (1 - f));
  let r: number, g: number, bv: number;

  switch (i % 6) {
    case 0:
      r = b;
      g = tt;
      bv = pp;
      break;
    case 1:
      r = qq;
      g = b;
      bv = pp;
      break;
    case 2:
      r = pp;
      g = b;
      bv = tt;
      break;
    case 3:
      r = pp;
      g = qq;
      bv = b;
      break;
    case 4:
      r = tt;
      g = pp;
      bv = b;
      break;
    default:
      r = b;
      g = pp;
      bv = qq;
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(bv * 255) };
}

export function initVoronoiMosaic(
  width: number,
  height: number,
  params: VoronoiMosaicParams
): VoronoiMosaicState {
  const VW = 150;
  const VH = 150;
  const rng = new SeededRandom(params.seed);

  const seeds: VoronoiSeed[] = [];
  const hStep = 360 / params.seedCount;

  for (let i = 0; i < params.seedCount; i++) {
    const hue = (params.seed * 17 + i * hStep) % 360;
    seeds.push({
      x: rng.random() * VW,
      y: rng.random() * VH,
      vx: rng.range(-0.4, 0.4),
      vy: rng.range(-0.4, 0.4),
      col: hsb2rgb(hue, 60 + rng.range(-10, 10), 85 + rng.range(-8, 8)),
    });
  }

  return { VW, VH, seeds, rng, imageData: null, width, height };
}

function updateVoronoi(
  state: VoronoiMosaicState,
  params: VoronoiMosaicParams,
  ctx: CanvasRenderingContext2D
): void {
  const { VW, VH, seeds } = state;

  // Update seed positions
  for (const s of seeds) {
    s.x += s.vx * params.moveSpeed;
    s.y += s.vy * params.moveSpeed;

    if (s.x < 1 || s.x >= VW - 1) s.vx *= -1;
    if (s.y < 1 || s.y >= VH - 1) s.vy *= -1;

    s.x = Math.max(1, Math.min(VW - 2, s.x));
    s.y = Math.max(1, Math.min(VH - 2, s.y));
  }

  // Create or reuse image data
  if (!state.imageData) {
    state.imageData = ctx.createImageData(VW, VH);
  }

  const pixels = state.imageData.data;

  // Compute Voronoi diagram
  for (let y = 0; y < VH; y++) {
    for (let x = 0; x < VW; x++) {
      let m1 = Infinity;
      let m2 = Infinity;
      let cl = 0;

      for (let i = 0; i < seeds.length; i++) {
        const d = (x - seeds[i].x) ** 2 + (y - seeds[i].y) ** 2;
        if (d < m1) {
          m2 = m1;
          m1 = d;
          cl = i;
        } else if (d < m2) {
          m2 = d;
        }
      }

      const c = seeds[cl].col;
      const edge = Math.sqrt(m1) / (Math.sqrt(m1) + Math.sqrt(m2) + 0.01);
      const bright = 1 - edge * params.edgeContrast * 0.45;
      const idx = (y * VW + x) * 4;

      pixels[idx] = c.r * bright;
      pixels[idx + 1] = c.g * bright;
      pixels[idx + 2] = c.b * bright;
      pixels[idx + 3] = 255;
    }
  }
}

export function drawVoronoiMosaic(
  ctx: CanvasRenderingContext2D,
  state: VoronoiMosaicState,
  params: VoronoiMosaicParams
): void {
  const { VW, VH, width, height } = state;

  updateVoronoi(state, params, ctx);

  // Draw scaled to canvas
  if (state.imageData) {
    ctx.putImageData(state.imageData, 0, 0);
    ctx.drawImage(ctx.canvas, 0, 0, VW, VH, 0, 0, width, height);
  }
}

export function resetVoronoiMosaic(
  state: VoronoiMosaicState,
  params: VoronoiMosaicParams
): void {
  const newState = initVoronoiMosaic(state.width, state.height, params);
  state.VW = newState.VW;
  state.VH = newState.VH;
  state.seeds = newState.seeds;
  state.rng = newState.rng;
  state.imageData = null;
}
