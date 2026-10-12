import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onboarding App",
    short_name: "Onboarding App",
    description: "Onboarding för nya medarbetare.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f8",
    theme_color: "#0e7490",
    lang: "sv",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
