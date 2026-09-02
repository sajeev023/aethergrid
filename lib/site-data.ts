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
  fullText: `St Therese of Lisieux, born Marie Françoise-Thérèse Martin (2 January 1873 – 30 September 1897) was a French Catholic who became a Carmelite nun at an early age. She is popularly known as "The Little Flower of Jesus", or simply "The Little Flower."

She died in obscurity at the age of 24. However, after her death, her autobiography – Story of a Soul was published and became a best-seller around the world. Her books explained her spiritual path of love and selflessness, and she became one among the three ladies to be considered a Doctor of the Catholic Church.

"What matters in life," she wrote, "is not great deeds, but great love." She loved flowers and saw herself as the "Little Flower of Jesus". Because of this beautiful analogy, the title "Little Flower" remained with her. St. Therese was canonized by Pope Pius XI on May 17, 1925.`,
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
    "Situated on Tarnaka-Uppal Road opposite Survey of India, Little Flower Junior College is enclosed within a tall boundary wall lined with large trees. The 2-acre campus houses a grand three-storeyed building (ground plus three floors), expansive playgrounds for football, basketball, and volleyball, Brother's Quarters, and a regal welcoming statue of Patron Saint Thérèse.",
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
    image: "/images/faculty/retired/dr_anitha_lincon.jpg",
    tenure: "1986–2020",
  },
  {
    name: "Dr. Riyaz Ul Ansari",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/dr_riyaz_ui_ansari.jpg",
    tenure: "1991–2016",
  },
  {
    name: "Dr. T. Rajeswara Reddy",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/dr_t_rajeswara_reddy.jpg",
    tenure: "1982–2013",
  },
  {
    name: "Mr. B. Paul Raju",
    designation: "Faculty (Retired)",
    department: "Mathematics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_b_paul_raju.jpg",
    tenure: "2000–2023",
  },
  {
    name: "Mr. Bheeshma Chary",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_bheeshma_chary.jpg",
    tenure: "1987–2016",
  },
  {
    name: "Mr. David Joseph",
    designation: "Faculty (Retired)",
    department: "Office Administration",
    category: "retired",
    image: "/images/faculty/retired/mr_david_joseph.jpg",
    tenure: "1974–1997",
  },
  {
    name: "Mr. E. V. Subbarao",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_e_v_subbarao.jpg",
    tenure: "1974–1997",
  },
  {
    name: "Mr. Jayatheerth Katti",
    designation: "Faculty (Retired)",
    department: "Mathematics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_jayatheerth_katti.jpg",
    tenure: "1981–2003",
  },
  {
    name: "Mr. K. Srinivadev",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_k_srinivadev.jpg",
    tenure: "1991–2019",
  },
  {
    name: "Mr. M. Amarnath",
    designation: "Faculty (Retired)",
    department: "Computer & Library Department",
    category: "retired",
    image: "/images/faculty/retired/mr_m_amarnath.jpg",
    tenure: "1996–2023",
  },
  {
    name: "Mr. S. Balaiah",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_s_balaiah.jpg",
    tenure: "1985–2020",
  },
  {
    name: "Mr. T. D. Babu",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/mr_t_d_baaabu.jpg",
    tenure: "1989–2022",
  },
  {
    name: "Mr. A. R. Narasimharao",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_a_r_narasimharao.jpg",
    tenure: "1985–2017",
  },
  {
    name: "Mr. K. Jothi Ram",
    designation: "Faculty (Retired)",
    department: "Office Administration",
    category: "retired",
    image: "/images/faculty/retired/mr_k_jothi_ram.jpg",
    tenure: "1990–2005",
  },
  {
    name: "Mr. Nagaraja Kumar",
    designation: "Faculty (Retired)",
    department: "Physics Department",
    category: "retired",
    image: "/images/faculty/retired/mr_nagaraja_kumar.jpg",
    tenure: "1982–2010",
  },
  {
    name: "Mr. P. Kesavacharaya",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/mr_p_kesavacharaya.jpg",
    tenure: "1982–2013",
  },
  {
    name: "Ms. B. M. D. Sakunthala",
    designation: "Faculty (Retired)",
    department: "Biology Department",
    category: "retired",
    image: "/images/faculty/retired/ms_bmd_sakunthala.jpg",
    tenure: "1974–2005",
  },
  {
    name: "Ms. Raachel Oommen",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_raachel_oommen.jpg",
    tenure: "1988–2020",
  },
  {
    name: "Ms. Saghana Srivastava",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_saghana_srivastava.jpg",
    tenure: "1983–2008",
  },
  {
    name: "Ms. Savithri Narayanan",
    designation: "Faculty (Retired)",
    department: "Computer & Library Department",
    category: "retired",
    image: "/images/faculty/retired/ms_savithri_narayanan.jpg",
    tenure: "1999–2014",
  },
  {
    name: "Ms. Sudheshna Chattopadhyay",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_sudheshna_chattopadhyay.jpg",
    tenure: "1981–2013",
  },
  {
    name: "Ms. J. Meenakshi",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_j_menakshi.jpg",
    tenure: "2000–2017",
  },
  {
    name: "Ms. K. Susheela",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/ms_k_susheela.jpg",
    tenure: "1987–2018",
  },
  {
    name: "Ms. P. Usha",
    designation: "Faculty (Retired)",
    department: "Chemistry Department",
    category: "retired",
    image: "/images/faculty/retired/ms_p_usha.jpg",
    tenure: "1983–2017",
  },
  {
    name: "Ms. Sabiha Fathima",
    designation: "Faculty (Retired)",
    department: "Chemistry Department",
    category: "retired",
    image: "/images/faculty/retired/ms_sabiha_fathima.jpg",
    tenure: "1987–2023",
  },
  {
    name: "Ms. V. Saraswathi",
    designation: "Faculty (Retired)",
    department: "Languages Department",
    category: "retired",
    image: "/images/faculty/retired/ms_v_saraswathi.jpg",
    tenure: "1995–2005",
  },
  {
    name: "Mr. Shaik Lateef",
    designation: "Faculty (Retired)",
    department: "Support Staff",
    category: "retired",
    image: "/images/faculty/retired/shaik_lateef.jpg",
    tenure: "1983–2023",
  },
];


// 8. BROTHERS WHO STUDIED AT LFJC AND SERVED >25 YEARS IN BROTHERHOOD (Verbatim from heritage.php - 20 Brothers)
export const brothersInServiceData = [
  { name: "Bro. James C.A.", batch: "1974–76" },
  { name: "Bro. Sleeva Reddy", batch: "1974–76" },
  { name: "Bro. Franky Noronha", batch: "1977–79" },
  { name: "Bro. William D’Mello", batch: "1977–79" },
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
  { name: "Bro. Roque D’Cunha", batch: "1985–87" },
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
    "There’s nothing in a caterpillar that shows it will be a Butterfly tomorrow. Likewise, children are the same. People and institutions they get to work with will make a profound influence on their thinking and future. LFJC has time and again for 50 years proved to shape lives of numerous students, who in turn made a positive impact in the larger society. Heartening to see the standards and charisma being consistently maintained over the past five decades. Thank you for all that I immensely benefitted from being a part at my formative years here.",
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
  "Principal’s Address (Rev. Bro. Arun Prakash)",
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
    "Warm greetings and best wishes to all. In an ever-evolving world, education remains the cornerstone of personal and national growth. At Little Flower Junior College, Uppal, we have proudly upheld this belief for the last 50 years, establishing ourselves as a premier institution for quality education. Our alumni’s accomplishments—gracing esteemed positions across Medicine, Engineering, Arts, Administration, Sports, Cinema, and Politics—stand as a testament to our commitment to nation-building and excellence. 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.' Little Flower Junior College will continue to illuminate paths for generations to come.",
  principalImg: "/images/principals/bro_arun_prakash.jpg",
  stats: [
    { value: "50+", label: "Years of Academic Legacy (1974–2024)" },
    { value: "1,600+", label: "Current Enrolled Students" },
    { value: "2", label: "Acres Campus Opposite Survey of India" },
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
    // 1. Leadership
    {
      name: "Rev. Bro. Arun Prakash Lawrance",
      designation: "Correspondent & Principal",
      subject: "Administration & Leadership",
      department: "Administrative Staff",
      image: "/images/principals/bro_arun_prakash.jpg",
    },
    // 2. Mathematics Department
    {
      name: "Ms. EVSR Seetha",
      designation: "HOD",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/evsrlakshmi.jpg",
    },
    {
      name: "Mr. Praveen",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/praveenkumar.jpg",
    },
    {
      name: "Mr. H. Naresh Kumar",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/hnareshkumar.jpg",
    },
    {
      name: "Mr. P. Mahesh",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/pmahesh.jpg",
    },
    {
      name: "Mr. Purnachander",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/purnachendar.jpg",
    },
    {
      name: "Mr. Satheesh S",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/satheeshkumar.jpg",
    },
    {
      name: "Mr. Sharanraj",
      designation: "Faculty",
      subject: "Mathematics",
      department: "Mathematics Department",
      image: "/images/faculty/sharanraj.jpg",
    },
    // 3. Physics Department
    {
      name: "Mr. R. Srikanth",
      designation: "HOD",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/srikanth.jpg",
    },
    {
      name: "Mr. C. Naresh Kumar",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/nareshkumar.jpg",
    },
    {
      name: "Mr. K. Kishore",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/kishore.jpg",
    },
    {
      name: "Ms. Bhargavi",
      designation: "Faculty",
      subject: "Physics",
      department: "Physics Department",
      image: "/images/faculty/bhargavi.jpg",
    },
    // 4. Chemistry Department
    {
      name: "Mr. Babu Rao G",
      designation: "HOD",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/baburao.jpg",
    },
    {
      name: "Ms. Shruthi P",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/shruthip.jpg",
    },
    {
      name: "Ms. Koteswari B",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/koteswari.jpg",
    },
    {
      name: "Ms. Gayathri",
      designation: "Faculty",
      subject: "Chemistry",
      department: "Chemistry Department",
      image: "/images/faculty/gayathrik.jpg",
    },
    // 5. Department of Biological Sciences
    {
      name: "Ms. Husna",
      designation: "Faculty",
      subject: "Botany",
      department: "Biology Department",
      image: "/images/faculty/husnasultana.jpg",
    },
    {
      name: "Ms. T. Bhramara",
      designation: "Faculty",
      subject: "Zoology",
      department: "Biology Department",
      image: "/images/faculty/tbhramara.jpg",
    },
    // 6. Department of Humanities
    {
      name: "Ms. Vani M",
      designation: "HOD",
      subject: "Commerce & Civics",
      department: "Humanities Department",
      image: "/images/faculty/vani.jpg",
    },
    {
      name: "Ms. Vasavi K",
      designation: "Faculty",
      subject: "Economics",
      department: "Humanities Department",
      image: "/images/faculty/vasavi.jpg",
    },
    {
      name: "Mr. Venugopal",
      designation: "Faculty",
      subject: "Economics",
      department: "Humanities Department",
      image: "/images/faculty/venugopalkarne.jpg",
    },
    {
      name: "Mr. Nagarjuna Kumar",
      designation: "Faculty",
      subject: "Commerce",
      department: "Humanities Department",
      image: "/images/faculty/nagarjunakumar.jpg",
    },
    {
      name: "Mr. N. Rajasekhar",
      designation: "Faculty",
      subject: "Commerce",
      department: "Humanities Department",
      image: "/images/faculty/rajashekar.jpg",
    },
    {
      name: "Mr. A. Varun Reddy",
      designation: "Faculty",
      subject: "Political Science",
      department: "Humanities Department",
      image: "/images/faculty/varunreddy.jpg",
    },
    // 7. Department of English
    {
      name: "Ms. K. H. Deepika",
      designation: "HOD",
      subject: "English",
      department: "Department of English",
      image: "/images/faculty/deepika.jpg",
    },
    {
      name: "Ms. Rajoulu Esther",
      designation: "Faculty",
      subject: "English",
      department: "Department of English",
      image: "/images/faculty/easter.jpg",
    },
    {
      name: "Ms. Hema Taneja",
      designation: "Faculty",
      subject: "English",
      department: "Department of English",
      image: "/images/faculty/hemataneja.jpg",
    },
    {
      name: "Mr. Shyam K",
      designation: "Faculty",
      subject: "English",
      department: "Department of English",
      image: "/images/faculty/shyamk.jpg",
    },
    {
      name: "Ms. Rupa Jha",
      designation: "Faculty",
      subject: "English",
      department: "Department of English",
      image: "/images/faculty/rupajha.jpg",
    },
    // 8. Department of Languages
    {
      name: "Mr. Raghavendra",
      designation: "HOD & Faculty",
      subject: "Hindi",
      department: "Languages Department",
      image: "/images/faculty/dr.raghavendragupta.jpg",
    },
    {
      name: "Ms. G. Swapna",
      designation: "Faculty",
      subject: "Telugu",
      department: "Languages Department",
      image: "/images/faculty/swapna.jpg",
    },
    {
      name: "Ms. Srividhya S",
      designation: "Faculty",
      subject: "Sanskrit",
      department: "Languages Department",
      image: "/images/faculty/srividyasankara.jpg",
    },
    {
      name: "Ms. Saraswathi",
      designation: "Faculty",
      subject: "French",
      department: "Languages Department",
      image: "/images/faculty/saraswathydevi.jpg",
    },
    // 9. Department of Computer Science, Library Science & Sports
    {
      name: "Mr. Milind Pathak",
      designation: "Librarian",
      subject: "Library Science",
      department: "Computer & Library Department",
      image: "/images/faculty/milindpathak.jpg",
    },
    {
      name: "Mr. N. Sai",
      designation: "System Administrator",
      subject: "Computer Science",
      department: "Computer & Library Department",
      image: "/images/faculty/sailu.jpg",
    },
    {
      name: "Mr. M. L. Prasad",
      designation: "Physical Director",
      subject: "Physical Education & Athletics",
      department: "Physical Education & Sports",
      image: "/images/faculty/prasad.jpg",
    },
    // 10. Office Staff
    {
      name: "Ms. J. Sri Lakshmi",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/srilakshmi.jpg",
    },
    {
      name: "Ms. Aditya M",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/aditya.jpg",
    },
    {
      name: "Ms. Ranganayaki",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/ranganayaki.jpg",
    },
    {
      name: "Mr. T. Sivasinu Goud",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/sivasinugoud.jpg",
    },
    {
      name: "Ms. Archana",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/archana.jpg",
    },
    {
      name: "Ms. Shiji J",
      designation: "Office Staff",
      subject: "Office Operations",
      department: "Office Administration",
      image: "/images/faculty/shriji.jpg",
    },
    // 11. Support Staff (Verbatim from dept.php)
    {
      name: "Mr. Md. Jehangir",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/jahagir.jpg",
    },
    {
      name: "Mr. Ch. Mallaiah",
      designation: "Support Staff",
      department: "Support Staff",
      image: "",
    },
    {
      name: "Mr. Narender Bahadur",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/narenderbahadur.jpg",
    },
    {
      name: "Mr. D. Ramulu",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/ramulu.jpg",
    },
    {
      name: "Ms. K. Lakshmi",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/lakshmi.jpg",
    },
    {
      name: "Ms. Manjula Vani",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/manjulavani.jpg",
    },
    {
      name: "Ms. Sudha",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/sudha.jpg",
    },
    {
      name: "Ms. Mary",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/mary.jpg",
    },
    {
      name: "Mr. V. Narendar",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/narendar.jpg",
    },
    {
      name: "Mr. Suraj",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/suraj.jpg",
    },
    {
      name: "Mr. Ramesh",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/ramesh.jpg",
    },
    {
      name: "Mr. Naresh",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/gnaresh.jpg",
    },
    {
      name: "Mr. Bhaskar",
      designation: "Support Staff",
      department: "Support Staff",
      image: "",
    },
    {
      name: "Mr. Anthony",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/anthony.jpg",
    },
    {
      name: "Ms. M. Sheeba Rani",
      designation: "Support Staff",
      department: "Support Staff",
      image: "/images/faculty/sheeba_rani.jpg",
    },
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

// ALUMNI ROSTER: Combines Verified Official Alumni Network (Circular 2) + Prominent Alumni
export interface Alumnus {
  name: string;
  category: "Civil Servants & Judiciary" | "Entrepreneurs & Leaders" | "Actors & Filmmakers" | "Singers & Artists";
  description: string;
  designation: string;
  achievement: string;
  year: string;
  image: string;
  verified?: boolean;
  objectPosition?: string;
}

export const alumniData: Alumnus[] = [
  // --- Official Alumni Network Core Leaders (Circular 2 & Circular 4) ---
  {
    name: "Major Gen. MLN Sravan Kumar",
    category: "Civil Servants & Judiciary",
    description: "Distinguished retired Indian Army Officer. President of the Little Flower Junior College Alumni Network.",
    designation: "Retired Major General, Indian Army",
    achievement: "President, LFJC Alumni Network",
    year: "Batch of 1976",
    image: "",
    verified: true,
  },
  {
    name: "Naveen Kaparthy",
    category: "Entrepreneurs & Leaders",
    description: "Vice President at JP Morgan Chase. Treasurer of LFJC Alumni Network. Active contributor to student mentorship and alumni initiatives.",
    designation: "Vice President, JP Morgan Chase",
    achievement: "Treasurer, LFJC Alumni Network",
    year: "Batch of 1998",
    image: "",
    verified: true,
  },
  {
    name: "Dr. B.V.J. Vikas",
    category: "Entrepreneurs & Leaders",
    description: "Renowned Prosthodontist and Dental Surgeon in Hyderabad. Vice President of LFJC Alumni Network.",
    designation: "Prosthodontist & Dental Surgeon",
    achievement: "Vice President, LFJC Alumni Network",
    year: "Batch of 1986",
    image: "",
    verified: true,
  },
  {
    name: "Dr. Vandana Samba",
    category: "Entrepreneurs & Leaders",
    description: "Distinguished Professor and academician. Vice President of LFJC Alumni Network, designer of Golden Jubilee commemoration visuals.",
    designation: "Professor & Academician",
    achievement: "Vice President, LFJC Alumni Network",
    year: "Batch of 1999",
    image: "",
    verified: true,
  },
  {
    name: "Mr. Ravi Devulapally",
    category: "Entrepreneurs & Leaders",
    description: "Managing Director of Database in the Information Technology Industry. Secretary of LFJC Alumni Network.",
    designation: "Managing Director, IT Industry",
    achievement: "Secretary, LFJC Alumni Network",
    year: "Batch of 1989",
    image: "",
    verified: true,
  },
  {
    name: "Dr. Sneha Verghese",
    category: "Civil Servants & Judiciary",
    description: "Assistant Section Officer at the Indian Council of Agricultural Research (ICAR). Secretary of LFJC Alumni Network.",
    designation: "Asst. Section Officer, ICAR",
    achievement: "Secretary, LFJC Alumni Network",
    year: "Batch of 2005",
    image: "",
    verified: true,
  },
  {
    name: "Prof. Dr. A. Patrick",
    category: "Entrepreneurs & Leaders",
    description: "Senior Assistant Professor, Department of Commerce, Osmania University. Executive Member of LFJC Alumni Network.",
    designation: "Sr. Asst. Professor, Osmania University",
    achievement: "Executive Member, LFJCAN",
    year: "Batch of 1992",
    image: "",
    verified: true,
  },
  {
    name: "Dr. Ranganath",
    category: "Entrepreneurs & Leaders",
    description: "Eminent Oncologist at the Nizam's Institute of Medical Sciences (NIMS), Hyderabad.",
    designation: "Oncologist, NIMS",
    achievement: "Senior Medical Specialist",
    year: "Batch of 1994",
    image: "",
    verified: true,
  },
  {
    name: "Mr. Rakesh Chandra",
    category: "Entrepreneurs & Leaders",
    description: "Director of Finance at Virtusa Software Consulting. Corporate financial executive.",
    designation: "Director Finance, Virtusa",
    achievement: "Corporate Finance Leader",
    year: "Batch of 1994",
    image: "",
    verified: true,
  },
  {
    name: "Dr. Pratap Varma",
    category: "Entrepreneurs & Leaders",
    description: "Specialist Oncologist at American Oncology Institute (AOI), Hyderabad.",
    designation: "Oncologist, AOI",
    achievement: "Cancer Specialist",
    year: "Batch of 1995",
    image: "",
    verified: true,
  },
  {
    name: "Ms. Sai Vinathi",
    category: "Entrepreneurs & Leaders",
    description: "Chartered Accountant at Deloitte. Top finance and auditing specialist.",
    designation: "Chartered Accountant, Deloitte",
    achievement: "Senior CA Professional",
    year: "Batch of 2014",
    image: "",
    verified: true,
  },
  // --- Prominent Public Figures ---
  {
    name: "Shashanka K, IAS",
    category: "Civil Servants & Judiciary",
    description: "Eminent Indian Administrative Service (IAS) officer felicitated at LFJC Golden Jubilee for public welfare and district governance.",
    designation: "IAS Officer & District Collector",
    achievement: "Felicitated at LFJC Golden Jubilee",
    year: "Batch of 2005",
    image: "/images/alumni/shashanka-k.jpg",
    objectPosition: "object-[center_12%]",
    verified: true,
  },
  {
    name: "Rahul Bojja, IAS",
    category: "Civil Servants & Judiciary",
    description: "Distinguished IAS officer of Telangana cadre who served as Secretary to Chief Minister and Commissioner of Disaster Management.",
    designation: "Senior IAS Officer",
    achievement: "Secretary to Government",
    year: "Batch of 1993",
    image: "",
    verified: true,
  },
  {
    name: "Justice K. Lakshman",
    category: "Civil Servants & Judiciary",
    description: "Sitting Judge of the High Court for the State of Telangana, previously Assistant Solicitor General of India.",
    designation: "High Court Judge",
    achievement: "Former Assistant Solicitor General of India",
    year: "Batch of 1984",
    image: "",
    verified: true,
  },
  {
    name: "Stephen Ravindra, IPS",
    category: "Civil Servants & Judiciary",
    description: "Distinguished IPS officer of Telangana cadre, former Police Commissioner of Cyberabad.",
    designation: "IPS Officer",
    achievement: "Former Commissioner of Police, Cyberabad",
    year: "Batch of 1991",
    image: "",
    verified: true,
  },
  {
    name: "Vijay Deverakonda",
    category: "Actors & Filmmakers",
    description: "Acclaimed Indian actor and producer in Telugu and Hindi cinema, celebrated for award-winning performances.",
    designation: "Actor & Film Producer",
    achievement: "Filmfare Award Winner",
    year: "Batch of 2007 (MPC)",
    image: "/images/alumni/vijay-deverakonda.jpg",
    objectPosition: "object-[center_10%]",
    verified: true,
  },
  {
    name: "Nara Lokesh",
    category: "Entrepreneurs & Leaders",
    description: "Cabinet Minister in Andhra Pradesh overseeing IT, Electronics & Communications departments. Stanford MBA graduate.",
    designation: "Cabinet Minister, Govt. of Andhra Pradesh",
    achievement: "Stanford Alumnus & Public Leader",
    year: "Batch of 2000 (MPC)",
    image: "/images/alumni/nara-lokesh-correct.jpg",
    objectPosition: "object-[center_12%]",
    verified: true,
  },
  {
    name: "Tarun Kumar",
    category: "Actors & Filmmakers",
    description: "Actor in Telugu cinema who delivered an address at the LFJC Golden Jubilee Celebrations.",
    designation: "Actor",
    achievement: "National Film Award Winner",
    year: "Batch of 2000",
    image: "/images/alumni/tarun-kumar.jpg",
    objectPosition: "object-[center_12%]",
    verified: true,
  },
  {
    name: "Nagesh Kukunoor",
    category: "Actors & Filmmakers",
    description: "Renowned filmmaker, screenwriter, and director celebrated for films like Hyderabad Blues, Iqbal, and Dor.",
    designation: "Filmmaker & Screenwriter",
    achievement: "National Film Award Winner",
    year: "Batch of 1984",
    image: "/images/alumni/nagesh-kukunoor.jpg",
    objectPosition: "object-[center_12%]",
    verified: true,
  },
  {
    name: "Vishwak Sen",
    category: "Actors & Filmmakers",
    description: "Dynamic actor and filmmaker in contemporary Telugu cinema, known for Falaknuma Das and Gaami.",
    designation: "Actor & Director",
    achievement: "Youth Icon",
    year: "Batch of 2013",
    image: "/images/alumni/vishwak-sen.jpg",
    objectPosition: "object-[center_12%]",
    verified: true,
  },
];

export const stats = lfjcData.stats;
export const programs = lfjcData.programs;
export const faculty = lfjcData.faculty;
export const retiredFaculty = retiredFacultyData;
export const admissionsSteps = lfjcData.admissionsSteps;
export const admissionsDocuments = lfjcData.admissionsDocuments;