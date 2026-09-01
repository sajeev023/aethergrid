const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '..', 'public', 'images');

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (/\.(jpg|jpeg|png|webp|jfif)$/i.test(file)) {
      results.push(filePath);
    }
  });
  return results;
}

const allFiles = getFilesRecursively(publicDir);
console.log(`Total image files in working tree public/images: ${allFiles.length}\n`);

const categorized = {
  goldenJubilee: [],
  silverJubilee: [],
  events: [],
  sports: [],
  campus: [],
  principals: [],
  toppers: [],
  faculty: [],
  alumni: [],
  other: []
};

allFiles.forEach(absPath => {
  const rel = path.relative(publicDir, absPath).replace(/\\/g, '/');
  const webPath = '/images/' + rel;
  const stat = fs.statSync(absPath);
  const item = { webPath, rel, sizeKB: (stat.size / 1024).toFixed(1) };

  if (rel.startsWith('golden-jubilee/')) {
    categorized.goldenJubilee.push(item);
  } else if (rel.startsWith('silver-jubilee/')) {
    categorized.silverJubilee.push(item);
  } else if (rel.startsWith('events/')) {
    categorized.events.push(item);
  } else if (rel.startsWith('sports/')) {
    categorized.sports.push(item);
  } else if (rel.startsWith('principals/')) {
    categorized.principals.push(item);
  } else if (rel.startsWith('toppers/')) {
    categorized.toppers.push(item);
  } else if (rel.startsWith('faculty/')) {
    categorized.faculty.push(item);
  } else if (rel.startsWith('alumni/')) {
    categorized.alumni.push(item);
  } else if (['campus-drone.jpg', 'campus-building.jpg', 'campus-hero.jpg', 'physics-lab.jpg', 'chemistry-lab.jpg', 'computer-lab.jpg', 'library-heritage.jpg', 'sports-arena.jpg', 'sports.jpg', 'contact-campus.jpg'].includes(rel)) {
    categorized.campus.push(item);
  } else {
    categorized.other.push(item);
  }
});

console.log('--- WORKING TREE IMAGE BREAKDOWN ---');
console.log(`Golden Jubilee: ${categorized.goldenJubilee.length}`);
categorized.goldenJubilee.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));

console.log(`\nSilver Jubilee: ${categorized.silverJubilee.length}`);
categorized.silverJubilee.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));

console.log(`\nEvents & Assemblies: ${categorized.events.length}`);
categorized.events.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));

console.log(`\nSports & Athletics: ${categorized.sports.length}`);
categorized.sports.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));

console.log(`\nCampus & Infrastructure: ${categorized.campus.length}`);
categorized.campus.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));

console.log(`\nOther: ${categorized.other.length}`);
categorized.other.forEach(i => console.log('  ', i.webPath, `(${i.sizeKB} KB)`));
