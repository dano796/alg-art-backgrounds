import { useState } from "react";

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

const FEATURES = [
  "Zero runtime dependencies",
  "TypeScript with full inference",
  "Canvas 2D — no WebGL required",
  "React 18 & 19 compatible",
  "Seeded RNG for reproducible art",
  "ResizeObserver for responsive canvas",
  "MIT licensed — use anywhere",
];

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mb-7">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[9px] bg-faint rounded-t-[9px] border-b border-border">
        <span className="text-[12px] text-muted font-mono">{label}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="bg-transparent border border-border rounded-[5px] text-[11px] px-2.5 py-0.5 cursor-pointer font-sans transition-colors duration-200"
          style={{ color: copied ? "var(--color-green)" : "var(--color-muted)" }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>

      {/* Code */}
      <pre className="bg-surface border border-border border-t-0 rounded-b-[9px] px-6 py-5 text-[13px] leading-[1.75] text-ink overflow-x-auto font-mono m-0 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

export function DocsSection() {
  return (
    <section
      id="docs"
      className="py-[110px] px-10 pb-[140px] border-t border-border"
    >
      <div
        className="max-w-[1120px] mx-auto grid gap-20 items-start"
        style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)" }}
      >
        {/* Left column — sticky context */}
        <div className="sticky top-20">
          <div className="font-mono text-[11px] text-accent tracking-[0.12em] font-medium mb-[14px] uppercase">
            Documentation
          </div>
          <h2
            className="font-display font-extrabold text-ink leading-[1.1] tracking-[-0.04em] mb-4"
            style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
          >
            Ship in minutes,
            <br />
            not hours.
          </h2>
          <p className="text-[14px] text-muted leading-[1.75] font-sans font-light mb-9">
            Components are copied directly into your project. No npm dependency
            to manage, no breaking-change risk, no lock-in — you own the source.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-[13px]">
            {FEATURES.map((text) => (
              <div key={text} className="flex gap-3 items-center">
                <span className="text-accent text-[14px] font-mono shrink-0">⟶</span>
                <span className="text-[13px] text-muted font-sans">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — code */}
        <div>
          <h3 className="font-display font-bold text-[16px] text-ink tracking-[-0.02em] mb-4">
            1. Install
          </h3>
          <CodeBlock code={SNIPPET_INSTALL} label="terminal" />

          <h3 className="font-display font-bold text-[16px] text-ink tracking-[-0.02em] mb-4 mt-2">
            2. Use
          </h3>
          <CodeBlock code={SNIPPET_USAGE} label="Page.tsx" />

          {/* Next.js callout */}
          <div className="p-[18px_22px] bg-blue/[0.06] border border-blue/20 rounded-xl mb-6">
            <div className="flex gap-2 items-center mb-2.5">
              <span className="text-[14px]">⚡</span>
              <span className="text-[14px] font-bold text-blue font-display">
                Next.js note
              </span>
            </div>
            <p className="text-[13px] text-muted leading-[1.7] mb-4 font-sans">
              Components use browser APIs (Canvas, ResizeObserver) so they need
              the{" "}
              <code className="font-mono text-[12px] px-1.5 py-0.5 bg-bg rounded text-ink">
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
