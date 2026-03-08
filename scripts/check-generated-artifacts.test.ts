import { describe, expect, it } from "vitest";

import {
  evaluateGeneratedArtifactGuard,
  findMissingIgnoreEntries,
  findTrackedGeneratedArtifacts,
} from "./check-generated-artifacts.mjs";

describe("check-generated-artifacts", () => {
  it("detects tracked build output directories", () => {
    expect(
      findTrackedGeneratedArtifacts([
        "app/page.tsx",
        ".next/server/app.js",
        "out/index.html",
        "build/cache.json",
      ]),
    ).toEqual([".next/server/app.js", "out/index.html", "build/cache.json"]);
  });

  it("accepts explicit ignore entries for generated directories", () => {
    expect(
      findMissingIgnoreEntries("/.next/\n/out/\n/build/\n"),
    ).toEqual([]);
  });

  it("fails when tracked artifacts or ignore gaps are present", () => {
    expect(
      evaluateGeneratedArtifactGuard({
        trackedPaths: ["src/index.ts", ".next/trace"],
        gitignoreContent: "/.next/\n/out/\n",
      }),
    ).toEqual({
      trackedArtifacts: [".next/trace"],
      missingIgnoreEntries: ["build"],
      isClean: false,
    });
  });
});
