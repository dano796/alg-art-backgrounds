/**
 * Background registry — single source of truth for the component catalog.
 *
 * Every entry describes where to find a component's files, what params it
 * accepts, and how to reference it. The CLI reads registry.json (generated
 * from this) to resolve install requests.
 */

import {
  flowCurrentsSchema,
  flowCurrentsDefaults,
  gravityStormSchema,
  gravityStormDefaults,
  geoPulseSchema,
  geoPulseDefaults,
  waveEtherSchema,
  waveEtherDefaults,
  vortexBloomSchema,
  vortexBloomDefaults,
  crystallineDriftSchema,
  crystallineDriftDefaults,
  ambientMeshSchema,
  ambientMeshDefaults,
  emberCascadeSchema,
  emberCascadeDefaults,
  cliffordAttractorSchema,
  cliffordAttractorDefaults,
  harmonicLatticeSchema,
  harmonicLatticeDefaults,
  lissajousWeaveSchema,
  lissajousWeaveDefaults,
  phyllotaxisDreamSchema,
  phyllotaxisDreamDefaults,
  spirographSchema,
  spirographDefaults,
  differentialGrowthSchema,
  differentialGrowthDefaults,
  doublePendulumSchema,
  doublePendulumDefaults,
  fractalNoiseTerrainSchema,
  fractalNoiseTerrainDefaults,
  moireLatticeSchema,
  moireLatticeDefaults,
  neuralWeaveSchema,
  neuralWeaveDefaults,
  orbitalResonanceSchema,
  orbitalResonanceDefaults,
  reactionDiffusionSchema,
  reactionDiffusionDefaults,
  recursiveSubdivisionSchema,
  recursiveSubdivisionDefaults,
  tideHarmonicsSchema,
  tideHarmonicsDefaults,
  voronoiMosaicSchema,
  voronoiMosaicDefaults,
  type ParamSchema,
} from "../components/schemas";

export interface RegistryEntry {
  /** Kebab-case id used in CLI: `npx alg-art-backgrounds add <id>` */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Import path relative to components/ */
  componentPath: string;
  /** Named export from the component file */
  exportName: string;
  /** Parameter schema (drives UI + code-gen) */
  schema: ParamSchema[];
  /** Default parameter values */
  defaults: Record<string, unknown>;
  /** Source files to copy during CLI install */
  files: string[];
  /** One-line description */
  description: string;
  /** Tags for search/filtering */
  tags: string[];
}

export const registry: RegistryEntry[] = [
  {
    id: "flow-currents",
    name: "Flow Currents",
    componentPath: "../components/FlowCurrents",
    exportName: "FlowCurrents",
    schema: flowCurrentsSchema,
    defaults: flowCurrentsDefaults,
    files: [
      "src/components/FlowCurrents.tsx",
      "src/components/engines/flowCurrents.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Thousands of particles trace Perlin noise vector fields forming organic density maps.",
    tags: ["particles", "noise", "flow", "organic"],
  },
  {
    id: "gravity-storm",
    name: "Gravity Storm",
    componentPath: "../components/GravityStorm",
    exportName: "GravityStorm",
    schema: gravityStormSchema,
    defaults: gravityStormDefaults,
    files: [
      "src/components/GravityStorm.tsx",
      "src/components/engines/gravityStorm.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Multiple gravitational attractors pull a particle swarm into complex orbital dance.",
    tags: ["particles", "physics", "gravity", "orbits"],
  },
  {
    id: "geo-pulse",
    name: "Geo Pulse",
    componentPath: "../components/GeoPulse",
    exportName: "GeoPulse",
    schema: geoPulseSchema,
    defaults: geoPulseDefaults,
    files: [
      "src/components/GeoPulse.tsx",
      "src/components/engines/geoPulse.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Nested parametric polygons rotating at prime-ratio angular velocities.",
    tags: ["geometric", "polygons", "rotation", "mathematical"],
  },
  {
    id: "wave-ether",
    name: "Wave Ether",
    componentPath: "../components/WaveEther",
    exportName: "WaveEther",
    schema: waveEtherSchema,
    defaults: waveEtherDefaults,
    files: [
      "src/components/WaveEther.tsx",
      "src/components/engines/waveEther.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Sine waves from multiple drifting sources interfere to create standing waves and moiré patterns.",
    tags: ["waves", "interference", "sine", "pixel"],
  },
  {
    id: "vortex-bloom",
    name: "Vortex Bloom",
    componentPath: "../components/VortexBloom",
    exportName: "VortexBloom",
    schema: vortexBloomSchema,
    defaults: vortexBloomDefaults,
    files: [
      "src/components/VortexBloom.tsx",
      "src/components/engines/vortexBloom.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Particles spiral under competing vortex attractors, accumulating into mandala-like formations.",
    tags: ["particles", "vortex", "orbital", "mandala"],
  },
  {
    id: "crystalline-drift",
    name: "Crystalline Drift",
    componentPath: "../components/CrystallineDrift",
    exportName: "CrystallineDrift",
    schema: crystallineDriftSchema,
    defaults: crystallineDriftDefaults,
    files: [
      "src/components/CrystallineDrift.tsx",
      "src/components/engines/crystallineDrift.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Recursive branching arms grow from the center, forming snowflake-like crystal mandala structures.",
    tags: ["fractal", "crystal", "symmetry", "dendrite"],
  },
  {
    id: "ambient-mesh",
    name: "Ambient Mesh",
    componentPath: "../components/AmbientMesh",
    exportName: "AmbientMesh",
    schema: ambientMeshSchema,
    defaults: ambientMeshDefaults,
    files: [
      "src/components/AmbientMesh.tsx",
      "src/components/engines/ambientMesh.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Nodes drift through noise fields, forming dynamic connections — a living network background.",
    tags: ["network", "nodes", "mesh", "subtle"],
  },
  {
    id: "ember-cascade",
    name: "Ember Cascade",
    componentPath: "../components/EmberCascade",
    exportName: "EmberCascade",
    schema: emberCascadeSchema,
    defaults: emberCascadeDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/EmberCascade.tsx",
      "src/components/engines/emberCascade.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Thermal particles rise with turbulent motion, glowing through temperature-based color gradients.",
    tags: ["particles", "fire", "thermal", "glow"],
  },
  {
    id: "clifford-attractor",
    name: "Clifford Attractor",
    componentPath: "../components/CliffordAttractor",
    exportName: "CliffordAttractor",
    schema: cliffordAttractorSchema,
    defaults: cliffordAttractorDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/CliffordAttractor.tsx",
      "src/components/engines/cliffordAttractor.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Strange attractor density map revealing the fractal structure of chaotic orbital dynamics.",
    tags: ["attractor", "chaos", "fractal", "mathematical"],
  },
  {
    id: "harmonic-lattice",
    name: "Harmonic Lattice",
    componentPath: "../components/HarmonicLattice",
    exportName: "HarmonicLattice",
    schema: harmonicLatticeSchema,
    defaults: harmonicLatticeDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/HarmonicLattice.tsx",
      "src/components/engines/harmonicLattice.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Two-dimensional standing wave interference patterns with temporal evolution and nodal lines.",
    tags: ["waves", "interference", "harmonic", "mathematical"],
  },
  {
    id: "lissajous-weave",
    name: "Lissajous Weave",
    componentPath: "../components/LissajousWeave",
    exportName: "LissajousWeave",
    schema: lissajousWeaveSchema,
    defaults: lissajousWeaveDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/LissajousWeave.tsx",
      "src/components/engines/lissajousWeave.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Multiple Lissajous curves with different frequency ratios morphing through shared phase offset.",
    tags: ["parametric", "harmonic", "curves", "mathematical"],
  },
  {
    id: "phyllotaxis-dream",
    name: "Phyllotaxis Dream",
    componentPath: "../components/PhyllotaxisDream",
    exportName: "PhyllotaxisDream",
    schema: phyllotaxisDreamSchema,
    defaults: phyllotaxisDreamDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/PhyllotaxisDream.tsx",
      "src/components/engines/phyllotaxisDream.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Golden angle spiral growth pattern inspired by sunflower seed arrangements and natural phyllotaxis.",
    tags: ["spiral", "golden-ratio", "botanical", "mathematical"],
  },
  {
    id: "spirograph",
    name: "Spirograph",
    componentPath: "../components/Spirograph",
    exportName: "Spirograph",
    schema: spirographSchema,
    defaults: spirographDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/Spirograph.tsx",
      "src/components/engines/spirograph.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Hypotrochoid curves traced by rolling circles, creating intricate geometric rosettes and patterns.",
    tags: ["geometric", "parametric", "curves", "mathematical"],
  },
  {
    id: "differential-growth",
    name: "Differential Growth",
    componentPath: "../components/DifferentialGrowth",
    exportName: "DifferentialGrowth",
    schema: differentialGrowthSchema,
    defaults: differentialGrowthDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/DifferentialGrowth.tsx",
      "src/components/engines/differentialGrowth.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Organic growth simulation with spring forces, repulsion, and noise-guided expansion creating folded forms.",
    tags: ["organic", "growth", "simulation", "biological"],
  },
  {
    id: "double-pendulum",
    name: "Double Pendulum",
    componentPath: "../components/DoublePendulum",
    exportName: "DoublePendulum",
    schema: doublePendulumSchema,
    defaults: doublePendulumDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/DoublePendulum.tsx",
      "src/components/engines/doublePendulum.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Chaotic dynamics visualization using RK4 integration showing diverging trajectories from similar initial conditions.",
    tags: ["chaos", "physics", "pendulum", "mathematical"],
  },
  {
    id: "fractal-noise-terrain",
    name: "Fractal Noise Terrain",
    componentPath: "../components/FractalNoiseTerrain",
    exportName: "FractalNoiseTerrain",
    schema: fractalNoiseTerrainSchema,
    defaults: fractalNoiseTerrainDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/FractalNoiseTerrain.tsx",
      "src/components/engines/fractalNoiseTerrain.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Layered octaves of Perlin noise creating procedural landscapes with elevation-based coloring.",
    tags: ["fractal", "terrain", "noise", "landscape"],
  },
  {
    id: "moire-lattice",
    name: "Moire Lattice",
    componentPath: "../components/MoireLattice",
    exportName: "MoireLattice",
    schema: moireLatticeSchema,
    defaults: moireLatticeDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/MoireLattice.tsx",
      "src/components/engines/moireLattice.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Rotating line grids creating interference patterns and moiré effects through overlapping parallel lines.",
    tags: ["geometric", "moire", "interference", "lines"],
  },
  {
    id: "neural-weave",
    name: "Neural Weave",
    componentPath: "../components/NeuralWeave",
    exportName: "NeuralWeave",
    schema: neuralWeaveSchema,
    defaults: neuralWeaveDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/NeuralWeave.tsx",
      "src/components/engines/neuralWeave.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Network of nodes with traveling signal pulses creating dynamic neural-like activation patterns.",
    tags: ["network", "neural", "signals", "nodes"],
  },
  {
    id: "orbital-resonance",
    name: "Orbital Resonance",
    componentPath: "../components/OrbitalResonance",
    exportName: "OrbitalResonance",
    schema: orbitalResonanceSchema,
    defaults: orbitalResonanceDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/OrbitalResonance.tsx",
      "src/components/engines/orbitalResonance.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Bodies orbit at resonant period ratios creating harmonic patterns and Lissajous-like trajectories.",
    tags: ["orbital", "resonance", "harmonic", "physics"],
  },
  {
    id: "reaction-diffusion",
    name: "Reaction Diffusion",
    componentPath: "../components/ReactionDiffusion",
    exportName: "ReactionDiffusion",
    schema: reactionDiffusionSchema,
    defaults: reactionDiffusionDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/ReactionDiffusion.tsx",
      "src/components/engines/reactionDiffusion.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Gray-Scott model creating organic pattern formation through chemical reaction simulation.",
    tags: ["reaction-diffusion", "organic", "pattern", "simulation"],
  },
  {
    id: "recursive-subdivision",
    name: "Recursive Subdivision",
    componentPath: "../components/RecursiveSubdivision",
    exportName: "RecursiveSubdivision",
    schema: recursiveSubdivisionSchema,
    defaults: recursiveSubdivisionDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/RecursiveSubdivision.tsx",
      "src/components/engines/recursiveSubdivision.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Binary space partitioning creating Mondrian-like compositions with golden ratio splits.",
    tags: ["geometric", "subdivision", "mondrian", "recursive"],
  },
  {
    id: "tide-harmonics",
    name: "Tide Harmonics",
    componentPath: "../components/TideHarmonics",
    exportName: "TideHarmonics",
    schema: tideHarmonicsSchema,
    defaults: tideHarmonicsDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/TideHarmonics.tsx",
      "src/components/engines/tideHarmonics.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Multiple wave sources creating interference patterns along horizontal lines like ocean tides.",
    tags: ["waves", "interference", "harmonic", "ocean"],
  },
  {
    id: "voronoi-mosaic",
    name: "Voronoi Mosaic",
    componentPath: "../components/VoronoiMosaic",
    exportName: "VoronoiMosaic",
    schema: voronoiMosaicSchema,
    defaults: voronoiMosaicDefaults as unknown as Record<string, unknown>,
    files: [
      "src/components/VoronoiMosaic.tsx",
      "src/components/engines/voronoiMosaic.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Moving seed points creating dynamic Voronoi tessellation with edge-enhanced cells.",
    tags: ["voronoi", "tessellation", "mosaic", "geometric"],
  },
  {
    id: "background-studio",
    name: "Background Studio",
    componentPath: "../components/BackgroundStudio",
    exportName: "BackgroundStudio",
    schema: [],
    defaults: {},
    files: [
      "src/components/BackgroundStudio.tsx",
      "src/components/FlowCurrents.tsx",
      "src/components/GravityStorm.tsx",
      "src/components/GeoPulse.tsx",
      "src/components/WaveEther.tsx",
      "src/components/VortexBloom.tsx",
      "src/components/CrystallineDrift.tsx",
      "src/components/AmbientMesh.tsx",
      "src/components/EmberCascade.tsx",
      "src/components/CliffordAttractor.tsx",
      "src/components/HarmonicLattice.tsx",
      "src/components/LissajousWeave.tsx",
      "src/components/PhyllotaxisDream.tsx",
      "src/components/Spirograph.tsx",
      "src/components/DifferentialGrowth.tsx",
      "src/components/DoublePendulum.tsx",
      "src/components/FractalNoiseTerrain.tsx",
      "src/components/MoireLattice.tsx",
      "src/components/NeuralWeave.tsx",
      "src/components/OrbitalResonance.tsx",
      "src/components/ReactionDiffusion.tsx",
      "src/components/RecursiveSubdivision.tsx",
      "src/components/TideHarmonics.tsx",
      "src/components/VoronoiMosaic.tsx",
      "src/components/engines/flowCurrents.ts",
      "src/components/engines/gravityStorm.ts",
      "src/components/engines/geoPulse.ts",
      "src/components/engines/waveEther.ts",
      "src/components/engines/vortexBloom.ts",
      "src/components/engines/crystallineDrift.ts",
      "src/components/engines/ambientMesh.ts",
      "src/components/engines/emberCascade.ts",
      "src/components/engines/cliffordAttractor.ts",
      "src/components/engines/harmonicLattice.ts",
      "src/components/engines/lissajousWeave.ts",
      "src/components/engines/phyllotaxisDream.ts",
      "src/components/engines/spirograph.ts",
      "src/components/engines/differentialGrowth.ts",
      "src/components/engines/doublePendulum.ts",
      "src/components/engines/fractalNoiseTerrain.ts",
      "src/components/engines/moireLattice.ts",
      "src/components/engines/neuralWeave.ts",
      "src/components/engines/orbitalResonance.ts",
      "src/components/engines/reactionDiffusion.ts",
      "src/components/engines/recursiveSubdivision.ts",
      "src/components/engines/tideHarmonics.ts",
      "src/components/engines/voronoiMosaic.ts",
      "src/components/utils/noise.ts",
      "src/components/schemas/index.ts",
    ],
    description: "Interactive playground to explore and configure all backgrounds with live preview and code export.",
    tags: ["studio", "playground", "dev-tool"],
  },
];

/** Resolve a registry entry by id */
export function getBackground(id: string): RegistryEntry | undefined {
  return registry.find((e) => e.id === id);
}

/** All available background ids */
export const backgroundIds = registry.map((e) => e.id);

// Re-export components for convenience
export { FlowCurrents } from "../components/FlowCurrents";
export { GravityStorm } from "../components/GravityStorm";
export { GeoPulse } from "../components/GeoPulse";
export { WaveEther } from "../components/WaveEther";
export { VortexBloom } from "../components/VortexBloom";
export { CrystallineDrift } from "../components/CrystallineDrift";
export { AmbientMesh } from "../components/AmbientMesh";
export { EmberCascade } from "../components/EmberCascade";
export { CliffordAttractor } from "../components/CliffordAttractor";
export { HarmonicLattice } from "../components/HarmonicLattice";
export { LissajousWeave } from "../components/LissajousWeave";
export { PhyllotaxisDream } from "../components/PhyllotaxisDream";
export { Spirograph } from "../components/Spirograph";
export { DifferentialGrowth } from "../components/DifferentialGrowth";
export { DoublePendulum } from "../components/DoublePendulum";
export { FractalNoiseTerrain } from "../components/FractalNoiseTerrain";
export { MoireLattice } from "../components/MoireLattice";
export { NeuralWeave } from "../components/NeuralWeave";
export { OrbitalResonance } from "../components/OrbitalResonance";
export { ReactionDiffusion } from "../components/ReactionDiffusion";
export { RecursiveSubdivision } from "../components/RecursiveSubdivision";
export { TideHarmonics } from "../components/TideHarmonics";
export { VoronoiMosaic } from "../components/VoronoiMosaic";
export { BackgroundStudio } from "../components/BackgroundStudio";
