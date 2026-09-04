import {
  Atom,
  BriefcaseBusiness,
  Landmark,
  Microscope,
} from "lucide-react";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lfjc.co.in";

// 100% OFFICIAL ADDRESS FROM LFJC SOURCE OF TRUTH (index.php, contact.php, circulars)
export const CANONICAL_ADDRESS =
  "#2-18-25, Zahid Nagar, Opp: Survey of India, Uppal, Hyderabad, Telangana 500039";

// Official Portals & Direct Links
export const PORTAL_LINKS = {
  parentStudentLogin: "https://app.myskoolcom.tech/lfjc_uppal/login",
  studentSignup: "https://app.myskoolcom.tech/lfjc_uppal/student_signup/home",
  onlineAdmissionPortal: "https://littlefloweruppal.co.in/lfjcaddmission\\",
  alumniRegistrationGoogleForm:
    "https://docs.google.com/forms/d/1Jg6bOWkfeYRQxnmE2Xr9ykhtiSBgoR_MPQpEcAlhWA0/viewform?edit_requested=true",
  officialWebsite: "https://lfjc.co.in/index.php",
};

// 1. FOUNDER & PATRONESS (Verbatim from founder.php)
export const founderData = {
  name: "St. Louis Marie de Montfort",
  title: "Founder of the Montfortian Society",
  birthDate: "31st January 1673",
  deathDate: "28th April 1716",
  motto: "God Always",
  image: "/images/official/mont.png",
  fullText: `Montfortian Education is committed to Gospel values of Equality, Fraternity, Freedom and Human Brotherhood, striving to transform the society through the education mission. "Open to Jesus Christ."

Born on 31st January, 1673, Louis Mary Grignion, popularly known as Montfort, grew to be a prophet of his times. He saw God in the poor and gave his life for their cause. In him welled up a constant spring of Love, Courage, Self-surrendering Service and Commitment for the cause of the poor and the downtrodden. The source of this unending spring was 'God Always.'

He died on 28th April 1716, but his spirit lives on today in the Congregation of Montfort Brothers of St. Gabriel, Priests of the Company of Mary, Daughters of Wisdom and the numerous Montfortian Associates. Though the Montfortian Society was founded in the 18th century, it is only in 1903 that the Brothers came to India. Today they work in over 200 Educational, Social and Cultural establishments throughout the country.

The activities of the Brothers of St. Gabriel in India are as multifarious as the needs of the country. They can be found in schools, technical institutes and colleges of higher learning, in the Special Education and Rehabilitation of the blind and deaf, in the care of the aged, disabled and orphaned, in youth organizations, in the urban slums and remote tribal villages, and in movements for civil rights and communal amity.`,
};

export const patronessData = {
  name: "St. Thérèse of Lisieux",
  title: "Patroness — The Little Flower of Jesus",
  birthDate: "2 January 1873",
  deathDate: "30 September 1897",
  canonizationDate: "17 May 1925 by Pope Pius XI",
  image: "/images/official/st_therese.jpg",
  quote: "What matters in life is not great deeds, but great love.",
  fullText: `St. Thérèse of Lisieux, born Marie Françoise-Thérèse Martin (2 January 1873 – 30 September 1897) was a French Catholic who became a Carmelite nun at an early age. She is popularly known as "The Little Flower of Jesus", or simply "The Little Flower."

She died in obscurity at the age of 24. However, after her death, her autobiography — Story of a Soul was published and became a best-seller around the world. Her books explained her spiritual path of love and selflessness, and she became one among the three ladies to be considered a Doctor of the Catholic Church.

"What matters in life," she wrote, "is not great deeds, but great love." She loved flowers and saw herself as the "Little Flower of Jesus". Because of this beautiful analogy, the title "Little Flower" remained with her. St. Thérèse was canonized by Pope Pius XI on May 17, 1925.`,
};

// 2. MANAGEMENT & CHARISM (Verbatim from mgt.php)
export const managementData = {
  title: "Montfort Brothers of St. Gabriel",
  societyName: "Brothers of St. Gabriel Educational Society",
  presence: "30 Countries Globally | 200+ Establishments in India",
  pontificalRight: "Recognized in Catholic Church since 1910 as Religious Institute of Pontifical Right",
  threeVows: ["Poverty", "Chastity", "Obedience"],
  fullText: `We, the Montfort Brothers of St. Gabriel live in communities that are actively engaged in education and social upliftment.

We, the Montfort Brothers of St. Gabriel together with all our associates, by our value based educational endeavours hope to build a fraternal society by moulding the personality of each individual under our care, trusting in God and drawing inspiration from our Founder St. Louis Marie De Montfort.

We are members of the Church and work in harmony with its teachings. We strive to make the dream and vision of St. Montfort a reality to inculcate his unique style and Charism. Gabriel Deshayes gave a new impetus to the Brothers; stressing particularly the importance of the teaching profession.

We live out our consecration to God through the three vows: Poverty, Chastity and Obedience. Our pledge to young people is to deepen our credibility as 'signs and bearers of God's love' to each of them. Our preferential option is to work among the poor and the abandoned people in the society.

We are present in 30 countries witnessing Christ through our educational ministry. Led by the Spirit, the Brotherhood is a journey each of us has chosen to commit wholly at the service of God, the Church and humanity. We are recognized in the Catholic Church, since 1910 as Religious Institute of pontifical right, dedicated to apostolic works.`,
};

// 3. VISION & MISSION (Verbatim from vismis.php)
export const visionMissionData = {
  vision:
    "Montfortian Education is committed to the Gospel values of Equality, Fraternity, Freedom and Human Brotherhood, striving to transform the society through the education mission.",
  mission:
    "We, the Montfort Brothers of St. Gabriel together with all our associates, by our value based educational endeavours, hope to build a fraternal society by moulding the personality of each individual under our care, trusting in God and drawing inspiration from our Founder St. Louis Marie De Montfort.",
};

// 4. ANNUAL THEMES ARCHIVE (Verbatim from theme.php & index.php)
export const annualThemeData = {
  currentYear: "2024–25",
  currentTheme: "ASPIRE ACQUIRE ACHIEVE",
  emblemImage: "/images/official/theme2024-25.jpg",
  facets: ["Aims", "Creativity", "Knowledge", "Skills", "Rewards", "Success", "Goals"],
  history: [
    { year: "2024–25", theme: "Aspire Acquire Achieve" },
    { year: "2023–24", theme: "Conserve, Preserve, Flourish" },
    { year: "2022–23", theme: "Ignite to Enlighten" },
    { year: "2021–22", theme: "Resilience & Renewal" },
    { year: "2020–21", theme: "Transforming Challenges into Opportunities" },
    { year: "2019–20", theme: "Rooted in Values, Soaring in Excellence" },
    { year: "2018–19", theme: "Knowledge for Service" },
    { year: "2017–18", theme: "Empowered to Excel" },
    { year: "2016–17", theme: "Towards a Fraternal Society" },
    { year: "2015–16", theme: "In Pursuit of Truth" },
  ],
};

// 5. CAMPUS INFRASTRUCTURE TOUR (Verbatim synthesis from infrastructure.php - 6,162 chars)
export const campusInfrastructureData = {
  summary:
    "Situated on Tarnaka-Uppal Road opposite Survey of India, Little Flower Junior College is enclosed within a tall boundary wall lined with large trees. The 8-acre campus houses a grand three-storeyed building (ground plus three floors), expansive playgrounds for football, basketball, and volleyball, Brother's Quarters, and a regal welcoming statue of Patron Saint Thérèse.",
  floors: [
    {
      level: "Ground Floor",
      title: "Administrative Block, Heritage Hall & Humanities",
      description:
        "Houses Reception, Clerical Staff rooms, Fee Counter, Vice Principal's Office, Xerox Room, Infirmary, Conference Room, and the Principal's Office. Features the Heritage Hall (small auditorium) and the Department of Humanities (Commerce, Economics, and Political Science). Leads to the wide Quadrangle lined with potted plants, Canteen, and Inverter Room.",
    },
    {
      level: "First Floor",
      title: "Central Library & English Department",
      description:
        "Houses the spacious, well-ventilated Central Library with cupboards stocked with reference volumes and textbooks across all disciplines. Includes six classrooms and the Department of English, which conducts language counseling, competitions, and practicals.",
    },
    {
      level: "Second Floor",
      title: "Physics & Computer Laboratories & Mathematics",
      description:
        "Features the advanced Physics Laboratory and Physics Staffroom (coaching for competitive examinations), a specialized coaching classroom, the fully-equipped Computer Laboratory, and the Mathematics Department handling IPE, EAMCET, and JEE Mains syllabi.",
    },
    {
      level: "Third Floor",
      title: "Chemistry, Biology Laboratories & Second Languages",
      description:
        "Accommodates the large Chemistry Laboratory and Chemistry Staffroom, the Biology Laboratories (Rooms 309 & 310 dedicated to NEET coaching), classrooms for competitive entrance prep starting at 8:00 AM, and the Second Languages Staffroom (Hindi, Sanskrit, French, Telugu).",
    },
    {
      level: "Sports Grounds",
      title: "Playgrounds & Athletics Arena",
      description:
        "Dedicated facilities for Football, Basketball, and Volleyball courts, supporting inter-college sports tournaments, athletic meets, and physical education.",
    },
  ],
};

// 6. ALL 12 FORMER CORRESPONDENTS & PRINCIPALS (Verbatim from heritage.php)
export interface FormerPrincipal {
  name: string;
  designation: string;
  tenure: string;
  image: string;
  roleDescription?: string;
}

export const formerPrincipalsData: FormerPrincipal[] = [
  {
    name: "Rev. Bro. James Pannivelil",
    designation: "Builder of LFJC Uppal Campus",
    tenure: "Founding Builder",
    image: "/images/principals/bro_james_pannivelil.jpg",
    roleDescription: "Architect and builder of the historic Little Flower Junior College Uppal campus building.",
  },
  {
    name: "Late Rev. Bro. Vincent",
    designation: "Founder Principal & Correspondent",
    tenure: "1974–76, 1982–83 (Correspondent 1976–79)",
    image: "/images/principals/bro_vincent.jpg",
  },
  {
    name: "Late Rev. Bro. Emmanuel",
    designation: "Principal",
    tenure: "1976–1979",
    image: "/images/principals/bro_emmanuel.jpg",
  },
  {
    name: "Rev. Bro. Claude",
    designation: "Correspondent & Principal",
    tenure: "1979–1982",
    image: "/images/principals/bro_claude.jpg",
  },
  {
    name: "Rev. Bro. John Kallarackal",
    designation: "Correspondent & Principal (Chief Patron, LFJCAN)",
    tenure: "1983–1989",
    image: "/images/principals/bro_john.jpg",
  },
  {
    name: "Rev. Bro. Celestine",
    designation: "Correspondent & Principal",
    tenure: "1989–1994",
    image: "/images/principals/bro_celestine.jpg",
  },
  {
    name: "Rev. Bro. M. A. George",
    designation: "Correspondent & Principal",
    tenure: "1994–2000",
    image: "/images/principals/bro_george.jpg",
  },
  {
    name: "Late Rev. Bro. N. A. James",
    designation: "Correspondent & Principal",
    tenure: "2000–2006",
    image: "/images/principals/bro_james_na.jpg",
  },
  {
    name: "Rev. Bro. Franky Noronha",
    designation: "Correspondent & Principal",
    tenure: "2006–2011",
    image: "/images/principals/bro_franky.jpg",
  },
  {
    name: "Rev. Bro. Jaico Gervasis",
    designation: "Correspondent & Principal",
    tenure: "2011–2017",
    image: "/images/principals/bro_jaico.jpg",
  },
  {
    name: "Rev. Bro. Vincent Reddy",
    designation: "Correspondent & Principal",
    tenure: "2017–2023",
    image: "/images/principals/bro_vincent.jpg", // Verified image from jubilee archive
  },
  {
    name: "Rev. Bro. Arun Prakash Lawrance",
    designation: "Correspondent & Principal",
    tenure: "2023–Present",
    image: "/images/principals/bro_arun_prakash.jpg",
  },
];

// 7. FORMER STAFF MEMBERS (Verbatim from heritage.php - 31 Members)
export interface FormerStaff {
  name: string;
  designation: string;
  department: string;
  tenure: string;
}

export const formerStaffData: FormerStaff[] = [
  { name: "Mr. E. V. Subbarao", designation: "Lecturer", department: "Physics", tenure: "1974–1997" },
  { name: "Mr. Davis Joseph", designation: "Administrative Staff", department: "Administration", tenure: "1974–1997" },
  { name: "Mr. Jayatheerth Katti", designation: "Lecturer", department: "Mathematics", tenure: "1981–2003" },
  { name: "Ms. B. D. M. Sakunthala", designation: "Lecturer", department: "Zoology", tenure: "1974–2005" },
  { name: "Ms. U. Saraswathi", designation: "Lecturer", department: "English", tenure: "1995–2005" },
  { name: "Mr. K. Jyothi Ram", designation: "Administrative Staff", department: "Administration", tenure: "1990–2005" },
  { name: "Ms. Sadhana Srivastava", designation: "Lecturer", department: "English", tenure: "1983–2008" },
  { name: "Mr. Nagaraja Kumar", designation: "Lecturer", department: "Physics", tenure: "1982–2010" },
  { name: "Ms. Sudheshan Chattopadhyay", designation: "Lecturer", department: "French", tenure: "1981–2013" },
  { name: "Mr. T. Rajeshwara Reddy", designation: "Lecturer", department: "Sanskrit", tenure: "1982–2013" },
  { name: "Mr. P. Kesavacharya", designation: "Lecturer", department: "Telugu", tenure: "1982–2013" },
  { name: "Ms. Savithri Narayanam", designation: "Lecturer", department: "Library Science", tenure: "1999–2014" },
  { name: "Dr. B. Shaila Tanuja", designation: "Lecturer", department: "Zoology", tenure: "1984–2016" },
  { name: "Dr. Riyaz Ul Ansari", designation: "Lecturer", department: "Hindi", tenure: "1991–2016" },
  { name: "Mr. Bheeshma Chary", designation: "Support Staff", department: "Campus Support", tenure: "1987–2016" },
  { name: "Ms. J. Meenakshi", designation: "Lecturer", department: "Sanskrit", tenure: "2000–2017" },
  { name: "Mr. A. R. Narasimha Rao", designation: "Lecturer", department: "Physics", tenure: "1985–2017" },
  { name: "Ms. P. Usha", designation: "Lecturer", department: "Chemistry", tenure: "1983–2017" },
  { name: "Mr. Mohammed Jahangir", designation: "Support Staff", department: "Campus Support", tenure: "1982–2018" },
  { name: "Ms. K. Susheela", designation: "Support Staff", department: "Campus Support", tenure: "1987–2018" },
  { name: "Mr. K. Srinivasdev", designation: "Lecturer", department: "Physics", tenure: "1991–2019" },
  { name: "Mr. S. Balaiah", designation: "Support Staff", department: "Campus Support", tenure: "1985–2020" },
  { name: "Dr. Anitha Lincoln", designation: "Lecturer", department: "Chemistry", tenure: "1986–2020" },
  { name: "Ms. Rachel Oommen", designation: "Lecturer", department: "English", tenure: "1988–2020" },
  { name: "Mr. T. D. Babu", designation: "Support Staff", department: "Campus Support", tenure: "1989–2022" },
  { name: "Ms. Sabiha Fathima", designation: "Lecturer", department: "Chemistry", tenure: "1987–2023" },
  { name: "Mr. Shaik Lateef", designation: "Support Staff", department: "Campus Support", tenure: "1983–2023" },
  { name: "Mr. B. Paul Raju", designation: "Lecturer", department: "Mathematics", tenure: "2000–2023" },
  { name: "Mr. M. Amarnath", designation: "Lecturer", department: "Computer Science", tenure: "1996–2023" },
  { name: "Mr. Ch. Devender", designation: "Support Staff", department: "Campus Support", tenure: "1985–2023" },
  { name: "Ms. Jayashree", designation: "Lecturer", department: "Botany", tenure: "1990–2024" },
];

// 7b. RETIRED FACULTY ARCHIVE (27 Emeritus Educators with Verified Portraits)
export interface RetiredFacultyMember {
  name: string;
  designation: string;
  department: string;
  category: "retired";
  image: string;
  tenure?: string;
}

export const retiredFacultyData: RetiredFacultyMember[] = [
  {
    name: "Dr. Anitha Lincoln",
    designation: "Faculty (Retired)",
    department: "Chemistry Department",
    category: "retired",
    image: "/images/faculty/retired/dr_anitha_lincon.png",
    tenure: "1986–2020",
  },
  {
    name: "Dr. Riyaz Ul Ansari",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/dr_riyaz_ui_ansari.png",
    tenure: "1991–2016",
  },
  {
    name: "Dr. T. Rajeswara Reddy",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/dr_t_rajeswara_reddy.png",
    tenure: "1982–2013",
  },
  {
    name: "Mr. B. Paul Raju",
    designation: "Faculty (Retired)",
    department: "Mathematics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_b_paul_raju.png",
    tenure: "2000–2023",
  },
  {
    name: "Mr. Bheeshma Chary",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_bheeshma_chary.png",
    tenure: "1987–2016",
  },
  {
    name: "Mr. David Joseph",
    designation: "Faculty (Retired)",
    department: "Office Administration",
    category: "retired",
    image: "/images/faculty/retired/mr_david_joseph.png",
    tenure: "1974–1997",
  },
  {
    name: "Mr. E. V. Subbarao",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_e_v_subbarao.png",
    tenure: "1974–1997",
  },
  {
    name: "Mr. Jayatheerth Katti",
    designation: "Faculty (Retired)",
    department: "Mathematics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_jayatheerth_katti.png",
    tenure: "1981–2003",
  },
  {
    name: "Mr. K. Srinivadev",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_k_srinivadev.png",
    tenure: "1991–2019",
  },
  {
    name: "Mr. M. Amarnath",
    designation: "Faculty (Retired)",
    department: "Computer & Library Department",
    category: "retired",
    image: "/images/faculty/retired/mr_m_amarnath.png",
    tenure: "1996–2023",
  },
  {
    name: "Mr. S. Balaiah",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_s_balaiah.png",
    tenure: "1985–2020",
  },
  {
    name: "Mr. T. D. Babu",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_t_d_baaabu.png",
    tenure: "1989–2022",
  },
  {
    name: "Mr. A. R. Narasimharao",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_a_r_narasimharao.png",
    tenure: "1985–2017",
  },
  {
    name: "Mr. K. Jothi Ram",
    designation: "Faculty (Retired)",
    department: "Office Administration",
    category: "retired",
    image: "/images/faculty/retired/mr_k_jothi_ram.png",
    tenure: "1990–2005",
  },
  {
    name: "Mr. Nagaraja Kumar",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_nagaraja_kumar.png",
    tenure: "1982–2010",
  },
  {
    name: "Mr. P. Kesavacharaya",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/mr_p_kesavacharaya.png",
    tenure: "1982–2013",
  },
  {
    name: "Ms. B. M. D. Sakunthala",
    designation: "Faculty (Retired)",
    department: "Biology Department",
    category: "retired",
    image: "/images/faculty/retired/ms_bmd_sakunthala.png",
    tenure: "1974–2005",
  },
  {
    name: "Ms. Raachel Oommen",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_raachel_oommen.png",
    tenure: "1988–2020",
  },
  {
    name: "Ms. Saghana Srivastava",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_saghana_srivastava.png",
    tenure: "1983–2008",
  },
  {
    name: "Ms. Savithri Narayanan",
    designation: "Faculty (Retired)",
    department: "Computer & Library Department",
    category: "retired",
    image: "/images/faculty/retired/ms_savithri_narayanan.png",
    tenure: "1999–2014",
  },
  {
    name: "Ms. Sudheshna Chattopadhyay",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_sudheshna_chattopadhyay.png",
    tenure: "1981–2013",
  },
  {
    name: "Ms. J. Meenakshi",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_j_menakshi.png",
    tenure: "2000–2017",
  },
  {
    name: "Ms. K. Susheela",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/ms_k_susheela.png",
    tenure: "1987–2018",
  },
  {
    name: "Ms. P. Usha",
    designation: "Faculty (Retired)",
    department: "Chemistry Department",
    category: "retired",
    image: "/images/faculty/retired/ms_p_usha.png",
    tenure: "1983–2017",
  },
  {
    name: "Ms. Sabiha Fathima",
    designation: "Faculty (Retired)",
    department: "Chemistry Department",
    category: "retired",
    image: "/images/faculty/retired/ms_sabiha_fathima.png",
    tenure: "1987–2023",
  },
  {
    name: "Ms. V. Saraswathi",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_v_saraswathi.png",
    tenure: "1995–2005",
  },
  {
    name: "Mr. Shaik Lateef",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/shaik_lateef.png",
    tenure: "1983–2023",
  },
];


// 8. BROTHERS WHO STUDIED AT LFJC AND SERVED >25 YEARS IN BROTHERHOOD (Verbatim from heritage.php - 20 Brothers)
export const brothersInServiceData = [
  { name: "Bro. James C.A.", batch: "1974–76" },
  { name: "Bro. Sleeva Reddy", batch: "1974–76" },
  { name: "Bro. Franky Noronha", batch: "1977–79" },
  { name: "Bro. William D'Mello", batch: "1977–79" },
  { name: "Bro. James N.A.", batch: "1977–79" },
  { name: "Bro. Sebastian P.T.", batch: "1978–80" },
  { name: "Bro. Jaico Gervasis", batch: "1979–81" },
  { name: "Late Bro. Yuju Francis", batch: "1980–82" },
  { name: "Late Bro. Benny Jose", batch: "1981–83" },
  { name: "Bro. Chinnappa Reddy", batch: "1982–84" },
  { name: "Bro. Monson Kuriakose", batch: "1982–84" },
  { name: "Late Bro. Ravikumar Reddy", batch: "1982–84" },
  { name: "Bro. Vincent Mendonca", batch: "1984–86" },
  { name: "Bro. Hruday Kumar Reddy", batch: "1985–87" },
  { name: "Bro. Jimmy Kalapurayil", batch: "1985–87" },
  { name: "Bro. Anthony M.A.", batch: "1985–87" },
  { name: "Bro. Roque D'Cunha", batch: "1985–87" },
  { name: "Bro. Balashourie", batch: "1986–88" },
  { name: "Bro. George Joseph", batch: "1986–88" },
  { name: "Bro. Shajan Anthony M.", batch: "1986–88" },
];

// 9. OFFICIAL LFJC ALUMNI NETWORK EXECUTIVE BOARD (Circular 4)
export const alumniExecutiveBoard = [
  { role: "Chief Patron", name: "Rev. Bro. John Kallarackal", details: "Former Principal, LFJC (1983–89)" },
  { role: "Chairman", name: "Rev. Bro. Arun Prakash Lawrance", details: "Principal, Little Flower Junior College" },
  { role: "President", name: "Major Gen. MLN Sravan Kumar", details: "1976 Batch — Retired Army Officer" },
  { role: "Vice President", name: "Dr. B.V.J. Vikas", details: "1986 Batch — Prosthodontist & Dental Surgeon" },
  { role: "Vice President", name: "Dr. Vandana Samba", details: "1999 Batch — Professor" },
  { role: "Secretary", name: "Mr. Ravi Devulapally", details: "1989 Batch — Managing Director, Database — IT Industry" },
  { role: "Secretary", name: "Dr. Sneha Verghese", details: "2005 Batch — Asst. Section Officer, ICAR" },
  { role: "Treasurer", name: "Mr. Naveen Kaparthy", details: "1998 Batch — Vice President, JP Morgan Chase" },
  { role: "Executive Member", name: "Prof. Dr. A. Patrick", details: "1992 Batch — Sr. Asst. Professor, Dept. of Commerce, OU" },
  { role: "Executive Member", name: "Dr. Vijaykumar", details: "1989 Batch — Doctor" },
];

// 10. 25 CORE COMMITTEE ALUMNI (Verbatim from Circular 2)
export const alumniCoreCommittee = [
  { name: "Major Gen. MLN Sravan Kumar", batch: "1976 Batch", role: "Retired Army Officer", designation: "President" },
  { name: "Dr. Subbarayudu", batch: "1983 Batch", role: "Professor", designation: "Core Committee Member" },
  { name: "Dr. B.V.J. Vikas", batch: "1986 Batch", role: "Prosthodontics – Dental Surgeon", designation: "Vice President" },
  { name: "Mr. Venkateshwarlu", batch: "1987 Batch", role: "Manager, State Bank of India", designation: "Core Committee Member" },
  { name: "Dr. Vijaykumar", batch: "1989 Batch", role: "Doctor", designation: "Executive Member" },
  { name: "Mr. Ravi Devulapally", batch: "1989 Batch", role: "Managing Director of Database – IT Industry", designation: "Secretary" },
  { name: "Prof. Dr. A. Patrick", batch: "1992 Batch", role: "Sr. Asst Professor, Dept. of Commerce, OU", designation: "Executive Member" },
  { name: "Dr. Ranganath", batch: "1994 Batch", role: "Doctor – Oncologist, NIMS", designation: "Core Committee Member" },
  { name: "Mr. Rakesh Chandra", batch: "1994 Batch", role: "Director Finance in Virtusa S/W Consulting", designation: "Core Committee Member" },
  { name: "Dr. Pratap Varma", batch: "1995 Batch", role: "Doctor – Oncologist, AOI", designation: "Core Committee Member" },
  { name: "Mr. K. Venkat Sainath", batch: "1995 Batch", role: "Regional Manager, Policy Bazar", designation: "Core Committee Member" },
  { name: "Mr. Pankaj Agarwal", batch: "1996 Batch", role: "Entrepreneur", designation: "Core Committee Member" },
  { name: "Mr. Vijay Reddy", batch: "1997 Batch", role: "Lecturer, Little Flower Degree College, Uppal", designation: "Core Committee Member" },
  { name: "Mr. Arun Kumar", batch: "1997 Batch", role: "Advocate, High Court, Telangana", designation: "Core Committee Member" },
  { name: "Dr. Satya Kiran", batch: "1997 Batch", role: "Doctor", designation: "Core Committee Member" },
  { name: "Mr. Asuthosh", batch: "1997 Batch", role: "Content Writer", designation: "Core Committee Member" },
  { name: "Mr. Naveen Kaparthy", batch: "1998 Batch", role: "Vice President, JP Morgan Chase", designation: "Treasurer" },
  { name: "Dr. Vandana Samba", batch: "1999 Batch", role: "Professor", designation: "Vice President" },
  { name: "Dr. Dilip", batch: "2000 Batch", role: "Team Leader IBM, Former Scientist NIRD", designation: "Core Committee Member" },
  { name: "Mr. R. Deepak Showry", batch: "2000 Batch", role: "Software Engineer, Infinite Computer Solutions", designation: "Core Committee Member" },
  { name: "Dr. Sneha Verghese", batch: "2005 Batch", role: "Asst. Section Officer, ICAR", designation: "Secretary" },
  { name: "Mr. B. Akshay", batch: "2007 Batch", role: "Proprietor, Boorugu Pearls & Gems", designation: "Core Committee Member" },
  { name: "Mr. V.R.S. Sairam", batch: "2009 Batch", role: "Accountancy (C.A.)", designation: "Core Committee Member" },
  { name: "Mr. Arun Kumar Nemani", batch: "2014 Batch", role: "Chartered Accountant", designation: "Core Committee Member" },
  { name: "Ms. Sai Vinathi", batch: "2014 Batch", role: "Chartered Accountant, Deloitte", designation: "Core Committee Member" },
];

// Official Alumni Testimonial (Verbatim from index.php)
export const officialAlumniTestimonial = {
  quote:
    "There's nothing in a caterpillar that shows it will be a Butterfly tomorrow. Likewise, children are the same. People and institutions they get to work with will make a profound influence on their thinking and future. LFJC has time and again for 50 years proved to shape lives of numerous students, who in turn made a positive impact in the larger society. Heartening to see the standards and charisma being consistently maintained over the past five decades. Thank you for all that I immensely benefitted from being a part at my formative years here.",
  author: "Naveen Kaparthy",
  batch: "1996–98 Batch",
  designation: "Vice President, JP Morgan Chase | Treasurer, LFJC Alumni Network",
};

// 11. GOLDEN JUBILEE CELEBRATIONS 22-ITEM SCHEDULE (Verbatim from goldenjubilee.php)
export const goldenJubileeSchedule = [
  "Arrival of Guests & Reception",
  "Lighting the Ceremonial Lamp",
  "Patroness Prayer Song",
  "Welcome Dance",
  "Jubilee Song",
  "Japanese Flower Dance",
  "Principal's Address (Rev. Bro. Arun Prakash)",
  "Mindful Living Performance",
  "Mime on Drug Menace Awareness",
  "Felicitation and Keynote Speeches",
  "LFJC Band Fusion Musical Performance",
  "Felicitation to Mr. Shashanka, IAS",
  "Traditional Festivals Dance",
  "The Tribute by Alumni",
  "Classical and Western Dance Fusion",
  "Youth & Education Dialogue",
  "Speech by Mr. Tarun (Alumnus)",
  "Patriotic Ballet Presentation",
  "Choral Carol Singing",
  "Honoring the Chief Guest",
  "Unity in Diversity Dance",
  "Thanksgiving & National Anthem",
];

// MAIN LFJC DATA OBJECT
export const lfjcData = {
  key: "lfjc",
  name: "Little Flower Junior College",
  shortName: "LFJC",
  tagline: "Knowledge is Truth.",
  established: "1974",
  siteUrl: SITE_URL,
  email: "info@lfjc.co.in",
  secondaryEmail: "lfjrcuppal@gmail.com",
  alumniEmail: "goldenjubilee@lfjc.co.in",
  phone: "+91 7673960151",
  alumniPhone: "+91 90324 69696",
  addressLine: CANONICAL_ADDRESS,
  locality: "Uppal, Hyderabad",
  region: "Telangana",
  postalCode: "500039",
  country: "IN",
  society: "Brothers of St. Gabriel Educational Society",
  admissionsLabel: "Admissions 2026–27 Open (MPC, BiPC, MEC, CEC)",
  principalName: "Rev. Bro. Arun Prakash Lawrance",
  principalRole: "Correspondent & Principal",
  principalQuote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  principalMessage:
    "Warm greetings and best wishes to all. In an ever-evolving world, education remains the cornerstone of personal and national growth. At Little Flower Junior College, Uppal, we have proudly upheld this belief for the last 50 years, establishing ourselves as a premier institution for quality education. Our alumni's accomplishments—gracing esteemed positions across Medicine, Engineering, Arts, Administration, Sports, Cinema, and Politics—stand as a testament to our commitment to nation-building and excellence. 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.' Little Flower Junior College will continue to illuminate paths for generations to come.",
  principalImg: "/images/principals/bro_arun_prakash.jpg",
  stats: [
    { value: "50+", label: "Years of Academic Legacy (1974–2024)" },
    { value: "1,600+", label: "Current Enrolled Students" },
    { value: "8", label: "Acres Campus Opposite Survey of India" },
    { value: "4", label: "Board-Recognized Intermediate Streams" },
  ],
  programs: [
    {
      title: "M.P.C",
      subtitle: "Mathematics, Physics, Chemistry",
      slug: "mpc",
      description:
        "Comprehensive board and competitive examination foundation for engineering, architecture, and technology, preparing students for JEE Main, Advanced, and EAMCET.",
      highlights: [
        "Advanced mathematics foundations (Maths A & Maths B)",
        "State-of-the-art Physics and Chemistry laboratories",
        "Entrance examination coaching and test series",
      ],
      icon: Atom,
    },
    {
      title: "Bi.P.C",
      subtitle: "Botany, Zoology, Physics, Chemistry",
      slug: "bipc",
      description:
        "Intensive life sciences curriculum for medical, dental, veterinary, and pharmaceutical careers, featuring dedicated NEET coaching in Rooms 309 & 310.",
      highlights: [
        "Deep exploration of Botany and Zoology practicals",
        "Dedicated NEET coaching classes commencing at 8:00 AM",
        "Experienced medical entrance faculty guidance",
      ],
      icon: Microscope,
    },
    {
      title: "M.E.C",
      subtitle: "Mathematics, Economics, Commerce",
      slug: "mec",
      description:
        "Quantitative commerce foundation for Chartered Accountancy (CA Foundation), actuarial science, financial analysis, and corporate management.",
      highlights: [
        "Rigorous mathematics combined with accountancy",
        "CA Foundation and CLAT entrance orientation",
        "Special Computer Application Diploma for Humanities students",
      ],
      icon: BriefcaseBusiness,
    },
    {
      title: "C.E.C",
      subtitle: "Civics, Economics, Commerce",
      slug: "cec",
      description:
        "Humanities and business administration track preparing students for law (CLAT), civil services (UPSC), public policy, and corporate commerce.",
      highlights: [
        "Civics and governance case-study seminars",
        "Accountancy and mercantile law fundamentals",
        "Special Computer Application Diploma for Humanities students",
      ],
      icon: Landmark,
    },
  ],

  // VERIFIED ACTIVE FACULTY & STAFF (100% ground-truth match to dept.php)
  faculty: [
    // 1. Principal (first index)
    {
      name: "Rev. Bro. Arun Prakash Lawrance",
      designation: "Correspondent & Principal",
      subject: "Administration & Leadership",
      department: "Administrative Staff",
      image: "/images/brother_arun_official.jpg"
    },
    // 2. Mathematics Department
    {
      name: "Ms. EVSR Seetha",
      designation: "HOD",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/evsrlakshmi.jpg"
    },
    {
      name: "Mr. Praveen Kumar",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/praveenkumar.jpg"
    },
    {
      name: "Mr. H. Naresh Kumar",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/hnareshkumar.jpg"
    },
    {
      name: "Mr. P Mahesh",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/pmahesh.jpg"
    },
    {
      name: "Mr. Purnachander",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/purnachendar.jpg"
    },
    {
      name: "Mr. Satheesh S",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/satheeshkumar.jpg"
    },
    {
      name: "Mr. Sharanraj",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/sharanraj.jpg"
    },
    {
      name: "Mr. Nellutla Kiran Prasad",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/nellutlakiranprasad.jpg"
    },
    // 3. Physics Department
    {
      name: "Mr. R Srikanth",
      designation: "HOD",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/srikanth.jpg"
    },
    {
      name: "Mr. C Naresh Kumar",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/nareshkumar.jpg"
    },
    {
      name: "Mr. K Kishore",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/kishore.jpg"
    },
    {
      name: "Ms. Bhargavi",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/bhargavi.jpg"
    },
    // 4. Chemistry Department
    {
      name: "Mr. Babu Rao G",
      designation: "HOD",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/baburao.jpg"
    },
    {
      name: "Ms. Shruthi P",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/shruthip.jpg"
    },
    {
      name: "Ms. Koteswari B",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/koteswari.jpg"
    },
    {
      name: "Ms. Gayathri K",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/gayathrik.jpg"
    },
    // 5. Biology Department
    {
      name: "Ms. Husna Sultana",
      designation: "Coordinator & Faculty",
      subject: "Botany",
      department: "Biology Department",
      image: "/images/faculty/husnasultana.jpg"
    },
    {
      name: "Ms. T Bhramara",
      designation: "Faculty",
      subject: "Zoology",
      department: "Biology Department",
      image: "/images/faculty/tbhramara.jpg"
    },
    // 6. Humanities Department
    {
      name: "Ms. Vani M",
      designation: "HOD",
      subject: "Civics & Humanities",
      department: "Humanities Department",
      image: "/images/faculty/vani.jpg"
    },
    {
      name: "Ms. Vasavi K",
      designation: "Faculty",
      subject: "Economics",
      department: "Humanities Department",
      image: "/images/faculty/vasavi.jpg"
    },
    {
      name: "Mr. Venugopal Karne",
      designation: "Faculty",
      subject: "Economics",
      department: "Humanities Department",
      image: "/images/faculty/venugopalkarne.jpg"
    },
    {
      name: "Mr. A Varun Reddy",
      designation: "Faculty",
      subject: "Political Science",
      department: "Humanities Department",
      image: "/images/faculty/varunreddy.jpg"
    },
    {
      name: "Mr. Nagarjuna Kumar",
      designation: "Coordinator & Faculty",
      subject: "Commerce & Accountancy",
      department: "Humanities Department",
      image: "/images/faculty/nagarjunakumar.jpg"
    },
    // 7. Languages Department
    {
      name: "Dr. Raghavendra Gupta",
      designation: "Head of Dept (Languages)",
      subject: "Hindi",
      department: "Languages Department",
      image: "/images/faculty/dr.raghavendragupta.jpg"
    },
    {
      name: "Ms. Srividya Sankara",
      designation: "Faculty",
      subject: "Sanskrit",
      department: "Languages Department",
      image: "/images/faculty/srividyasankara.jpg"
    },
    {
      name: "Ms. G Swapna",
      designation: "Faculty",
      subject: "Telugu",
      department: "Languages Department",
      image: "/images/faculty/swapna.jpg"
    },
    {
      name: "Ms. Saraswathy Devi",
      designation: "Faculty",
      subject: "French",
      department: "Languages Department",
      image: "/images/faculty/saraswathydevi.jpg"
    },
    {
      name: "Ms. K H Deepika",
      designation: "Lead Faculty (English)",
      subject: "English",
      department: "Languages Department",
      image: "/images/faculty/deepika.jpg"
    },
    {
      name: "Ms. Rajoulu Esther",
      designation: "Faculty",
      subject: "English",
      department: "Languages Department",
      image: "/images/faculty/easter.jpg"
    },
    {
      name: "Ms. Hema Taneja",
      designation: "Faculty",
      subject: "English",
      department: "Languages Department",
      image: "/images/faculty/hemataneja.jpg"
    },
    {
      name: "Mr. Shyam K",
      designation: "Faculty",
      subject: "English",
      department: "Languages Department",
      image: "/images/faculty/shyamk.jpg"
    },
    // 8. Computer & Library Department
    {
      name: "Mr. N. Sai",
      designation: "Faculty",
      subject: "Computer Science",
      department: "Computer & Library Department",
      image: "/images/faculty/sailu.jpg"
    },
    {
      name: "Ms. P. Swathi",
      designation: "Faculty",
      subject: "Computer Science",
      department: "Computer & Library Department",
      image: "/images/faculty/computer_mam.jpg"
    },
    {
      name: "Ms. Shriji",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Computer & Library Department",
      image: "/images/faculty/shriji.jpg"
    },
    // 9. Physical Education & Sports
    {
      name: "Mr. M L Prasad",
      designation: "Physical Director",
      subject: "Physical Education & Athletics",
      department: "Physical Education & Sports",
      image: "/images/faculty/prasad.jpg"
    },
    {
      name: "Ms. PET Faculty",
      designation: "Faculty",
      subject: "Physical Education & Athletics",
      department: "Physical Education & Sports",
      image: "/images/faculty/dsc_4946.jpg"
    },
    // 10. Office Administration
    {
      name: "Ms. J. Sri Lakshmi",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/srilakshmi.jpg"
    },
    {
      name: "Ms. Aditya M",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/aditya.jpg"
    },
    {
      name: "Ms. Ranganayaki",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/ranganayaki.jpg"
    },
    {
      name: "Mr. T. Sivasinu Goud",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/sivasinugoud.jpg"
    },
    {
      name: "Ms. Archana",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/archana.jpg"
    },
    // 11. Support Staff
    {
      name: "Mr. Anthony",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/anthony.jpg"
    },
    {
      name: "Mr. G. Naresh",
      designation: "Faculty & Lab In-charge",
      subject: "Computer Science",
      department: "Support Staff",
      image: "/images/faculty/gnaresh.jpg"
    },
    {
      name: "Ms. Jahagir",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/jahagir.jpg"
    },
    {
      name: "Ms. Lakshmi",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/lakshmi.jpg"
    },
    {
      name: "Ms. Manjula Vani",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/manjulavani.jpg"
    },
    {
      name: "Ms. Mary",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/mary.jpg"
    },
    {
      name: "Mr. V. Narendar",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/narendar.jpg"
    },
    {
      name: "Mr. Narender Bahadur",
      designation: "Support Staff",
      subject: "Campus Security & Operations",
      department: "Support Staff",
      image: "/images/faculty/narenderbahadur.jpg"
    },
    {
      name: "Mr. Ramesh",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/ramesh.jpg"
    },
    {
      name: "Mr. D. Ramulu",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/ramulu.jpg"
    },
    {
      name: "Ms. M. Sheeba Rani",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/sheeba_rani.jpg"
    },
    {
      name: "Ms. Sudha",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/sudha.jpg"
    },
    {
      name: "Mr. Suraj",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/suraj.jpg"
    },
    {
      name: "Mr. Prabhu Das",
      designation: "Support Staff",
      subject: "Campus Operations",
      department: "Support Staff",
      image: "/images/faculty/prabhudas.jpg"
    },
    // 12. Former Principals (Verified Institutional Chronology 1974–Present)
    {
      name: "Rev. Bro. Vincent",
      designation: "Founder Principal (1974–76 & 1982–83)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_vincent.jpg"
    },
    {
      name: "Dr. Emmanuel",
      designation: "II Principal (1976–1979)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_emmanuel.jpg"
    },
    {
      name: "Rev. Bro. Claude",
      designation: "III Principal (1979–1982)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_claude.jpg"
    },
    {
      name: "Rev. Bro. James Pannivelil",
      designation: "Director & Principal (1982–1983)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_james_pannivelil.jpg"
    },
    {
      name: "Rev. Bro. John Kallarackal",
      designation: "IV Principal (1983–1989)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_john.jpg"
    },
    {
      name: "Rev. Bro. Celestine",
      designation: "V Principal (1989–1994)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_celestine.png"
    },
    {
      name: "Rev. Bro. M.A. George",
      designation: "VI Principal (1994–2000)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_george.jpg"
    },
    {
      name: "Rev. Bro. Gervasis",
      designation: "Former Principal (2000–2008)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_gervasis.jpg"
    },
    {
      name: "Rev. Bro. Franky",
      designation: "Former Principal (2008–2016)",
      department: "Former Principals",
      category: "former-principal",
      image: "/images/principals/bro_franky.jpg"
    },
    // 13. Retired Faculty / Former Teachers
    {
      name: "Dr. Anitha Lincon",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/dr_anitha_lincon.png"
    },
    {
      name: "Dr. Riyaz Ul Ansari",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/dr_riyaz_ui_ansari.png"
    },
    {
      name: "Dr. T. Rajeswara Reddy",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/dr_t_rajeswara_reddy.png"
    },
    {
      name: "Mr. B. Paul Raju",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_b_paul_raju.png"
    },
    {
      name: "Mr. Bheeshma Chary",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_bheeshma_chary.png"
    },
    {
      name: "Mr. David Joseph",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_david_joseph.png"
    },
    {
      name: "Mr. E. V. Subbarao",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_e_v_subbarao.png"
    },
    {
      name: "Mr. Jayatheerth Katti",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_jayatheerth_katti.png"
    },
    {
      name: "Mr. K. Srinivadev",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_k_srinivadev.png"
    },
    {
      name: "Mr. M. Amarnath",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_m_amarnath.png"
    },
    {
      name: "Mr. S. Balaiah",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_s_balaiah.png"
    },
    {
      name: "Mr. T. D. Babu",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_t_d_baaabu.png"
    },
    {
      name: "Mr. A. R. Narasimharao",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_a_r_narasimharao.png"
    },
    {
      name: "Mr. K. Jothi Ram",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_k_jothi_ram.png"
    },
    {
      name: "Mr. Nagaraja Kumar",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_nagaraja_kumar.png"
    },
    {
      name: "Mr. P. Kesavacharaya",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/mr_p_kesavacharaya.png"
    },
    {
      name: "Ms. B. M. D. Sakunthala",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_bmd_sakunthala.png"
    },
    {
      name: "Ms. Raachel Oommen",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_raachel_oommen.png"
    },
    {
      name: "Ms. Saghana Srivastava",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_saghana_srivastava.png"
    },
    {
      name: "Ms. Savithri Narayanan",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_savithri_narayanan.png"
    },
    {
      name: "Ms. Sudheshna Chattopadhyay",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_sudheshna_chattopadhyay.png"
    },
    {
      name: "Ms. J. Meenakshi",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_j_menakshi.png"
    },
    {
      name: "Ms. K. Susheela",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_k_susheela.png"
    },
    {
      name: "Ms. P. Usha",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_p_usha.png"
    },
    {
      name: "Ms. Sabiha Fathima",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_sabiha_fathima.png"
    },
    {
      name: "Ms. V. Saraswathi",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/ms_v_saraswathi.png"
    },
    {
      name: "Mr. Shaik Lateef",
      designation: "Faculty (Retired)",
      department: "Retired Faculty",
      category: "retired",
      image: "/images/faculty/retired/shaik_lateef.png"
    }
  ],

  admissionsSteps: [
    {
      title: "Online Registration & Application",
      description: "Fill out the official online admission form on the MySkoolCom portal selecting your intermediate stream.",
    },
    {
      title: "Document Verification",
      description: "Submit Class X board memo (SSC / CBSE / ICSE) and Transfer Certificate for administrative verification.",
    },
    {
      title: "Counseling & Guidance",
      description: "Meet academic counselors to finalize optional subjects and entrance coaching choices (NEET, JEE, CA Foundation).",
    },
    {
      title: "Admission Confirmation",
      description: "Complete enrollment dues at the college counter, obtain student credentials, and attend orientation.",
    },
  ],

  admissionsDocuments: [
    "Class X Board Marks Memorandum (SSC / CBSE / ICSE) — Original & Photocopy",
    "Transfer Certificate (TC) from the previous school — Original",
    "Conduct & Study Certificate from previous school",
    "Date of Birth Certificate (SSC memo or municipal certificate)",
    "Caste & Income Certificate (for scholarship / concession claims, if applicable)",
    "Aadhaar Card photocopy of Student and Parent / Guardian",
    "Passport-size recent photographs (6 copies)",
    "Migration Certificate (for non-Telangana state boards)",
  ],
};

// Map all environment keys to LFJC data
export const institutionsData = {
  root: lfjcData,
  lfs: lfjcData,
  lfjc: lfjcData,
  lfdc: lfjcData,
};

export function getInstitutionData(key?: keyof typeof institutionsData) {
  return key ? institutionsData[key] || lfjcData : lfjcData;
}

export const institution = lfjcData;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Faculty", href: "/faculty" },
  { label: "Campus Life", href: "/campus" },
  { label: "Admissions", href: "/admissions" },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" },
];

export const lfjcNavItems = navItems;
export const rootNavItems = navItems;

// ALUMNI ROSTER: Official Notable Alumni from LFJC
export interface Alumnus {
  name: string;
  category: "Actors & Filmmakers" | "Civil Servants & Judiciary" | "Singers & Artists" | "Entrepreneurs & Leaders";
  description: string;
  designation: string;
  achievement: string;
  year: string;
  image: string;
  verified?: boolean;
  objectPosition?: string;
}

export const alumniData: Alumnus[] = [
  // --- First row: Civil Servants as requested ---
  {
    name: "Rahul Bojja, IAS",
    category: "Civil Servants & Judiciary",
    description: "Distinguished IAS officer of the Telangana cadre, who has served as Secretary to the Chief Minister, Commissioner of Disaster Management, and District Collector in several key regions.",
    designation: "IAS Officer",
    achievement: "Senior Administrative Secretary",
    year: "Batch of 1993",
    image: "",
    verified: true,
  },
  {
    name: "Shashanka K, IAS",
    category: "Civil Servants & Judiciary",
    description: "Eminent Indian Administrative Service (IAS) officer known for spearheading multiple key rural development, healthcare, and infrastructure initiatives as District Collector.",
    designation: "IAS Officer",
    achievement: "District Collector",
    year: "Batch of 2005",
    image: "/images/alumni/shashanka-k.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Abdaal Akhtar, IAS",
    category: "Civil Servants & Judiciary",
    description: "Outstanding IAS officer who secured an elite rank in the UPSC Civil Services Examination and has since worked in several public service, land revenue, and local administration roles.",
    designation: "IAS Officer",
    achievement: "UPSC Top Ranker",
    year: "Batch of 2011",
    image: "/images/alumni/abdaal-akhtar.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Justice K. Lakshman",
    category: "Civil Servants & Judiciary",
    description: "Eminent legal expert who serves as a Judge of the High Court for the State of Telangana, previously working as the Assistant Solicitor General of India.",
    designation: "High Court Judge",
    achievement: "Former Assistant Solicitor General of India",
    year: "Batch of 1984",
    image: "",
  },
  // --- Remaining alumni in original order ---
  {
    name: "Vijay Deverakonda",
    category: "Actors & Filmmakers",
    description: "Highly acclaimed Indian actor and producer who rose to national fame in Telugu cinema with breakthrough performances in Arjun Reddy, Geetha Govindam, and Mahanati.",
    designation: "Actor & Film Producer",
    achievement: "National Film Sensation",
    year: "Batch of 2007 (MPC)",
    image: "/images/alumni/vijay-deverakonda.jpg",
    objectPosition: "object-[center_10%]",
  },
  {
    name: "Akkineni Nagarjuna",
    category: "Actors & Filmmakers",
    description: "One of the most legendary and influential superstars of Telugu cinema, known for his versatile acting, movie production, and successful television hosting.",
    designation: "Superstar & Television Presenter",
    achievement: "Padma Shri Awardee",
    year: "Batch of 1976",
    image: "/images/alumni/akkineni-nagarjuna.jpg",
    objectPosition: "object-[center_10%]",
  },
  {
    name: "Nandamuri Balakrishna",
    category: "Actors & Filmmakers",
    description: "Renowned Telugu cinema actor, politician, and philanthropist who has appeared in over 100 films, popular for his energetic and larger-than-life performances.",
    designation: "Actor & Legislator",
    achievement: "MLA & Filmfare Award Winner",
    year: "Batch of 1978",
    image: "/images/alumni/nandamuri-balakrishna.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Nara Lokesh",
    category: "Entrepreneurs & Leaders",
    description: "Prominent Indian politician serving as a Cabinet Minister in Andhra Pradesh, overseeing IT, electronics, and communication departments. Former Executive Director of Heritage Foods.",
    designation: "Cabinet Minister, Govt of Andhra Pradesh",
    achievement: "Stanford Alumnus",
    year: "Batch of 2000 (MPC)",
    image: "/images/alumni/nara-lokesh-correct.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Nagesh Kukunoor",
    category: "Actors & Filmmakers",
    description: "Renowned filmmaker, screenwriter, and actor celebrated for directing critically acclaimed parallel films like Hyderabad Blues, Iqbal, 3 Deewarein, and Dor.",
    designation: "Filmmaker & Screenwriter",
    achievement: "National Film Award Winner",
    year: "Batch of 1984",
    image: "/images/alumni/nagesh-kukunoor.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Vishwak Sen",
    category: "Actors & Filmmakers",
    description: "Dynamic actor, director, and screenwriter in contemporary Telugu cinema, known for his films Falaknuma Das, Hit: The First Case, and Gaami.",
    designation: "Actor, Director & Screenwriter",
    achievement: "Mass Ka Das & Youth Icon",
    year: "Batch of 2013",
    image: "/images/alumni/vishwak-sen.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Tarun Kumar",
    category: "Actors & Filmmakers",
    description: "Former actor and child artist in Telugu cinema who achieved major commercial success with romantic blockbusters in the early 2000s, including Nuvve Kavali.",
    designation: "Actor",
    achievement: "National Film Award Winner",
    year: "Batch of 2000",
    image: "/images/alumni/tarun-kumar.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Geetha Madhuri",
    category: "Singers & Artists",
    description: "Renowned playback singer and dubbing artist who has recorded over 500 songs in Telugu, Tamil, Kannada, and Malayalam cinema, establishing herself as a leading vocalist.",
    designation: "Playback Singer & Dubbing Artist",
    achievement: "Nandi Award & Filmfare Award Recipient",
    year: "Batch of 2006",
    image: "/images/alumni/geetha-madhuri.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Damini Bhatla",
    category: "Singers & Artists",
    description: "Popular playback singer who gained widespread recognition for her work in the epic blockbuster Baahubali and various popular television music shows.",
    designation: "Playback Singer",
    achievement: "Prominent female playback vocalist",
    year: "Batch of 2012",
    image: "/images/alumni/damini-bhatla.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Satya Yamini",
    category: "Singers & Artists",
    description: "Versatile and highly talented playback singer who has rendered many chartbuster melodies in Telugu films, including vocals for the Baahubali franchise.",
    designation: "Playback Singer",
    achievement: "Renowned Baahubali Vocalist",
    year: "Batch of 2011",
    image: "/images/alumni/satya-yamini.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Stephen Ravindra, IPS",
    category: "Civil Servants & Judiciary",
    description: "Distinguished Indian Police Service (IPS) officer of the Telangana cadre, known for his stellar tenure as Police Commissioner of Cyberabad and key roles in anti-extremist operations.",
    designation: "IPS Officer",
    achievement: "Former Police Commissioner of Cyberabad",
    year: "Batch of 1991",
    image: "",
  },
  {
    name: "T. Krishna Prasad, IPS",
    category: "Civil Servants & Judiciary",
    description: "Highly respected retired IPS officer who served in several high-profile administrative police wings and retired as Director General of Police (DGP) in Telangana.",
    designation: "Retired IPS Officer",
    achievement: "Former Director General of Police (DGP)",
    year: "Batch of 1980",
    image: "",
  },
  {
    name: "Dr. Hemanth",
    category: "Entrepreneurs & Leaders",
    description: "Highly prominent medical specialist who has made exemplary contributions to clinical research and patient care in leading healthcare networks of Hyderabad.",
    designation: "Medical Specialist",
    achievement: "Clinical & Healthcare Leader",
    year: "Batch of 1998",
    image: "/images/alumni/dr-hemanth.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "Harsha Prahlad",
    category: "Entrepreneurs & Leaders",
    description: "Innovative researcher and engineering executive working at the cutting edge of robotics and advanced physical sciences in international research hubs.",
    designation: "Robotics Engineer & Executive",
    achievement: "Leading Roboticist & Inventor",
    year: "Batch of 1995",
    image: "/images/alumni/harsha-prahlad.jpg",
    objectPosition: "object-[center_12%]",
  },
  {
    name: "K. Srinivas",
    category: "Entrepreneurs & Leaders",
    description: "Prominent senior administrator and academic advisor working with youth development programs and educational institutions.",
    designation: "Senior Educational Strategist",
    achievement: "Academic Advisor",
    year: "Batch of 1989",
    image: "",
  },
  {
    name: "Raja Reddy",
    category: "Singers & Artists",
    description: "Eminent performing artist and cultural ambassador, dedicating his work to classical dance and music traditions, earning global renown.",
    designation: "Classical Dancer & Choreographer",
    achievement: "Padma Bhushan & Padma Shri Recipient",
    year: "Batch of 1978",
    image: "",
  },
  {
    name: "Amit Sanghi",
    category: "Entrepreneurs & Leaders",
    description: "Successful business entrepreneur and industrial leader, guiding diverse corporate ventures in manufacturing, infrastructure, and commerce.",
    designation: "Industrialist & Corporate Executive",
    achievement: "President of Sanghi Industries",
    year: "Batch of 1982",
    image: "/images/alumni/amit-sanghi.jpg",
    objectPosition: "object-[center_12%]",
  },
];

export const stats = lfjcData.stats;
export const programs = lfjcData.programs;
export const faculty = lfjcData.faculty;
export const retiredFaculty = retiredFacultyData;
export const admissionsSteps = lfjcData.admissionsSteps;
export const admissionsDocuments = lfjcData.admissionsDocuments;
export interface AlumniVideo {
  id: string;
  title: string;
  description?: string;
  embedUrl: string;
  watchUrl: string;
}

export const alumniVideos: AlumniVideo[] = [];
export const alumniNotes: string[] = [];

