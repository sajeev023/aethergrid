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
    const s3d = data.indexOf('id="alumni"');
    const s4 = data.indexOf('id="videos"');

    console.log('Section Tag Positions:');
    console.log('  #silver-jubilee: ', s1);
    console.log('  #golden-jubilee: ', s2);
    console.log('  #campus-life:    ', s3);
    console.log('  #assemblies:     ', s3a);
    console.log('  #sports:         ', s3b);
    console.log('  #campus-labs:    ', s3c);
    console.log('  #alumni:         ', s3d);
    console.log('  #videos:         ', s4);

    const correct = s1 > 0 && s1 < s2 && s2 < s3 && s3 < s3a && s3a < s3b && s3b < s3c && s3c < s3d && s3d < s4;
    console.log('Strict Section Hierarchy & Ordering:', correct ? 'PERFECT PASS' : 'FAIL');

    // Audit image occurrences (all 101 items)
    const allExpectedImages = [
      // Silver Jubilee (17)
      '/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg',
      '/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg',
      '/images/silver-jubilee/silver-jubilee-governor-message.jpg',
      '/images/silver-jubilee/silver-jubilee-devender-goud-message.jpg',
      '/images/silver-jubilee/silver-jubilee-rank-holders.jpg',
      '/images/silver-jubilee/silver-jubilee-celebrations-report.jpg',
      '/images/silver-jubilee/silver-jubilee-captains-history-1.jpg',
      '/images/silver-jubilee/silver-jubilee-captains-history-2.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-britto-report.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-george-interview.jpg',
      '/images/silver-jubilee/silver-jubilee-sakunthala-reflections.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-vincent-portrait.jpg',
      '/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-claude.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-celestine.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-george.jpg',
      // Golden Jubilee (33)
      '/images/golden-jubilee/golden_jubilee_1.jpg',
      '/images/golden-jubilee/golden_jubilee_2.jpg',
      '/images/golden-jubilee/golden_jubilee_3.jpg',
      '/images/golden-jubilee/golden_jubilee_4.jpg',
      '/images/golden-jubilee/golden_jubilee_5.jpg',
      '/images/golden-jubilee/golden_jubilee_6.jpg',
      '/images/golden-jubilee/golden_jubilee_7.jpg',
      '/images/golden-jubilee/golden_jubilee_8.jpg',
      '/images/golden-jubilee/golden_jubilee_9.jpg',
      '/images/golden-jubilee/golden_jubilee_10.jpg',
      '/images/golden-jubilee/golden_jubilee_11.jpg',
      '/images/golden-jubilee/golden_jubilee_12.jpg',
      '/images/golden-jubilee/golden_jubilee_13.jpg',
      '/images/golden-jubilee/golden_jubilee_14.jpg',
      '/images/golden-jubilee/golden_jubilee_15.jpg',
      '/images/golden-jubilee/golden_jubilee_16.jpg',
      '/images/golden-jubilee/golden_jubilee_17.jpg',
      '/images/golden-jubilee/golden_jubilee_18.jpg',
      '/images/golden-jubilee/golden_jubilee_19.jpg',
      '/images/golden-jubilee/golden_jubilee_20.jpg',
      '/images/golden-jubilee/golden_jubilee_21.jpg',
      '/images/golden-jubilee/golden_jubilee_22.jpg',
      '/images/golden-jubilee/golden_jubilee_23.jpg',
      '/images/golden-jubilee/golden_jubilee_24.jpg',
      '/images/golden-jubilee/golden_jubilee_25.jpg',
      '/images/golden-jubilee/golden_jubilee_26.jpg',
      '/images/golden-jubilee/golden_jubilee_27.jpg',
      '/images/golden-jubilee/golden_jubilee_28.jpg',
      '/images/golden-jubilee/golden_jubilee_29.jpg',
      '/images/golden-jubilee/golden_jubilee_30.jpg',
      '/images/golden-jubilee/golden_jubilee_31.jpg',
      '/images/golden-jubilee/golden_jubilee_32.jpg',
      '/images/golden-jubilee/golden_jubilee_33.jpg',
      // Assemblies & Seminars (18)
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
      '/images/events/student-assembly-hall.jpg',
      '/images/events/principal-felicitation-ceremony.jpg',
      '/images/events/bro-arun-memento-presentation.jpg',
      '/images/events/faculty-dignitary-felicitation.jpg',
      '/images/events/guest-honors-bouquet.jpg',
      '/images/events/interactive-seminar-auditorium.jpg',
      '/images/events/student-food-fest-stalls.jpg',
      '/images/faculty-mentor.jpg',
      // Sports & Athletics (23)
      '/images/sports/volleyball-spike-action.jpg',
      '/images/sports/volleyball-court-action.jpg',
      '/images/sports/volleyball-service-play.jpg',
      '/images/sports/volleyball-referee-match.jpg',
      '/images/sports/volleyball-team-faculty-1.jpg',
      '/images/sports/volleyball-team-faculty-2.jpg',
      '/images/sports/volleyball-team-faculty-3.jpg',
      '/images/sports/basketball-court-match.jpg',
      '/images/sports/basketball-fastbreak-dribble.jpg',
      '/images/sports/basketball-drive-to-hoop.jpg',
      '/images/sports/basketball-attack-transition.jpg',
      '/images/sports/basketball-shooting-clinic.jpg',
      '/images/sports/basketball-coaching-freethrow.jpg',
      '/images/sports/basketball-team-squad.jpg',
      '/images/sports/basketball-squad-faculty.jpg',
      '/images/sports/basketball-finalists-celebration.jpg',
      '/images/sports/100m-sprint-action.jpg',
      '/images/sports/athletics-sprint-finish.jpg',
      '/images/sports/sports-track-heats.jpg',
      '/images/sports/relay-race-field.jpg',
      '/images/sports/sports-winners-1st-year.jpg',
      '/images/sports/sports-winners-2nd-year.jpg',
      '/images/sports/spectators-campus-steps.jpg',
      // Campus Infrastructure & Laboratories (8)
      '/images/campus-drone.jpg',
      '/images/campus-building.jpg',
      '/images/campus-hero.jpg',
      '/images/physics-lab.jpg',
      '/images/chemistry-lab.jpg',
      '/images/computer-lab.jpg',
      '/images/library-heritage.jpg',
      '/images/sports-arena.jpg',
      // Alumni & Fellowship (2)
      '/images/alumni-group.jpg',
      '/images/alumni.jpg'
    ];

    let missing = 0;
    for (const src of allExpectedImages) {
      if (!data.includes(src)) {
        console.error('MISSING IMAGE IN HTML:', src);
        missing++;
      }
    }

    console.log(`Total Images Audited: ${allExpectedImages.length} | Missing: ${missing}`);
    console.log(`Image Audit Result: ${missing === 0 ? '100% COMPLETE' : 'INCOMPLETE'}`);
  });
});
