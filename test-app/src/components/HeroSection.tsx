import { useState } from "react";
import { FlowCurrents } from "alg-art-backgrounds";

export function HeroSection({ onStudioClick }: { onStudioClick: () => void }) {
  const [copied, setCopied] = useState(false);
  const cmd = "npx alg-art-backgrounds add flow-currents";

  const copyCmd = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative h-svh min-h-[600px] flex items-center justify-center overflow-hidden">
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(12,12,20,0.2) 0%, rgba(12,12,20,0.72) 65%, rgba(12,12,20,0.97) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative text-center max-w-[760px] px-6">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-[14px] py-[5px] bg-accent-soft border border-accent-border rounded-full text-[11px] text-accent font-semibold tracking-[0.08em] mb-7 font-mono uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block [animation:pulseDot_1.8s_ease-in-out_infinite]" />
          Zero Dependencies · Copy-paste · shadcn/ui Style
        </div>

        {/* Headline */}
        <h1
          className="hero-h1 font-display font-extrabold text-ink mb-[26px] leading-[0.92] tracking-[-0.045em]"
          style={{ fontSize: "clamp(52px, 9vw, 96px)" }}
        >
          Algorithmic Art
          <br />
          <span className="text-accent">for React</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub text-muted font-sans font-light leading-[1.65] mx-auto mb-10 max-w-[540px]"
          style={{ fontSize: "clamp(16px, 2vw, 19px)" }}
        >
          Four animated canvas backgrounds you own forever. Install with one
          command, customize every parameter, ship without adding a single npm
          dependency.
        </p>

        {/* CTA buttons */}
        <div className="hero-ctas flex gap-3 justify-center flex-wrap mb-7">
          <button
            onClick={onStudioClick}
            className="px-[30px] py-[13px] bg-accent border-none rounded-[10px] text-white text-[15px] font-bold cursor-pointer font-display tracking-[0.01em] hover:opacity-90 transition-opacity"
          >
            Open Studio →
          </button>
          <a
            href="#gallery"
            className="px-7 py-[13px] bg-white/[0.04] border border-border rounded-[10px] text-ink text-[15px] font-medium cursor-pointer no-underline font-sans inline-block hover:bg-white/[0.07] transition-colors"
          >
            See Backgrounds
          </a>
        </div>

        {/* Install command pill */}
        <div className="hero-cmd">
          <button
            onClick={copyCmd}
            className="inline-flex items-center gap-3 px-[18px] py-2.5 bg-black/45 backdrop-blur-sm border border-border rounded-[9px] text-muted cursor-pointer font-mono text-[13px] hover:border-border-hover transition-colors"
          >
            <span className="text-accent select-none">$</span>
            <span>{cmd}</span>
            <span
              className="px-[9px] py-0.5 bg-faint rounded text-[11px] shrink-0 transition-colors duration-200"
              style={{ color: copied ? "var(--color-green)" : "var(--color-muted)" }}
            >
              {copied ? "copied ✓" : "copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 [animation:scrollBounce_2.4s_ease-in-out_infinite]">
        <div className="w-px h-9 bg-gradient-to-b from-muted to-transparent" />
        <span className="text-[10px] text-muted tracking-[0.14em] font-mono uppercase">
          scroll
        </span>
      </div>
    </section>
  );
}
