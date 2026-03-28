/**
 * BackgroundStudio — interactive playground for alg-art-backgrounds.
 *
 * Left panel: background selector + live parameter controls (auto-generated
 * from schema). Right panel: full canvas preview. Bottom sheet: code export.
 */

import { useState, useCallback } from "react";
import { FlowCurrents } from "./components/backgrounds/FlowCurrents";
import { GravityStorm } from "./components/backgrounds/GravityStorm";
import { GeoPulse } from "./components/backgrounds/GeoPulse";
import { WaveEther } from "./components/backgrounds/WaveEther";
import { VortexBloom } from "./components/backgrounds/VortexBloom";
import { CrystallineDrift } from "./components/backgrounds/CrystallineDrift";
import { AmbientMesh } from "./components/backgrounds/AmbientMesh";
import { EmberCascade } from "./components/backgrounds/EmberCascade";
import { CliffordAttractor } from "./components/backgrounds/CliffordAttractor";
import { HarmonicLattice } from "./components/backgrounds/HarmonicLattice";
import { LissajousWeave } from "./components/backgrounds/LissajousWeave";
import { PhyllotaxisDream } from "./components/backgrounds/PhyllotaxisDream";
import { Spirograph } from "./components/backgrounds/Spirograph";
import { DifferentialGrowth } from "./components/backgrounds/DifferentialGrowth";
import { DoublePendulum } from "./components/backgrounds/DoublePendulum";
import { FractalNoiseTerrain } from "./components/backgrounds/FractalNoiseTerrain";
import { MoireLattice } from "./components/backgrounds/MoireLattice";
import { NeuralWeave } from "./components/backgrounds/NeuralWeave";
import { OrbitalResonance } from "./components/backgrounds/OrbitalResonance";
import { ReactionDiffusion } from "./components/backgrounds/ReactionDiffusion";
import { RecursiveSubdivision } from "./components/backgrounds/RecursiveSubdivision";
import { TideHarmonics } from "./components/backgrounds/TideHarmonics";
import { VoronoiMosaic } from "./components/backgrounds/VoronoiMosaic";
import {
  flowCurrentsSchema,   flowCurrentsDefaults,
  gravityStormSchema,   gravityStormDefaults,
  geoPulseSchema,       geoPulseDefaults,
  waveEtherSchema,      waveEtherDefaults,
  vortexBloomSchema,    vortexBloomDefaults,
  crystallineDriftSchema,  crystallineDriftDefaults,
  ambientMeshSchema,    ambientMeshDefaults,
  emberCascadeSchema,   emberCascadeDefaults,
  cliffordAttractorSchema, cliffordAttractorDefaults,
  harmonicLatticeSchema,   harmonicLatticeDefaults,
  lissajousWeaveSchema, lissajousWeaveDefaults,
  phyllotaxisDreamSchema,  phyllotaxisDreamDefaults,
  spirographSchema,     spirographDefaults,
  differentialGrowthSchema, differentialGrowthDefaults,
  doublePendulumSchema, doublePendulumDefaults,
  fractalNoiseTerrainSchema, fractalNoiseTerrainDefaults,
  moireLatticeSchema,   moireLatticeDefaults,
  neuralWeaveSchema,    neuralWeaveDefaults,
  orbitalResonanceSchema,  orbitalResonanceDefaults,
  reactionDiffusionSchema, reactionDiffusionDefaults,
  recursiveSubdivisionSchema, recursiveSubdivisionDefaults,
  tideHarmonicsSchema,  tideHarmonicsDefaults,
  voronoiMosaicSchema,  voronoiMosaicDefaults,
  type ParamSchema,
} from "./components/schemas";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type BackgroundId =
  | "flow-currents" | "gravity-storm" | "geo-pulse" | "wave-ether"
  | "vortex-bloom" | "crystalline-drift" | "ambient-mesh" | "ember-cascade"
  | "clifford-attractor" | "harmonic-lattice" | "lissajous-weave"
  | "phyllotaxis-dream" | "spirograph" | "differential-growth"
  | "double-pendulum" | "fractal-noise-terrain" | "moire-lattice"
  | "neural-weave" | "orbital-resonance" | "reaction-diffusion"
  | "recursive-subdivision" | "tide-harmonics" | "voronoi-mosaic";

type AnyParams = Record<string, number | string | boolean>;

interface BackgroundEntry {
  id: BackgroundId;
  label: string;
  schema: ParamSchema[];
  defaults: AnyParams;
  Component: (props: any) => JSX.Element;
  description: string;
}

const BACKGROUNDS: BackgroundEntry[] = [
  { id: "flow-currents",         label: "Flow Currents",         schema: flowCurrentsSchema,         defaults: flowCurrentsDefaults as AnyParams,                      Component: FlowCurrents,         description: "Particles trace Perlin noise vector fields." },
  { id: "gravity-storm",         label: "Gravity Storm",         schema: gravityStormSchema,         defaults: gravityStormDefaults as AnyParams,                      Component: GravityStorm,         description: "Orbital particle choreography around moving attractors." },
  { id: "geo-pulse",             label: "Geo Pulse",             schema: geoPulseSchema,             defaults: geoPulseDefaults as AnyParams,                          Component: GeoPulse,             description: "Nested rotating polygons at prime-ratio angular velocities." },
  { id: "wave-ether",            label: "Wave Ether",            schema: waveEtherSchema,            defaults: waveEtherDefaults as AnyParams,                         Component: WaveEther,            description: "Multi-source interference waves across a pixel grid." },
  { id: "vortex-bloom",          label: "Vortex Bloom",          schema: vortexBloomSchema,          defaults: vortexBloomDefaults as AnyParams,                       Component: VortexBloom,          description: "Particles spiral under competing vortex attractors." },
  { id: "crystalline-drift",     label: "Crystalline Drift",     schema: crystallineDriftSchema,     defaults: crystallineDriftDefaults as AnyParams,                  Component: CrystallineDrift,     description: "Recursive branching arms form snowflake-like crystals." },
  { id: "ambient-mesh",          label: "Ambient Mesh",          schema: ambientMeshSchema,          defaults: ambientMeshDefaults as AnyParams,                       Component: AmbientMesh,          description: "Nodes drift through noise fields forming dynamic connections." },
  { id: "ember-cascade",         label: "Ember Cascade",         schema: emberCascadeSchema,         defaults: emberCascadeDefaults as unknown as AnyParams,           Component: EmberCascade,         description: "Thermal particles rise with turbulent motion and glow." },
  { id: "clifford-attractor",    label: "Clifford Attractor",    schema: cliffordAttractorSchema,    defaults: cliffordAttractorDefaults as unknown as AnyParams,      Component: CliffordAttractor,    description: "Strange attractor density map revealing fractal chaos." },
  { id: "harmonic-lattice",      label: "Harmonic Lattice",      schema: harmonicLatticeSchema,      defaults: harmonicLatticeDefaults as unknown as AnyParams,        Component: HarmonicLattice,      description: "Standing wave interference patterns with nodal lines." },
  { id: "lissajous-weave",       label: "Lissajous Weave",       schema: lissajousWeaveSchema,       defaults: lissajousWeaveDefaults as unknown as AnyParams,         Component: LissajousWeave,       description: "Harmonic phase tapestry with multiple frequency ratios." },
  { id: "phyllotaxis-dream",     label: "Phyllotaxis Dream",     schema: phyllotaxisDreamSchema,     defaults: phyllotaxisDreamDefaults as unknown as AnyParams,       Component: PhyllotaxisDream,     description: "Golden angle spiral growth pattern." },
  { id: "spirograph",            label: "Spirograph",            schema: spirographSchema,           defaults: spirographDefaults as unknown as AnyParams,             Component: Spirograph,           description: "Hypotrochoid curves from rolling circles." },
  { id: "differential-growth",   label: "Differential Growth",   schema: differentialGrowthSchema,   defaults: differentialGrowthDefaults as unknown as AnyParams,    Component: DifferentialGrowth,   description: "Organic growth with spring forces and repulsion." },
  { id: "double-pendulum",       label: "Double Pendulum",       schema: doublePendulumSchema,       defaults: doublePendulumDefaults as unknown as AnyParams,         Component: DoublePendulum,       description: "Chaotic dynamics with RK4 integration." },
  { id: "fractal-noise-terrain", label: "Fractal Noise Terrain", schema: fractalNoiseTerrainSchema,  defaults: fractalNoiseTerrainDefaults as unknown as AnyParams,   Component: FractalNoiseTerrain,  description: "Layered octaves creating procedural landscapes." },
  { id: "moire-lattice",         label: "Moire Lattice",         schema: moireLatticeSchema,         defaults: moireLatticeDefaults as unknown as AnyParams,           Component: MoireLattice,         description: "Rotating line grids creating interference patterns." },
  { id: "neural-weave",          label: "Neural Weave",          schema: neuralWeaveSchema,          defaults: neuralWeaveDefaults as unknown as AnyParams,            Component: NeuralWeave,          description: "Network nodes with traveling signal pulses." },
  { id: "orbital-resonance",     label: "Orbital Resonance",     schema: orbitalResonanceSchema,     defaults: orbitalResonanceDefaults as unknown as AnyParams,       Component: OrbitalResonance,     description: "Bodies orbit at resonant period ratios." },
  { id: "reaction-diffusion",    label: "Reaction Diffusion",    schema: reactionDiffusionSchema,    defaults: reactionDiffusionDefaults as unknown as AnyParams,      Component: ReactionDiffusion,    description: "Gray-Scott model pattern formation." },
  { id: "recursive-subdivision", label: "Recursive Subdivision", schema: recursiveSubdivisionSchema, defaults: recursiveSubdivisionDefaults as unknown as AnyParams,  Component: RecursiveSubdivision, description: "Binary space partitioning (Mondrian-like)." },
  { id: "tide-harmonics",        label: "Tide Harmonics",        schema: tideHarmonicsSchema,        defaults: tideHarmonicsDefaults as unknown as AnyParams,          Component: TideHarmonics,        description: "Wave interference along horizontal lines." },
  { id: "voronoi-mosaic",        label: "Voronoi Mosaic",        schema: voronoiMosaicSchema,        defaults: voronoiMosaicDefaults as unknown as AnyParams,          Component: VoronoiMosaic,        description: "Dynamic Voronoi tessellation." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Code export generators
// ─────────────────────────────────────────────────────────────────────────────

function generateUsageSnippet(bg: BackgroundEntry, params: AnyParams): string {
  const name = bg.id.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
  const changed = bg.schema
    .filter((s) => params[s.name] !== s.default)
    .map((s) => {
      const v = params[s.name];
      return s.type === "color" || s.type === "select" ? `  ${s.name}="${v}"` : `  ${s.name}={${v}}`;
    });
  return changed.length === 0 ? `<${name} />` : `<${name}\n${changed.join("\n")}\n/>`;
}

function generateFullComponent(bg: BackgroundEntry): string {
  const name = bg.id.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
  return (
    `import { ${name} } from "alg-art-backgrounds";\n\n` +
    `export default function MyPage() {\n` +
    `  return (\n` +
    `    <div style={{ position: "relative", height: "100vh" }}>\n` +
    `      <${name}\n` +
    `        style={{ position: "absolute", inset: 0 }}\n` +
    `      />\n` +
    `      <div style={{ position: "relative", zIndex: 1 }}>\n` +
    `        {/* your content here */}\n` +
    `      </div>\n` +
    `    </div>\n` +
    `  );\n` +
    `}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Control sub-components
// ─────────────────────────────────────────────────────────────────────────────

type NumberParam  = Extract<ParamSchema, { type: "number" }>;
type ColorParam   = Extract<ParamSchema, { type: "color" }>;
type BooleanParam = Extract<ParamSchema, { type: "boolean" }>;

function SliderRow({ param, value, onChange }: {
  param: NumberParam; value: number; onChange: (v: number) => void;
}) {
  const display = param.step < 0.01 ? value.toFixed(4) : param.step < 0.1 ? value.toFixed(3) : param.step < 1 ? value.toFixed(2) : String(value);
  return (
    <div className="py-2.5 border-b border-border/50 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-ink font-medium font-sans">{param.label}</span>
        <span className="text-[11px] font-mono text-accent bg-accent-soft rounded px-1.5 py-0.5 shrink-0">
          {display}
        </span>
      </div>
      <input
        type="range" min={param.min} max={param.max} step={param.step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-accent"
      />
    </div>
  );
}

function ColorRow({ param, value, onChange }: {
  param: ColorParam; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
      <span className="text-[12px] text-ink font-medium font-sans truncate mr-2">{param.label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-muted font-mono">{value}</span>
        <div className="w-6 h-6 rounded-md border border-border/60 overflow-hidden cursor-pointer">
          <input
            type="color" value={value} onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 p-0 -ml-1 -mt-1 cursor-pointer border-0 block"
          />
        </div>
      </div>
    </div>
  );
}

function BooleanRow({ param, value, onChange }: {
  param: BooleanParam; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
      <span className="text-[12px] text-ink font-medium font-sans truncate mr-2">{param.label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-8 h-4.5 rounded-full border-0 cursor-pointer shrink-0 transition-colors duration-200 ${value ? "bg-accent" : "bg-faint"}`}
      >
        <span className={`absolute w-3.5 h-3.5 top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-3.5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  return (
    <div className="rounded-[10px] overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-[7px] bg-faint border-b border-border">
        <span className="text-[12px] text-muted font-mono">snippet</span>
        <button
          onClick={onCopy}
          className="bg-transparent border border-border rounded-[5px] text-[11px] text-muted px-2.5 py-0.5 cursor-pointer font-sans hover:text-ink transition-colors"
        >
          copy
        </button>
      </div>
      <pre className="bg-surface px-6 py-5 text-[13px] leading-[1.75] text-ink overflow-x-auto font-mono m-0 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

export function BackgroundStudio({ initialBg }: { initialBg?: string } = {}) {
  const [activeId, setActiveId] = useState<BackgroundId>(
    (initialBg && BACKGROUNDS.some((b) => b.id === initialBg) ? initialBg : "flow-currents") as BackgroundId
  );
  const [searchQuery, setSearchQuery]   = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportOpen, setExportOpen]     = useState(false);
  const [exportTab, setExportTab]       = useState<"usage" | "full">("usage");
  const [copied, setCopied]             = useState(false);

  const [paramMap, setParamMap] = useState<Record<BackgroundId, AnyParams>>({
    "flow-currents":         { ...(flowCurrentsDefaults as AnyParams) },
    "gravity-storm":         { ...(gravityStormDefaults as AnyParams) },
    "geo-pulse":             { ...(geoPulseDefaults as AnyParams) },
    "wave-ether":            { ...(waveEtherDefaults as AnyParams) },
    "vortex-bloom":          { ...(vortexBloomDefaults as AnyParams) },
    "crystalline-drift":     { ...(crystallineDriftDefaults as AnyParams) },
    "ambient-mesh":          { ...(ambientMeshDefaults as AnyParams) },
    "ember-cascade":         { ...(emberCascadeDefaults as unknown as AnyParams) },
    "clifford-attractor":    { ...(cliffordAttractorDefaults as unknown as AnyParams) },
    "harmonic-lattice":      { ...(harmonicLatticeDefaults as unknown as AnyParams) },
    "lissajous-weave":       { ...(lissajousWeaveDefaults as unknown as AnyParams) },
    "phyllotaxis-dream":     { ...(phyllotaxisDreamDefaults as unknown as AnyParams) },
    "spirograph":            { ...(spirographDefaults as unknown as AnyParams) },
    "differential-growth":   { ...(differentialGrowthDefaults as unknown as AnyParams) },
    "double-pendulum":       { ...(doublePendulumDefaults as unknown as AnyParams) },
    "fractal-noise-terrain": { ...(fractalNoiseTerrainDefaults as unknown as AnyParams) },
    "moire-lattice":         { ...(moireLatticeDefaults as unknown as AnyParams) },
    "neural-weave":          { ...(neuralWeaveDefaults as unknown as AnyParams) },
    "orbital-resonance":     { ...(orbitalResonanceDefaults as unknown as AnyParams) },
    "reaction-diffusion":    { ...(reactionDiffusionDefaults as unknown as AnyParams) },
    "recursive-subdivision": { ...(recursiveSubdivisionDefaults as unknown as AnyParams) },
    "tide-harmonics":        { ...(tideHarmonicsDefaults as unknown as AnyParams) },
    "voronoi-mosaic":        { ...(voronoiMosaicDefaults as unknown as AnyParams) },
  });

  const bg     = BACKGROUNDS.find((b) => b.id === activeId)!;
  const params = paramMap[activeId];

  const setParam = useCallback((name: string, value: number | string | boolean) => {
    setParamMap((prev) => ({ ...prev, [activeId]: { ...prev[activeId], [name]: value } }));
  }, [activeId]);

  const resetParams = useCallback(() => {
    setParamMap((prev) => ({ ...prev, [activeId]: { ...bg.defaults } }));
  }, [activeId, bg.defaults]);

  const randomSeed = useCallback(() => {
    setParam("seed", Math.floor(Math.random() * 999999) + 1);
  }, [setParam]);

  const copyCode = () => {
    const code = exportTab === "usage" ? generateUsageSnippet(bg, params) : generateFullComponent(bg);
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const filtered = BACKGROUNDS.filter((b) =>
    b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportCode = exportTab === "usage" ? generateUsageSnippet(bg, params) : generateFullComponent(bg);

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans text-ink">

      {/* ── SIDEBAR ───────────────────────────────────────────────── */}
      <aside className="w-70 shrink-0 bg-surface border-r border-border flex flex-col overflow-y-auto overflow-x-hidden">

        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6.5 h-6.5 rounded-[7px] bg-accent flex items-center justify-center text-[12px] font-bold text-white font-display shrink-0">
              A
            </div>
            <span className="text-[13px] font-bold tracking-[-0.01em] font-display">
              Background Studio
            </span>
          </div>
          <a
            href="/"
            className="text-[12px] font-mono text-muted px-2.5 py-1 rounded-md border border-border hover:text-ink hover:border-border-hover transition-colors no-underline"
          >
            ← Home
          </a>
        </div>

        {/* Background selector */}
        <div className="px-4 pt-4 pb-0">
          <div className="text-[10px] text-muted font-semibold tracking-[0.12em] uppercase font-mono mb-3">
            Background
          </div>

          {/* Selected item */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-faint border rounded-[9px] cursor-pointer transition-colors text-left ${dropdownOpen ? "border-border-hover" : "border-border hover:border-border-hover"} ${dropdownOpen ? "mb-2.5" : "mb-4"}`}
          >
            <span className="text-[13px] text-ink font-medium">{bg.label}</span>
            <span className={`text-[11px] text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search backgrounds…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-faint border border-border rounded-lg px-3.5 py-2.5 text-[13px] text-ink font-sans outline-none mb-2 focus:border-border-hover transition-colors"
              />
              <div className="max-h-64 overflow-y-auto border border-border rounded-[9px] bg-bg">
                {filtered.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => { setActiveId(b.id); setDropdownOpen(false); setSearchQuery(""); }}
                    className={`w-full text-left px-3.5 py-2.5 text-[13px] cursor-pointer transition-colors border-b border-border last:border-0 ${activeId === b.id ? "bg-accent text-white font-semibold" : "text-ink hover:bg-faint"}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-[12px] text-muted leading-[1.65] mb-4 font-sans">{bg.description}</p>
        </div>

        <div className="border-t border-border" />

        {/* Parameters */}
        <div className="px-4 pt-3.5 pb-0 flex-1">
          <div className="text-[10px] text-muted font-semibold tracking-[0.12em] uppercase font-mono mb-1">
            Parameters
          </div>
          {bg.schema.map((s) => {
            const v = params[s.name];
            if (s.type === "number")  return <SliderRow  key={s.name} param={s as NumberParam}  value={v as number}  onChange={(n) => setParam(s.name, n)} />;
            if (s.type === "color")   return <ColorRow   key={s.name} param={s as ColorParam}   value={v as string}  onChange={(n) => setParam(s.name, n)} />;
            if (s.type === "boolean") return <BooleanRow key={s.name} param={s as BooleanParam} value={v as boolean} onChange={(n) => setParam(s.name, n)} />;
            return null;
          })}
        </div>

        {/* Actions */}
        <div className="px-4 py-4 flex flex-col gap-2 border-t border-border shrink-0">
          <div className="flex gap-2">
            <button
              onClick={randomSeed}
              className="flex-1 bg-transparent border border-border rounded-lg text-[12px] text-blue font-medium py-2 cursor-pointer hover:border-border-hover transition-colors"
            >
              ↻ Random Seed
            </button>
            <button
              onClick={resetParams}
              className="flex-1 bg-transparent border border-border rounded-lg text-[12px] text-muted font-medium py-2 cursor-pointer hover:border-border-hover hover:text-ink transition-colors"
            >
              Reset
            </button>
          </div>
          <button
            onClick={() => setExportOpen((o) => !o)}
            className="w-full bg-accent border-none rounded-lg text-white text-[13px] font-semibold py-2.25 cursor-pointer hover:opacity-90 transition-opacity font-display"
          >
            {exportOpen ? "Hide Code" : "Export Code"} ↗
          </button>
        </div>

        {/* Install hint */}
        <div className="px-4 pb-4 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-faint border border-border">
            <span className="text-accent text-[12px] font-mono shrink-0">$</span>
            <span className="text-[11px] text-muted font-mono overflow-hidden text-ellipsis whitespace-nowrap">
              npx alg-art-backgrounds add {activeId}
            </span>
          </div>
        </div>
      </aside>

      {/* ── PREVIEW ───────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden flex flex-col">

        {/* Canvas */}
        <div className="flex-1 relative">
          <bg.Component
            {...params}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>

        {/* Export panel */}
        {exportOpen && (
          <div className="bg-[rgba(13,13,21,0.97)] backdrop-blur-[16px] border-t border-border max-h-[42%] overflow-y-auto shrink-0">

            {/* Tab bar — matches BackgroundView */}
            <div className="flex items-center justify-between px-5 border-b border-border">
              <div className="flex">
                {(["usage", "full"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setExportTab(tab)}
                    className={`flex items-center px-4 py-2.5 text-[13px] font-sans cursor-pointer border-0 bg-transparent -mb-px border-b-2 transition-colors ${exportTab === tab ? "text-ink font-medium border-b-accent" : "text-muted font-normal border-b-transparent"}`}
                  >
                    {tab === "usage" ? "Usage" : "Full File"}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setExportOpen(false)}
                className="bg-transparent border-none text-muted text-[18px] cursor-pointer px-1 leading-none hover:text-ink transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <CodeBlock code={exportCode} onCopy={copyCode} />
              {copied && (
                <span className="text-[12px] text-green font-mono">✓ Copied to clipboard</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
