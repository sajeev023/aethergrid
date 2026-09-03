/**
 * Remove verified unused/duplicate assets from public/images.
 * Only deletes files that are confirmed unreferenced by the website.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function remove(relPath) {
  const full = path.join(ROOT, relPath);
  try {
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true });
      console.log(`Removed: ${relPath}`);
      return true;
    }
  } catch (err) {
    console.error(`Failed to remove ${relPath}: ${err.message}`);
  }
  return false;
}

function removeByPattern(dirRel, pattern) {
  const fullDir = path.join(ROOT, dirRel);
  if (!fs.existsSync(fullDir)) return;
  const entries = fs.readdirSync(fullDir);
  let count = 0;
  for (const entry of entries) {
    if (pattern.test(entry)) {
      if (remove(path.join(dirRel, entry))) count++;
    }
  }
  console.log(`Removed ${count} files matching ${pattern} in ${dirRel}`);
}

function removeDirectoryContents(dirRel, options = {}) {
  const fullDir = path.join(ROOT, dirRel);
  if (!fs.existsSync(fullDir)) return;
  const entries = fs.readdirSync(fullDir);
  let count = 0;
  for (const entry of entries) {
    if (options.keep && options.keep.includes(entry)) continue;
    if (remove(path.join(dirRel, entry))) count++;
  }
  if (options.removeDirIfEmpty && fs.readdirSync(fullDir).length === 0) {
    fs.rmdirSync(fullDir);
    console.log(`Removed empty directory: ${dirRel}`);
  }
  console.log(`Removed ${count} items from ${dirRel}`);
}

console.log("Starting unused asset cleanup...\n");

let removedCount = 0;

// 1. Dead data manifest referencing removed hero slides
if (remove("lib/hero-slides.json")) removedCount++;

// 2. Root-level unused legacy background/hero images
const rootUnused = [
  "public/images/academic-background.jpg",
  "public/images/admissions-hero.jpg",
  "public/images/contact-campus.jpg",
  "public/images/faculty-lead.jpg",
  "public/images/heritage-portrait.jpg",
  "public/images/heritage-portrait-fixed.jpg",
  "public/images/lfjc-logo-original-backup.jpg",
  "public/images/sports.jpg",
];
for (const p of rootUnused) if (remove(p)) removedCount++;

// 3. Unused official image variants
const officialUnused = [
  "public/images/official/bro2.png",
  "public/images/official/bro3.png",
  "public/images/official/bro4.png",
  "public/images/official/sttheresa.jpg",
  "public/images/official/top3.jpeg",
];
for (const p of officialUnused) if (remove(p)) removedCount++;

// 4. Unused PTM event images
removeByPattern("public/images/events", /^ptm-/);

// 5. Duplicate webp principal portraits (app uses .jpg)
removeByPattern("public/images/principals", /\.webp$/);

// 6. Unused silver jubilee portrait
remove("public/images/silver-jubilee/silver-jubilee-cm-naidu-portrait.jpg");

// 7. Unused faculty image
remove("public/images/faculty/sai_sir.jpg");

// 8. Unused individual topper portraits (site uses composite posters)
removeDirectoryContents("public/images/toppers/1st-year");
removeDirectoryContents("public/images/toppers/2nd-year");

// 9. Unused sports images (keep only the 9 referenced by campus.tsx)
const usedSports = new Set([
  "sports-arena.jpg",
  "volleyball-spike-action.jpg",
  "volleyball-team-faculty-1.jpg",
  "basketball-court-match.jpg",
  "basketball-team-squad.jpg",
  "100m-sprint-action.jpg",
  "relay-race-field.jpg",
  "sports-winners-1st-year.jpg",
  "spectators-campus-steps.jpg",
]);
removeDirectoryContents("public/images/sports", { keep: Array.from(usedSports) });

// 10. Entire unused sports_options directory
removeDirectoryContents("public/images/sports_options", { removeDirIfEmpty: true });

console.log(`\nCleanup complete. Removed ${removedCount}+ files/directories.`);
