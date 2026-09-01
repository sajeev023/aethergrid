const fs = require('fs');
const path = require('path');

// Let's verify what images exist and print their metadata
const gjImages = [];
for (let i = 1; i <= 33; i++) {
  const filename = `golden_jubilee_${i}.jpg`;
  const filePath = path.join(__dirname, '..', 'public', 'images', 'golden-jubilee', filename);
  if (fs.existsSync(filePath)) {
    gjImages.push({
      id: 200 + i,
      src: `/images/golden-jubilee/${filename}`,
      num: i
    });
  }
}

console.log(`Verified ${gjImages.length} Golden Jubilee images exist.`);
