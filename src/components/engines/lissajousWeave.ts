/**
 * Lissajous Weave Engine
 * Harmonic phase tapestry with multiple frequency ratios
 */

import { SeededRandom, hexToRgb, rgba } from "../utils/noise";

export interface LissajousWeaveParams {
  seed: number;
  curveCount: number;
  freqMax: number;
  radius: number;
  phaseSpeed: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
}

interface FreqPair {
  a: number;
  b: number;
}

export interface LissajousWeaveState {
  activePairs: FreqPair[];
  palette: Array<{ r: number; g: number; b: number }>;
  rng: SeededRandom;
  frameCount: number;
  width: number;
  height: number;
  needsClear?: boolean;
}

export function initLissajousWeave(
  width: number,
  height: number,
  params: LissajousWeaveParams
): LissajousWeaveState {
  const rng = new SeededRandom(params.seed);

  // Build all possible frequency pairs
  const all: FreqPair[] = [];
  for (let a = 1; a <= params.freqMax; a++) {
    for (let b = 1; b <= params.freqMax; b++) {
      all.push({ a, b });
    }
  }

  // Shuffle and select
  all.sort(() => rng.random() - 0.5);
  const activePairs = all.slice(0, Math.min(params.curveCount, all.length));

  const palette = [
    hexToRgb(params.colorA),
    hexToRgb(params.colorB),
    hexToRgb(params.colorC),
  ];

  return {
    activePairs,
    palette,
    rng,
    frameCount: 0,
    width,
    height,
  };
}

export function drawLissajousWeave(
  ctx: CanvasRenderingContext2D,
  state: LissajousWeaveState,
  params: LissajousWeaveParams
): void {
  const { activePairs, palette, frameCount, width, height } = state;

  const bg = hexToRgb(params.bgColor);

  // Clear canvas completely if needed (on reset)
  if (state.needsClear) {
    ctx.fillStyle = rgba(bg.r, bg.g, bg.b, 255);
    ctx.fillRect(0, 0, width, height);
    state.needsClear = false;
  }

  // Fade background
  ctx.fillStyle = rgba(bg.r, bg.g, bg.b, 18);
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const phase = frameCount * params.phaseSpeed * 0.009;

  // Draw each Lissajous curve
  for (let i = 0; i < activePairs.length; i++) {
    const { a, b } = activePairs[i];
    const delta = phase + (i / activePairs.length) * Math.PI * 2;
    const col = palette[i % palette.length];
    const alpha = 200 - (i / activePairs.length) * 130; // 200 to 70
    const weight = 1.6 - (i / activePairs.length) * 1.1; // 1.6 to 0.5

    ctx.strokeStyle = rgba(col.r, col.g, col.b, alpha);
    ctx.lineWidth = weight;
    ctx.beginPath();

    const totalSteps = 700 * Math.max(a, b);
    let firstPoint = true;

    for (let k = 0; k <= totalSteps; k++) {
      const t = (k / totalSteps) * Math.PI * 2;
      const x = cx + params.radius * Math.sin(a * t + delta);
      const y = cy + params.radius * Math.sin(b * t);

      if (firstPoint) {
        ctx.moveTo(x, y);
        firstPoint = false;
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  }

  state.frameCount++;
}

export function resetLissajousWeave(
  state: LissajousWeaveState,
  params: LissajousWeaveParams
): void {
  const newState = initLissajousWeave(state.width, state.height, params);
  state.activePairs = newState.activePairs;
  state.palette = newState.palette;
  state.rng = newState.rng;
  state.frameCount = 0;
  state.needsClear = true;
}
