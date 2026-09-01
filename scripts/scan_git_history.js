const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commits = execSync('git log --format="%h %s"', { encoding: 'utf8' }).trim().split('\n');

console.log('Total commits:', commits.length);

const allFoundImages = new Set();
const galleryItemsFound = [];

for (const line of commits) {
  const hash = line.split(' ')[0];
  try {
    const diff = execSync(`git show ${hash}`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    const matches = diff.match(/\/images\/[a-zA-Z0-9_\-\/]+\.(jpg|jpeg|png|webp|jfif)/gi) || [];
    for (const m of matches) {
      allFoundImages.add(m);
    }
  } catch (e) {
    console.error('Error on commit', hash, e.message);
  }
}

console.log('\n--- ALL UNIQUE IMAGE PATHS EVER FOUND IN GIT COMMIT DIFFS ---');
const sorted = Array.from(allFoundImages).sort();
sorted.forEach(img => console.log(' ', img));
console.log('Total unique image paths found in git diffs:', sorted.length);

// Also list all files in git repository history (all blobs)
const allGitBlobs = execSync('git rev-list --objects --all', { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }).split('\n');
const gitImageFiles = new Set();
for (const line of allGitBlobs) {
  const parts = line.trim().split(' ');
  if (parts.length > 1) {
    const filePath = parts.slice(1).join(' ');
    if (filePath.startsWith('public/images/') && /\.(jpg|jpeg|png|webp|jfif)$/i.test(filePath)) {
      gitImageFiles.add(filePath);
    }
  }
}

console.log('\n--- ALL IMAGE FILES EVER COMMITTED AS BLOBS IN GIT REPO ---');
const sortedBlobs = Array.from(gitImageFiles).sort();
sortedBlobs.forEach(f => console.log(' ', f));
console.log('Total unique image blobs ever in git repo:', sortedBlobs.length);
