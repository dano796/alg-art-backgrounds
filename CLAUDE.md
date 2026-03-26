# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build (compiles TypeScript + regenerates cli/registry.json)
npm run build

# Type-check without emitting
npm run typecheck

# Watch mode during development
npm run dev

# Rebuild registry only (when registry/index.ts changes)
npm run build:registry

# Run the test app (from test-app/ directory)
cd test-app && npm run dev
```

No test suite exists yet. To manually test the CLI:
```bash
node cli/index.js list
node cli/index.js add wave-ether --dry-run
```

## Architecture

This project distributes algorithmic art React components in a **shadcn/ui-style copy-paste model** — users run `npx alg-art-backgrounds add <id>` and the CLI downloads source files directly into their project. There is no runtime npm dependency.

### Three-Layer Component Architecture

Each background is split into three layers:

1. **Engine** (`src/components/engines/*.ts`) — Pure TypeScript, framework-agnostic. Exports three functions: `init*()`, `draw*()`, `reset*()`. Receives a `CanvasRenderingContext2D` and a params object. No React imports.

2. **Component** (`src/components/*.tsx`) — React wrapper. Manages canvas lifecycle via two `useEffect` hooks:
   - First effect: initializes the animation loop, attaches `ResizeObserver`, returns cleanup.
   - Second effect: watches seed/structural params that require full re-initialization.
   - Uses `paramsRef` pattern: live params stored in a ref so the animation loop always reads current values without re-triggering the effect.

3. **Schema** (`src/components/schemas/index.ts`) — `ParamSchema[]` union type defining UI controls (number sliders, color pickers, toggles, selects). Drives `BackgroundStudio`'s auto-generated UI and serves as parameter documentation.

### Registry and CLI

- `src/registry/index.ts` is the **source of truth** for all components. Each `RegistryEntry` lists the component's `files[]` array (paths relative to `src/`) that the CLI will fetch and copy.
- `cli/build-registry.mjs` converts the TypeScript registry to `cli/registry.json` at build time.
- The CLI (`cli/index.js`) has zero external dependencies — uses only Node.js built-ins (`fs`, `path`, `https`, `readline`).
- By default, files are fetched from GitHub raw URLs. Override with the `ALG_ART_BACKGROUNDS_REGISTRY` environment variable.

### Shared Utilities

`src/components/utils/noise.ts` contains seeded Perlin noise, `SeededRandom` (LCG-based), and math helpers (`lerp`, `clamp`, `map`, `hexToRgb`, `rgba`). These are copied into every user project alongside each component, so they must remain self-contained.

### Dual Registry Sync

The TypeScript registry (`src/registry/index.ts`) and the generated JSON (`cli/registry.json`) must stay in sync. Always run `npm run build` (or at minimum `npm run build:registry`) after modifying the registry.

### Distribution Files

When installed by users, files land in `components/backgrounds/` with this structure:
```
components/backgrounds/
  <ComponentName>.tsx       # React component
  engines/<engine>.ts       # Pure TS engine
  schemas/index.ts          # Shared param types
  utils/noise.ts            # Shared math utilities
```

The `components/` directory at the repo root contains example installed versions used for testing.

## Key Files

- `src/registry/index.ts` — add new components here (drives everything else)
- `src/components/engines/` — pure rendering logic, no React
- `cli/index.js` — CLI implementation, no build step needed
- `cli/build-registry.mjs` — run after registry changes
- `test-app/` — Vite dev app for testing components interactively
- `ENGINEERING_REVIEW.md` — known issues and improvement roadmap
