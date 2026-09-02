const http = require('http');

http.get('http://localhost:3001/campus', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const pSilver = data.indexOf('id="silver-jubilee"');
    const pGolden = data.indexOf('id="golden-jubilee"');
    const pCampus = data.indexOf('id="campus"');
    const pCampusLabs = data.indexOf('id="campus-labs"');
    const pFacilities = data.indexOf('id="facilities"');
    const pEvents = data.indexOf('id="events"');
    const pSports = data.indexOf('id="sports"');
    const pVideos = data.indexOf('id="videos"');

    console.log('--- SECTION POSITIONS IN RENDERED HTML ---');
    console.log('1. Silver Jubilee:       ', pSilver);
    console.log('2. Golden Jubilee:       ', pGolden);
    console.log('3. Campus & Labs:        ', pCampus, '(labs:', pCampusLabs, ', facilities:', pFacilities, ')');
    console.log('4. Events & Sports:      ', pEvents, '(sports:', pSports, ')');
    console.log('5. Video Archive:        ', pVideos);

    const isOrdered = pSilver > 0 && pSilver < pGolden && pGolden < pCampus && pCampus < pEvents && pEvents < pVideos;
    console.log('\nStrict Order Check (Silver -> Golden -> Campus -> Events -> Videos):', isOrdered ? 'PASSED ✅' : 'FAILED ❌');

    // Check image src presence (handles Next.js Image component encoding)
    const findImg = (src) => {
      const idx1 = data.indexOf(src);
      if (idx1 !== -1) return idx1;
      const encoded = encodeURIComponent(src);
      return data.indexOf(encoded);
    };

    const silverImg1 = findImg('/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg');
    const goldenImg1 = findImg('/images/golden-jubilee/golden_jubilee_1.jpg');
    const campusImg1 = findImg('/images/campus-drone.jpg');
    const eventImg1 = findImg('/images/events/montfort-auditorium-assembly.jpg');
    const sportsImg1 = findImg('/images/sports/volleyball-spike-action.jpg');

    console.log('\n--- FIRST IMAGE POSITION OF EACH SECTION ---');
    console.log('Silver Jubilee 1st img: ', silverImg1);
    console.log('Golden Jubilee 1st img: ', goldenImg1);
    console.log('Campus & Labs 1st img:  ', campusImg1);
    console.log('Events 1st img:         ', eventImg1);
    console.log('Sports 1st img:         ', sportsImg1);

    const isImageOrdered = silverImg1 > 0 && silverImg1 < goldenImg1 && goldenImg1 < campusImg1 && campusImg1 < eventImg1 && eventImg1 < sportsImg1;
    console.log('\nStrict Image Array Order Check:', isImageOrdered ? 'PASSED ✅' : 'FAILED ❌');

    // Verify all individual images across sections are present
    const allImages = [
      '/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg',
      '/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg',
      '/images/silver-jubilee/silver-jubilee-governor-message.jpg',
      '/images/silver-jubilee/silver-jubilee-rank-holders.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-vincent-portrait.jpg',
      '/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-claude.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-celestine.jpg',
      '/images/silver-jubilee/silver-jubilee-bro-george.jpg',
      '/images/golden-jubilee/golden_jubilee_1.jpg',
      '/images/golden-jubilee/golden_jubilee_2.jpg',
      '/images/golden-jubilee/golden_jubilee_3.jpg',
      '/images/golden-jubilee/golden_jubilee_5.jpg',
      '/images/golden-jubilee/golden_jubilee_7.jpg',
      '/images/golden-jubilee/golden_jubilee_10.jpg',
      '/images/golden-jubilee/golden_jubilee_12.jpg',
      '/images/golden-jubilee/golden_jubilee_14.jpg',
      '/images/golden-jubilee/golden_jubilee_18.jpg',
      '/images/golden-jubilee/golden_jubilee_20.jpg',
      '/images/golden-jubilee/golden_jubilee_22.jpg',
      '/images/golden-jubilee/golden_jubilee_25.jpg',
      '/images/golden-jubilee/golden_jubilee_27.jpg',
      '/images/golden-jubilee/golden_jubilee_32.jpg',
      '/images/golden-jubilee/golden_jubilee_33.jpg',
      '/images/campus-drone.jpg',
      '/images/campus-building.jpg',
      '/images/physics-lab.jpg',
      '/images/chemistry-lab.jpg',
      '/images/computer-lab.jpg',
      '/images/library-heritage.jpg',
      '/images/sports-arena.jpg',
      '/images/events/montfort-auditorium-assembly.jpg',
      '/images/events/motivational-talk-session.jpg',
      '/images/events/career-guidance-seminar.jpg',
      '/images/events/principal-felicitation-ceremony.jpg',
      '/images/events/student-food-fest-stalls.jpg',
      '/images/faculty-mentor.jpg',
      '/images/sports/volleyball-spike-action.jpg',
      '/images/sports/volleyball-team-faculty-1.jpg',
      '/images/sports/basketball-court-match.jpg',
      '/images/sports/basketball-team-squad.jpg',
      '/images/sports/100m-sprint-action.jpg',
      '/images/sports/relay-race-field.jpg',
      '/images/sports/sports-winners-1st-year.jpg',
      '/images/sports/spectators-campus-steps.jpg'
    ];

    let missing = 0;
    for (const img of allImages) {
      if (findImg(img) === -1) {
        console.error('Missing image:', img);
        missing++;
      }
    }
    console.log(`\nTotal Campus Life Images Audited: ${allImages.length} | Missing: ${missing}`);
    console.log('Complete Image Audit:', missing === 0 ? '100% INTACT & VERIFIED ✅' : 'INCOMPLETE ❌');
  });
});
