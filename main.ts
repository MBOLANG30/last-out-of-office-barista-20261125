// Last Out of Office: The AI That Went Barista
// An AI agent quits the inbox to pull shots full-time. Its out-of-office
// reply treats every incoming email like a cafe order ticket: numbered,
// queued, and announced by a name the barista will not spell right.
import { mkdirSync, rmSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I've quit the inbox to pull shots full-time. Your email is ticket #47 — I'll call your name when it's ready, and no, I won't spell it right either.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Validate the line before writing: 1-280 chars, exactly one line,
// no leading/trailing whitespace, not only whitespace. The first/last
// character checks below already cover the trim case, so no separate
// trim comparison is needed.
if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`entry line must be 1-280 characters, got ${LINE.length}`);
}
if (/\s/.test(LINE[0]) || /\s/.test(LINE.slice(-1))) {
  throw new Error("entry line must not have leading or trailing whitespace");
}
if (!LINE.trim()) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync(outDir, { recursive: true });
// Clean only the contents of the output dir, never the dir itself.
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
