import { useState, type CSSProperties } from "react";
import {
  FlowCurrents,
  WaveEther,
  GravityStorm,
  GeoPulse,
  VortexBloom,
  CrystallineDrift,
  AmbientMesh,
  EmberCascade,
  CliffordAttractor,
  HarmonicLattice,
  LissajousWeave,
  PhyllotaxisDream,
  Spirograph,
  DifferentialGrowth,
  DoublePendulum,
  FractalNoiseTerrain,
  MoireLattice,
  NeuralWeave,
  OrbitalResonance,
  ReactionDiffusion,
  RecursiveSubdivision,
  TideHarmonics,
  VoronoiMosaic,
} from "alg-art-backgrounds";

type BgComponentProps = { style?: CSSProperties; [key: string]: unknown };

const GALLERY_ITEMS: Array<{
  id: string;
  name: string;
  desc: string;
  tag: string;
  Component: React.ComponentType<BgComponentProps>;
  props: BgComponentProps;
}> = [
  {
    id: "flow-currents",
    name: "Flow Currents",
    tag: "Perlin Noise · Particles",
    desc: "Thousands of particles trace Perlin noise vector fields, forming organic density maps that slowly evolve over time.",
    Component: FlowCurrents as React.ComponentType<BgComponentProps>,
    props: {
      count: 1600, speed: 0.8, trailOpacity: 6,
      colorWarm: "#d97757", colorCool: "#6a9bcc", colorAccent: "#788c5d",
    },
  },
  {
    id: "wave-ether",
    name: "Wave Ether",
    tag: "Interference Waves · Grid",
    desc: "Multi-source sine wave interference patterns ripple across a pixel grid, shifting between crest and trough colors.",
    Component: WaveEther as React.ComponentType<BgComponentProps>,
    props: {
      sources: 3, frequency: 0.018, waveSpeed: 0.025,
      colorCrest: "#00d4ff", colorTrough: "#0a0a2e", colorMid: "#7b2fff",
    },
  },
  {
    id: "gravity-storm",
    name: "Gravity Storm",
    tag: "N-Body · Attractors",
    desc: "Particles orbit moving gravitational attractors, trails painting a choreography of orbital dynamics on the canvas.",
    Component: GravityStorm as React.ComponentType<BgComponentProps>,
    props: {
      count: 900, attractors: 3, gravity: 1.0, turbulence: 0.5,
      colorCore: "#ff6b35", colorTrail: "#7b5ea7",
    },
  },
  {
    id: "geo-pulse",
    name: "Geo Pulse",
    tag: "Geometry · Rotation",
    desc: "Nested rotating polygons at prime-ratio angular velocities, pulsing in scale and connecting vertices across layers.",
    Component: GeoPulse as React.ComponentType<BgComponentProps>,
    props: {
      layers: 7, sides: 6, rotSpeed: 0.008, pulse: 0.12, connect: 0.4,
      colorPrimary: "#d97757", colorSecondary: "#6a9bcc", colorAccent: "#e8d87a",
    },
  },
  {
    id: "vortex-bloom",
    name: "Vortex Bloom",
    tag: "Vortex · Orbital",
    desc: "Particles spiral under competing vortex attractors, accumulating into mandala-like formations through orbital crystallization.",
    Component: VortexBloom as React.ComponentType<BgComponentProps>,
    props: {
      vortexCount: 4, particleCount: 2000, orbitStrength: 1.2, spiralTightness: 0.9,
      fadeRate: 4, trailWeight: 0.7,
      colorA: "#d97757", colorB: "#6a9bcc", colorC: "#e8c46a",
    },
  },
  {
    id: "crystalline-drift",
    name: "Crystalline Drift",
    tag: "Fractal · Symmetry",
    desc: "Recursive branching arms grow from the center, guided by noise, forming snowflake-like crystal mandala structures.",
    Component: CrystallineDrift as React.ComponentType<BgComponentProps>,
    props: {
      symmetry: 6, maxDepth: 7, angleVariance: 0.5, segmentLength: 6, branchInterval: 12,
      crystalColor: "#6ab8e8", glowColor: "#c4e8ff",
    },
  },
  {
    id: "ambient-mesh",
    name: "Ambient Mesh",
    tag: "Network · Subtle",
    desc: "Nodes drift through noise fields, forming dynamic connections — a living network designed as a subtle, aesthetic background.",
    Component: AmbientMesh as React.ComponentType<BgComponentProps>,
    props: {
      nodeCount: 80, connectionDistance: 150, motionSpeed: 0.3, breatheSpeed: 0.5,
      edgeOpacity: 0.3, nodeSize: 4, nodeGlow: 0.8,
      nodeColor: "#50b8e8", edgeColor: "#50b8e8",
    },
  },
  {
    id: "ember-cascade",
    name: "Ember Cascade",
    tag: "Particles · Fire",
    desc: "Thermal particles rise with turbulent motion, glowing through temperature-based color gradients like embers ascending.",
    Component: EmberCascade as React.ComponentType<BgComponentProps>,
    props: {
      particleCount: 800, sourceCount: 3, riseSpeed: 1.2, turbulence: 1.0,
      hotColor: "#ffaa33", midColor: "#ff5533", coolColor: "#aa2233",
    },
  },
  {
    id: "clifford-attractor",
    name: "Clifford Attractor",
    tag: "Chaos · Fractal",
    desc: "Strange attractor density map revealing the fractal structure of chaotic orbital dynamics through accumulated points.",
    Component: CliffordAttractor as React.ComponentType<BgComponentProps>,
    props: {
      pA: -1.4, pB: 1.6, pC: 1.0, pD: 0.7, pointsPerFrame: 8000,
      colorA: "#1a1a2e", colorB: "#00d4ff",
    },
  },
  {
    id: "harmonic-lattice",
    name: "Harmonic Lattice",
    tag: "Waves · Interference",
    desc: "Two-dimensional standing wave interference patterns with temporal evolution and nodal lines creating harmonic grids.",
    Component: HarmonicLattice as React.ComponentType<BgComponentProps>,
    props: {
      modeCount: 6, baseFrequency: 1.0, resolution: 80,
      colorA: "#ff6b35", colorB: "#f7931e", colorC: "#fdc830",
    },
  },
  {
    id: "lissajous-weave",
    name: "Lissajous Weave",
    tag: "Parametric · Harmonic",
    desc: "Multiple Lissajous curves with different frequency ratios morphing through shared phase offset creating woven patterns.",
    Component: LissajousWeave as React.ComponentType<BgComponentProps>,
    props: {
      curveCount: 12, freqMax: 5, radius: 180, phaseSpeed: 1.0,
      colorA: "#ff6b35", colorB: "#f7931e", colorC: "#fdc830",
    },
  },
  {
    id: "phyllotaxis-dream",
    name: "Phyllotaxis Dream",
    tag: "Spiral · Golden Ratio",
    desc: "Golden angle spiral growth pattern inspired by sunflower seed arrangements and natural phyllotaxis in botanical forms.",
    Component: PhyllotaxisDream as React.ComponentType<BgComponentProps>,
    props: {
      numPoints: 800, spread: 4.5, angleScale: 1.0, morph: 1.0,
      colorA: "#ff6b35", colorB: "#f7931e", colorC: "#fdc830",
    },
  },
  {
    id: "spirograph",
    name: "Spirograph",
    tag: "Geometric · Curves",
    desc: "Hypotrochoid curves traced by rolling circles, creating intricate geometric rosettes and patterns with mathematical precision.",
    Component: Spirograph as React.ComponentType<BgComponentProps>,
    props: {
      R: 120, r: 45, d: 70, speed: 1.0, lineWeight: 1.2,
      colorA: "#ff6b35", colorB: "#f7931e", colorC: "#fdc830",
    },
  },
  {
    id: "differential-growth",
    name: "Differential Growth",
    tag: "Organic · Simulation",
    desc: "Organic growth simulation with spring forces, repulsion, and noise-guided expansion creating folded biological forms.",
    Component: DifferentialGrowth as React.ComponentType<BgComponentProps>,
    props: {
      growthRate: 0.8, repelRadius: 12, stepsPerFrame: 3, fadeRate: 18,
      colorA: "#50b8e8", colorB: "#e850b8",
    },
  },
  {
    id: "double-pendulum",
    name: "Double Pendulum",
    tag: "Chaos · Physics",
    desc: "Chaotic dynamics visualization using RK4 integration showing diverging trajectories from similar initial conditions.",
    Component: DoublePendulum as React.ComponentType<BgComponentProps>,
    props: {
      seed: 4242, numPendulums: 21, length1: 140, length2: 140, 
      gravity: 0.9, simSpeed: 2.5, fadeRate: 1,
      bgColor: "#0d1117",
      colorA: "#ff6b9d", colorB: "#4ecdc4", colorC: "#ffe66d",
    },
  },
  {
    id: "fractal-noise-terrain",
    name: "Fractal Noise Terrain",
    tag: "Fractal · Landscape",
    desc: "Layered octaves of Perlin noise creating procedural landscapes with elevation-based coloring and lighting effects.",
    Component: FractalNoiseTerrain as React.ComponentType<BgComponentProps>,
    props: {
      octaves: 6, persistence: 0.5, scale: 4.0, lighting: 2.5, resolution: 120,
      colorA: "#1a2332", colorB: "#2d4a5a", colorC: "#5a7a6a", colorD: "#d4e8e0",
    },
  },
  {
    id: "moire-lattice",
    name: "Moire Lattice",
    tag: "Geometric · Interference",
    desc: "Rotating line grids creating interference patterns and moiré effects through overlapping parallel lines at different angles.",
    Component: MoireLattice as React.ComponentType<BgComponentProps>,
    props: {
      gridCount: 5, lineSpacing: 18, rotSpeed: 1.0,
      colorA: "#50b8e8", colorB: "#e8b850", colorC: "#e850b8",
    },
  },
  {
    id: "neural-weave",
    name: "Neural Weave",
    tag: "Network · Neural",
    desc: "Network of nodes with traveling signal pulses creating dynamic neural-like activation patterns across connections.",
    Component: NeuralWeave as React.ComponentType<BgComponentProps>,
    props: {
      nodeCount: 45, connectionRadius: 180, signalCount: 8, signalSpeed: 1.2,
      nodeColor: "#50b8e8", edgeColor: "#50b8e8", signalColor: "#e8b850",
    },
  },
  {
    id: "orbital-resonance",
    name: "Orbital Resonance",
    tag: "Orbital · Harmonic",
    desc: "Bodies orbit at resonant period ratios creating harmonic patterns and Lissajous-like trajectories in orbital space.",
    Component: OrbitalResonance as React.ComponentType<BgComponentProps>,
    props: {
      bodyCount: 5, simSpeed: 1.0, trailLength: 200, fadeTrails: true,
      colorA: "#ff6b35", colorB: "#f7931e", colorC: "#fdc830", colorD: "#50b8e8",
    },
  },
  {
    id: "reaction-diffusion",
    name: "Reaction Diffusion",
    tag: "Simulation · Organic",
    desc: "Gray-Scott model creating organic pattern formation through chemical reaction simulation with diffusion dynamics.",
    Component: ReactionDiffusion as React.ComponentType<BgComponentProps>,
    props: {
      Da: 1.0, Db: 0.5, f: 0.055, k: 0.062, stepsPerFrame: 10,
      colorA: "#1a1a2e", colorB: "#00d4ff",
    },
  },
  {
    id: "recursive-subdivision",
    name: "Recursive Subdivision",
    tag: "Geometric · Mondrian",
    desc: "Binary space partitioning creating Mondrian-like compositions with golden ratio splits and depth-based coloring.",
    Component: RecursiveSubdivision as React.ComponentType<BgComponentProps>,
    props: {
      maxDepth: 6, splitProbability: 0.85, animated: true, animSpeed: 1.5,
      colorA: "#50b8e8", colorB: "#e8b850", colorC: "#e850b8",
    },
  },
  {
    id: "tide-harmonics",
    name: "Tide Harmonics",
    tag: "Waves · Ocean",
    desc: "Multiple wave sources creating interference patterns along horizontal lines like ocean tides with harmonic motion.",
    Component: TideHarmonics as React.ComponentType<BgComponentProps>,
    props: {
      waveCount: 5, gridRows: 35, frequency: 1.0, amplitude: 45,
      colorA: "#50b8e8", colorB: "#e850b8",
    },
  },
  {
    id: "voronoi-mosaic",
    name: "Voronoi Mosaic",
    tag: "Tessellation · Geometric",
    desc: "Moving seed points creating dynamic Voronoi tessellation with edge-enhanced cells forming organic mosaic patterns.",
    Component: VoronoiMosaic as React.ComponentType<BgComponentProps>,
    props: {
      seedCount: 25, moveSpeed: 0.5, edgeContrast: 1.2,
    },
  },
];

function GalleryCard({
  item,
  index,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
}) {
  const [copied, setCopied] = useState(false);
  const cmd = `npx alg-art-backgrounds add ${item.id}`;

  return (
    <div
      className="bg-surface border border-border rounded-[18px] overflow-hidden transition-[border-color,transform,box-shadow] duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:border-border-hover"
      style={{
        animation: "cardIn 0.5s ease both",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Live canvas preview */}
      <div className="relative h-[220px] bg-bg">
        <item.Component
          {...item.props}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {/* Bottom fade-out */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        {/* Tag chip */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-bg/75 backdrop-blur-sm border border-border rounded-full text-[10px] text-muted font-mono tracking-[0.04em]">
          {item.tag}
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 pt-[18px] pb-5">
        <div className="font-display font-bold text-[18px] text-ink mb-2 tracking-[-0.02em]">
          {item.name}
        </div>
        <p className="text-[13px] text-muted leading-[1.65] mb-[18px] font-sans font-light">
          {item.desc}
        </p>

        {/* Copy install command */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="w-full flex items-center gap-2 px-[13px] py-[9px] bg-bg border border-border rounded-lg cursor-pointer font-mono text-[12px] text-muted text-left transition-colors hover:border-border-hover"
        >
          <span className="text-accent shrink-0 select-none">$</span>
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{cmd}</span>
          <span
            className="text-[13px] shrink-0 transition-colors duration-200"
            style={{ color: copied ? "var(--color-green)" : "var(--color-muted)" }}
          >
            {copied ? "✓" : "⎘"}
          </span>
        </button>
      </div>
    </div>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="py-[110px] px-10 max-w-[1120px] mx-auto">
      {/* Section header */}
      <div className="mb-[60px] max-w-[580px]">
        <div className="font-mono text-[11px] text-accent tracking-[0.12em] font-medium mb-[14px] uppercase">
          Backgrounds
        </div>
        <h2
          className="font-display font-extrabold text-ink leading-none tracking-[-0.04em] mb-[18px]"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          24 distinct systems.
          <br />
          <span className="text-muted font-semibold">Infinite configurations.</span>
        </h2>
        <p className="text-[15px] text-muted leading-[1.7] font-sans font-light">
          Each background is a self-contained canvas renderer. Install one or all
          — you get the full source directly in your project with no npm dependency.
        </p>
      </div>

      {/* 2×2 grid */}
      <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
