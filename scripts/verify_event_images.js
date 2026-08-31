const http = require('http');

const urls = [
  'http://localhost:3000/campus/events',
  'http://localhost:3000/campus/gallery',
  'http://localhost:3000/campus',
  'http://localhost:3000/images/events/montfort-auditorium-assembly.jpg',
  'http://localhost:3000/images/events/motivational-talk-session.jpg',
  'http://localhost:3000/images/events/interactive-student-session.jpg',
  'http://localhost:3000/images/events/speaker-felicitation-memento.jpg',
  'http://localhost:3000/images/events/student-co-curricular-assembly.jpg',
  'http://localhost:3000/images/events/career-guidance-seminar.jpg',
  'http://localhost:3000/images/events/auditorium-speaker-address.jpg',
  'http://localhost:3000/images/events/distinguished-speaker-podium.jpg',
  'http://localhost:3000/images/events/auditorium-panorama.jpg',
  'http://localhost:3000/images/events/auditorium-girls-section.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, statusCode: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

(async () => {
  console.log('Verifying all endpoints and image assets:\n');
  let allPass = true;
  for (const url of urls) {
    const result = await checkUrl(url);
    const pass = result.statusCode === 200;
    if (!pass) allPass = false;
    console.log(`${pass ? '✓ [200 OK]' : '✗ [' + result.statusCode + ']'} ${result.url} (${result.contentType || result.error})`);
  }
  console.log(`\nOverall Result: ${allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
})();
