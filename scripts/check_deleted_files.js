const { execSync } = require('child_process');

// Check git log for deleted files
const deletedFiles = execSync('git log --diff-filter=D --summary', { encoding: 'utf8' });
console.log('--- DELETED FILES IN GIT HISTORY ---');
console.log(deletedFiles || 'No deleted files found.');

// Check all commits for any image file paths
const allLog = execSync('git log --name-status --oneline', { encoding: 'utf8' });
const imageMentions = new Set();
for (const line of allLog.split('\n')) {
  if (/\.(jpg|jpeg|png|webp|jfif)$/i.test(line)) {
    const parts = line.split('\t');
    if (parts.length > 1) {
      imageMentions.add(parts[1]);
    }
  }
}

console.log(`\nTotal unique image files mentioned in git log: ${imageMentions.size}`);
