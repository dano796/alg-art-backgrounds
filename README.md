<div align="center">
	<br>
	<picture>
		<source media="(prefers-color-scheme: light)" srcset="./media/react-algo-gh-black.svg">
		<source media="(prefers-color-scheme: dark)" srcset="./media/react-algo-gh-white.svg">
		<img src="./media/react-algo-gh-black.svg" alt="React Algo" height="160">
	</picture>
	<br>
	<b>Algorithmic art backgrounds for React — installed like shadcn/ui, owned by you.</b>
	<br>
  <sub>Stand out with 20+ free customizable backgrounds.</sub>
	<br>
	<br>
  <a href="https://www.npmjs.com/package/react-algo"><img alt="npm version" src="https://img.shields.io/npm/v/react-algo"></a>
  <a href="https://www.npmjs.com/package/react-algo"><img alt="npm downloads" src="https://img.shields.io/npm/dm/react-algo"></a>
  <a href="https://github.com/dano796/react-algo/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/dano796/react-algo?style=social"></a>
  <a href="https://github.com/dano796/react-algo/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/dano796/react-algo?style=social"></a>
  <br>
  <a href="https://github.com/dano796/react-algo/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/badge/License-MIT+Commons_Clause-green"></a>
  <a href="https://github.com/dano796/react-algo/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/dano796/react-algo"></a>
  <a href="https://github.com/dano796/react-algo/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/dano796/react-algo"></a>
  <br>
  <br>
</div>

## Table of Contents

- [What is React Algo?](#what-is-reart)
- [How it works](#how-it-works)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [CLI Commands](#cli-commands)
- [Usage Example](#usage-example)
- [Contributing](#contributing)
- [License](#license)

## What is React Algo?

React Algo is an open source collection of animated canvas backgrounds for React. Each background is a self-contained renderer — you get the full source directly in your project with no runtime npm dependency.

## How it works

Inspired by [shadcn/ui](https://ui.shadcn.com/): instead of importing from a package, the CLI copies the component source files into your own project. You can read, edit, and extend them freely.

## Requirements

- React >=18.0.0

No other runtime dependencies. Components use only React and browser APIs (`canvas`, `requestAnimationFrame`, `ResizeObserver`).

## Quick Start

```bash
npx react-algo add wave-ether
```

This copies the component files into `components/backgrounds/` in your project.

## CLI Commands

```bash
npx react-algo list                       # Browse all available backgrounds
npx react-algo info <id>                  # See files and description
npx react-algo add <id>                   # Install a component
npx react-algo add <id> --force           # Overwrite existing files
npx react-algo add <id> --dry-run         # Preview which files would be written
npx react-algo update <id>                # Re-fetch a component (with confirmation)
npx react-algo add background-studio      # Install all components + the studio playground
```

## Usage Example

```tsx
import { WaveEther } from "./components/backgrounds/WaveEther";

export default function Hero() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <WaveEther style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* your content */}
      </div>
    </div>
  );
}
```

Run `npx react-algo info <id>` to see all available props for any component.

## Contributing

React Algo is always open to improvements and contributions. Check the [Open Issues](https://github.com/dano796/react-algo/issues) if you want to contribute, or open a new one to add your own improvements/ideas. Before contributing, please read the [Contribution Guide](./CONTRIBUTING.md).

## License

[MIT + Commons Clause](./LICENSE.md)
