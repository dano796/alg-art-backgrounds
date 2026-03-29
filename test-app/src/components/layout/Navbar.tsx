import { useState, useEffect } from "react";
import { GitHubIcon } from "./GitHubIcon";
import { navigate } from "../../lib/navigate";
import { ROUTES, GITHUB_URL } from "../../lib/constants";

function NavLink({
  href,
  children,
  active,
  spa,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  spa?: boolean;
}) {
  const handleClick = spa
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(href);
      }
    : undefined;

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-3.5 py-1.75 text-[13px] no-underline font-sans rounded-md inline-block transition-colors ${active ? "text-ink font-medium" : "text-muted font-normal"}`}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", h);
    return () => window.removeEventListener("popstate", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-200 h-14.5 px-8 flex items-center justify-between transition-[background,border-color,backdrop-filter] duration-300 border-b ${scrolled ? "bg-[rgba(12,12,20,0.88)] backdrop-blur-[14px] border-border" : "bg-transparent backdrop-blur-none border-transparent"}`}
    >
      {/* Logo */}
      <button
        onClick={() => navigate(ROUTES.home)}
        className="flex items-center gap-2.5 cursor-pointer bg-transparent border-0"
      >
        <div className="w-7 h-7 rounded-[7px] bg-accent flex items-center justify-center text-[13px] font-bold text-white font-display shrink-0">
          A
        </div>
        <span className="font-display font-bold text-[14px] text-ink tracking-[-0.01em]">
          alg-art-backgrounds
        </span>
      </button>

      {/* Nav links */}
      <div className="flex items-center gap-0.5">
        <NavLink
          href={ROUTES.studio}
          spa
          active={currentPath === ROUTES.studio}
        >
          Studio
        </NavLink>
        <NavLink href="/#gallery" active={currentPath === "/" && false}>
          Gallery
        </NavLink>
        <NavLink href={ROUTES.docs} spa active={currentPath === ROUTES.docs}>
          Docs
        </NavLink>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 ml-2.5 px-4 py-1.75 bg-accent rounded-lg text-white no-underline text-[13px] font-semibold font-display tracking-[0.01em] whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          <GitHubIcon /> GitHub
        </a>
      </div>
    </nav>
  );
}
