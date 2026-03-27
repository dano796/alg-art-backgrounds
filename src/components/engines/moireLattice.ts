/**
 * Moire Lattice Engine
 * Rotating line grids creating interference patterns
 */

import { PerlinNoise, SeededRandom, hexToRgb, rgba } from "../utils/noise";

export interface MoireLatticeParams {
  seed: number;
  gridCount: number;
  lineSpacing: number;
  lineWeight: number;
  lineAlpha: number;
  rotSpeed: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
}

export interface MoireLatticeState {
  rng: SeededRandom;
  noise: PerlinNoise;
  time: number;
  width: number;
  height: number;
}

export function initMoireLattice(
  width: number,
  height: number,
  params: MoireLatticeParams
): MoireLatticeState {
  const rng = new SeededRandom(params.seed);
  const noise = new PerlinNoise(params.seed);
  return { rng, noise, time: 0, width, height };
}

export function drawMoireLattice(
  ctx: CanvasRenderingContext2D,
  state: MoireLatticeState,
  params: MoireLatticeParams
): void {
  const { width, height } = state;

  // Clear background
  const bg = hexToRgb(params.bgColor);
  ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
  ctx.fillRect(0, 0, width, height);

  const palette = [hexToRgb(params.colorA), hexToRgb(params.colorB), hexToRgb(params.colorC)];
  const diag = Math.sqrt(width ** 2 + height ** 2);
  const t = state.time * params.rotSpeed * 0.0008;

  ctx.save();
  ctx.translate(width / 2, height / 2);

  for (let g = 0; g < params.gridCount; g++) {
    const angle = (g / params.gridCount) * Math.PI + t * (1 + g * 0.41);
    const col = palette[g % palette.length];

    ctx.strokeStyle = rgba(col.r, col.g, col.b, params.lineAlpha);
    ctx.lineWidth = params.lineWeight;

    ctx.save();
    ctx.rotate(angle);

    const num = Math.ceil(diag / params.lineSpacing) + 2;
    for (let i = -num; i <= num; i++) {
      ctx.beginPath();
      ctx.moveTo(-diag, i * params.lineSpacing);
      ctx.lineTo(diag, i * params.lineSpacing);
      ctx.stroke();
    }

    ctx.restore();
  }

  ctx.restore();
  state.time++;
}

export function resetMoireLattice(
  state: MoireLatticeState,
  params: MoireLatticeParams
): void {
  const newState = initMoireLattice(state.width, state.height, params);
  state.rng = newState.rng;
  state.noise = newState.noise;
  state.time = 0;
}
