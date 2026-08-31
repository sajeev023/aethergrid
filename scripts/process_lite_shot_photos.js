const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:\\Users\\LFDC\\Downloads\\lite shot';
const destDir = path.join(__dirname, '..', 'public', 'images', 'events');

const curations = [
  {
    src: 'DSC_5421.JPG',
    dest: 'montfort-auditorium-assembly.jpg',
    width: 1600,
    quality: 85,
    title: 'St. Montfort Auditorium Full Student Assembly'
  },
  {
    src: 'DSC_5371.JPG',
    dest: 'motivational-talk-session.jpg',
    width: 1600,
    quality: 85,
    title: 'Motivational Speaker Addressing Audience'
  },
  {
    src: 'DSC_5523.JPG',
    dest: 'interactive-student-session.jpg',
    width: 1600,
    quality: 85,
    title: 'Interactive Student Participation Forum'
  },
  {
    src: 'DSC_5541.JPG',
    dest: 'speaker-felicitation-memento.jpg',
    width: 1600,
    quality: 85,
    title: 'Speaker Felicitation & Memento Presentation'
  },
  {
    src: 'DSC_5685.JPG',
    dest: 'student-co-curricular-assembly.jpg',
    width: 1600,
    quality: 85,
    title: 'Student Delegation in St. Montfort Hall'
  },
  {
    src: 'DSC_5828.JPG',
    dest: 'career-guidance-seminar.jpg',
    width: 1600,
    quality: 85,
    title: 'Career Guidance & Professional Seminars'
  },
  {
    src: 'DSC_5805.JPG',
    dest: 'student-assembly-hall.jpg',
    width: 1600,
    quality: 85,
    title: 'Male Student Delegation in Assembly'
  },
  {
    src: 'DSC_5383.JPG',
    dest: 'auditorium-speaker-address.jpg',
    width: 1600,
    quality: 85,
    title: 'Auditorium Perspective View'
  },
  {
    src: 'DSC_5840.JPG',
    dest: 'distinguished-speaker-podium.jpg',
    width: 1600,
    quality: 85,
    title: 'Distinguished Guest Speaker Address'
  },
  {
    src: 'DSC_5377.JPG',
    dest: 'auditorium-panorama.jpg',
    width: 1600,
    quality: 85,
    title: 'Wide Auditorium Panorama'
  },
  {
    src: 'DSC_5811.JPG',
    dest: 'auditorium-girls-section.jpg',
    width: 1600,
    quality: 85,
    title: 'Auditorium Study Session & Notes'
  }
];

async function processLiteShot() {
  console.log(`Optimizing ${curations.length} images from "${srcDir}" into "${destDir}"...\n`);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let count = 0;
  for (const item of curations) {
    const srcFile = path.join(srcDir, item.src);
    const destFile = path.join(destDir, item.dest);

    if (!fs.existsSync(srcFile)) {
      console.warn(`Source file not found: ${srcFile}`);
      continue;
    }

    try {
      await sharp(srcFile)
        .resize({ width: item.width, fit: 'inside', withoutEnlargement: true, autoOrient: true })
        .jpeg({ quality: item.quality, mozjpeg: true })
        .toFile(destFile);

      const stat = fs.statSync(destFile);
      count++;
      console.log(`[${count}/${curations.length}] ${item.src} -> ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error processing ${item.src}:`, err.message);
    }
  }

  console.log(`\nCompleted ${count} optimized images.`);
}

processLiteShot();
