/**
 * Neural Weave Engine
 * Network of nodes with traveling signal pulses
 */

import { SeededRandom, PerlinNoise, hexToRgb, rgba, lerp } from "../utils/noise";

export interface NeuralWeaveParams {
  seed: number;
  nodeCount: number;
  connectionRadius: number;
  signalCount: number;
  signalSpeed: number;
  nodeSize: number;
  bgColor: string;
  nodeColor: string;
  edgeColor: string;
  signalColor: string;
}

interface Node {
  x: number;
  y: number;
  activateAt: number;
  conns: Array<{ j: number; eid: number }>;
}

interface Edge {
  a: number;
  b: number;
  activateAt: number;
}

interface Pulse {
  from: number;
  to: number;
  eid: number;
  prog: number;
}

export interface NeuralWeaveState {
  nodes: Node[];
  edges: Edge[];
  pulses: Pulse[];
  rng: SeededRandom;
  noise: PerlinNoise;
  frameCount: number;
  width: number;
  height: number;
  needsClear: boolean;
}

function spawnPulse(state: NeuralWeaveState): void {
  const { nodes, rng } = state;
  let s = -1;
  for (let t = 0; t < 100; t++) {
    const c = Math.floor(rng.random() * nodes.length);
    if (nodes[c].conns.length > 0) {
      s = c;
      break;
    }
  }
  if (s === -1) return;
  const conn = nodes[s].conns[Math.floor(rng.random() * nodes[s].conns.length)];
  state.pulses.push({ from: s, to: conn.j, eid: conn.eid, prog: 0 });
  nodes[s].activateAt = state.frameCount;
}

export function initNeuralWeave(
  width: number,
  height: number,
  params: NeuralWeaveParams
): NeuralWeaveState {
  const rng = new SeededRandom(params.seed);
  const noise = new PerlinNoise(params.seed);

  // Create nodes
  const nodes: Node[] = [];
  for (let i = 0; i < params.nodeCount; i++) {
    nodes.push({
      x: rng.range(55, width - 55),
      y: rng.range(55, height - 55),
      activateAt: -9999,
      conns: [],
    });
  }

  // Create edges
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < params.connectionRadius) {
        const eid = edges.length;
        edges.push({ a: i, b: j, activateAt: -9999 });
        nodes[i].conns.push({ j, eid });
        nodes[j].conns.push({ j: i, eid });
      }
    }
  }

  const state: NeuralWeaveState = {
    nodes,
    edges,
    pulses: [],
    rng,
    noise,
    frameCount: 0,
    width,
    height,
    needsClear: true,
  };

  // Spawn initial pulses
  for (let s = 0; s < params.signalCount; s++) {
    spawnPulse(state);
  }

  return state;
}

export function drawNeuralWeave(
  ctx: CanvasRenderingContext2D,
  state: NeuralWeaveState,
  params: NeuralWeaveParams
): void {
  const { nodes, edges, pulses, frameCount, width, height } = state;

  // Clear or fade background
  if (state.needsClear) {
    const bg = hexToRgb(params.bgColor);
    ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
    ctx.fillRect(0, 0, width, height);
    state.needsClear = false;
  } else {
    const bg = hexToRgb(params.bgColor);
    ctx.fillStyle = rgba(bg.r, bg.g, bg.b, 22);
    ctx.fillRect(0, 0, width, height);
  }

  // Draw edges
  const ec = hexToRgb(params.edgeColor);
  for (const e of edges) {
    const age = frameCount - e.activateAt;
    const alpha = age < 35 ? lerp(200, 20, age / 35) : 20;
    ctx.strokeStyle = rgba(ec.r, ec.g, ec.b, alpha);
    ctx.lineWidth = age < 35 ? 1.2 : 0.4;
    ctx.beginPath();
    ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
    ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
    ctx.stroke();
  }

  // Draw nodes
  const nc = hexToRgb(params.nodeColor);
  for (const n of nodes) {
    const age = frameCount - n.activateAt;
    const glow = age < 65 ? lerp(1, 0, age / 65) : 0;
    const alpha = 55 + glow * 185;
    const size = params.nodeSize + glow * params.nodeSize * 1.8;

    if (glow > 0) {
      ctx.fillStyle = rgba(nc.r, nc.g, nc.b, glow * 35);
      ctx.beginPath();
      ctx.arc(n.x, n.y, (size * 4.5) / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = rgba(nc.r, nc.g, nc.b, alpha);
    ctx.beginPath();
    ctx.arc(n.x, n.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Update and draw pulses
  const sc = hexToRgb(params.signalColor);
  const next: Pulse[] = [];

  for (const pulse of pulses) {
    pulse.prog += params.signalSpeed * 0.011;

    if (pulse.prog >= 1) {
      nodes[pulse.to].activateAt = frameCount;
      edges[pulse.eid].activateAt = frameCount;

      const tc = nodes[pulse.to].conns.filter((c) => c.j !== pulse.from);
      if (tc.length > 0 && state.rng.random() < 0.88) {
        const pk = tc[Math.floor(state.rng.random() * tc.length)];
        next.push({ from: pulse.to, to: pk.j, eid: pk.eid, prog: 0 });
      } else {
        spawnPulse(state);
      }
    } else {
      edges[pulse.eid].activateAt = frameCount;
      const fn = nodes[pulse.from];
      const tn = nodes[pulse.to];
      const x = lerp(fn.x, tn.x, pulse.prog);
      const y = lerp(fn.y, tn.y, pulse.prog);

      // Draw pulse with glow
      ctx.fillStyle = rgba(sc.r, sc.g, sc.b, 45);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(sc.r, sc.g, sc.b, 130);
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(sc.r, sc.g, sc.b, 235);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();

      next.push(pulse);
    }
  }

  state.pulses = next;

  // Maintain signal count
  while (state.pulses.length < params.signalCount) {
    spawnPulse(state);
  }

  state.frameCount++;
}

export function resetNeuralWeave(
  state: NeuralWeaveState,
  params: NeuralWeaveParams
): void {
  const newState = initNeuralWeave(state.width, state.height, params);
  state.nodes = newState.nodes;
  state.edges = newState.edges;
  state.pulses = newState.pulses;
  state.rng = newState.rng;
  state.noise = newState.noise;
  state.frameCount = 0;
  state.needsClear = true;
}
