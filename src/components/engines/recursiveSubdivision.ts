/**
 * Recursive Subdivision Engine
 * Binary space partitioning creating Mondrian-like compositions
 */

import { SeededRandom, hexToRgb, lerp } from "../utils/noise";

export interface RecursiveSubdivisionParams {
  seed: number;
  maxDepth: number;
  splitProbability: number;
  minSize: number;
  maxStroke: number;
  minStroke: number;
  colorMode: number;
  animated: boolean;
  animSpeed: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
}

interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  children: Cell[] | null;
}

export interface RecursiveSubdivisionState {
  finalCells: Cell[];
  animationProgress: number;
  rng: SeededRandom;
  width: number;
  height: number;
}

function shouldSplit(
  cell: Cell,
  params: RecursiveSubdivisionParams,
  rng: SeededRandom
): boolean {
  if (cell.depth >= params.maxDepth) return false;
  if (cell.w < params.minSize || cell.h < params.minSize) return false;
  const prob = Math.pow(params.splitProbability, cell.depth);
  return rng.random() < prob;
}

function splitCell(cell: Cell, rng: SeededRandom): void {
  const splitVertical = cell.w > cell.h ? true : cell.w < cell.h ? false : rng.random() > 0.5;
  let splitPos;

  // Bias toward golden ratio and thirds
  const bias = rng.random();
  if (bias < 0.4) splitPos = 0.382; // Golden ratio
  else if (bias < 0.6) splitPos = 0.618;
  else if (bias < 0.75) splitPos = 0.333; // Third
  else if (bias < 0.9) splitPos = 0.667;
  else splitPos = rng.range(0.3, 0.7); // Random but centered

  if (splitVertical) {
    const splitX = cell.x + cell.w * splitPos;
    cell.children = [
      { x: cell.x, y: cell.y, w: cell.w * splitPos, h: cell.h, depth: cell.depth + 1, children: null },
      { x: splitX, y: cell.y, w: cell.w * (1 - splitPos), h: cell.h, depth: cell.depth + 1, children: null },
    ];
  } else {
    const splitY = cell.y + cell.h * splitPos;
    cell.children = [
      { x: cell.x, y: cell.y, w: cell.w, h: cell.h * splitPos, depth: cell.depth + 1, children: null },
      { x: cell.x, y: splitY, w: cell.w, h: cell.h * (1 - splitPos), depth: cell.depth + 1, children: null },
    ];
  }
}

function subdivide(cell: Cell, params: RecursiveSubdivisionParams, rng: SeededRandom): void {
  if (shouldSplit(cell, params, rng)) {
    splitCell(cell, rng);
    subdivide(cell.children![0], params, rng);
    subdivide(cell.children![1], params, rng);
  }
}

function getLeaves(cell: Cell, leaves: Cell[] = []): Cell[] {
  if (cell.children === null) {
    leaves.push(cell);
  } else {
    getLeaves(cell.children[0], leaves);
    getLeaves(cell.children[1], leaves);
  }
  return leaves;
}

export function initRecursiveSubdivision(
  width: number,
  height: number,
  params: RecursiveSubdivisionParams
): RecursiveSubdivisionState {
  const rng = new SeededRandom(params.seed);
  const root: Cell = { x: 0, y: 0, w: width, h: height, depth: 0, children: null };
  subdivide(root, params, rng);
  const finalCells = getLeaves(root);

  return { finalCells, animationProgress: 0, rng, width, height };
}

export function drawRecursiveSubdivision(
  ctx: CanvasRenderingContext2D,
  state: RecursiveSubdivisionState,
  params: RecursiveSubdivisionParams
): void {
  const { finalCells, width, height } = state;

  // Clear background
  const bg = hexToRgb(params.bgColor);
  ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
  ctx.fillRect(0, 0, width, height);

  // Animate appearance
  if (params.animated && state.animationProgress < 1) {
    state.animationProgress += 0.01 * params.animSpeed;
  } else {
    state.animationProgress = 1;
  }

  const visibleCount = Math.floor(finalCells.length * state.animationProgress);

  const c1 = hexToRgb(params.colorA);
  const c2 = hexToRgb(params.colorB);
  const c3 = hexToRgb(params.colorC);

  for (let i = 0; i < visibleCount; i++) {
    const cell = finalCells[i];

    // Color based on strategy
    let r: number, g: number, b: number;
    if (params.colorMode === 0) {
      // Depth-based
      const t = cell.depth / params.maxDepth;
      if (t < 0.5) {
        r = lerp(c1.r, c2.r, t * 2);
        g = lerp(c1.g, c2.g, t * 2);
        b = lerp(c1.b, c2.b, t * 2);
      } else {
        r = lerp(c2.r, c3.r, (t - 0.5) * 2);
        g = lerp(c2.g, c3.g, (t - 0.5) * 2);
        b = lerp(c2.b, c3.b, (t - 0.5) * 2);
      }
    } else {
      // Position-based
      const tx = cell.x / width;
      const ty = cell.y / height;
      const t = (tx + ty) / 2;
      if (t < 0.5) {
        r = lerp(c1.r, c2.r, t * 2);
        g = lerp(c1.g, c2.g, t * 2);
        b = lerp(c1.b, c2.b, t * 2);
      } else {
        r = lerp(c2.r, c3.r, (t - 0.5) * 2);
        g = lerp(c2.g, c3.g, (t - 0.5) * 2);
        b = lerp(c2.b, c3.b, (t - 0.5) * 2);
      }
    }

    ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
    const strokeW = lerp(params.maxStroke, params.minStroke, cell.depth / params.maxDepth);
    ctx.strokeStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
    ctx.lineWidth = strokeW;
    ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
    ctx.strokeRect(cell.x, cell.y, cell.w, cell.h);
  }
}

export function resetRecursiveSubdivision(
  state: RecursiveSubdivisionState,
  params: RecursiveSubdivisionParams
): void {
  const newState = initRecursiveSubdivision(state.width, state.height, params);
  state.finalCells = newState.finalCells;
  state.animationProgress = 0;
  state.rng = newState.rng;
}
