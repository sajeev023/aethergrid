const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:\\Users\\LFDC\\Downloads\\lfjc pics';
const destDir = path.join(__dirname, '..', 'public', 'images', 'sports');

const MAPPINGS = [
  {
    raw: 'DSC_6608.JPG',
    slug: 'basketball-court-match',
    title: 'Basketball Tournament Match',
    desc: 'Inter-house basketball match underway on the outdoor sports court with spectators looking on.',
    category: 'basketball'
  },
  {
    raw: 'DSC_6636.JPG',
    slug: 'volleyball-referee-match',
    title: 'Volleyball Match Officiating',
    desc: 'Student sports referee officiating at the volleyball net during the inter-house volleyball championship.',
    category: 'volleyball'
  },
  {
    raw: 'DSC_6642.JPG',
    slug: 'volleyball-spike-action',
    title: 'Volleyball Airborne Spike',
    desc: 'Athletic student leaping high for a smash over the net during competitive volleyball tournament play.',
    category: 'volleyball'
  },
  {
    raw: 'DSC_6643.JPG',
    slug: 'volleyball-court-action',
    title: 'Volleyball Tournament Rally',
    desc: 'High-energy rally and defensive positioning during the inter-house volleyball fixtures.',
    category: 'volleyball'
  },
  {
    raw: 'DSC_6644.JPG',
    slug: 'volleyball-service-play',
    title: 'Volleyball Match Service',
    desc: 'Player setting up service and team formation against the backdrop of the main collegiate building.',
    category: 'volleyball'
  },
  {
    raw: 'DSC_6664.JPG',
    slug: 'basketball-fastbreak-dribble',
    title: 'Basketball Fast-Break Drive',
    desc: 'Point guard executing a fast-break dribble past defenders under the guidance of sports faculty.',
    category: 'basketball'
  },
  {
    raw: 'DSC_6666.JPG',
    slug: 'basketball-attack-transition',
    title: 'Basketball Transition Offense',
    desc: 'Fast-paced offensive transition play during the inter-house basketball championship.',
    category: 'basketball'
  },
  {
    raw: 'DSC_6668.JPG',
    slug: 'basketball-drive-to-hoop',
    title: 'Basketball Drive to Basket',
    desc: 'Competitor cutting towards the basket through defensive pressure during annual tournament play.',
    category: 'basketball'
  },
  {
    raw: 'DSC_6717.JPG',
    slug: 'basketball-team-squad',
    title: 'Basketball Championship Squad',
    desc: 'Basketball tournament finalists posing with Physical Education faculty and sports coordinators on court.',
    category: 'teams'
  },
  {
    raw: 'DSC_6718.JPG',
    slug: 'basketball-finalists-celebration',
    title: 'Basketball Finalists Celebration',
    desc: 'LFJC basketball squad celebrating sports day achievements on the campus basketball court.',
    category: 'teams'
  },
  {
    raw: 'DSC_6719.JPG',
    slug: 'basketball-squad-faculty',
    title: 'Basketball Team & Faculty Honors',
    desc: 'Official group portrait of the LFJC basketball championship squad with department directors.',
    category: 'teams'
  },
  {
    raw: 'DSC_6740.JPG',
    slug: 'volleyball-team-faculty-1',
    title: 'Volleyball Squad & Faculty Delegation',
    desc: 'Volleyball house finalists assembled with academic faculty and Physical Education staff by the net.',
    category: 'teams'
  },
  {
    raw: 'DSC_6741.JPG',
    slug: 'volleyball-team-faculty-2',
    title: 'Volleyball Inter-House Finalists',
    desc: 'House volleyball finalists assembled with faculty mentors and sports coaches at the net.',
    category: 'teams'
  },
  {
    raw: 'DSC_6747.JPG',
    slug: 'volleyball-team-faculty-3',
    title: 'Volleyball Tournament Competitors',
    desc: 'Student volleyball competitors and faculty celebrating athletic camaraderie on sports day.',
    category: 'teams'
  },
  {
    raw: 'DSC_6777.JPG',
    slug: 'basketball-coaching-freethrow',
    title: 'Basketball Coaching & Clinic',
    desc: 'Physical Education instructor demonstrating free-throw shooting form and technique to students.',
    category: 'coaching'
  },
  {
    raw: 'DSC_6778.JPG',
    slug: 'basketball-shooting-clinic',
    title: 'Athletic Coaching Demonstration',
    desc: 'Physical Education director demonstrating proper basketball arc and release during sports training.',
    category: 'coaching'
  }
];

async function processAll() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  console.log(`Processing ${MAPPINGS.length} sports meet images from ${srcDir}...`);

  for (const item of MAPPINGS) {
    const srcFile = path.join(srcDir, item.raw);
    if (!fs.existsSync(srcFile)) {
      console.error(`Source file not found: ${srcFile}`);
      continue;
    }

    const destJpg = path.join(destDir, `${item.slug}.jpg`);
    const destWebp = path.join(destDir, `${item.slug}.webp`);

    // Process JPG (Max 1920px width/height, quality 85, progressive)
    await sharp(srcFile)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true, progressive: true })
      .toFile(destJpg);

    // Process WebP (Max 1920px width/height, quality 82, effort 4)
    await sharp(srcFile)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(destWebp);

    const statJpg = fs.statSync(destJpg);
    const statWebp = fs.statSync(destWebp);

    console.log(`[OK] ${item.raw} -> ${item.slug}.jpg (${(statJpg.size / 1024).toFixed(1)} KB) | ${item.slug}.webp (${(statWebp.size / 1024).toFixed(1)} KB)`);
  }

  // Clean up temporary preview directory if present
  const previewDir = path.join(__dirname, '..', 'public', 'images', 'sports_preview');
  if (fs.existsSync(previewDir)) {
    fs.rmSync(previewDir, { recursive: true, force: true });
    console.log('Cleaned up sports_preview folder.');
  }

  const previewHtml = path.join(__dirname, '..', 'public', 'sports_preview.html');
  if (fs.existsSync(previewHtml)) {
    fs.rmSync(previewHtml, { force: true });
    console.log('Cleaned up sports_preview.html.');
  }

  console.log('All sports photos processed successfully!');
}

processAll().catch(err => {
  console.error('Processing failed:', err);
  process.exit(1);
});
