import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import { DocsSection } from "./components/DocsSection";
import { Footer } from "./components/Footer";
import { StudioPage } from "./pages/StudioPage";
import { useState, useEffect } from "react";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple client-side routing
  if (currentPath === "/tools") {
    return <StudioPage />;
  }

  return (
    <div className="bg-bg min-h-svh">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <DocsSection />
      <Footer />
    </div>
  );
}
