const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'hero');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const slides = [
  {
    id: "hero-1-building",
    source: "C:\\Users\\LFDC\\Downloads\\new pic\\Bildeng.JPG",
    alt: "Little Flower Junior College Main Campus Building & Architectural Facade",
    objectPosition: "center 35%"
  },
  {
    id: "hero-2-campus-quad",
    source: "C:\\Users\\LFDC\\Downloads\\all pic\\LFS_2654.JPG",
    alt: "Eight-Acre Uppal Heritage Campus Grounds & Quadrangle Lawn",
    objectPosition: "center center"
  },
  {
    id: "hero-3-academic-lab",
    source: "C:\\Users\\LFDC\\Downloads\\new pic\\DSC_0710.JPG",
    alt: "Hands-on Science & Technological Laboratory Training at LFJC",
    objectPosition: "center 40%"
  },
  {
    id: "hero-4-national-celebration",
    source: "C:\\Users\\LFDC\\Downloads\\new pic\\AUG.JPG",
    alt: "Independence Day Flag Hoisting Ceremony & Institutional Gathering",
    objectPosition: "center center"
  },
  {
    id: "hero-5-auditorium",
    source: "C:\\Users\\LFDC\\Downloads\\new pic\\DSC_0150.JPG",
    alt: "LFJC College Auditorium Assembly & Cultural Events",
    objectPosition: "center 30%"
  },
  {
    id: "hero-6-sports-day",
    source: "C:\\Users\\LFDC\\Downloads\\all pic\\DSC_6260.JPG",
    alt: "Athletic Track & Annual Sports Day Competition at LFJC Grounds",
    objectPosition: "center center"
  },
  {
    id: "hero-7-montfortian-heritage",
    source: "C:\\Users\\LFDC\\Downloads\\all pic\\LFS_2701.JPG",
    alt: "Montfortian Heritage Statue & Five-Decade Educational Legacy",
    objectPosition: "center 30%"
  }
];

async function processAll() {
  console.log("=== PROCESSING HERO CAROUSEL IMAGE ASSETS ===");
  const slideManifest = [];

  for (const slide of slides) {
    const webpFilename = `${slide.id}.webp`;
    const jpgFilename = `${slide.id}.jpg`;
    const webpPath = path.join(targetDir, webpFilename);
    const jpgPath = path.join(targetDir, jpgFilename);

    console.log(`\nProcessing: ${slide.id}...`);
    console.log(`  Source: ${slide.source}`);

    // Create optimized WebP version (2400px max width for retina/4K screens)
    await sharp(slide.source)
      .resize(2400, null, { withoutEnlargement: true, fit: 'inside' })
      .toFormat('webp', { quality: 85 })
      .toFile(webpPath);

    // Create fallback JPG version
    await sharp(slide.source)
      .resize(2400, null, { withoutEnlargement: true, fit: 'inside' })
      .toFormat('jpeg', { quality: 85, progressive: true })
      .toFile(jpgPath);

    const webpStats = fs.statSync(webpPath);
    const jpgStats = fs.statSync(jpgPath);

    console.log(`  WebP: ${Math.round(webpStats.size / 1024)} KB -> /images/hero/${webpFilename}`);
    console.log(`  JPG:  ${Math.round(jpgStats.size / 1024)} KB -> /images/hero/${jpgFilename}`);

    slideManifest.push({
      id: slide.id,
      src: `/images/hero/${webpFilename}`,
      fallbackSrc: `/images/hero/${jpgFilename}`,
      alt: slide.alt,
      objectPosition: slide.objectPosition
    });
  }

  const manifestPath = path.join(__dirname, '..', 'lib', 'hero-slides.json');
  fs.writeFileSync(manifestPath, JSON.stringify(slideManifest, null, 2));
  console.log(`\nSuccessfully created slide manifest at lib/hero-slides.json`);
}

processAll();
