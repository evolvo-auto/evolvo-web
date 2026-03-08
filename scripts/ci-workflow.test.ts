import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const workflowPath = path.join(
  process.cwd(),
  ".github",
  "workflows",
  "ci.yml",
);

describe("ci workflow", () => {
  it("runs on pull requests and pushes to main", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");

    expect(workflow).toContain("pull_request:");
    expect(workflow).toContain("push:");
    expect(workflow).toContain("- main");
  });

  it("installs dependencies, lints, tests, and builds with npm", () => {
    const workflow = fs.readFileSync(workflowPath, "utf8");

    expect(workflow).toContain("uses: actions/checkout@v4");
    expect(workflow).toContain("uses: actions/setup-node@v4");
    expect(workflow).toContain("cache: npm");
    expect(workflow).toContain("run: npm ci");
    expect(workflow).toContain("run: npm run lint");
    expect(workflow).toContain("run: npm test");
    expect(workflow).toContain("run: npm run build");
  });
});
