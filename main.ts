import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies POST.json (the X post's address for this entry) to the output
// directory, where the house reads it. Nothing else is written.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(repoRoot, "POST.json"), join(outputDir, "POST.json"));
