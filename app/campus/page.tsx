import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Sparkles,
  Building2,
  Trophy,
  Users,
  Film,
  Compass,
  HeartHandshake,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ChronologicalCampusArchive,
  VideoCard,
  type GalleryItem,
  type VideoItem,
} from "./gallery-client";

export const metadata: Metadata = {
  title: "Campus Life & Visual Archive",
  description:
    "Explore the complete chronological visual archive of Little Flower Junior College across 50 years — from historic Silver & Golden Jubilee milestones to vibrant St. Montfort Auditorium assemblies, athletic championships, and science laboratories.",
};

// ─── 1. SILVER JUBILEE ARCHIVE (1999 • 25 Years of Educational Excellence) ───

const SILVER_JUBILEE_IMAGES: GalleryItem[] = [
  {
    id: 101,
    src: "/images/silver-jubilee/silver-jubilee-principals-cm-honors.jpg",
    badge: "Founding Leadership • 1999",
    title: "1999 Silver Jubilee — Chief Minister Honors LFJC Principals",
    desc: "Rare archival portrait from the landmark 1999 Silver Jubilee celebrations at Uppal campus. Hon'ble Chief Minister N. Chandrababu Naidu honoring founding principals Rev. Bro. Vincent, Dr. Emmanuel, Rev. Bro. Claude, Rev. Bro. John Kallarackal, Rev. Bro. Celestine, and Rev. Bro. M.A. George.",
    category: "silver-jubilee",
  },
  {
    id: 102,
    src: "/images/silver-jubilee/silver-jubilee-cm-naidu-message.jpg",
    badge: "State Commendation • 1999",
    title: "1999 Silver Jubilee — Chief Minister's Official Commendation",
    desc: "Congratulatory message and commendation from Chief Minister N. Chandrababu Naidu on 25 years of educational distinction.",
    category: "silver-jubilee",
  },
  {
    id: 103,
    src: "/images/silver-jubilee/silver-jubilee-governor-message.jpg",
    badge: "Gubernatorial Message • 1999",
    title: "1999 Silver Jubilee — State Governor's Official Message",
    desc: "Official message from the Governor of Andhra Pradesh congratulating Little Flower Junior College on completing 25 years of excellence.",
    category: "silver-jubilee",
  },
  {
    id: 104,
    src: "/images/silver-jubilee/silver-jubilee-devender-goud-message.jpg",
    badge: "Ministerial Message • 1999",
    title: "1999 Silver Jubilee — Home Minister T. Devender Goud's Message",
    desc: "Official felicitation message from Minister for Home Affairs T. Devender Goud praising the Montfortian institution's high academic standards.",
    category: "silver-jubilee",
  },
  {
    id: 105,
    src: "/images/silver-jubilee/silver-jubilee-rank-holders.jpg",
    badge: "Toppers Ledger • 1974–1999",
    title: "1999 Silver Jubilee — All-India IIT & State Rank Holders Record",
    desc: "Archival ledger documenting 1st All-India IIT, EAMCET, and BIE Intermediate state toppers from Little Flower Junior College.",
    category: "silver-jubilee",
  },
  {
    id: 106,
    src: "/images/silver-jubilee/silver-jubilee-celebrations-report.jpg",
    badge: "Auditorium Report • 1999",
    title: "1999 Silver Jubilee — Celebrations & Auditorium Report",
    desc: "Official summary of the Jubilee Auditorium inauguration and week-long silver jubilee festivities at Uppal campus.",
    category: "silver-jubilee",
  },
  {
    id: 107,
    src: "/images/silver-jubilee/silver-jubilee-captains-history-1.jpg",
    badge: "Institutional History • 1999",
    title: "1999 Silver Jubilee — The Captains of LFJC (Part I)",
    desc: "Archival chronicle detailing the leadership eras of Rev. Bro. Vincent (1974–76), Dr. Emmanuel (1976–78), and Rev. Bro. Claude (1978–83).",
    category: "silver-jubilee",
  },
  {
    id: 108,
    src: "/images/silver-jubilee/silver-jubilee-captains-history-2.jpg",
    badge: "Institutional History • 1999",
    title: "1999 Silver Jubilee — The Captains of LFJC (Part II)",
    desc: "Archival chronicle detailing the leadership eras of Rev. Bro. John Kallarackal (1983–90), Rev. Bro. Celestine (1990–96), and Rev. Bro. M.A. George (1996–2002).",
    category: "silver-jubilee",
  },
  {
    id: 109,
    src: "/images/silver-jubilee/silver-jubilee-bro-britto-report.jpg",
    badge: "Provincial Review • 1999",
    title: "1999 Silver Jubilee — Bro. Britto's Educational Chronicle",
    desc: "Historical review and institutional perspective written by Provincial Superior Rev. Bro. Britto for the 25th Anniversary.",
    category: "silver-jubilee",
  },
  {
    id: 110,
    src: "/images/silver-jubilee/silver-jubilee-bro-george-interview.jpg",
    badge: "Principal Interview • 1999",
    title: "1999 Silver Jubilee — Principal Bro. M.A. George Jubilee Interview",
    desc: "Special 25th anniversary interview with Principal Rev. Bro. M.A. George reflecting on academic milestones, discipline, and vision.",
    category: "silver-jubilee",
  },
  {
    id: 111,
    src: "/images/silver-jubilee/silver-jubilee-sakunthala-reflections.jpg",
    badge: "Faculty Memoir • 1999",
    title: "1999 Silver Jubilee — Faculty Reflections (1974–1999)",
    desc: "Memoir and institutional reflection by senior faculty Mrs. P. Sakunthala charting LFJC's growth from its founding at Bashirbagh to the Uppal estate.",
    category: "silver-jubilee",
  },
  {
    id: 112,
    src: "/images/silver-jubilee/silver-jubilee-bro-vincent-portrait.jpg",
    badge: "Founding Principal • 1974",
    title: "Founding Principal Rev. Bro. Vincent (1974–1976)",
    desc: "Archival portrait of Rev. Bro. Vincent, founding principal who established Little Flower Junior College in July 1974.",
    category: "silver-jubilee",
  },
  {
    id: 113,
    src: "/images/silver-jubilee/silver-jubilee-dr-emmanuel.jpg",
    badge: "Principal • 1976–1978",
    title: "Dr. Emmanuel — Principal (1976–1978)",
    desc: "Archival portrait of Dr. Emmanuel, who oversaw early academic expansion and science laboratories.",
    category: "silver-jubilee",
  },
  {
    id: 114,
    src: "/images/silver-jubilee/silver-jubilee-bro-claude.jpg",
    badge: "Principal • 1978–1983",
    title: "Rev. Bro. Claude — Principal (1978–1983)",
    desc: "Archival portrait of Rev. Bro. Claude, who oversaw the transition to the sprawling eight-acre Uppal campus.",
    category: "silver-jubilee",
  },
  {
    id: 115,
    src: "/images/silver-jubilee/silver-jubilee-bro-john-kallarackal.jpg",
    badge: "Principal • 1983–1990",
    title: "Rev. Bro. John Kallarackal — Principal (1983–1990)",
    desc: "Archival portrait of Rev. Bro. John Kallarackal, under whose stewardship LFJC secured multiple All-India IIT 1st ranks.",
    category: "silver-jubilee",
  },
  {
    id: 116,
    src: "/images/silver-jubilee/silver-jubilee-bro-celestine.jpg",
    badge: "Principal • 1990–1996",
    title: "Rev. Bro. Celestine — Principal (1990–1996)",
    desc: "Archival portrait of Rev. Bro. Celestine, pioneer of student co-curricular forums and sports complex expansion.",
    category: "silver-jubilee",
  },
  {
    id: 117,
    src: "/images/silver-jubilee/silver-jubilee-bro-george.jpg",
    badge: "Principal • 1996–2002",
    title: "Rev. Bro. M.A. George — Principal (1996–2002)",
    desc: "Archival portrait of Rev. Bro. M.A. George, who hosted the landmark 1999 Silver Jubilee celebrations.",
    category: "silver-jubilee",
  },
];

// ─── 2. GOLDEN JUBILEE ARCHIVE (1974–2024 • 50 Years of Truth & Service) ────

const GOLDEN_JUBILEE_IMAGES: GalleryItem[] = [
  {
    id: 201,
    src: "/images/golden-jubilee/golden_jubilee_1.jpg",
    badge: "50-Year Milestone • 1974–2024",
    title: "Golden Jubilee — Grand Stage Inauguration & Choreography",
    desc: "Inaugural dance choreography and stage assembly celebrating 50 years of Montfortian educational excellence.",
    category: "golden-jubilee",
  },
  {
    id: 202,
    src: "/images/golden-jubilee/golden_jubilee_2.jpg",
    badge: "Montfortian Dais • 2024",
    title: "Golden Jubilee — Dignitaries & Montfortian Leadership on Dais",
    desc: "Provincial leadership, Principal Rev. Bro. Arun, and guest dignitaries assembled on stage for the 50th year milestone.",
    category: "golden-jubilee",
  },
  {
    id: 203,
    src: "/images/golden-jubilee/golden_jubilee_3.jpg",
    badge: "Auspicious Inauguration • 2024",
    title: "Golden Jubilee — Lighting of the Ceremonial Lamp",
    desc: "Auspicious lighting of the lamp by esteemed dignitaries and Brothers of St. Gabriel.",
    category: "golden-jubilee",
  },
  {
    id: 204,
    src: "/images/golden-jubilee/golden_jubilee_4.jpg",
    badge: "Floral Felicitation • 2024",
    title: "Golden Jubilee — Dignitary Welcome Address & Felicitation",
    desc: "Welcome address and floral felicitation during the grand opening session of the Golden Jubilee.",
    category: "golden-jubilee",
  },
  {
    id: 205,
    src: "/images/golden-jubilee/golden_jubilee_5.jpg",
    badge: "Jubilee Souvenir • 2024",
    title: "Golden Jubilee — Souvenir Release & Commemorative Unveiling",
    desc: "Official release and unveiling of the 50-Year Golden Jubilee commemorative souvenir book.",
    category: "golden-jubilee",
  },
  {
    id: 206,
    src: "/images/golden-jubilee/golden_jubilee_6.jpg",
    badge: "Memento Presentation • 2024",
    title: "Golden Jubilee — Presentation of Commemorative Mementos",
    desc: "Presentation of Golden Jubilee commemorative mementos to distinguished guest dignitaries.",
    category: "golden-jubilee",
  },
  {
    id: 207,
    src: "/images/golden-jubilee/golden_jubilee_7.jpg",
    badge: "Alumni Distinction • 2024",
    title: "Golden Jubilee — Distinguished Alumni Keynote Felicitation",
    desc: "Honoring eminent alumni who have achieved nationwide distinction in industry, science, and public service.",
    category: "golden-jubilee",
  },
  {
    id: 208,
    src: "/images/golden-jubilee/golden_jubilee_8.jpg",
    badge: "Keynote Address • 2024",
    title: "Golden Jubilee — Keynote on Montfortian Legacy",
    desc: "Distinguished guest speaker delivering an address on five decades of academic ethics and character building.",
    category: "golden-jubilee",
  },
  {
    id: 209,
    src: "/images/golden-jubilee/golden_jubilee_9.jpg",
    badge: "Student Audience • 2024",
    title: "Golden Jubilee — Student Audience in St. Montfort Hall",
    desc: "Intermediate students, staff, and visitors assembled in St. Montfort Hall during keynote addresses.",
    category: "golden-jubilee",
  },
  {
    id: 210,
    src: "/images/golden-jubilee/golden_jubilee_10.jpg",
    badge: "Cultural Extravaganza • 2024",
    title: "Golden Jubilee — Traditional Classical Dance Invocation",
    desc: "Classical dance invocation performance by intermediate students celebrating five decades of heritage.",
    category: "golden-jubilee",
  },
  {
    id: 211,
    src: "/images/golden-jubilee/golden_jubilee_11.jpg",
    badge: "Fusion Choreography • 2024",
    title: "Golden Jubilee — Classical Fusion Stage Performance",
    desc: "Grand classical fusion dance choreography performed on the main celebratory stage.",
    category: "golden-jubilee",
  },
  {
    id: 212,
    src: "/images/golden-jubilee/golden_jubilee_12.jpg",
    badge: "Thematic Dance • 2024",
    title: "Golden Jubilee — Thematic Cultural Presentation",
    desc: "Contemporary thematic cultural dance portraying Truth, Virtue, and Wisdom.",
    category: "golden-jubilee",
  },
  {
    id: 213,
    src: "/images/golden-jubilee/golden_jubilee_13.jpg",
    badge: "Stage Ensemble • 2024",
    title: "Golden Jubilee — Full Ensemble Cultural Production",
    desc: "Full student ensemble stage performance featuring vibrant regional costumes.",
    category: "golden-jubilee",
  },
  {
    id: 214,
    src: "/images/golden-jubilee/golden_jubilee_14.jpg",
    badge: "Jubilee Choir • 2024",
    title: "Golden Jubilee — Student Choir & Orchestra Performance",
    desc: "LFJC student choir and live musical orchestra performing the official 50th Jubilee Anthem.",
    category: "golden-jubilee",
  },
  {
    id: 215,
    src: "/images/golden-jubilee/golden_jubilee_15.jpg",
    badge: "Historical Tableau • 2024",
    title: "Golden Jubilee — Stage Tableau of 50-Year Milestones",
    desc: "Dramatic stage tableau illustrating half a century of institutional growth and accomplishments.",
    category: "golden-jubilee",
  },
  {
    id: 216,
    src: "/images/golden-jubilee/golden_jubilee_16.jpg",
    badge: "Folk Rhythms • 2024",
    title: "Golden Jubilee — Traditional Folk Dance Sequence",
    desc: "Student cultural delegation performing celebratory regional folk dance rhythms.",
    category: "golden-jubilee",
  },
  {
    id: 217,
    src: "/images/golden-jubilee/golden_jubilee_17.jpg",
    badge: "Celebratory Dais • 2024",
    title: "Golden Jubilee — Celebratory Group Dance Presentation",
    desc: "Dynamic group dance sequence on the main auditorium stage celebrating the milestone anniversary.",
    category: "golden-jubilee",
  },
  {
    id: 218,
    src: "/images/golden-jubilee/golden_jubilee_18.jpg",
    badge: "Montfortian Brothers • 2024",
    title: "Golden Jubilee — Montfortian Brothers & Faculty Assembly",
    desc: "Brothers of St. Gabriel and senior academic faculty assembled together on the main dais.",
    category: "golden-jubilee",
  },
  {
    id: 219,
    src: "/images/golden-jubilee/golden_jubilee_19.jpg",
    badge: "Faculty Honors • 2024",
    title: "Golden Jubilee — Long-Service Faculty Felicitation",
    desc: "Senior faculty members and department heads felicitated for decades of dedicated pedagogical service.",
    category: "golden-jubilee",
  },
  {
    id: 220,
    src: "/images/golden-jubilee/golden_jubilee_20.jpg",
    badge: "Alumni Awards • 2024",
    title: "Golden Jubilee — Distinguished Alumni Award Ceremony",
    desc: "Felicitation ceremony presenting mementos of honor to prominent LFJC alumni.",
    category: "golden-jubilee",
  },
  {
    id: 221,
    src: "/images/golden-jubilee/golden_jubilee_21.jpg",
    badge: "Alumni Address • 2024",
    title: "Golden Jubilee — Alumni Keynote Address",
    desc: "Distinguished alumnus addressing intermediate students on career excellence and ethics.",
    category: "golden-jubilee",
  },
  {
    id: 222,
    src: "/images/golden-jubilee/golden_jubilee_22.jpg",
    badge: "Alumni Reunion • 2024",
    title: "Golden Jubilee — Alumni Batch Representatives Reunion",
    desc: "Representatives from multiple graduating batches reunited on campus to mark the 50th year.",
    category: "golden-jubilee",
  },
  {
    id: 223,
    src: "/images/golden-jubilee/golden_jubilee_23.jpg",
    badge: "Nostalgic Reflections • 2024",
    title: "Golden Jubilee — Alumni Nostalgic Reflections",
    desc: "Former students sharing tributes and memories of their formative years at Little Flower Junior College.",
    category: "golden-jubilee",
  },
  {
    id: 224,
    src: "/images/golden-jubilee/golden_jubilee_24.jpg",
    badge: "Student Leadership • 2024",
    title: "Golden Jubilee — Student Council Office Bearers Honored",
    desc: "Former student council leaders and campus captains recognized during the jubilee assembly.",
    category: "golden-jubilee",
  },
  {
    id: 225,
    src: "/images/golden-jubilee/golden_jubilee_25.jpg",
    badge: "Retired Faculty • 2024",
    title: "Golden Jubilee — Honoring Retired Professors & Mentors",
    desc: "Special recognition and thanksgiving ceremony honoring retired faculty who shaped LFJC's heritage.",
    category: "golden-jubilee",
  },
  {
    id: 226,
    src: "/images/golden-jubilee/golden_jubilee_26.jpg",
    badge: "Presidential Address • 2024",
    title: "Golden Jubilee — Provincial Superior's Presidential Address",
    desc: "Provincial Superior delivering the keynote presidential address on Montfortian educational mission.",
    category: "golden-jubilee",
  },
  {
    id: 227,
    src: "/images/golden-jubilee/golden_jubilee_27.jpg",
    badge: "Institutional Report • 2024",
    title: "Golden Jubilee — Principal Rev. Bro. Arun's 50-Year Report",
    desc: "Principal Rev. Bro. Arun presenting the comprehensive 50-year institutional chronicle and academic report.",
    category: "golden-jubilee",
  },
  {
    id: 228,
    src: "/images/golden-jubilee/golden_jubilee_28.jpg",
    badge: "Guest of Honour • 2024",
    title: "Golden Jubilee — Guest of Honour Inspiring Address",
    desc: "Guest of Honour delivering an inspiring charge to students on leadership, perseverance, and purpose.",
    category: "golden-jubilee",
  },
  {
    id: 229,
    src: "/images/golden-jubilee/golden_jubilee_29.jpg",
    badge: "Standing Ovation • 2024",
    title: "Golden Jubilee — Standing Ovation during Jubilee Anthem",
    desc: "Auditorium standing ovation as the student choir and orchestra perform the Golden Jubilee Anthem.",
    category: "golden-jubilee",
  },
  {
    id: 230,
    src: "/images/golden-jubilee/golden_jubilee_30.jpg",
    badge: "Procession • 2024",
    title: "Golden Jubilee — Ceremonial Student Council Procession",
    desc: "Student council delegation leading dignitaries in the ceremonial jubilee procession.",
    category: "golden-jubilee",
  },
  {
    id: 231,
    src: "/images/golden-jubilee/golden_jubilee_31.jpg",
    badge: "Performers Portrait • 2024",
    title: "Golden Jubilee — Cultural Performers Group Portrait",
    desc: "Student performers and faculty coordinators gathered for the official Golden Jubilee cultural portrait.",
    category: "golden-jubilee",
  },
  {
    id: 232,
    src: "/images/golden-jubilee/golden_jubilee_32.jpg",
    badge: "Grand Finale • 2024",
    title: "Golden Jubilee — Grand Finale & Stage Illumination",
    desc: "Grand finale celebration with stage illumination, confetti, and celebratory assembly.",
    category: "golden-jubilee",
  },
  {
    id: 233,
    src: "/images/golden-jubilee/golden_jubilee_33.jpg",
    badge: "Thanksgiving • 2024",
    title: "Golden Jubilee — Concluding Thanksgiving & Vote of Thanks",
    desc: "Closing thanksgiving prayer and formal vote of thanks concluding the 50th Anniversary celebrations.",
    category: "golden-jubilee",
  },
];

// ─── 3A. ASSEMBLIES & SEMINARS ARCHIVE (18 Images) ──────────────────────────

const ASSEMBLIES_IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: "/images/events/montfort-auditorium-assembly.jpg",
    badge: "Auditorium Assembly",
    title: "St. Montfort Auditorium Full Student Assembly",
    desc: "Panoramic view of intermediate students assembled in the air-conditioned St. Montfort Auditorium.",
    category: "assemblies",
  },
  {
    id: 2,
    src: "/images/events/motivational-talk-session.jpg",
    badge: "Leadership Series",
    title: "Motivational Talk & Leadership Address",
    desc: "Dynamic keynote speaker engaging the student body with guidance on goal-setting, discipline, and purpose.",
    category: "assemblies",
  },
  {
    id: 3,
    src: "/images/events/interactive-student-session.jpg",
    badge: "Student Forum",
    title: "Interactive Student Stage Forum",
    desc: "Students participating actively on stage in live discussion, problem solving, and interactive Q&A.",
    category: "assemblies",
  },
  {
    id: 4,
    src: "/images/events/speaker-felicitation-memento.jpg",
    badge: "Guest Felicitation",
    title: "Speaker Felicitation & Memento Presentation",
    desc: "Senior college faculty presenting the official LFJC Golden Jubilee conference memento and kit to the guest speaker.",
    category: "assemblies",
  },
  {
    id: 5,
    src: "/images/events/student-co-curricular-assembly.jpg",
    badge: "Co-Curricular Delegation",
    title: "Co-Curricular Student Delegation",
    desc: "LFJC students in uniform seated attentively in St. Montfort Hall during guest orientation.",
    category: "assemblies",
  },
  {
    id: 6,
    src: "/images/events/career-guidance-seminar.jpg",
    badge: "Career Pathways",
    title: "Career Guidance & Professional Seminars",
    desc: "Chartered Accountancy and Commerce stream career orientation led by industry mentors.",
    category: "assemblies",
  },
  {
    id: 7,
    src: "/images/events/auditorium-speaker-address.jpg",
    badge: "Dais Perspective",
    title: "Auditorium Perspective & Stage View",
    desc: "Perspective view from behind the dais overlooking the assembled student delegation.",
    category: "assemblies",
  },
  {
    id: 8,
    src: "/images/events/distinguished-speaker-podium.jpg",
    badge: "Distinguished Address",
    title: "Distinguished Guest Speaker Address",
    desc: "Eminent speaker delivering an address on academic ethics and career pathways.",
    category: "assemblies",
  },
  {
    id: 9,
    src: "/images/events/auditorium-panorama.jpg",
    badge: "Hall Panorama",
    title: "St. Montfort Hall Panoramic Gathering",
    desc: "Wide-angle perspective of the student audience engaged in campus orientation.",
    category: "assemblies",
  },
  {
    id: 10,
    src: "/images/events/auditorium-girls-section.jpg",
    badge: "Academic Workshop",
    title: "Student Academic Circles & Notes",
    desc: "Intermediate students taking notes during specialized academic and career workshops.",
    category: "assemblies",
  },
  {
    id: 11,
    src: "/images/events/student-assembly-hall.jpg",
    badge: "General Assembly",
    title: "General Student Assembly in Hall",
    desc: "Intermediate students seated attentively during collegiate morning orientation.",
    category: "assemblies",
  },
  {
    id: 12,
    src: "/images/events/principal-felicitation-ceremony.jpg",
    badge: "Leadership Ceremony",
    title: "Principal Bro. Arun & Dignitaries Felicitation",
    desc: "Formal felicitation and shawl presentation ceremony on stage with Principal Rev. Bro. Arun.",
    category: "assemblies",
  },
  {
    id: 13,
    src: "/images/events/bro-arun-memento-presentation.jpg",
    badge: "Memento Honor",
    title: "Principal Bro. Arun Presenting Felicitation Memento",
    desc: "Principal Rev. Bro. Arun presenting the commemorative institutional memento to eminent guest dignitaries.",
    category: "assemblies",
  },
  {
    id: 14,
    src: "/images/events/faculty-dignitary-felicitation.jpg",
    badge: "Faculty Felicitation",
    title: "Senior Faculty Presenting Memento on Stage",
    desc: "Senior department faculty honoring invited speakers and academic guests.",
    category: "assemblies",
  },
  {
    id: 15,
    src: "/images/events/guest-honors-bouquet.jpg",
    badge: "Guest Welcome",
    title: "Honoring Chief Guest with Traditional Shawl",
    desc: "Traditional Montfortian welcome ceremony with shawl and floral bouquet presentation.",
    category: "assemblies",
  },
  {
    id: 16,
    src: "/images/events/interactive-seminar-auditorium.jpg",
    badge: "Interactive Seminar",
    title: "Interactive Seminar & Audience Q&A",
    desc: "Students engaged in interactive dialogue and problem-solving workshop in St. Montfort Hall.",
    category: "assemblies",
  },
  {
    id: 17,
    src: "/images/events/student-food-fest-stalls.jpg",
    badge: "Student Food Fest",
    title: "Student Food Fest & Culinary Exhibition Stalls",
    desc: "Vibrant campus culinary exhibition and entrepreneurial stalls organized by intermediate students.",
    category: "assemblies",
  },
  {
    id: 18,
    src: "/images/faculty-mentor.jpg",
    badge: "Faculty Mentorship",
    title: "Interactive Faculty Mentorship",
    desc: "Department mentors and subject heads providing personalized academic guidance.",
    category: "assemblies",
  },
];

// ─── 3B. SPORTS & ATHLETICS ARCHIVE (23 Images) ─────────────────────────────

const SPORTS_IMAGES: GalleryItem[] = [
  {
    id: 301,
    src: "/images/sports/volleyball-spike-action.jpg",
    badge: "Volleyball Tournament",
    title: "Volleyball Airborne Spike Action",
    desc: "High-flying spike over the net during competitive inter-house volleyball fixtures.",
    category: "sports",
  },
  {
    id: 302,
    src: "/images/sports/volleyball-court-action.jpg",
    badge: "Inter-House Rally",
    title: "Volleyball Inter-House Rally",
    desc: "High-energy defensive teamwork and court positioning on the outdoor sports arena.",
    category: "sports",
  },
  {
    id: 303,
    src: "/images/sports/volleyball-service-play.jpg",
    badge: "Service Formation",
    title: "Volleyball Match Service Formation",
    desc: "Player executing service against the collegiate main building backdrop.",
    category: "sports",
  },
  {
    id: 304,
    src: "/images/sports/volleyball-referee-match.jpg",
    badge: "Match Officiating",
    title: "Volleyball Match Officiating & Play",
    desc: "Official referee overseeing competitive inter-collegiate volleyball fixtures.",
    category: "sports",
  },
  {
    id: 305,
    src: "/images/sports/volleyball-team-faculty-1.jpg",
    badge: "Team & Coaches",
    title: "Volleyball Squad & Physical Education Faculty",
    desc: "Tournament finalists assembled with academic faculty and sports directors.",
    category: "sports",
  },
  {
    id: 306,
    src: "/images/sports/volleyball-team-faculty-2.jpg",
    badge: "Volleyball Finalists",
    title: "Volleyball Finalists Team with PE Staff",
    desc: "Intermediate volleyball finalists celebrated alongside sports coaching staff.",
    category: "sports",
  },
  {
    id: 307,
    src: "/images/sports/volleyball-team-faculty-3.jpg",
    badge: "Championship Squad",
    title: "Volleyball Championship Team Group",
    desc: "Trophy-winning volleyball squad assembled in collegiate sportswear.",
    category: "sports",
  },
  {
    id: 308,
    src: "/images/sports/basketball-court-match.jpg",
    badge: "Basketball Championship",
    title: "Basketball Championship Tournament Match",
    desc: "Inter-house basketball action on the outdoor collegiate court.",
    category: "sports",
  },
  {
    id: 309,
    src: "/images/sports/basketball-fastbreak-dribble.jpg",
    badge: "Fastbreak Drive",
    title: "Basketball Fast-Break Drive",
    desc: "Point guard cutting past defenders on the outdoor blue court.",
    category: "sports",
  },
  {
    id: 310,
    src: "/images/sports/basketball-drive-to-hoop.jpg",
    badge: "Offensive Drive",
    title: "Basketball Drive to the Hoop",
    desc: "Aggressive drive into the paint during tournament match play.",
    category: "sports",
  },
  {
    id: 311,
    src: "/images/sports/basketball-attack-transition.jpg",
    badge: "Transition Attack",
    title: "Basketball Transition Attack Play",
    desc: "Fast transition offensive play executed on the collegiate court.",
    category: "sports",
  },
  {
    id: 312,
    src: "/images/sports/basketball-shooting-clinic.jpg",
    badge: "Shooting Clinic",
    title: "Basketball Shooting Clinic & Form",
    desc: "Student practicing perimeter jump shots under faculty coaching.",
    category: "sports",
  },
  {
    id: 313,
    src: "/images/sports/basketball-coaching-freethrow.jpg",
    badge: "Coaching Clinic",
    title: "Athletic Coaching & Free-Throw Clinic",
    desc: "Physical Education director demonstrating proper shooting mechanics.",
    category: "sports",
  },
  {
    id: 314,
    src: "/images/sports/basketball-team-squad.jpg",
    badge: "Basketball Squad",
    title: "Basketball Championship Squad",
    desc: "LFJC basketball team posing with coaching faculty on court.",
    category: "sports",
  },
  {
    id: 315,
    src: "/images/sports/basketball-squad-faculty.jpg",
    badge: "Squad & Mentors",
    title: "Basketball Squad with Coaching Faculty",
    desc: "Basketball team posing with Physical Education directors.",
    category: "sports",
  },
  {
    id: 316,
    src: "/images/sports/basketball-finalists-celebration.jpg",
    badge: "Tournament Celebration",
    title: "Basketball Tournament Finalists Celebration",
    desc: "Celebratory team group photograph following inter-house basketball championship.",
    category: "sports",
  },
  {
    id: 317,
    src: "/images/sports/100m-sprint-action.jpg",
    badge: "Track & Field",
    title: "100m Track Sprint Heat",
    desc: "Athletes competing in the annual track sprint on the collegiate sports field.",
    category: "sports",
  },
  {
    id: 318,
    src: "/images/sports/athletics-sprint-finish.jpg",
    badge: "Sprint Finish",
    title: "Athletics Sprint Finish Line",
    desc: "High-intensity athletic finish line competition during annual sports meet.",
    category: "sports",
  },
  {
    id: 319,
    src: "/images/sports/sports-track-heats.jpg",
    badge: "Track Heats",
    title: "Track Sprint Heats on Field",
    desc: "Student sprinters in starting blocks for inter-house track heats.",
    category: "sports",
  },
  {
    id: 320,
    src: "/images/sports/relay-race-field.jpg",
    badge: "Baton Relay",
    title: "Track & Field Relay Heat",
    desc: "Students competing in inter-house baton relay heats on the main athletic field.",
    category: "sports",
  },
  {
    id: 321,
    src: "/images/sports/sports-winners-1st-year.jpg",
    badge: "1st Year Champions",
    title: "1st Year 100m Sprint Champions",
    desc: "1st Year 100m sprint medalists celebrated with Principal Rev. Bro. Arun.",
    category: "sports",
  },
  {
    id: 322,
    src: "/images/sports/sports-winners-2nd-year.jpg",
    badge: "2nd Year Champions",
    title: "2nd Year 100m Sprint Champions",
    desc: "2nd Year 100m sprint finalists and champions on sports day.",
    category: "sports",
  },
  {
    id: 323,
    src: "/images/sports/spectators-campus-steps.jpg",
    badge: "Spectator Gallery",
    title: "Campus Spectator Gallery",
    desc: "Students cheering on their house teams from the shaded campus stands.",
    category: "sports",
  },
];

// ─── 3C. CAMPUS & LABORATORIES ARCHIVE (8 Images) ───────────────────────────

const CAMPUS_LABS_IMAGES: GalleryItem[] = [
  {
    id: 401,
    src: "/images/campus-drone.jpg",
    badge: "Eight-Acre Campus",
    title: "Eight-Acre Uppal Campus — Aerial View",
    desc: "Expansive eight-acre grounds featuring academic blocks, sports fields, and tree-lined avenues.",
    category: "campus",
  },
  {
    id: 402,
    src: "/images/campus-building.jpg",
    badge: "Collegiate Facade",
    title: "Main Academic Block & Heritage Facade",
    desc: "The landmark collegiate building designed for holistic intermediate education.",
    category: "campus",
  },
  {
    id: 403,
    src: "/images/campus-hero.jpg",
    badge: "Campus Grounds",
    title: "Lush Campus Walkways & Greenery",
    desc: "Scenic tree-lined walkways and academic quads surrounding the main institution.",
    category: "campus",
  },
  {
    id: 404,
    src: "/images/physics-lab.jpg",
    badge: "Physics Laboratory",
    title: "Advanced Physics Laboratory",
    desc: "Equipped with precision optical benches, spectrometers, and electrical test rigs.",
    category: "campus",
  },
  {
    id: 405,
    src: "/images/chemistry-lab.jpg",
    badge: "Chemistry Laboratory",
    title: "Advanced Chemistry Laboratory",
    desc: "Complete analytical and organic chemistry workstations for MPC & BiPC streams.",
    category: "campus",
  },
  {
    id: 406,
    src: "/images/computer-lab.jpg",
    badge: "Digital Learning",
    title: "Modern Computer Centre",
    desc: "High-speed networked computing terminals and digital resource stations.",
    category: "campus",
  },
  {
    id: 407,
    src: "/images/library-heritage.jpg",
    badge: "Reference Library",
    title: "Central Reference Library & Reading Hall",
    desc: "Over 12,000 volumes, reference journals, competitive exam archives, and quiet study bays.",
    category: "campus",
  },
  {
    id: 408,
    src: "/images/sports-arena.jpg",
    badge: "Sports Arena",
    title: "Outdoor Sports Arena & Multi-Sport Courts",
    desc: "Dedicated sports complex for basketball, volleyball, athletics, and physical education.",
    category: "campus",
  },
];

// ─── 3D. ALUMNI & FELLOWSHIP ARCHIVE (2 Images) ─────────────────────────────

const ALUMNI_IMAGES: GalleryItem[] = [
  {
    id: 501,
    src: "/images/alumni-group.jpg",
    badge: "Alumni Assembly",
    title: "LFJC Alumni Delegation & Fellowship",
    desc: "Little Flower Junior College alumni gathered for institutional fellowship and alumni mentorship.",
    category: "alumni",
  },
  {
    id: 502,
    src: "/images/alumni.jpg",
    badge: "Montfortian Brotherhood",
    title: "Alumni Network & Community",
    desc: "Generations of LFJC graduates united across industry, science, and public service.",
    category: "alumni",
  },
];

// ─── MASTER ORDERED ARCHIVE (Strict: Silver -> Golden -> Assemblies -> Sports -> Labs -> Alumni) ───

const ALL_MASTER_IMAGES: GalleryItem[] = [
  ...SILVER_JUBILEE_IMAGES,
  ...GOLDEN_JUBILEE_IMAGES,
  ...ASSEMBLIES_IMAGES,
  ...SPORTS_IMAGES,
  ...CAMPUS_LABS_IMAGES,
  ...ALUMNI_IMAGES,
];

// ─── GOLDEN JUBILEE VIDEO ARCHIVES ──────────────────────────────────────────

const GOLDEN_JUBILEE_VIDEOS: VideoItem[] = [
  {
    title: "Alumni Meet & Golden Jubilee Reunion",
    embedUrl: "https://www.youtube.com/embed/uuTQ9vItJE0",
    watchUrl: "https://www.youtube.com/watch?v=uuTQ9vItJE0",
  },
  {
    title: "Arrival of Distinguished Guests & Dignitaries",
    embedUrl: "https://www.youtube.com/embed/UJas6-D--oQ",
    watchUrl: "https://www.youtube.com/watch?v=UJas6-D--oQ",
  },
  {
    title: "Lighting of the Ceremonial Lamp",
    embedUrl: "https://www.youtube.com/embed/SkLQC0VXkok",
    watchUrl: "https://www.youtube.com/watch?v=SkLQC0VXkok",
  },
  {
    title: "Patroness Prayer Song — St. Therese Feast",
    embedUrl: "https://www.youtube.com/embed/7Ssm9T5caT0",
    watchUrl: "https://www.youtube.com/watch?v=7Ssm9T5caT0",
  },
  {
    title: "Jubilee Welcome Dance Choreography",
    embedUrl: "https://www.youtube.com/embed/Oa_7j9xSH8I",
    watchUrl: "https://www.youtube.com/watch?v=Oa_7j9xSH8I",
  },
  {
    title: "Golden Jubilee Anthem & Choir Performance",
    embedUrl: "https://www.youtube.com/embed/NVwrYhVYU4I",
    watchUrl: "https://www.youtube.com/watch?v=NVwrYhVYU4I",
  },
];

// ─── Chapter Jump Items ─────────────────────────────────────────────────────

const CHAPTER_NAV = [
  { label: "01 Silver Jubilee (1999)", href: "#silver-jubilee", icon: Clock, count: SILVER_JUBILEE_IMAGES.length },
  { label: "02 Golden Jubilee (2024)", href: "#golden-jubilee", icon: Sparkles, count: GOLDEN_JUBILEE_IMAGES.length },
  { label: "Assemblies & Seminars", href: "#assemblies", icon: Users, count: ASSEMBLIES_IMAGES.length },
  { label: "Sports & Athletics", href: "#sports", icon: Trophy, count: SPORTS_IMAGES.length },
  { label: "Campus & Labs", href: "#campus-labs", icon: Building2, count: CAMPUS_LABS_IMAGES.length },
  { label: "Alumni & Fellowship", href: "#alumni", icon: HeartHandshake, count: ALUMNI_IMAGES.length },
  { label: "Video Footage", href: "#videos", icon: Film, count: GOLDEN_JUBILEE_VIDEOS.length },
];

export default function CampusLifePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Campus Life & Visual Archives" }]} />
      </div>

      {/* ─── Hero & Editorial Prologue ────────────────────────────────────── */}
      <section className="section-texture bg-white py-8 sm:py-12 md:py-14 border-b border-stone-texture/50">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 md:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-gold/10 border border-heritage-gold/30 text-heritage-gold-strong text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 font-sans">
            <Sparkles className="h-3 w-3" />
            <span>Complete Heritage & Visual Archive • 1974–Present</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-academic-slate tracking-tight">
            Campus Life &{" "}
            <span className="text-heritage-gold italic font-editorial font-normal">
              Visual Archives
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-academic-slate/80 font-sans max-w-2xl mx-auto">
            A comprehensive visual history of Little Flower Junior College across five decades of Montfortian excellence — 
            from the historic <strong>Silver Jubilee</strong> and landmark <strong>Golden Jubilee</strong> to our vibrant St. Montfort 
            Auditorium assemblies, championship sports meets, science laboratories, and alumni fellowship.
          </p>

          <span className="gold-rule gold-rule-center !mt-4 sm:!mt-5" />

          {/* Quick Chapter Navigation Bar */}
          <div className="mt-6 sm:mt-8 pt-5 border-t border-stone-texture/40">
            <div className="flex items-center justify-center gap-1.5 text-xs text-academic-slate/60 font-sans mb-3">
              <Compass className="h-3.5 w-3.5 text-heritage-gold" />
              <span className="font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                Archive Chapters ({ALL_MASTER_IMAGES.length} Photographs Total)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {CHAPTER_NAV.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.href}
                    href={ch.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-academic-slate/80 bg-royal-cream/40 hover:bg-montfortian-blue hover:text-white border border-stone-texture hover:border-montfortian-blue transition-all duration-300 font-sans shadow-xs group cursor-pointer"
                  >
                    <Icon className="h-3 w-3 text-heritage-gold group-hover:text-heritage-gold-bright transition-colors" />
                    <span>{ch.label}</span>
                    <span className="ml-0.5 text-[10px] font-mono opacity-60 group-hover:opacity-100">
                      ({ch.count})
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Chronological Visual Archive (Silver -> Golden -> Campus Life) ─ */}
      <Section variant="default" className="bg-white">
        <ChronologicalCampusArchive
          silverJubileeImages={SILVER_JUBILEE_IMAGES}
          goldenJubileeImages={GOLDEN_JUBILEE_IMAGES}
          assembliesImages={ASSEMBLIES_IMAGES}
          sportsImages={SPORTS_IMAGES}
          campusLabsImages={CAMPUS_LABS_IMAGES}
          alumniImages={ALUMNI_IMAGES}
          allImages={ALL_MASTER_IMAGES}
        />
      </Section>

      {/* ─── Golden Jubilee Video Archive ─────────────────────────────────── */}
      <section id="videos" className="scroll-mt-28 bg-royal-cream/25 border-t border-stone-texture/50 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Documentary Footage"
            title="Golden Jubilee Video Archive"
            description="Watch recorded highlights from our 50th Anniversary cultural extravaganza, dignitary invocations, choir anthems, and alumni reunions."
          />

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GOLDEN_JUBILEE_VIDEOS.map((video, idx) => (
              <Reveal key={video.title} delay={idx * 0.05}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Admissions CTA ─────────────────────────────────────────── */}
      <Section variant="default" className="bg-academic-slate text-white border-t border-white/10 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Award className="h-8 w-8 sm:h-10 sm:w-10 text-heritage-gold mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Be Part of Our Five-Decade Living Legacy
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-royal-cream/80 font-sans max-w-xl mx-auto">
            Intermediate admissions for MPC, BiPC, MEC, and CEC streams are open for the 2026–27 academic year. 
            Join Little Flower Junior College and experience an institution built on 50 years of holistic excellence.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-heritage-gold hover:bg-heritage-gold-bright text-deep-navy px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans shadow-md"
            >
              Begin Admissions Inquiry
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/about/history"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans"
            >
              Read Institutional History
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}