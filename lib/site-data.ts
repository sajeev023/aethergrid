import {
  Atom,
  BriefcaseBusiness,
  Landmark,
  Microscope
} from "lucide-react";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lfjc.co.in";
export const CANONICAL_ADDRESS = "Survey No. 6, Uppal - Ramanthapur Road, Uppal, Hyderabad, Telangana 500039";

export const lfjcData = {
  key: "lfjc",
  name: "Little Flower Junior College",
  shortName: "LFJC",
  tagline: "Knowledge is Truth.",
  established: "1974",
  siteUrl: SITE_URL,
  email: "info@lfjc.co.in",
  phone: "+91 7673960151",
  addressLine: CANONICAL_ADDRESS,
  locality: "Hyderabad",
  region: "Telangana",
  postalCode: "500039",
  country: "IN",
  society: "Brothers of St. Gabriel Educational Society",
  admissionsLabel: "Admissions for 2026–27 open soon",
  principalName: "Rev. Bro. Arun Prakash Lawrance",
  principalRole: "Correspondent & Principal",
  principalMessage: "Welcome to Little Flower Junior College, Uppal. Established in 1974 by upgrading the historic school of Abids, we celebrate our Golden Jubilee of intermediate excellence. Inspired by Saint Louis de Montfort and our patroness St. Therese of Lisieux, our mission is to guide intermediate students toward the truth that makes them wise, preparing them for IIT, NEET, CA, and premier university entrances.",
  principalImg: "/images/brother_arun_official.jpg",
  stats: [
    {
      value: "50+",
      label: "Years of Academic Legacy"
    },
    {
      value: "1,600+",
      label: "Enrolled Students"
    },
    {
      value: "15,000+",
      label: "Global Alumni Network"
    },
    {
      value: "4",
      label: "Board-recognized Streams"
    }
  ],
  programs: [
    {
      title: "M.P.C",
      subtitle: "Mathematics, Physics, Chemistry",
      slug: "mpc",
      description: "A career pathway for engineering, architecture, and technology, focusing on IIT-JEE entrance preparation.",
      highlights: [
        "Advanced mathematics foundation",
        "Physics and chemistry lab exposure",
        "Engineering entrance orientation"
      ],
      icon: Atom
    },
    {
      title: "Bi.P.C",
      subtitle: "Botany, Zoology, Physics, Chemistry",
      slug: "bipc",
      description: "A focused science stream for medicine, life sciences, and pharmacy, focusing on NEET entrance preparation.",
      highlights: [
        "Botany and zoology depth",
        "Practical laboratory learning",
        "Medical entrance orientation"
      ],
      icon: Microscope
    },
    {
      title: "M.E.C",
      subtitle: "Mathematics, Economics, Commerce",
      slug: "mec",
      description: "A balanced quantitative commerce program for actuary sciences, finance, and CA Foundation exam guidance.",
      highlights: [
        "Mathematics for commerce",
        "Economic theory and application",
        "CA foundation orientation"
      ],
      icon: BriefcaseBusiness
    },
    {
      title: "C.E.C",
      subtitle: "Civics, Economics, Commerce",
      slug: "cec",
      description: "A humanities and commerce stream for business law, corporate management, and public administration.",
      highlights: [
        "Civics and governance seminars",
        "Accountancy fundamentals",
        "Business organization practice"
      ],
      icon: Landmark
    }
  ],
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
      image: "/images/silver-jubilee/silver-jubilee-bro-celestine.jpg"
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
    }
  ],
  admissionsSteps: [
    {
      title: "Online Inquiry",
      description: "Fill out the online application detailing intermediate stream preferences."
    },
    {
      title: "Document Review",
      description: "Submit Class X board memo (SSC/CBSE/ICSE) and TC for verification."
    },
    {
      title: "Counseling Interview",
      description: "Discuss academic goals, stream choices, and readiness with the admissions counselor."
    },
    {
      title: "Enrollment Completion",
      description: "Complete admission dues, attend family orientation, and begin classes."
    }
  ],
  admissionsDocuments: [
    "Class X Board Memorandum of Marks (SSC / CBSE / ICSE) — original + photocopy",
    "Transfer Certificate (TC) from the previous school — original",
    "Conduct / Character Certificate from the previous school",
    "Date of Birth Certificate (SSC memo or municipal birth certificate)",
    "Caste & Income Certificate (for scholarship / fee concession claims, if applicable)",
    "Aadhaar Card photocopy of the student and parent/guardian",
    "Six recent passport-size photographs of the student",
    "Migration Certificate (for students from boards other than BIE Telangana, if applicable)",
  ]
};

// Map all environment keys to LFJC data so any components requesting "root", "lfs", or "lfdc" get LFJC content
export const institutionsData = {
  root: lfjcData,
  lfs: lfjcData,
  lfjc: lfjcData,
  lfdc: lfjcData
};

export function getInstitutionData(key?: keyof typeof institutionsData) {
  return key ? (institutionsData[key] || lfjcData) : lfjcData;
}

export const institution = lfjcData;

// Campus Life represents the complete student experience at LFJC.
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Faculty", href: "/faculty" },
  { label: "Campus Life", href: "/campus" },
  { label: "Admissions", href: "/admissions" },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" }
];

export const lfjcNavItems = navItems;
export const rootNavItems = navItems;

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
    verified: true
  },
  {
    name: "Shashanka K, IAS",
    category: "Civil Servants & Judiciary",
    description: "Eminent Indian Administrative Service (IAS) officer known for spearheading multiple key rural development, healthcare, and infrastructure initiatives as District Collector.",
    designation: "IAS Officer",
    achievement: "District Collector",
    year: "Batch of 2005",
    image: "/images/alumni/shashanka-k.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Abdaal Akhtar, IAS",
    category: "Civil Servants & Judiciary",
    description: "Outstanding IAS officer who secured an elite rank in the UPSC Civil Services Examination and has since worked in several public service, land revenue, and local administration roles.",
    designation: "IAS Officer",
    achievement: "UPSC Top Ranker",
    year: "Batch of 2011",
    image: "/images/alumni/abdaal-akhtar.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Justice K. Lakshman",
    category: "Civil Servants & Judiciary",
    description: "Eminent legal expert who serves as a Judge of the High Court for the State of Telangana, previously working as the Assistant Solicitor General of India.",
    designation: "High Court Judge",
    achievement: "Former Assistant Solicitor General of India",
    year: "Batch of 1984",
    image: ""
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
    objectPosition: "object-[center_10%]"
  },
  {
    name: "Akkineni Nagarjuna",
    category: "Actors & Filmmakers",
    description: "One of the most legendary and influential superstars of Telugu cinema, known for his versatile acting, movie production, and successful television hosting.",
    designation: "Superstar & Television Presenter",
    achievement: "Padma Shri Awardee",
    year: "Batch of 1976",
    image: "/images/alumni/akkineni-nagarjuna.jpg",
    objectPosition: "object-[center_10%]"
  },
  {
    name: "Nandamuri Balakrishna",
    category: "Actors & Filmmakers",
    description: "Renowned Telugu cinema actor, politician, and philanthropist who has appeared in over 100 films, popular for his energetic and larger-than-life performances.",
    designation: "Actor & Legislator",
    achievement: "MLA & Filmfare Award Winner",
    year: "Batch of 1978",
    image: "/images/alumni/nandamuri-balakrishna.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Nara Lokesh",
    category: "Entrepreneurs & Leaders",
    description: "Prominent Indian politician serving as a Cabinet Minister in Andhra Pradesh, overseeing IT, electronics, and communication departments. Former Executive Director of Heritage Foods.",
    designation: "Cabinet Minister, Govt of Andhra Pradesh",
    achievement: "Stanford Alumnus",
    year: "Batch of 2000 (MPC)",
    image: "/images/alumni/nara-lokesh-correct.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Nagesh Kukunoor",
    category: "Actors & Filmmakers",
    description: "Renowned filmmaker, screenwriter, and actor celebrated for directing critically acclaimed parallel films like Hyderabad Blues, Iqbal, 3 Deewarein, and Dor.",
    designation: "Filmmaker & Screenwriter",
    achievement: "National Film Award Winner",
    year: "Batch of 1984",
    image: "/images/alumni/nagesh-kukunoor.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Vishwak Sen",
    category: "Actors & Filmmakers",
    description: "Dynamic actor, director, and screenwriter in contemporary Telugu cinema, known for his films Falaknuma Das, Hit: The First Case, and Gaami.",
    designation: "Actor, Director & Screenwriter",
    achievement: "Mass Ka Das & Youth Icon",
    year: "Batch of 2013",
    image: "/images/alumni/vishwak-sen.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Tarun Kumar",
    category: "Actors & Filmmakers",
    description: "Former actor and child artist in Telugu cinema who achieved major commercial success with romantic blockbusters in the early 2000s, including Nuvve Kavali.",
    designation: "Actor",
    achievement: "National Film Award Winner",
    year: "Batch of 2000",
    image: "/images/alumni/tarun-kumar.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Geetha Madhuri",
    category: "Singers & Artists",
    description: "Renowned playback singer and dubbing artist who has recorded over 500 songs in Telugu, Tamil, Kannada, and Malayalam cinema, establishing herself as a leading vocalist.",
    designation: "Playback Singer & Dubbing Artist",
    achievement: "Nandi Award & Filmfare Award Recipient",
    year: "Batch of 2006",
    image: "/images/alumni/geetha-madhuri.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Damini Bhatla",
    category: "Singers & Artists",
    description: "Popular playback singer who gained widespread recognition for her work in the epic blockbuster Baahubali and various popular television music shows.",
    designation: "Playback Singer",
    achievement: "Prominent female playback vocalist",
    year: "Batch of 2012",
    image: "/images/alumni/damini-bhatla.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Satya Yamini",
    category: "Singers & Artists",
    description: "Versatile and highly talented playback singer who has rendered many chartbuster melodies in Telugu films, including vocals for the Baahubali franchise.",
    designation: "Playback Singer",
    achievement: "Renowned Baahubali Vocalist",
    year: "Batch of 2011",
    image: "/images/alumni/satya-yamini.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Stephen Ravindra, IPS",
    category: "Civil Servants & Judiciary",
    description: "Distinguished Indian Police Service (IPS) officer of the Telangana cadre, known for his stellar tenure as Police Commissioner of Cyberabad and key roles in anti-extremist operations.",
    designation: "IPS Officer",
    achievement: "Former Police Commissioner of Cyberabad",
    year: "Batch of 1991",
    image: ""
  },
  {
    name: "T. Krishna Prasad, IPS",
    category: "Civil Servants & Judiciary",
    description: "Highly respected retired IPS officer who served in several high-profile administrative police wings and retired as Director General of Police (DGP) in Telangana.",
    designation: "Retired IPS Officer",
    achievement: "Former Director General of Police (DGP)",
    year: "Batch of 1980",
    image: ""
  },
  {
    name: "Dr. Hemanth",
    category: "Entrepreneurs & Leaders",
    description: "Highly prominent medical specialist who has made exemplary contributions to clinical research and patient care in leading healthcare networks of Hyderabad.",
    designation: "Medical Specialist",
    achievement: "Clinical & Healthcare Leader",
    year: "Batch of 1998",
    image: "/images/alumni/dr-hemanth.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "Harsha Prahlad",
    category: "Entrepreneurs & Leaders",
    description: "Innovative researcher and engineering executive working at the cutting edge of robotics and advanced physical sciences in international research hubs.",
    designation: "Robotics Engineer & Executive",
    achievement: "Leading Roboticist & Inventor",
    year: "Batch of 1995",
    image: "/images/alumni/harsha-prahlad.jpg",
    objectPosition: "object-[center_12%]"
  },
  {
    name: "K. Srinivas",
    category: "Entrepreneurs & Leaders",
    description: "Prominent senior administrator and academic advisor working with youth development programs and educational institutions.",
    designation: "Senior Educational Strategist",
    achievement: "Academic Advisor",
    year: "Batch of 1989",
    image: ""
  },
  {
    name: "Raja Reddy",
    category: "Singers & Artists",
    description: "Eminent performing artist and cultural ambassador, dedicating his work to classical dance and music traditions, earning global renown.",
    designation: "Classical Dancer & Choreographer",
    achievement: "Padma Bhushan & Padma Shri Recipient",
    year: "Batch of 1978",
    image: ""
  },
  {
    name: "Amit Sanghi",
    category: "Entrepreneurs & Leaders",
    description: "Successful business entrepreneur and industrial leader, guiding diverse corporate ventures in manufacturing, infrastructure, and commerce.",
    designation: "Industrialist & Corporate Executive",
    achievement: "President of Sanghi Industries",
    year: "Batch of 1982",
    image: "/images/alumni/amit-sanghi.jpg",
    objectPosition: "object-[center_12%]"
  }
];

export const stats = lfjcData.stats;
export const programs = lfjcData.programs;
export const faculty = lfjcData.faculty;
export const admissionsSteps = lfjcData.admissionsSteps;
export const admissionsDocuments = lfjcData.admissionsDocuments;