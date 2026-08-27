async function test() {
  const urls = [
    "http://localhost:3005/campus/sports",
    "http://localhost:3005/campus/gallery",
    "http://localhost:3005/images/sports/volleyball-spike-action.jpg",
    "http://localhost:3005/images/sports/volleyball-court-action.jpg",
    "http://localhost:3005/images/sports/volleyball-service-play.jpg",
    "http://localhost:3005/images/sports/volleyball-referee-match.jpg",
    "http://localhost:3005/images/sports/volleyball-team-faculty-1.jpg",
    "http://localhost:3005/images/sports/volleyball-team-faculty-2.jpg",
    "http://localhost:3005/images/sports/volleyball-team-faculty-3.jpg",
    "http://localhost:3005/images/sports/basketball-court-match.jpg",
    "http://localhost:3005/images/sports/basketball-fastbreak-dribble.jpg",
    "http://localhost:3005/images/sports/basketball-attack-transition.jpg",
    "http://localhost:3005/images/sports/basketball-drive-to-hoop.jpg",
    "http://localhost:3005/images/sports/basketball-team-squad.jpg",
    "http://localhost:3005/images/sports/basketball-finalists-celebration.jpg",
    "http://localhost:3005/images/sports/basketball-squad-faculty.jpg",
    "http://localhost:3005/images/sports/basketball-coaching-freethrow.jpg",
    "http://localhost:3005/images/sports/basketball-shooting-clinic.jpg"
  ];

  let passed = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`[PASS 200] ${url} (${res.headers.get("content-type")})`);
        passed++;
      } else {
        console.error(`[FAIL ${res.status}] ${url}`);
        failed++;
      }
    } catch (e) {
      console.error(`[ERR] ${url}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nEndpoint verification complete: ${passed} passed, ${failed} failed.`);
}

test();
