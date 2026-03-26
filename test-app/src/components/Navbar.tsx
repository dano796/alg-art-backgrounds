import { useState, useEffect } from "react";
import { GitHubIcon } from "./GitHubIcon";

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
      className="px-[14px] py-[7px] bg-transparent border-none text-muted text-[13px] cursor-pointer font-sans rounded-md hover:text-ink transition-colors"
    >
      {children}
    </button>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-[14px] py-[7px] text-muted text-[13px] no-underline font-sans rounded-md inline-block hover:text-ink transition-colors"
    >
      {children}
    </a>
  );
}

export function Navbar({ onStudioClick }: { onStudioClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] h-[58px] px-8 flex items-center justify-between transition-[background,border-color,backdrop-filter] duration-300"
      style={{
        background: scrolled ? "rgba(12,12,20,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-[10px]">
        <div className="w-7 h-7 rounded-[7px] bg-accent flex items-center justify-center text-[13px] font-bold text-white font-display shrink-0">
          A
        </div>
        <span className="font-display font-bold text-[14px] text-ink tracking-[-0.01em]">
          alg-art-backgrounds
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-0.5">
        <NavBtn onClick={onStudioClick}>Studio</NavBtn>
        <NavLink href="#gallery">Gallery</NavLink>
        <NavLink href="#docs">Docs</NavLink>
        <a
          href="https://github.com/dano796/alg-art-backgrounds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 ml-2.5 px-4 py-[7px] bg-accent rounded-lg text-white no-underline text-[13px] font-semibold font-display tracking-[0.01em] whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <GitHubIcon /> GitHub
        </a>
      </div>
    </nav>
  );
}
