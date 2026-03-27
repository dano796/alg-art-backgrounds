/**
 * Harmonic Lattice Engine
 * Two-dimensional standing wave interference patterns with temporal evolution
 */

import { SeededRandom, hexToRgb, lerp, rgba } from "../utils/noise";

export interface HarmonicLatticeParams {
  seed: number;
  modeCount: number;
  maxModeNumber: number;
  baseFrequency: number;
  timeSpeed: number;
  resolution: number;
  nodeThreshold: number;
  contrastPower: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
}

interface HarmonicMode {
  nx: number;
  ny: number;
  freq: number;
  phase: number;
  amplitude: number;
}

export interface HarmonicLatticeState {
  modes: HarmonicMode[];
  time: number;
  rng: SeededRandom;
  width: number;
  height: number;
}

export function initHarmonicLattice(
  width: number,
  height: number,
  params: HarmonicLatticeParams
): HarmonicLatticeState {
  const rng = new SeededRandom(params.seed);
  const modes: HarmonicMode[] = [];

  // Generate harmonic modes with random phase offsets
  for (let i = 0; i < params.modeCount; i++) {
    const nx = Math.floor(rng.random() * params.maxModeNumber) + 1;
    const ny = Math.floor(rng.random() * params.maxModeNumber) + 1;
    const freq = (rng.random() * 1.2 + 0.3) * params.baseFrequency;
    const phase = rng.random() * Math.PI * 2;
    const amplitude = rng.random() * 0.4 + 0.6;
    modes.push({ nx, ny, freq, phase, amplitude });
  }

  return { modes, time: 0, rng, width, height };
}

export function drawHarmonicLattice(
  ctx: CanvasRenderingContext2D,
  state: HarmonicLatticeState,
  params: HarmonicLatticeParams
): void {
  const { modes, time, width } = state;
  const resolution = params.resolution;
  const cellSize = width / resolution;

  const bg = hexToRgb(params.bgColor);
  const c1 = hexToRgb(params.colorA);
  const c2 = hexToRgb(params.colorB);
  const c3 = hexToRgb(params.colorC);

  // Calculate wave field
  for (let gy = 0; gy < resolution; gy++) {
    for (let gx = 0; gx < resolution; gx++) {
      const x = gx / (resolution - 1);
      const y = gy / (resolution - 1);

      // Sum all harmonic modes
      let sum = 0;
      for (const mode of modes) {
        const waveX = Math.sin(mode.nx * Math.PI * x);
        const waveY = Math.sin(mode.ny * Math.PI * y);
        const temporal = Math.cos(mode.freq * time + mode.phase);
        sum += mode.amplitude * waveX * waveY * temporal;
      }

      // Normalize to [-1, 1] range approximately
      sum = sum / Math.sqrt(params.modeCount);

      // Map to color
      let r: number, g: number, b: number;
      const absSum = Math.abs(sum);
      const t = (sum + 1) / 2; // Map [-1,1] to [0,1]

      if (absSum < params.nodeThreshold) {
        // Near nodal lines - desaturate toward background
        const nodeFade = absSum / params.nodeThreshold;
        r = lerp(bg.r, c2.r, nodeFade);
        g = lerp(bg.g, c2.g, nodeFade);
        b = lerp(bg.b, c2.b, nodeFade);
      } else {
        // Interpolate through color gradient based on wave amplitude
        if (t < 0.5) {
          const localT = t * 2;
          r = lerp(c1.r, c2.r, localT);
          g = lerp(c1.g, c2.g, localT);
          b = lerp(c1.b, c2.b, localT);
        } else {
          const localT = (t - 0.5) * 2;
          r = lerp(c2.r, c3.r, localT);
          g = lerp(c2.g, c3.g, localT);
          b = lerp(c2.b, c3.b, localT);
        }

        // Boost saturation at antinodes
        const satBoost = Math.pow(absSum, params.contrastPower);
        r = lerp(bg.r, r, satBoost);
        g = lerp(bg.g, g, satBoost);
        b = lerp(bg.b, b, satBoost);
      }

      // Draw cell
      ctx.fillStyle = rgba(r, g, b, 255);
      ctx.fillRect(gx * cellSize, gy * cellSize, cellSize + 1, cellSize + 1);
    }
  }

  state.time += params.timeSpeed * 0.02;
}

export function resetHarmonicLattice(
  state: HarmonicLatticeState,
  params: HarmonicLatticeParams
): void {
  const newState = initHarmonicLattice(state.width, state.height, params);
  state.modes = newState.modes;
  state.time = 0;
  state.rng = newState.rng;
}
