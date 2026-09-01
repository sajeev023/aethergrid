const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');

// 1. Silver Jubilee
const silverJubilee = [
  {
    id: 101,
    src: '/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg',
    title: 'Silver Jubilee (1999) — Chief Minister Honors LFJC Principals',
    desc: 'Landmark archival photograph from the 1999 Silver Jubilee celebrations at Uppal campus. Hon\'ble Chief Minister N. Chandrababu Naidu honoring founding principals Rev. Bro. Vincent, Dr. Emmanuel, Rev. Bro. Claude, Rev. Bro. John Kallarackal, Rev. Bro. Celestine, and Rev. Bro. M.A. George.',
    badge: 'Founding Leadership • 1999',
    year: '1999',
    event: 'Silver Jubilee Main Celebration & Principals Honor',
    confidence: 'High (Archival Souvenir Record)'
  },
  {
    id: 102,
    src: '/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg',
    title: 'Silver Jubilee (1999) — Chief Minister\'s Official Commendation',
    desc: 'Congratulatory message and commendation from Chief Minister N. Chandrababu Naidu on 25 years of educational distinction.',
    badge: 'State Commendation • 1999',
    year: '1999',
    event: 'Silver Jubilee Official State Message',
    confidence: 'High (Archival Document)'
  },
  {
    id: 103,
    src: '/images/silver-jubilee/silver-jubilee-governor-message.jpg',
    title: 'Silver Jubilee (1999) — State Governor\'s Commendation',
    desc: 'Official message from the Governor of Andhra Pradesh congratulating Little Flower Junior College on completing 25 years of excellence.',
    badge: 'Gubernatorial Message • 1999',
    year: '1999',
    event: 'Silver Jubilee Official Governor Message',
    confidence: 'High (Archival Document)'
  },
  {
    id: 104,
    src: '/images/silver-jubilee/silver-jubilee-devender-goud-message.jpg',
    title: 'Silver Jubilee (1999) — Home Minister T. Devender Goud\'s Message',
    desc: 'Official felicitation message from Minister for Home Affairs T. Devender Goud praising the Montfortian institution\'s high academic standards.',
    badge: 'Ministerial Message • 1999',
    year: '1999',
    event: 'Silver Jubilee Home Minister Commendation',
    confidence: 'High (Archival Document)'
  },
  {
    id: 105,
    src: '/images/silver-jubilee/silver-jubilee-rank-holders.jpg',
    title: 'Silver Jubilee (1999) — All-India IIT & State Rank Holders Record',
    desc: 'Official 25-year ledger documenting 1st All-India IIT, EAMCET, and BIE Intermediate state toppers from LFJC.',
    badge: 'Toppers Ledger • 1974–1999',
    year: '1999',
    event: 'Silver Jubilee Academic Record Book',
    confidence: 'High (Archival Ledger)'
  },
  {
    id: 106,
    src: '/images/silver-jubilee/silver-jubilee-celebrations-report.jpg',
    title: 'Silver Jubilee (1999) — Auditorium Inauguration & Week-Long Report',
    desc: 'Official chronicle of the week-long 25th anniversary celebrations, Jubilee Auditorium dedication, and cultural assemblies.',
    badge: 'Auditorium Report • 1999',
    year: '1999',
    event: 'Silver Jubilee Souvenir Chronicle',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 107,
    src: '/images/silver-jubilee/silver-jubilee-captains-history-1.jpg',
    title: 'Silver Jubilee (1999) — The Captains of LFJC (Part I)',
    desc: 'Archival chronicle detailing the leadership eras of Rev. Bro. Vincent (1974–76), Dr. Emmanuel (1976–78), and Rev. Bro. Claude (1978–83).',
    badge: 'Institutional History • 1999',
    year: '1999',
    event: 'Captains of LFJC Souvenir Feature',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 108,
    src: '/images/silver-jubilee/silver-jubilee-captains-history-2.jpg',
    title: 'Silver Jubilee (1999) — The Captains of LFJC (Part II)',
    desc: 'Archival chronicle detailing the leadership eras of Rev. Bro. John Kallarackal (1983–90), Rev. Bro. Celestine (1990–96), and Rev. Bro. M.A. George (1996–2002).',
    badge: 'Institutional History • 1999',
    year: '1999',
    event: 'Captains of LFJC Souvenir Feature',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 109,
    src: '/images/silver-jubilee/silver-jubilee-bro-britto-report.jpg',
    title: 'Silver Jubilee (1999) — Bro. Britto\'s Educational Chronicle',
    desc: 'Historical review and institutional perspective written by Provincial Superior Rev. Bro. Britto for the 25th Anniversary.',
    badge: 'Provincial Review • 1999',
    year: '1999',
    event: 'Silver Jubilee Provincial Chronicle',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 110,
    src: '/images/silver-jubilee/silver-jubilee-bro-george-interview.jpg',
    title: 'Silver Jubilee (1999) — Principal Bro. M.A. George Jubilee Interview',
    desc: 'Special 25th anniversary interview with Principal Rev. Bro. M.A. George reflecting on academic milestones, discipline, and vision.',
    badge: 'Principal Interview • 1999',
    year: '1999',
    event: 'Silver Jubilee Principal Address',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 111,
    src: '/images/silver-jubilee/silver-jubilee-sakunthala-reflections.jpg',
    title: 'Silver Jubilee (1999) — Faculty Reflections (1974–1999)',
    desc: 'Memoir and institutional reflection by senior faculty Mrs. P. Sakunthala charting LFJC\'s growth from its founding at Bashirbagh to the Uppal estate.',
    badge: 'Faculty Memoir • 1999',
    year: '1999',
    event: 'Silver Jubilee Faculty Chronicle',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 112,
    src: '/images/silver-jubilee/silver-jubilee-bro-vincent-portrait.jpg',
    title: 'Founding Principal Rev. Bro. Vincent (1974–1976)',
    desc: 'Archival portrait of Rev. Bro. Vincent, founding principal who established Little Flower Junior College in July 1974.',
    badge: 'Founding Principal • 1974',
    year: '1974',
    event: 'LFJC Founding Leadership',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 113,
    src: '/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg',
    title: 'Dr. Emmanuel — Principal (1976–1978)',
    desc: 'Archival portrait of Dr. Emmanuel, who led the expansion of science laboratories and academic departments.',
    badge: 'Principal • 1976–78',
    year: '1976',
    event: 'LFJC Leadership History',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 114,
    src: '/images/silver-jubilee/silver-jubilee-bro-claude.jpg',
    title: 'Rev. Bro. Claude — Principal (1978–1983)',
    desc: 'Archival portrait of Rev. Bro. Claude, who oversaw the transition to the sprawling eight-acre Uppal campus.',
    badge: 'Principal • 1978–83',
    year: '1978',
    event: 'LFJC Leadership History',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 115,
    src: '/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg',
    title: 'Rev. Bro. John Kallarackal — Principal (1983–1990)',
    desc: 'Archival portrait of Rev. Bro. John Kallarackal, under whose stewardship LFJC secured multiple all-India IIT 1st ranks.',
    badge: 'Principal • 1983–90',
    year: '1983',
    event: 'LFJC Leadership History',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 116,
    src: '/images/silver-jubilee/silver-jubilee-bro-celestine.jpg',
    title: 'Rev. Bro. Celestine — Principal (1990–1996)',
    desc: 'Archival portrait of Rev. Bro. Celestine, pioneer of student co-curricular forums and the collegiate sports complex.',
    badge: 'Principal • 1990–96',
    year: '1990',
    event: 'LFJC Leadership History',
    confidence: 'High (Archival Souvenir)'
  },
  {
    id: 117,
    src: '/images/silver-jubilee/silver-jubilee-bro-george.jpg',
    title: 'Rev. Bro. M.A. George — Principal (1996–2002)',
    desc: 'Archival portrait of Rev. Bro. M.A. George, who hosted the landmark 1999 Silver Jubilee celebrations.',
    badge: 'Principal • 1996–2002',
    year: '1996',
    event: 'LFJC Leadership History',
    confidence: 'High (Archival Souvenir)'
  }
];

console.log(`Curated ${silverJubilee.length} Silver Jubilee items.`);
