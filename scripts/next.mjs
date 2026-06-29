// Cross-platform launcher for the Next.js CLI.
//
// Why this exists: on case-insensitive filesystems (Windows/macOS) the project
// directory can reach Next.js in non-canonical casing (e.g. "onboarding-app"
// instead of the real "Onboarding-App"). When that happens, the bundler
// registers Next's internal modules under two different path strings, which
// splits the request-scoped `workStore` and crashes `next build` while
// prerendering the internal /_global-error page
// ("Invariant: Expected workStore to be initialized").
//
// This launcher resolves the *real* on-disk casing once (fs.realpathSync.native)
// and passes it to the Next CLI as both the working directory and the explicit
// project-dir argument, guaranteeing a single, canonical module identity.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fs.realpathSync.native(
  path.dirname(path.dirname(fileURLToPath(import.meta.url)))
);

const nextBin = path.join(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

const [subcommand, ...rest] = process.argv.slice(2);

const child = spawn(
  process.execPath,
  [nextBin, subcommand, ...rest, projectRoot],
  { cwd: projectRoot, stdio: "inherit" }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
