import { BackgroundStudio } from "../components/studio/BackgroundStudio";

export function StudioPage({ backgroundId }: { backgroundId?: string }) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <BackgroundStudio initialBg={backgroundId} />
    </div>
  );
}
