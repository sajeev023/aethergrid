/**
 * Remove the remaining verified unused images after campus.tsx audit.
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

const toRemove = [
  "public/images/alumni-group.jpg",
  "public/images/alumni.jpg",
  "public/images/events/auditorium-girls-section.jpg",
  "public/images/events/auditorium-panorama.jpg",
  "public/images/events/auditorium-speaker-address.jpg",
  "public/images/events/bro-arun-memento-presentation.jpg",
  "public/images/events/distinguished-speaker-podium.jpg",
  "public/images/events/faculty-dignitary-felicitation.jpg",
  "public/images/events/guest-honors-bouquet.jpg",
  "public/images/events/interactive-seminar-auditorium.jpg",
  "public/images/events/interactive-student-session.jpg",
  "public/images/events/speaker-felicitation-memento.jpg",
  "public/images/events/student-assembly-hall.jpg",
  "public/images/events/student-co-curricular-assembly.jpg",
  "public/images/golden-jubilee/golden_jubilee_4.jpg",
  "public/images/golden-jubilee/golden_jubilee_6.jpg",
  "public/images/golden-jubilee/golden_jubilee_8.jpg",
  "public/images/golden-jubilee/golden_jubilee_9.jpg",
  "public/images/golden-jubilee/golden_jubilee_11.jpg",
  "public/images/golden-jubilee/golden_jubilee_13.jpg",
  "public/images/golden-jubilee/golden_jubilee_15.jpg",
  "public/images/golden-jubilee/golden_jubilee_16.jpg",
  "public/images/golden-jubilee/golden_jubilee_17.jpg",
  "public/images/golden-jubilee/golden_jubilee_19.jpg",
  "public/images/golden-jubilee/golden_jubilee_21.jpg",
  "public/images/golden-jubilee/golden_jubilee_23.jpg",
  "public/images/golden-jubilee/golden_jubilee_24.jpg",
  "public/images/golden-jubilee/golden_jubilee_26.jpg",
  "public/images/golden-jubilee/golden_jubilee_28.jpg",
  "public/images/golden-jubilee/golden_jubilee_29.jpg",
  "public/images/golden-jubilee/golden_jubilee_30.jpg",
  "public/images/golden-jubilee/golden_jubilee_31.jpg",
  "public/images/silver-jubilee/silver-jubilee-bro-britto-report.jpg",
  "public/images/silver-jubilee/silver-jubilee-bro-george-interview.jpg",
  "public/images/silver-jubilee/silver-jubilee-captains-history-1.jpg",
  "public/images/silver-jubilee/silver-jubilee-captains-history-2.jpg",
  "public/images/silver-jubilee/silver-jubilee-celebrations-report.jpg",
  "public/images/silver-jubilee/silver-jubilee-devender-goud-message.jpg",
  "public/images/silver-jubilee/silver-jubilee-sakunthala-reflections.jpg",
];

let removed = 0;
for (const p of toRemove) if (remove(p)) removed++;
console.log(`\nRemoved ${removed} unused images.`);
