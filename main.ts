import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies POST.json (the X post's address for this entry) to the output
// directory, where the house reads it. Nothing else is written.
// After copying, reads the output back and fails loudly on any mismatch,
// so a bad copy can never pass as a good entry.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoRoot, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

if (!readFileSync(source).equals(readFileSync(target))) {
  throw new Error("POST.json copy mismatch: output differs from source");
}
console.log(`Wrote ${target}`);
