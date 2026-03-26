import { BackgroundStudio } from "alg-art-backgrounds";

export function StudioSection({
  studioRef,
}: {
  studioRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      id="studio"
      ref={studioRef}
      className="relative border-t border-border"
    >
      {/* Header bar */}
      <div className="px-10 py-5 bg-surface border-b border-border flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent [animation:pulseDot_2s_ease-in-out_infinite]" />
          <span className="font-display font-bold text-[15px] text-ink">
            Background Studio
          </span>
        </div>

        <div className="w-px h-4 bg-border shrink-0" />

        <div className="text-[12px] text-muted font-mono">
          Live parameter editor · Real-time preview · One-click code export
        </div>

        <div className="flex-1" />

        <div className="text-[11px] text-muted font-mono px-2.5 py-1 bg-bg rounded-md border border-border">
          npx alg-art-backgrounds add background-studio
        </div>
      </div>

      {/* The studio itself */}
      <div className="h-svh">
        <BackgroundStudio />
      </div>
    </section>
  );
}
