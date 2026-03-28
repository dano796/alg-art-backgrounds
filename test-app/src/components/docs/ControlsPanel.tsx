import type { ParamSchema } from "alg-art-backgrounds";
import type { DocEntry } from "./registry";

type NumberParam  = Extract<ParamSchema, { type: "number" }>;
type ColorParam   = Extract<ParamSchema, { type: "color" }>;
type BooleanParam = Extract<ParamSchema, { type: "boolean" }>;
type SelectParam  = Extract<ParamSchema, { type: "select" }>;


function SliderRow({ param, value, onChange }: {
  param: NumberParam;
  value: number;
  onChange: (n: string, v: unknown) => void;
}) {
  const displayVal =
    param.step < 0.01 ? value.toFixed(4) :
    param.step < 0.1  ? value.toFixed(3) :
    param.step < 1    ? value.toFixed(2) :
    String(value);

  return (
    <div className="py-3 border-b border-border/30 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-ink font-sans font-medium truncate mr-2">{param.label}</span>
        <span className="text-[11px] font-mono shrink-0 rounded px-1.5 py-0.5 text-accent bg-accent-soft">
          {displayVal}
        </span>
      </div>
      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={value}
        onChange={(e) => onChange(param.name, parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-accent"
      />
    </div>
  );
}

function ColorRow({ param, value, onChange }: {
  param: ColorParam;
  value: string;
  onChange: (n: string, v: unknown) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <span className="text-[12px] text-ink font-sans font-medium truncate mr-2">{param.label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-muted font-mono">{value}</span>
        <div className="w-6 h-6 rounded-md border border-border/60 overflow-hidden cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(param.name, e.target.value)}
            className="w-8 h-8 p-0 -ml-1 -mt-1 cursor-pointer border-0 block"
          />
        </div>
      </div>
    </div>
  );
}

function BooleanRow({ param, value, onChange }: {
  param: BooleanParam;
  value: boolean;
  onChange: (n: string, v: unknown) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <span className="text-[12px] text-ink font-sans font-medium truncate mr-2">{param.label}</span>
      <button
        onClick={() => onChange(param.name, !value)}
        className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 cursor-pointer border-0 shrink-0 ${value ? "bg-accent" : "bg-faint"}`}
      >
        <span
          className={`absolute w-3.5 h-3.5 top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-3.5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

function SelectRow({ param, value, onChange }: {
  param: SelectParam;
  value: string;
  onChange: (n: string, v: unknown) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <span className="text-[12px] text-ink font-sans font-medium truncate mr-2">{param.label}</span>
      <select
        value={value}
        onChange={(e) => onChange(param.name, e.target.value)}
        className="text-[11px] font-mono text-ink bg-faint border border-border rounded-md px-2 py-1 cursor-pointer outline-none shrink-0"
      >
        {param.options.map((opt: { value: string; label: string }) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function ControlsPanel({
  entry,
  params,
  onChange,
  onReset,
}: {
  entry: DocEntry;
  params: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}) {
  return (
    <aside className="hidden lg:flex flex-col scrollbar-none sticky top-14.5 h-[calc(100vh-58px)] overflow-y-auto bg-bg pr-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 pt-3.5 pr-4.5 pb-3.5 pl-4 sticky top-0 bg-bg z-1 border-b border-border">
        <span className="text-[12px] font-mono font-semibold text-muted uppercase tracking-[0.14em]">
          Customize
        </span>
        <button
          onClick={onReset}
          className="text-[12px] font-mono text-muted transition-colors cursor-pointer bg-transparent border-0 hover:text-ink"
        >
          Reset
        </button>
      </div>

      {/* Controls */}
      <div className="pt-1 px-4 pb-7">
        {entry.schema.map((param) => {
          switch (param.type) {
            case "number":
              return <SliderRow  key={param.name} param={param as NumberParam}  value={params[param.name] as number}  onChange={onChange} />;
            case "color":
              return <ColorRow   key={param.name} param={param as ColorParam}   value={params[param.name] as string}  onChange={onChange} />;
            case "boolean":
              return <BooleanRow key={param.name} param={param as BooleanParam} value={params[param.name] as boolean} onChange={onChange} />;
            case "select":
              return <SelectRow  key={param.name} param={param as SelectParam}  value={params[param.name] as string}  onChange={onChange} />;
            default:
              return null;
          }
        })}
      </div>
    </aside>
  );
}
