import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Crown,
  FileText,
  History,
  Landmark,
  ListChecks,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Trophy,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Shared navigation hierarchy — the single source of truth consumed by the
 * desktop mega-panel and the mobile accordion drawer. Every subsection maps
 * to a real, existing route so users never land on a 404.
 */

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  icon: LucideIcon;
  /** Render as an external anchor (opens in a new tab) instead of a Next Link. */
  external?: boolean;
}

export interface NavMenuItem {
  label: string;
  href: string;
  children?: NavSubItem[];
  /** Short institutional descriptor shown in the mega-panel editorial rail. */
  blurb?: string;
}

export const navMenu: NavMenuItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    blurb: "Five decades of Montfortian educational tradition.",
    children: [
      {
        label: "About LFJC",
        href: "/about",
        description: "Overview of our heritage, governance, and identity.",
        icon: Landmark,
      },
      {
        label: "Heritage & History",
        href: "/about/history",
        description: "Milestones from 1974 to the Golden Jubilee (2024).",
        icon: Clock,
      },
      {
        label: "Mission & Values",
        href: "/about/mission",
        description: "Montfortian pedagogy, core values, and the institutional crest.",
        icon: ShieldCheck,
      },
      {
        label: "Principal's Message",
        href: "/about/principal",
        description: "A welcome from our Correspondent & Principal.",
        icon: Crown,
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    blurb: "MPC, BiPC, MEC & CEC — pathways to premier careers.",
    children: [
      {
        label: "MPC Stream",
        href: "/academics/mpc",
        description: "Mathematics, Physics, Chemistry (IIT-JEE path).",
        icon: BookOpen,
      },
      {
        label: "BiPC Stream",
        href: "/academics/bipc",
        description: "Biological Sciences & Chemistry (NEET path).",
        icon: BookOpen,
      },
      {
        label: "MEC Stream",
        href: "/academics/mec",
        description: "Maths, Economics & Commerce (CA path).",
        icon: BookOpen,
      },
      {
        label: "CEC Stream",
        href: "/academics/cec",
        description: "Civics, Economics & Commerce (Law/CS path).",
        icon: BookOpen,
      },
      {
        label: "Board Toppers",
        href: "/academics/toppers",
        description: "Board distinctions & competitive rankers.",
        icon: Trophy,
      },
    ],
  },
  {
    label: "Faculty",
    href: "/faculty",
    blurb: "Mentors who shape intellect and character.",
    children: [
      {
        label: "Former Principals",
        href: "/faculty/principals",
        description: "Official portrait gallery of past leadership.",
        icon: Award,
      },
      {
        label: "Teaching & Support Staff",
        href: "/faculty/teaching",
        description: "Department heads & active subject faculty.",
        icon: Users,
      },
      {
        label: "Retired Faculty",
        href: "/faculty/retired",
        description: "Honoring emeritus educators who built our legacy.",
        icon: History,
      },
    ],
  },
  {
    label: "Campus Life",
    href: "/campus",
    blurb: "An eight-acre living heritage of academics, sports, and culture.",
  },
  {
    label: "Admissions",
    href: "/admissions",
    blurb: "A clear pathway for prospective families.",
    children: [
      {
        label: "The Admissions Journey",
        href: "/admissions#admission-roadmap",
        description: "Four steps to intermediate enrollment.",
        icon: ListChecks,
      },
      {
        label: "Standards & Eligibility",
        href: "/admissions#eligibility",
        description: "Board prerequisites & stream criteria.",
        icon: CheckCircle2,
      },
      {
        label: "Application & Guidance",
        href: "/admissions#admissions-form",
        description: "Direct inquiry desk & counseling.",
        icon: FileText,
      },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni",
    blurb: "A global network of 15,000+ graduates.",
    children: [
      {
        label: "Distinguished Alumni",
        href: "/alumni",
        description: "Roll of honor & featured success journeys.",
        icon: Award,
      },
      {
        label: "Global Network",
        href: "/alumni#network",
        description: "15,000+ global alumni association.",
        icon: Network,
      },
      {
        label: "Alumni Registry",
        href: "/alumni#register",
        description: "Join the Golden Jubilee association.",
        icon: UserPlus,
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    blurb: "Uppal, Hyderabad — 500039.",
    children: [
      {
        label: "Institutional Desk",
        href: "/contact",
        description: "Telephone helpline, email & desk hours.",
        icon: Phone,
      },
      {
        label: "Campus Location",
        href: "/contact#location",
        description: "Uppal address, directions & campus map.",
        icon: MapPin,
      },
    ],
  },
];