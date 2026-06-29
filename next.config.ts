import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve this project's directory using the *real* on-disk casing.
// On Windows the filesystem is case-insensitive, so the project path can be
// handed to the bundler in mixed casing (e.g. "onboarding-app" vs.
// "Onboarding-App"). When that happens, the bundler registers Next's internal
// modules twice — once per casing — which splits the module that holds the
// request-scoped `workStore` and crashes the production build while
// prerendering the internal /_global-error page. Forcing the canonical casing
// (via fs.realpathSync.native) keeps every module on a single identity.
const rawRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = fs.realpathSync.native(rawRoot);

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile higher up the tree
  // (C:\Users\patri\package-lock.json) doesn't cause root misdetection.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
