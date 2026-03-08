import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const GENERATED_DIRECTORIES = [".next", "out", "build"];

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/").replace(/^\.\//, "");
}

export function findTrackedGeneratedArtifacts(
  trackedPaths,
  generatedDirectories = GENERATED_DIRECTORIES,
) {
  return trackedPaths.filter((trackedPath) => {
    const normalizedPath = normalizePath(trackedPath);

    return generatedDirectories.some(
      (directory) =>
        normalizedPath === directory || normalizedPath.startsWith(`${directory}/`),
    );
  });
}

function hasIgnoreEntry(lines, directory) {
  const acceptedEntries = new Set([
    directory,
    `${directory}/`,
    `/${directory}`,
    `/${directory}/`,
  ]);

  return lines.some((line) => acceptedEntries.has(line));
}

export function findMissingIgnoreEntries(
  gitignoreContent,
  generatedDirectories = GENERATED_DIRECTORIES,
) {
  const lines = gitignoreContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  return generatedDirectories.filter((directory) => !hasIgnoreEntry(lines, directory));
}

export function evaluateGeneratedArtifactGuard({
  trackedPaths,
  gitignoreContent,
}) {
  const trackedArtifacts = findTrackedGeneratedArtifacts(trackedPaths);
  const missingIgnoreEntries = findMissingIgnoreEntries(gitignoreContent);

  return {
    trackedArtifacts,
    missingIgnoreEntries,
    isClean:
      trackedArtifacts.length === 0 && missingIgnoreEntries.length === 0,
  };
}

function readTrackedPaths(cwd) {
  const output = execFileSync("git", ["ls-files"], {
    cwd,
    encoding: "utf8",
  });

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function runGeneratedArtifactGuard(cwd = process.cwd()) {
  const gitignorePath = path.join(cwd, ".gitignore");
  const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");

  return evaluateGeneratedArtifactGuard({
    trackedPaths: readTrackedPaths(cwd),
    gitignoreContent,
  });
}

function formatFailures({ trackedArtifacts, missingIgnoreEntries }) {
  const messages = [];

  if (trackedArtifacts.length > 0) {
    messages.push(
      "Tracked build artifacts detected:\n" +
        trackedArtifacts.map((artifact) => `- ${artifact}`).join("\n"),
    );
  }

  if (missingIgnoreEntries.length > 0) {
    messages.push(
      "Missing .gitignore entries for generated directories:\n" +
        missingIgnoreEntries.map((directory) => `- /${directory}/`).join("\n"),
    );
  }

  return messages.join("\n\n");
}

const executedPath = process.argv[1]
  ? path.resolve(process.argv[1])
  : undefined;
const modulePath = fileURLToPath(import.meta.url);

if (executedPath === modulePath) {
  const result = runGeneratedArtifactGuard();

  if (!result.isClean) {
    console.error(formatFailures(result));
    process.exitCode = 1;
  } else {
    console.log("Generated artifact guard passed.");
  }
}
