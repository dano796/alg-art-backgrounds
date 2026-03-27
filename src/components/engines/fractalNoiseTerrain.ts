/**
 * Fractal Noise Terrain Engine
 * Layered octaves of Perlin noise creating procedural landscapes
 */

import { PerlinNoise, hexToRgb, lerp } from "../utils/noise";

export interface FractalNoiseTerrainParams {
  seed: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  scale: number;
  contrast: number;
  lighting: number;
  driftSpeed: number;
  resolution: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
  colorD: string;
}

export interface FractalNoiseTerrainState {
  noise: PerlinNoise;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export function initFractalNoiseTerrain(
  width: number,
  height: number,
  params: FractalNoiseTerrainParams
): FractalNoiseTerrainState {
  const noise = new PerlinNoise(params.seed);
  return { noise, offsetX: 0, offsetY: 0, width, height };
}

function fbm(
  noise: PerlinNoise,
  x: number,
  y: number,
  octaves: number,
  persistence: number,
  lacunarity: number
): number {
  let total = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += noise.get(x * frequency, y * frequency, 0) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  return total / maxValue;
}

function getTerrainColor(
  elevation: number,
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  c3: { r: number; g: number; b: number },
  c4: { r: number; g: number; b: number }
): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (elevation < 0.33) {
    const t = elevation / 0.33;
    r = lerp(c1.r, c2.r, t);
    g = lerp(c1.g, c2.g, t);
    b = lerp(c1.b, c2.b, t);
  } else if (elevation < 0.66) {
    const t = (elevation - 0.33) / 0.33;
    r = lerp(c2.r, c3.r, t);
    g = lerp(c2.g, c3.g, t);
    b = lerp(c2.b, c3.b, t);
  } else {
    const t = (elevation - 0.66) / 0.34;
    r = lerp(c3.r, c4.r, t);
    g = lerp(c3.g, c4.g, t);
    b = lerp(c3.b, c4.b, t);
  }

  return { r, g, b };
}

export function drawFractalNoiseTerrain(
  ctx: CanvasRenderingContext2D,
  state: FractalNoiseTerrainState,
  params: FractalNoiseTerrainParams
): void {
  const { noise, width } = state;
  const resolution = params.resolution;
  const cellSize = width / resolution;

  // Update offset for drift
  state.offsetX += params.driftSpeed * 0.001;
  state.offsetY += params.driftSpeed * 0.0007;

  const c1 = hexToRgb(params.colorA);
  const c2 = hexToRgb(params.colorB);
  const c3 = hexToRgb(params.colorC);
  const c4 = hexToRgb(params.colorD);

  for (let gy = 0; gy < resolution; gy++) {
    for (let gx = 0; gx < resolution; gx++) {
      const x = (gx / resolution) * params.scale + state.offsetX;
      const y = (gy / resolution) * params.scale + state.offsetY;

      let elevation = fbm(noise, x, y, params.octaves, params.persistence, params.lacunarity);

      // Apply contrast
      elevation = Math.pow(elevation, params.contrast);

      const color = getTerrainColor(elevation, c1, c2, c3, c4);

      // Apply lighting based on slope
      if (params.lighting > 0) {
        const dx =
          gx < resolution - 1
            ? fbm(
                noise,
                ((gx + 1) / resolution) * params.scale + state.offsetX,
                y,
                params.octaves,
                params.persistence,
                params.lacunarity
              ) - elevation
            : 0;
        const dy =
          gy < resolution - 1
            ? fbm(
                noise,
                x,
                ((gy + 1) / resolution) * params.scale + state.offsetY,
                params.octaves,
                params.persistence,
                params.lacunarity
              ) - elevation
            : 0;
        const slope = Math.sqrt(dx * dx + dy * dy);
        const shadow = 1 - slope * params.lighting;
        color.r *= shadow;
        color.g *= shadow;
        color.b *= shadow;
      }

      ctx.fillStyle = `rgb(${Math.floor(color.r)},${Math.floor(color.g)},${Math.floor(color.b)})`;
      ctx.fillRect(gx * cellSize, gy * cellSize, cellSize + 1, cellSize + 1);
    }
  }
}

export function resetFractalNoiseTerrain(
  state: FractalNoiseTerrainState,
  params: FractalNoiseTerrainParams
): void {
  const newState = initFractalNoiseTerrain(state.width, state.height, params);
  state.noise = newState.noise;
  state.offsetX = 0;
  state.offsetY = 0;
}
