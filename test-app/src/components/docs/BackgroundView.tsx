import { useState, useEffect, useRef } from "react";
import type { DocEntry } from "./registry";
import { navigate } from "../../lib/navigate";
import { ROUTES, CLI_PACKAGE } from "../../lib/constants";
import { PropsTable } from "./PropsTable";
import { CodeBlock } from "./CodeBlock";
import { generateFullSnippet } from "./generateSnippet";

type Tab = "preview" | "code";

const IconMonitor = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconCode = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export function BackgroundView({
  entry,
  params,
  onParamChange: _onParamChange,
}: {
  entry: DocEntry;
  params: Record<string, unknown>;
  onParamChange: (name: string, value: unknown) => void;
}) {
  const [showContent, setShowContent] = useState(true);
  const [tab, setTab] = useState<Tab>("preview");
  const [inView, setInView] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Once visible, stay visible — prevents "Loading…" on tab switch
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fullSnippet = generateFullSnippet(entry.id, entry.schema, params);

  return (
    <div>
      {/* Title */}
      <h1 className="docs-in font-display font-extrabold text-ink tracking-[-0.04em] leading-[1.05] mb-6 text-[clamp(28px,4vw,42px)]">
        {entry.name}
      </h1>

      {/* Tab bar */}
      <div className="docs-in-1 flex items-center justify-between border-b border-border">
        <div className="flex items-center">
          {(["preview", "code"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-sans cursor-pointer border-0 bg-transparent transition-colors -mb-px border-b-2 ${tab === t ? "text-ink font-medium border-b-accent" : "text-muted font-normal border-b-transparent"}`}
            >
              {t === "preview" ? <IconMonitor /> : <IconCode />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            sessionStorage.setItem("studio-initial-bg", entry.id);
            navigate(ROUTES.studio);
          }}
          className="flex items-center gap-1 px-2.5 py-1.25 text-[12px] rounded-md text-white font-semibold font-display bg-accent hover:opacity-90 transition-opacity cursor-pointer border-0 mb-px"
        >
          Open in Studio
        </button>
      </div>

      {/* ── PREVIEW TAB ── */}
      <div className={`docs-in-2 ${tab === "preview" ? "block" : "hidden"}`}>
        {/* Canvas */}
        <div
          ref={previewRef}
          className="relative bg-bg overflow-hidden mt-2 rounded-xl h-105"
        >
          {inView && (
            <entry.Component
              {...params}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          )}
          {!inView && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted text-[12px] font-mono">Loading…</span>
            </div>
          )}

          {/* Demo content overlay — raw content directly on canvas */}
          {showContent && (
            <div className="absolute inset-0 z-10 flex flex-col">
              {/* Fake navbar pinned to top */}
              <div className="h-11 flex items-center justify-between px-5 shrink-0 bg-[rgba(12,12,20,0.35)] backdrop-blur-sm border-b border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center text-white font-bold font-display shrink-0 bg-accent text-[10px]">
                    A
                  </div>
                  <span className="text-[12px] font-display font-semibold text-ink">
                    YourBrand
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  {["Home", "About", "Docs"].map((link) => (
                    <span
                      key={link}
                      className="text-[12px] font-sans cursor-default text-[rgba(232,230,220,0.65)]"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>

              {/* Centered hero content */}
              <div className="flex-1 flex flex-col items-center justify-center gap-5">
                <div className="font-mono mb-1 text-[10px] tracking-[0.14em] text-accent uppercase">
                  ✦ New Background
                </div>
                <h2 className="font-display font-bold text-ink text-center text-[clamp(20px,3.5vw,30px)] leading-[1.15] [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] max-w-90">
                  The web, made fluid<br />at your fingertips.
                </h2>
                <div className="flex items-center gap-3">
                  <button className="py-2.25 px-5.5 text-[13px] rounded-lg text-white font-semibold font-display cursor-default border-0 bg-accent">
                    Get Started
                  </button>
                  <button className="py-2.25 px-5.5 text-[13px] rounded-lg font-semibold font-display cursor-default text-[rgba(232,230,220,0.85)] bg-white/8 border border-white/[0.14]">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Content toggle — below the canvas */}
        <div className="flex items-center justify-end gap-2.5 border-b border-border py-2.5 px-3.5">
          <span className="text-[12px] font-sans text-muted">
            Demo Content
          </span>
          <button
            onClick={() => setShowContent((v) => !v)}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer border-0 shrink-0 ${showContent ? "bg-accent" : "bg-faint"}`}
          >
            <span
              className={`absolute w-3.5 h-3.5 top-0.75 left-0.75 rounded-full bg-white transition-transform duration-200 ${showContent ? "translate-x-4" : "translate-x-0"}`}
            />
          </button>
        </div>

        {/* Props section */}
        <div className="mt-10 mb-10">
          <h2 className="font-display font-bold text-ink tracking-[-0.02em] mb-5 text-[clamp(20px,2.5vw,28px)]">
            Props
          </h2>
          <PropsTable schema={entry.schema} />
        </div>
      </div>

      {/* ── CODE TAB ── */}
      <div className={`${tab === "code" ? "block" : "hidden"} pt-9`}>
        <h2 className="font-display font-bold text-ink tracking-[-0.02em] mb-4 text-[clamp(20px,2.5vw,28px)]">
          Install
        </h2>
        <CodeBlock
          code={`npx ${CLI_PACKAGE} add ${entry.id}`}
          label="terminal"
        />

        <h2 className="font-display font-bold text-ink tracking-[-0.02em] mb-4 text-[clamp(20px,2.5vw,28px)]">
          Usage
        </h2>
        <CodeBlock code={fullSnippet} label={`${entry.name}.tsx`} />
      </div>
    </div>
  );
}
