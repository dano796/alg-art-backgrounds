import { useEffect } from "react";

const SITE_URL = "https://react-algo.vercel.app";
const DEFAULT_TITLE = "React Algo — Algorithmic Art Backgrounds for React";
const DEFAULT_DESCRIPTION =
  "Discover React Algo: a React library with 20+ stunning generative art backgrounds. Copy-paste ready, fully customizable canvas animations for any React project.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | React Algo` : DEFAULT_TITLE;
    const canonical = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setCanonical(canonical);

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, path, image]);

  return null;
}
