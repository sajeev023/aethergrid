const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:\\Users\\LFDC\\Downloads\\all pic';
const publicDir = path.join(__dirname, '..', 'public', 'images');

const curations = [
  // ─── SPORTS & ATHLETICS ───────────────────────────────────────────────────
  {
    src: 'DSC_6011.JPG',
    dest: 'sports/100m-sprint-action.jpg',
    width: 1600,
    title: '100m Sprint Action Shot',
    category: 'sports'
  },
  {
    src: 'DSC_6406.JPG',
    dest: 'sports/relay-race-field.jpg',
    width: 1600,
    title: 'Track & Field Relay Competition',
    category: 'sports'
  },
  {
    src: 'DSC_6119.JPG',
    dest: 'sports/spectators-campus-steps.jpg',
    width: 1600,
    title: 'Students Seated on Campus Steps',
    category: 'sports'
  },
  {
    src: 'DSC_5942.JPG',
    dest: 'sports/sports-ground-assembly.jpg',
    width: 1600,
    title: 'Sports Field & Building Backdrop',
    category: 'sports'
  },
  {
    src: 'DSC_6312.JPG',
    dest: 'sports/sports-arena-gallery-view.jpg',
    width: 1600,
    title: 'Sports Arena Spectators Gallery',
    category: 'sports'
  },
  {
    src: '1 st y.jpg',
    dest: 'sports/sports-winners-1st-year.jpg',
    width: 1600,
    title: '1st Year 100m Girls Winners Poster',
    category: 'sports'
  },
  {
    src: '2nd  y.jpg',
    dest: 'sports/sports-winners-2nd-year.jpg',
    width: 1600,
    title: '2nd Year 100m Girls Winners Poster',
    category: 'sports'
  },
  {
    src: 'DSC_5951.JPG',
    dest: 'sports/sports-track-heats.jpg',
    width: 1600,
    title: 'Track Sprint Heats',
    category: 'sports'
  },
  {
    src: 'DSC_6021.JPG',
    dest: 'sports/athletics-sprint-finish.jpg',
    width: 1600,
    title: 'Athletics Sprint Finish',
    category: 'sports'
  },
  {
    src: 'DSC_6058.JPG',
    dest: 'sports/sports-meet-competitors.jpg',
    width: 1600,
    title: 'Annual Sports Meet Competitors',
    category: 'sports'
  },
  {
    src: 'DSC_6187.JPG',
    dest: 'sports/campus-sports-day-crowd.jpg',
    width: 1600,
    title: 'Campus Sports Day Audience',
    category: 'sports'
  },
  {
    src: 'DSC_6380.JPG',
    dest: 'sports/field-event-action.jpg',
    width: 1600,
    title: 'Outdoor Field Event',
    category: 'sports'
  },
  {
    src: 'DSC_6474.JPG',
    dest: 'sports/track-and-field-relay.jpg',
    width: 1600,
    title: 'Inter-House Relay Heat',
    category: 'sports'
  },

  // ─── ST. MONTFORT AUDITORIUM & ASSEMBLIES ────────────────────────────────
  {
    src: 'DSC_5375.JPG',
    dest: 'events/montfort-auditorium-assembly.jpg',
    width: 1600,
    title: 'St. Montfort Auditorium Full Student Assembly',
    category: 'events'
  },
  {
    src: 'DSC_5451.JPG',
    dest: 'events/auditorium-speaker-address.jpg',
    width: 1600,
    title: 'Guest Speaker Addressing Student Body',
    category: 'events'
  },
  {
    src: 'DSC_5707.JPG',
    dest: 'events/auditorium-girls-section.jpg',
    width: 1600,
    title: 'Students Seated in St. Montfort Hall',
    category: 'events'
  },
  {
    src: 'DSC_5801.JPG',
    dest: 'events/student-assembly-hall.jpg',
    width: 1600,
    title: 'General Student Assembly',
    category: 'events'
  },
  {
    src: 'DSC_5523.JPG',
    dest: 'events/interactive-seminar-auditorium.jpg',
    width: 1600,
    title: 'Interactive Seminar in Auditorium',
    category: 'events'
  },

  // ─── FELICITATIONS & FORMAL CEREMONIES ──────────────────────────────────
  {
    src: 'LFS_2622.JPG',
    dest: 'events/principal-felicitation-ceremony.jpg',
    width: 1600,
    title: 'Principal Bro. Arun & Dignitaries Felicitation',
    category: 'events'
  },
  {
    src: 'LFS_2591.JPG',
    dest: 'events/distinguished-speaker-podium.jpg',
    width: 1600,
    title: 'Distinguished Guest Address at Podium',
    category: 'events'
  },
  {
    src: 'LFS_2654.JPG',
    dest: 'events/guest-honors-bouquet.jpg',
    width: 1600,
    title: 'Honoring Chief Guest with Shawl',
    category: 'events'
  },
  {
    src: 'DSC_0673.JPG',
    dest: 'events/bro-arun-memento-presentation.jpg',
    width: 1600,
    title: 'Principal Bro. Arun Presenting Memento',
    category: 'events'
  },
  {
    src: 'DSC_0684.JPG',
    dest: 'events/faculty-dignitary-felicitation.jpg',
    width: 1600,
    title: 'Senior Faculty Presenting Felicitation Memento',
    category: 'events'
  },

  // ─── CULTURAL CELEBRATIONS & STUDENT LIFE ────────────────────────────────
  {
    src: 'DSC_0409 - Copy.JPG',
    dest: 'events/student-food-fest-stalls.jpg',
    width: 1600,
    title: 'Student Food Fest & Culinary Stalls',
    category: 'events'
  },

  // ─── ANNOUNCEMENTS & PTM GRAPHICS ─────────────────────────────────────────
  {
    src: 'Meeting _ 4 copies.png',
    dest: 'events/ptm-welcome-banner.jpg',
    width: 1600,
    title: 'Parent-Teacher Meeting Welcome Graphic',
    category: 'events'
  },
  {
    src: 'PTM - 5 Copies.png',
    dest: 'events/ptm-staff-schedule-matrix.jpg',
    width: 1600,
    title: 'Parent-Teacher Meeting Staff Schedule Matrix',
    category: 'events'
  }
];

async function processPhotos() {
  console.log(`Starting optimization and integration of ${curations.length} curated photos...\n`);

  let count = 0;
  for (const item of curations) {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(publicDir, item.dest);

    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    try {
      const ext = path.extname(destPath).toLowerCase();
      if (ext === '.png') {
        await sharp(srcPath)
          .resize({ width: item.width, fit: 'inside', withoutEnlargement: true })
          .png({ compressionLevel: 8 })
          .toFile(destPath);
      } else {
        await sharp(srcPath)
          .resize({ width: item.width, fit: 'inside', withoutEnlargement: true, autoOrient: true })
          .jpeg({ quality: 84, mozjpeg: true })
          .toFile(destPath);
      }

      const stat = fs.statSync(destPath);
      count++;
      console.log(`[${count}/${curations.length}] ${item.src} -> /images/${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`ERROR processing ${item.src}:`, err.message);
    }
  }

  console.log(`\nSuccessfully processed and integrated ${count} images into public/images/!`);
}

processPhotos();
