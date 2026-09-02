import {
  Award,
  Building2,
  Compass,
  History,
  Landmark,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Shared navigation hierarchy. Only Faculty and Campus Life have dropdowns.
 * Every subsection maps to an anchor on its single page.
 */

export interface NavSubItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavMenuItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export const navMenu: NavMenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  {
    label: "Faculty",
    href: "/faculty",
    children: [
      { label: "Former Principals", href: "/faculty/principals", icon: Award },
      { label: "Teaching & Support Staff", href: "/faculty/teaching", icon: Users },
      { label: "Retired Faculty", href: "/faculty/retired", icon: History },
    ],
  },
  {
    label: "Campus Life",
    href: "/campus",
    children: [
      { label: "Silver Jubilee", href: "/campus#silver-jubilee", icon: Landmark },
      { label: "Golden Jubilee", href: "/campus#golden-jubilee", icon: Sparkles },
      { label: "Campus & Labs", href: "/campus#campus", icon: Building2 },
      { label: "Events & Sports", href: "/campus#events", icon: Compass },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" },
];
