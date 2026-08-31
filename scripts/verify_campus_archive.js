const http = require('http');

const endpoints = [
  { url: 'http://localhost:3000/campus', expected: [200] },
  { url: 'http://localhost:3000/campus/gallery', expected: [200, 307, 308] },
  { url: 'http://localhost:3000/campus/events', expected: [200, 307, 308] },
  { url: 'http://localhost:3000/campus/facilities', expected: [200, 307, 308] },
  { url: 'http://localhost:3000/campus/sports', expected: [200, 307, 308] },
  // 1st: Silver Jubilee image
  { url: 'http://localhost:3000/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg', expected: [200] },
  // 2nd: Golden Jubilee image
  { url: 'http://localhost:3000/images/golden-jubilee/golden_jubilee_1.jpg', expected: [200] },
  // Assemblies & Events (from lite shot)
  { url: 'http://localhost:3000/images/events/montfort-auditorium-assembly.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/motivational-talk-session.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/interactive-student-session.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/speaker-felicitation-memento.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/student-co-curricular-assembly.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/career-guidance-seminar.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/auditorium-speaker-address.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/distinguished-speaker-podium.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/auditorium-panorama.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/events/auditorium-girls-section.jpg', expected: [200] },
  // Sports
  { url: 'http://localhost:3000/images/sports/volleyball-spike-action.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/sports/basketball-fastbreak-dribble.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/sports/100m-sprint-action.jpg', expected: [200] },
  // Facilities
  { url: 'http://localhost:3000/images/campus-drone.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/physics-lab.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/chemistry-lab.jpg', expected: [200] },
  { url: 'http://localhost:3000/images/library-heritage.jpg', expected: [200] },
];

async function check(item) {
  return new Promise((resolve) => {
    http.get(item.url, (res) => {
      const ok = item.expected.includes(res.statusCode);
      resolve({ url: item.url, statusCode: res.statusCode, ok, location: res.headers.location });
    }).on('error', (err) => {
      resolve({ url: item.url, error: err.message, ok: false });
    });
  });
}

(async () => {
  console.log('Testing Campus Life & Visual Archive endpoints and assets:\n');
  let allPass = true;
  for (const item of endpoints) {
    const res = await check(item);
    if (!res.ok) allPass = false;
    const extra = res.location ? `-> redirect: ${res.location}` : '';
    console.log(`${res.ok ? '✓' : '✗'} [${res.statusCode || 'ERR'}] ${res.url} ${extra}`);
  }
  console.log(`\nOverall Verification Result: ${allPass ? 'ALL TESTS PASSED SUCCESSFULLY' : 'FAILURES DETECTED'}`);
  process.exit(allPass ? 0 : 1);
})();
