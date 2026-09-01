const http = require('http');

http.get('http://localhost:3000/campus', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const s1 = data.indexOf('id="silver-jubilee"');
    const s2 = data.indexOf('id="golden-jubilee"');
    const s3 = data.indexOf('id="campus-life"');
    const s3a = data.indexOf('id="assemblies"');
    const s3b = data.indexOf('id="sports"');
    const s3c = data.indexOf('id="campus-labs"');
    const s4 = data.indexOf('id="videos"');

    console.log('Section Tag Positions:');
    console.log('  #silver-jubilee: ', s1);
    console.log('  #golden-jubilee: ', s2);
    console.log('  #campus-life:    ', s3);
    console.log('  #assemblies:     ', s3a);
    console.log('  #sports:         ', s3b);
    console.log('  #campus-labs:    ', s3c);
    console.log('  #videos:         ', s4);

    const correct = s1 > 0 && s1 < s2 && s2 < s3 && s3 < s3a && s3a < s3b && s3b < s3c && s3c < s4;
    console.log('Strict Section Hierarchy & Ordering:', correct ? 'PERFECT PASS' : 'FAIL');

    // Audit image occurrences
    const allExpectedImages = [
      '/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg',
      '/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg',
      '/images/silver-jubilee/silver-jubilee-rank-holders.jpg',
      '/images/silver-jubilee/silver-jubilee-celebrations-report.jpg',
      '/images/golden-jubilee/golden_jubilee_1.jpg',
      '/images/golden-jubilee/golden_jubilee_2.jpg',
      '/images/golden-jubilee/golden_jubilee_3.jpg',
      '/images/golden-jubilee/golden_jubilee_5.jpg',
      '/images/golden-jubilee/golden_jubilee_7.jpg',
      '/images/golden-jubilee/golden_jubilee_10.jpg',
      '/images/events/montfort-auditorium-assembly.jpg',
      '/images/events/motivational-talk-session.jpg',
      '/images/events/interactive-student-session.jpg',
      '/images/events/speaker-felicitation-memento.jpg',
      '/images/events/student-co-curricular-assembly.jpg',
      '/images/events/career-guidance-seminar.jpg',
      '/images/events/auditorium-speaker-address.jpg',
      '/images/events/distinguished-speaker-podium.jpg',
      '/images/events/auditorium-panorama.jpg',
      '/images/events/auditorium-girls-section.jpg',
      '/images/faculty-mentor.jpg',
      '/images/sports/volleyball-spike-action.jpg',
      '/images/sports/volleyball-court-action.jpg',
      '/images/sports/volleyball-service-play.jpg',
      '/images/sports/volleyball-team-faculty-1.jpg',
      '/images/sports/basketball-court-match.jpg',
      '/images/sports/basketball-fastbreak-dribble.jpg',
      '/images/sports/basketball-team-squad.jpg',
      '/images/sports/basketball-coaching-freethrow.jpg',
      '/images/sports/100m-sprint-action.jpg',
      '/images/sports/athletics-sprint-finish.jpg',
      '/images/sports/relay-race-field.jpg',
      '/images/sports/sports-winners-1st-year.jpg',
      '/images/sports/sports-winners-2nd-year.jpg',
      '/images/sports/spectators-campus-steps.jpg',
      '/images/campus-drone.jpg',
      '/images/campus-building.jpg',
      '/images/physics-lab.jpg',
      '/images/chemistry-lab.jpg',
      '/images/computer-lab.jpg',
      '/images/library-heritage.jpg',
    ];

    let missing = 0;
    for (const src of allExpectedImages) {
      if (!data.includes(src)) {
        console.error('MISSING IMAGE:', src);
        missing++;
      }
    }

    console.log(`Total Images Audited: ${allExpectedImages.length} | Missing: ${missing}`);
    console.log(`Image Audit Result: ${missing === 0 ? '100% COMPLETE' : 'INCOMPLETE'}`);
  });
});
