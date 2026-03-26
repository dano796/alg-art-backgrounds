import { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { GallerySection } from "./components/GallerySection";
import { StudioSection } from "./components/StudioSection";
import { DocsSection } from "./components/DocsSection";
import { Footer } from "./components/Footer";

export default function App() {
  const studioRef = useRef<HTMLDivElement>(null);

  const scrollToStudio = () => {
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-bg min-h-svh">
      <Navbar onStudioClick={scrollToStudio} />
      <HeroSection onStudioClick={scrollToStudio} />
      <GallerySection />
      <StudioSection studioRef={studioRef} />
      <DocsSection />
      <Footer />
    </div>
  );
}
