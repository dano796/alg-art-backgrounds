/**
 * Orbital Resonance Engine
 * Bodies orbit at resonant period ratios creating harmonic patterns
 */

import { SeededRandom, hexToRgb, rgba } from "../utils/noise";

export interface OrbitalResonanceParams {
  seed: number;
  bodyCount: number;
  resonanceRatios: number[];
  simSpeed: number;
  trailLength: number;
  trailWeight: number;
  bodySize: number;
  centerSize: number;
  fadeTrails: boolean;
  fadeAmount: number;
  bgColor: string;
  colorA: string;
  colorB: string;
  colorC: string;
  colorD: string;
}

interface TrailPoint {
  x: number;
  y: number;
}

interface OrbitalBody {
  radius: number;
  period: number;
  color: { r: number; g: number; b: number };
  angle: number;
  angularVel: number;
  trail: TrailPoint[];
}

export interface OrbitalResonanceState {
  bodies: OrbitalBody[];
  rng: SeededRandom;
  width: number;
  height: number;
  needsClear: boolean;
}

export function initOrbitalResonance(
  width: number,
  height: number,
  params: OrbitalResonanceParams
): OrbitalResonanceState {
  const rng = new SeededRandom(params.seed);
  const colors = [
    hexToRgb(params.colorA),
    hexToRgb(params.colorB),
    hexToRgb(params.colorC),
    hexToRgb(params.colorD),
  ];

  const baseRadius = width * 0.15;
  const basePeriod = 200;

  const bodies: OrbitalBody[] = [];
  for (let i = 0; i < params.bodyCount; i++) {
    const resonance = params.resonanceRatios[i % params.resonanceRatios.length];
    const radius = baseRadius * (1 + i * 0.4);
    const period = basePeriod * resonance;
    const color = colors[i % colors.length];
    const phase = rng.random() * Math.PI * 2;

    bodies.push({
      radius,
      period,
      color,
      angle: phase,
      angularVel: (Math.PI * 2) / period,
      trail: [],
    });
  }

  return { bodies, rng, width, height, needsClear: true };
}

export function drawOrbitalResonance(
  ctx: CanvasRenderingContext2D,
  state: OrbitalResonanceState,
  params: OrbitalResonanceParams
): void {
  const { bodies, width, height } = state;

  // Clear or fade background
  if (state.needsClear) {
    const bg = hexToRgb(params.bgColor);
    ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
    ctx.fillRect(0, 0, width, height);
    state.needsClear = false;
  } else if (params.fadeTrails) {
    const bg = hexToRgb(params.bgColor);
    ctx.fillStyle = rgba(bg.r, bg.g, bg.b, params.fadeAmount);
    ctx.fillRect(0, 0, width, height);
  } else {
    const bg = hexToRgb(params.bgColor);
    ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
    ctx.fillRect(0, 0, width, height);
  }

  // Update and draw bodies
  for (const body of bodies) {
    // Update position
    body.angle += body.angularVel * 0.5 * params.simSpeed;
    const x = width / 2 + Math.cos(body.angle) * body.radius;
    const y = height / 2 + Math.sin(body.angle) * body.radius;

    body.trail.push({ x, y });
    if (body.trail.length > params.trailLength) {
      body.trail.shift();
    }

    // Draw trail
    for (let i = 1; i < body.trail.length; i++) {
      const alpha = (i / body.trail.length) * 255;
      ctx.strokeStyle = rgba(body.color.r, body.color.g, body.color.b, alpha);
      ctx.lineWidth = params.trailWeight;
      ctx.beginPath();
      ctx.moveTo(body.trail[i - 1].x, body.trail[i - 1].y);
      ctx.lineTo(body.trail[i].x, body.trail[i].y);
      ctx.stroke();
    }

    // Draw body
    const pos = body.trail[body.trail.length - 1];
    if (pos) {
      ctx.fillStyle = `rgb(${body.color.r},${body.color.g},${body.color.b})`;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, params.bodySize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw central mass
  ctx.fillStyle = rgba(255, 255, 255, 150);
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, params.centerSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

export function resetOrbitalResonance(
  state: OrbitalResonanceState,
  params: OrbitalResonanceParams
): void {
  const newState = initOrbitalResonance(state.width, state.height, params);
  state.bodies = newState.bodies;
  state.rng = newState.rng;
  state.needsClear = true;
}
