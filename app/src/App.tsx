import { lazy, Suspense, useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SEOHead } from "./components/layout/SEOHead";
import { HeroSection } from "./components/home/HeroSection";
import { GallerySection } from "./components/home/GallerySection";
import { ROUTES } from "./lib/constants";
import { matchRoute } from "./lib/routing";

const StudioPage = lazy(() =>
  import("./pages/StudioPage").then((m) => ({ default: m.StudioPage }))
);
const DocsPage = lazy(() =>
  import("./pages/DocsPage").then((m) => ({ default: m.DocsPage }))
);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const studioMatch = matchRoute(ROUTES.studioBackground, currentPath);
  const docsMatch = matchRoute(ROUTES.docsBackground, currentPath);

  if (
    currentPath === ROUTES.studio ||
    currentPath === "/Studio" ||
    studioMatch
  ) {
    return (
      <Suspense fallback={<div className="bg-bg w-screen h-screen" />}>
        <SEOHead
          title="Studio"
          description="Interactively customize and preview 20+ generative art backgrounds for React. Tweak parameters in real time and export ready-to-use code."
          path={currentPath}
        />
        <StudioPage key="studio" backgroundId={studioMatch?.id} />
      </Suspense>
    );
  }

  if (currentPath === ROUTES.docs || docsMatch) {
    return (
      <Suspense fallback={<div className="bg-bg w-screen h-screen" />}>
        <SEOHead
          title="Documentation"
          description="Full API reference and usage guide for ReArt's algorithmic art components. Learn how to install, configure, and customize each background."
          path={currentPath}
        />
        <DocsPage key="docs" backgroundId={docsMatch?.id} />
      </Suspense>
    );
  }

  return (
    <div className="bg-bg min-h-svh">
      <SEOHead path="/" />
      <Navbar />
      <HeroSection />
      <GallerySection />
      <Footer />
    </div>
  );
}
