/**
 * Tide Harmonics Engine
 * Multiple wave sources creating interference patterns along horizontal lines
 */

import { SeededRandom, PerlinNoise, hexToRgb, rgba, lerp, clamp } from "../utils/noise";

export interface TideHarmonicsParams {
  seed: number;
  waveCount: number;
  gridRows: number;
  frequency: number;
  amplitude: number;
  speed: number;
  bgColor: string;
  colorA: string;
  colorB: string;
}

interface Wave {
  cx: number;
  cy: number;
  amp: number;
  freq: number;
  phase: number;
  speed: number;
}

export interface TideHarmonicsState {
  waves: Wave[];
  rng: SeededRandom;
  noise: PerlinNoise;
  time: number;
  width: number;
  height: number;
}

export function initTideHarmonics(
  width: number,
  height: number,
  params: TideHarmonicsParams
): TideHarmonicsState {
  const rng = new SeededRandom(params.seed);
  const noise = new PerlinNoise(params.seed);

  const waves: Wave[] = [];
  for (let i = 0; i < params.waveCount; i++) {
    waves.push({
      cx: rng.random() * width,
      cy: rng.random() * height,
      amp: rng.range(0.55, 1.0),
      freq: rng.range(0.006, 0.014),
      phase: rng.random() * Math.PI * 2,
      speed: rng.range(0.7, 1.3),
    });
  }

  return { waves, rng, noise, time: 0, width, height };
}

export function drawTideHarmonics(
  ctx: CanvasRenderingContext2D,
  state: TideHarmonicsState,
  params: TideHarmonicsParams
): void {
  const { waves, width, height } = state;

  // Clear background
  const bg = hexToRgb(params.bgColor);
  ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
  ctx.fillRect(0, 0, width, height);

  const t = state.time * 0.016 * params.speed;
  const col1 = hexToRgb(params.colorA);
  const col2 = hexToRgb(params.colorB);
  const numCols = Math.floor(params.gridRows * 2.4);

  for (let gy = 0; gy < params.gridRows; gy++) {
    const baseY = lerp(55, height - 55, gy / (params.gridRows - 1));
    let prevX: number | null = null;
    let prevY: number | null = null;

    for (let gx = 0; gx <= numCols; gx++) {
      const x = lerp(40, width - 40, gx / numCols);
      let disp = 0;

      for (const w of waves) {
        const d = Math.sqrt((x - w.cx) ** 2 + (baseY - w.cy) ** 2);
        disp += w.amp * Math.sin(d * w.freq * params.frequency - t * w.speed + w.phase);
      }

      disp /= waves.length;
      const y = baseY + disp * params.amplitude;

      if (prevX !== null && prevY !== null) {
        const tc = clamp((disp + 1) / 2, 0, 1);
        const r = lerp(col1.r, col2.r, tc);
        const g = lerp(col1.g, col2.g, tc);
        const b = lerp(col1.b, col2.b, tc);
        const alpha = lerp(45, 210, Math.abs(disp));

        ctx.strokeStyle = rgba(r, g, b, alpha);
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      prevX = x;
      prevY = y;
    }
  }

  state.time++;
}

export function resetTideHarmonics(
  state: TideHarmonicsState,
  params: TideHarmonicsParams
): void {
  const newState = initTideHarmonics(state.width, state.height, params);
  state.waves = newState.waves;
  state.rng = newState.rng;
  state.noise = newState.noise;
  state.time = 0;
}
