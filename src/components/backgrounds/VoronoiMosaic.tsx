import { useEffect, useRef, type CSSProperties } from "react";
import {
  initVoronoiMosaic,
  drawVoronoiMosaic,
  resetVoronoiMosaic,
  type VoronoiMosaicState,
  type VoronoiMosaicParams,
} from "../engines/voronoiMosaic";

export const voronoiMosaicDefaults: VoronoiMosaicParams = {
  seed: 4444,
  seedCount: 25,
  moveSpeed: 0.5,
  edgeContrast: 1.2,
  bgColor: "#0a0e14",
};

export interface VoronoiMosaicProps extends Partial<VoronoiMosaicParams> {
  className?: string;
  style?: CSSProperties;
}

export function VoronoiMosaic(props: VoronoiMosaicProps) {
  const { className, style, ...params } = props;
  const merged = { ...voronoiMosaicDefaults, ...params };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<VoronoiMosaicState | null>(null);
  const paramsRef = useRef(merged);
  paramsRef.current = merged;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let running = true;

    function resizeCanvas() {
      const w = canvas!.clientWidth * window.devicePixelRatio;
      const h = canvas!.clientHeight * window.devicePixelRatio;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        stateRef.current = initVoronoiMosaic(w, h, paramsRef.current);
      }
    }

    resizeCanvas();
    stateRef.current = initVoronoiMosaic(canvas.width, canvas.height, paramsRef.current);

    const loop = () => {
      if (!running) return;
      if (stateRef.current) {
        drawVoronoiMosaic(ctx, stateRef.current, paramsRef.current);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!stateRef.current) return;
    resetVoronoiMosaic(stateRef.current, merged);
  }, [merged.seed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
