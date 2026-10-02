import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onboarding",
    short_name: "Onboarding",
    description: "Onboarding för nya medarbetare.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f8",
    theme_color: "#6d4dff",
    lang: "sv",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
