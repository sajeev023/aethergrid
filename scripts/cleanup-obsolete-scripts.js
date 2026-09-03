/**
 * Remove obsolete development/verification scripts that no longer match the website state.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const obsolete = [
  "scripts/analyze_all_pics.js",
  "scripts/analyze_lfjc_pics.js",
  "scripts/analyze_rows.js",
  "scripts/build_preview_catalog.js",
  "scripts/categorize_images.js",
  "scripts/crop_toppers.js",
  "scripts/curate_archive_data.js",
  "scripts/debug_css.js",
  "scripts/check_deleted_files.js",
  "scripts/inspect_all_pics.js",
  "scripts/inspect_jubilee_details.js",
  "scripts/inspect_working_tree_images.js",
  "scripts/process_hero_images.js",
  "scripts/process_hero_images_v2.js",
  "scripts/process_lite_shot_photos.js",
  "scripts/process_photos.js",
  "scripts/process_sports_photos.js",
  "scripts/scan_git_history.js",
  "scripts/verify_archive_hierarchy.js",
  "scripts/verify_campus_archive.js",
  "scripts/verify_campus_order.js",
  "scripts/verify_endpoints.js",
  "scripts/verify_event_images.js",
  "scripts/verify_gj_list.js",
];

let removed = 0;
for (const rel of obsolete) {
  const full = path.join(ROOT, rel);
  try {
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      console.log(`Removed: ${rel}`);
      removed++;
    }
  } catch (err) {
    console.error(`Failed to remove ${rel}: ${err.message}`);
  }
}
console.log(`\nRemoved ${removed} obsolete scripts.`);
