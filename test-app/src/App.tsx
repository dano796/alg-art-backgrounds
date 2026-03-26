import { useState, useEffect, useRef, type CSSProperties } from "react";
import {
  FlowCurrents,
  WaveEther,
  GravityStorm,
  GeoPulse,
  BackgroundStudio,
} from "alg-art-backgrounds";

// ─── Design Tokens ──────────────────────────────────────────────────────────

const C = {
  bg:          "#0c0c14",
  surface:     "#13131f",
  surfaceHigh: "#181828",
  border:      "#1e1e30",
  borderHover: "rgba(217,119,87,0.35)",
  accent:      "#d97757",
  accentSoft:  "rgba(217,119,87,0.1)",
  accentBorder:"rgba(217,119,87,0.25)",
  text:        "#e8e6dc",
  muted:       "#6b6a78",
  faint:       "#2a2a3e",
  blue:        "#6a9bcc",
  green:       "#788c5d",
};

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ onStudioClick }: { onStudioClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position:    "fixed",
        top: 0, left: 0, right: 0,
        zIndex:      200,
        height:      58,
        padding:     "0 32px",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "space-between",
        background:  scrolled ? "rgba(12,12,20,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition:  "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28, height: 28,
            borderRadius: 7,
            background: C.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff",
            fontFamily: "Syne, sans-serif",
            flexShrink: 0,
          }}
        >
          A
        </div>
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: C.text,
            letterSpacing: "-0.01em",
          }}
        >
          alg-art-backgrounds
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <NavBtn onClick={onStudioClick}>Studio</NavBtn>
        <NavLink href="#gallery">Gallery</NavLink>
        <NavLink href="#docs">Docs</NavLink>
        <a
          href="https://github.com/dano796/alg-art-backgrounds"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:    "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 10,
            padding:    "7px 16px",
            background: C.accent,
            borderRadius: 8,
            color: "#fff",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "Syne, sans-serif",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          <GitHubIcon /> GitHub
        </a>
      </div>
    </nav>
  );
}

function NavBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:    "7px 14px",
        background: "none",
        border:     "none",
        color:      C.muted,
        fontSize:   13,
        cursor:     "pointer",
        fontFamily: "DM Sans, sans-serif",
        borderRadius: 6,
      }}
    >
      {children}
    </button>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        padding:        "7px 14px",
        color:          C.muted,
        fontSize:       13,
        textDecoration: "none",
        fontFamily:     "DM Sans, sans-serif",
        borderRadius:   6,
        display:        "inline-block",
      }}
    >
      {children}
    </a>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection({ onStudioClick }: { onStudioClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const cmd = "npx alg-art-backgrounds add flow-currents";

  const copyCmd = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        position:   "relative",
        height:     "100vh",
        minHeight:  600,
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow:   "hidden",
      }}
    >
      {/* Live canvas background */}
      <FlowCurrents
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        count={2200}
        speed={0.75}
        colorWarm="#d97757"
        colorCool="#6a9bcc"
        colorAccent="#788c5d"
        trailOpacity={6}
        noiseEvol={0.0004}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(12,12,20,0.2) 0%, rgba(12,12,20,0.72) 65%, rgba(12,12,20,0.97) 100%)",
          ].join(","),
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position:  "relative",
          textAlign: "center",
          maxWidth:  760,
          padding:   "0 24px",
        }}
      >
        {/* Badge */}
        <div
          className="hero-badge"
          style={{
            display:    "inline-flex",
            alignItems: "center",
            gap: 8,
            padding:    "5px 14px",
            background: C.accentSoft,
            border:     `1px solid ${C.accentBorder}`,
            borderRadius: 100,
            fontSize:   11,
            color:      C.accent,
            fontWeight: 600,
            letterSpacing: "0.08em",
            marginBottom: 28,
            fontFamily: "JetBrains Mono, monospace",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: C.accent,
              display: "inline-block",
              animation: "pulseDot 1.8s ease-in-out infinite",
            }}
          />
          Zero Dependencies · Copy-paste · shadcn/ui Style
        </div>

        {/* Headline */}
        <h1
          className="hero-h1"
          style={{
            fontFamily:   "Syne, sans-serif",
            fontWeight:   800,
            fontSize:     "clamp(52px, 9vw, 96px)",
            lineHeight:   0.92,
            letterSpacing: "-0.045em",
            color:        C.text,
            marginBottom: 26,
          }}
        >
          Algorithmic Art
          <br />
          <span style={{ color: C.accent }}>for React</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub"
          style={{
            fontSize:   "clamp(16px, 2vw, 19px)",
            color:      C.muted,
            lineHeight: 1.65,
            margin:     "0 auto 40px",
            maxWidth:   540,
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          Four animated canvas backgrounds you own forever.
          Install with one command, customize every parameter,
          ship without adding a single npm dependency.
        </p>

        {/* CTA buttons */}
        <div
          className="hero-ctas"
          style={{
            display:   "flex",
            gap:       12,
            justifyContent: "center",
            flexWrap:  "wrap",
            marginBottom: 28,
          }}
        >
          <button
            onClick={onStudioClick}
            style={{
              padding:    "13px 30px",
              background: C.accent,
              border:     "none",
              borderRadius: 10,
              color:      "#fff",
              fontSize:   15,
              fontWeight: 700,
              cursor:     "pointer",
              fontFamily: "Syne, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Open Studio →
          </button>
          <a
            href="#gallery"
            style={{
              padding:    "13px 28px",
              background: "rgba(255,255,255,0.04)",
              border:     `1px solid ${C.border}`,
              borderRadius: 10,
              color:      C.text,
              fontSize:   15,
              fontWeight: 500,
              cursor:     "pointer",
              textDecoration: "none",
              fontFamily: "DM Sans, sans-serif",
              display:    "inline-block",
            }}
          >
            See Backgrounds
          </a>
        </div>

        {/* Install command pill */}
        <div className="hero-cmd">
          <button
            onClick={copyCmd}
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        12,
              padding:    "10px 18px",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(14px)",
              border:     `1px solid ${C.border}`,
              borderRadius: 9,
              color:      C.muted,
              cursor:     "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize:   13,
            }}
          >
            <span style={{ color: C.accent, userSelect: "none" }}>$</span>
            <span>{cmd}</span>
            <span
              style={{
                padding:    "2px 9px",
                background: C.faint,
                borderRadius: 4,
                fontSize:   11,
                color:      copied ? C.green : C.muted,
                transition: "color 0.2s",
                flexShrink: 0,
              }}
            >
              {copied ? "copied ✓" : "copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll"
        style={{
          position:  "absolute",
          bottom:    30,
          left:      "50%",
          transform: "translateX(-50%)",
          display:   "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:       6,
          animation: "scrollBounce 2.4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: 1, height: 36,
            background: `linear-gradient(to bottom, ${C.muted}, transparent)`,
          }}
        />
        <span
          style={{
            fontSize:   10,
            color:      C.muted,
            letterSpacing: "0.14em",
            fontFamily: "JetBrains Mono, monospace",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

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
    id:   "flow-currents",
    name: "Flow Currents",
    tag:  "Perlin Noise · Particles",
    desc: "Thousands of particles trace Perlin noise vector fields, forming organic density maps that slowly evolve over time.",
    Component: FlowCurrents as React.ComponentType<BgComponentProps>,
    props: {
      count: 1600, speed: 0.8, trailOpacity: 6,
      colorWarm: "#d97757", colorCool: "#6a9bcc", colorAccent: "#788c5d",
    },
  },
  {
    id:   "wave-ether",
    name: "Wave Ether",
    tag:  "Interference Waves · Grid",
    desc: "Multi-source sine wave interference patterns ripple across a pixel grid, shifting between crest and trough colors.",
    Component: WaveEther as React.ComponentType<BgComponentProps>,
    props: {
      sources: 3, frequency: 0.018, waveSpeed: 0.025,
      colorCrest: "#00d4ff", colorTrough: "#0a0a2e", colorMid: "#7b2fff",
    },
  },
  {
    id:   "gravity-storm",
    name: "Gravity Storm",
    tag:  "N-Body · Attractors",
    desc: "Particles orbit moving gravitational attractors, trails painting a choreography of orbital dynamics on the canvas.",
    Component: GravityStorm as React.ComponentType<BgComponentProps>,
    props: {
      count: 900, attractors: 3, gravity: 1.0, turbulence: 0.5,
      colorCore: "#ff6b35", colorTrail: "#7b5ea7",
    },
  },
  {
    id:   "geo-pulse",
    name: "Geo Pulse",
    tag:  "Geometry · Rotation",
    desc: "Nested rotating polygons at prime-ratio angular velocities, pulsing in scale and connecting vertices across layers.",
    Component: GeoPulse as React.ComponentType<BgComponentProps>,
    props: {
      layers: 7, sides: 6, rotSpeed: 0.008, pulse: 0.12, connect: 0.4,
      colorPrimary: "#d97757", colorSecondary: "#6a9bcc", colorAccent: "#e8d87a",
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
      style={{
        background:   C.surface,
        border:       `1px solid ${C.border}`,
        borderRadius: 18,
        overflow:     "hidden",
        transition:   "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
        animation:    `cardIn 0.5s ease both`,
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor  = C.borderHover;
        el.style.transform    = "translateY(-3px)";
        el.style.boxShadow    = "0 16px 48px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor  = C.border;
        el.style.transform    = "translateY(0)";
        el.style.boxShadow    = "none";
      }}
    >
      {/* Live canvas preview */}
      <div style={{ position: "relative", height: 220, background: C.bg }}>
        <item.Component
          {...item.props}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        {/* Bottom fade-out */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: 64,
            background: `linear-gradient(to top, ${C.surface}, transparent)`,
            pointerEvents: "none",
          }}
        />
        {/* Tag chip */}
        <div
          style={{
            position:   "absolute",
            top:        12,
            left:       12,
            padding:    "4px 10px",
            background: "rgba(12,12,20,0.75)",
            backdropFilter: "blur(8px)",
            border:     `1px solid ${C.border}`,
            borderRadius: 100,
            fontSize:   10,
            color:      C.muted,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.04em",
          }}
        >
          {item.tag}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div
          style={{
            fontFamily:   "Syne, sans-serif",
            fontWeight:   700,
            fontSize:     18,
            color:        C.text,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          {item.name}
        </div>
        <p
          style={{
            fontSize:   13,
            color:      C.muted,
            lineHeight: 1.65,
            marginBottom: 18,
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          {item.desc}
        </p>

        {/* Copy install command */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          style={{
            width:      "100%",
            display:    "flex",
            alignItems: "center",
            gap:        8,
            padding:    "9px 13px",
            background: C.bg,
            border:     `1px solid ${C.border}`,
            borderRadius: 8,
            cursor:     "pointer",
            fontFamily: "JetBrains Mono, monospace",
            fontSize:   12,
            color:      C.muted,
            textAlign:  "left",
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = C.borderHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = C.border;
          }}
        >
          <span style={{ color: C.accent, flexShrink: 0, userSelect: "none" }}>
            $
          </span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {cmd}
          </span>
          <span
            style={{
              color:      copied ? C.green : C.muted,
              fontSize:   13,
              transition: "color 0.2s",
              flexShrink: 0,
            }}
          >
            {copied ? "✓" : "⎘"}
          </span>
        </button>
      </div>
    </div>
  );
}

function GallerySection() {
  return (
    <section
      id="gallery"
      style={{
        padding:   "110px 40px",
        maxWidth:  1120,
        margin:    "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 60, maxWidth: 580 }}>
        <div
          style={{
            fontFamily:  "JetBrains Mono, monospace",
            fontSize:    11,
            color:       C.accent,
            letterSpacing: "0.12em",
            fontWeight:  500,
            marginBottom: 14,
            textTransform: "uppercase",
          }}
        >
          Backgrounds
        </div>
        <h2
          style={{
            fontFamily:   "Syne, sans-serif",
            fontWeight:   800,
            fontSize:     "clamp(32px, 5vw, 52px)",
            letterSpacing: "-0.04em",
            color:        C.text,
            lineHeight:   1.0,
            marginBottom: 18,
          }}
        >
          Four distinct systems.
          <br />
          <span style={{ color: C.muted, fontWeight: 600 }}>
            Infinite configurations.
          </span>
        </h2>
        <p
          style={{
            fontSize:   15,
            color:      C.muted,
            lineHeight: 1.7,
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          Each background is a self-contained canvas renderer. Install one or all
          — you get the full source directly in your project with no npm dependency.
        </p>
      </div>

      {/* 2×2 grid */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap:                 22,
        }}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Studio Section ───────────────────────────────────────────────────────────

function StudioSection({
  studioRef,
}: {
  studioRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      id="studio"
      ref={studioRef}
      style={{ position: "relative", borderTop: `1px solid ${C.border}` }}
    >
      {/* Header bar */}
      <div
        style={{
          padding:        "20px 40px",
          background:     C.surface,
          borderBottom:   `1px solid ${C.border}`,
          display:        "flex",
          alignItems:     "center",
          gap:            20,
          flexWrap:       "wrap",
        }}
      >
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        8,
          }}
        >
          <div
            style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: C.accent,
              animation: "pulseDot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize:   15,
              color:      C.text,
            }}
          >
            Background Studio
          </span>
        </div>

        <div
          style={{ width: 1, height: 16, background: C.border, flexShrink: 0 }}
        />

        <div
          style={{
            fontSize:   12,
            color:      C.muted,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          Live parameter editor · Real-time preview · One-click code export
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            fontSize:     11,
            color:        C.muted,
            fontFamily:   "JetBrains Mono, monospace",
            padding:      "4px 10px",
            background:   C.bg,
            borderRadius: 6,
            border:       `1px solid ${C.border}`,
          }}
        >
          npx alg-art-backgrounds add background-studio
        </div>
      </div>

      {/* The studio itself */}
      <div style={{ height: "100vh" }}>
        <BackgroundStudio />
      </div>
    </section>
  );
}

// ─── Docs Section ─────────────────────────────────────────────────────────────

const SNIPPET_INSTALL = `# Add a single background
npx alg-art-backgrounds add flow-currents

# Add all backgrounds + the interactive studio
npx alg-art-backgrounds add background-studio

# Preview before installing
npx alg-art-backgrounds add wave-ether --dry-run

# List every available background
npx alg-art-backgrounds list`;

const SNIPPET_USAGE = `import { FlowCurrents } from "@/components/backgrounds/FlowCurrents";

export default function Page() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Background fills the container */}
      <FlowCurrents
        style={{ position: "absolute", inset: 0 }}
        speed={1.2}
        count={2500}
        colorWarm="#d97757"
        colorCool="#6a9bcc"
      />

      {/* Your content sits above the background */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <h1>Hello world</h1>
      </main>
    </div>
  );
}`;

const SNIPPET_NEXTJS = `// components/backgrounds/ClientFlowCurrents.tsx
"use client";
export { FlowCurrents } from "./FlowCurrents";

// Then import from the wrapper in your server components:
import { ClientFlowCurrents as FlowCurrents }
  from "@/components/backgrounds/ClientFlowCurrents";`;

function CodeBlock({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header */}
      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "9px 16px",
          background:     C.faint,
          borderRadius:   "9px 9px 0 0",
          borderBottom:   `1px solid ${C.border}`,
        }}
      >
        <span
          style={{
            fontSize:   12,
            color:      C.muted,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {label}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          style={{
            background:   "none",
            border:       `1px solid ${C.border}`,
            borderRadius: 5,
            color:        copied ? C.green : C.muted,
            fontSize:     11,
            padding:      "3px 10px",
            cursor:       "pointer",
            fontFamily:   "DM Sans, sans-serif",
            transition:   "color 0.2s",
          }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>

      {/* Code */}
      <pre
        style={{
          background:   C.surface,
          border:       `1px solid ${C.border}`,
          borderTop:    "none",
          borderRadius: "0 0 9px 9px",
          padding:      "20px 24px",
          fontSize:     13,
          lineHeight:   1.75,
          color:        C.text,
          overflowX:    "auto",
          fontFamily:   "JetBrains Mono, monospace",
          margin:       0,
          whiteSpace:   "pre",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function DocsSection() {
  return (
    <section
      id="docs"
      style={{
        padding:   "110px 40px 140px",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin:   "0 auto",
          display:  "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)",
          gap:      80,
          alignItems: "start",
        }}
      >
        {/* Left column — sticky context */}
        <div style={{ position: "sticky", top: 80 }}>
          <div
            style={{
              fontFamily:   "JetBrains Mono, monospace",
              fontSize:     11,
              color:        C.accent,
              letterSpacing: "0.12em",
              fontWeight:   500,
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Documentation
          </div>
          <h2
            style={{
              fontFamily:   "Syne, sans-serif",
              fontWeight:   800,
              fontSize:     "clamp(28px, 3vw, 40px)",
              letterSpacing: "-0.04em",
              color:        C.text,
              lineHeight:   1.1,
              marginBottom: 16,
            }}
          >
            Ship in minutes,
            <br />
            not hours.
          </h2>
          <p
            style={{
              fontSize:   14,
              color:      C.muted,
              lineHeight: 1.75,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              marginBottom: 36,
            }}
          >
            Components are copied directly into your project. No npm
            dependency to manage, no breaking-change risk, no lock-in —
            you own the source.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              "Zero runtime dependencies",
              "TypeScript with full inference",
              "Canvas 2D — no WebGL required",
              "React 18 & 19 compatible",
              "Seeded RNG for reproducible art",
              "ResizeObserver for responsive canvas",
              "MIT licensed — use anywhere",
            ].map((text) => (
              <div
                key={text}
                style={{ display: "flex", gap: 12, alignItems: "center" }}
              >
                <span
                  style={{
                    color:      C.accent,
                    fontSize:   14,
                    fontFamily: "monospace",
                    flexShrink: 0,
                  }}
                >
                  ⟶
                </span>
                <span
                  style={{
                    fontSize:   13,
                    color:      C.muted,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — code */}
        <div>
          <h3
            style={{
              fontFamily:   "Syne, sans-serif",
              fontWeight:   700,
              fontSize:     16,
              color:        C.text,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            1. Install
          </h3>
          <CodeBlock code={SNIPPET_INSTALL} label="terminal" />

          <h3
            style={{
              fontFamily:   "Syne, sans-serif",
              fontWeight:   700,
              fontSize:     16,
              color:        C.text,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              marginTop:    8,
            }}
          >
            2. Use
          </h3>
          <CodeBlock code={SNIPPET_USAGE} label="Page.tsx" />

          {/* Next.js callout */}
          <div
            style={{
              padding:      "18px 22px",
              background:   "rgba(106,155,204,0.06)",
              border:       "1px solid rgba(106,155,204,0.2)",
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display:    "flex",
                gap:        8,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 14 }}>⚡</span>
              <span
                style={{
                  fontSize:   14,
                  fontWeight: 700,
                  color:      C.blue,
                  fontFamily: "Syne, sans-serif",
                }}
              >
                Next.js note
              </span>
            </div>
            <p
              style={{
                fontSize:   13,
                color:      C.muted,
                lineHeight: 1.7,
                marginBottom: 16,
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Components use browser APIs (Canvas, ResizeObserver) so they need
              the{" "}
              <code
                style={{
                  fontFamily:   "JetBrains Mono, monospace",
                  fontSize:     12,
                  padding:      "1px 6px",
                  background:   C.bg,
                  borderRadius: 4,
                  color:        C.text,
                }}
              >
                "use client"
              </code>{" "}
              directive. Create a thin client wrapper:
            </p>
            <CodeBlock code={SNIPPET_NEXTJS} label="ClientBackground.tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        padding:   "28px 40px",
        display:   "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap:  "wrap",
        gap:       16,
        background: C.surface,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 24, height: 24,
            borderRadius: 6,
            background: C.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff",
            fontFamily: "Syne, sans-serif",
          }}
        >
          A
        </div>
        <span
          style={{
            fontSize:   13,
            color:      C.muted,
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
          }}
        >
          alg-art-backgrounds
        </span>
      </div>

      {/* Meta */}
      <div
        style={{
          display:  "flex",
          gap:      20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {["MIT License", "Zero dependencies", "Copy-paste install"].map((t) => (
          <span
            key={t}
            style={{
              fontSize:   11,
              color:      C.muted,
              fontFamily: "JetBrains Mono, monospace",
              padding:    "3px 10px",
              border:     `1px solid ${C.border}`,
              borderRadius: 100,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </footer>
  );
}

// ─── SVG icons ───────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const studioRef = useRef<HTMLDivElement>(null);

  const scrollToStudio = () => {
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <Navbar onStudioClick={scrollToStudio} />
      <HeroSection onStudioClick={scrollToStudio} />
      <GallerySection />
      <StudioSection studioRef={studioRef} />
      <DocsSection />
      <Footer />
    </div>
  );
}
