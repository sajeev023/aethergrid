"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Mail, Menu, Phone, X, Search, ChevronRight, ChevronDown, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { getInstitutionData } from "@/lib/site-data";
import { navMenu, type NavMenuItem, type NavSubItem } from "@/lib/nav-menu";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface NavbarProps {
  activeInst?: "root" | "lfs" | "lfjc" | "lfdc";
}

export function Navbar({ activeInst = "lfjc" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});
  const pathname = usePathname() || "";

  const instData = getInstitutionData(activeInst);

  const drawerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, drawerRef);
  useFocusTrap(isSearchOpen, searchRef);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const prefersReducedMotion = useReducedMotion();

  const activeItem: NavMenuItem | null = openMenu
    ? navMenu.find((item) => item.label === openMenu) ?? null
    : null;

const searchableItems = [
  { title: "Admissions Desk", href: "/admissions", category: "Portal" },
  { title: "About LFJC", href: "/about", category: "Legacy" },
  { title: "Academic Streams", href: "/academics", category: "Academics" },
  { title: "Faculty Directory", href: "/faculty", category: "Faculty" },
  { title: "Campus Life", href: "/campus", category: "Campus" },
  { title: "Alumni Network", href: "/alumni", category: "Network" },
  { title: "Contact Office", href: "/contact", category: "Office" },
];

  const searchResults = searchQuery
    ? searchableItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const openMenuFn = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isTopActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const handleMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    if (items.length === 0) return;
    const currentIndex = items.findIndex((el) => el === document.activeElement);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[currentIndex === -1 ? 0 : (currentIndex + 1) % items.length].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length].focus();
        break;
      case "Home":
        e.preventDefault();
        items[0].focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1].focus();
        break;
    }
  };

  const openMenuOnArrow = (e: ReactKeyboardEvent<HTMLAnchorElement>, label: string) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    openMenuFn(label);
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    });
  };

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
      setOpenMenu(null);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const label = openMenu;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        triggerRefs.current[label]?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isSearchOpen]);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) setExpandedMobile({});
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* ─── Top Utility Bar ───────────────────────────────────────────── */}
      <div className="relative z-30 bg-deep-navy text-royal-cream/75 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center divide-x divide-white/10">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 first:pl-0 py-1.5 sm:py-2 text-heritage-gold-bright">
              Est. {instData.established}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2">
              Montfortian Heritage
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2">
              Brothers of St. Gabriel Educational Society
            </span>
          </div>
          <div className="flex items-center divide-x divide-white/10">
            <Link
              href="/parent-login"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 hover:text-white transition-colors"
            >
              Parent Portal
            </Link>
            <a
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 first:pl-0 py-1.5 sm:py-2 hover:text-white transition-colors"
              href={`tel:${instData.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${instData.name}`}
            >
              <Phone className="h-3 w-3 text-heritage-gold-bright" aria-hidden="true" />
              <span className="hidden md:inline">{instData.phone}</span>
            </a>
            <a
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 hover:text-white transition-colors"
              href={`mailto:${instData.email}`}
              aria-label={`Email ${instData.name}`}
            >
              <Mail className="h-3 w-3 text-heritage-gold-bright" aria-hidden="true" />
              <span className="hidden md:inline">{instData.email}</span>
            </a>
            <button
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 last:pr-0 py-1.5 sm:py-2 hover:text-white transition-colors cursor-pointer"
              aria-label="Search site"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-3.5 w-3.5 text-heritage-gold-bright" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,box-shadow,height] duration-300 border-b border-stone-texture/15",
          isScrolled
            ? "bg-white/97 backdrop-blur-lg shadow-[0_2px_20px_rgba(10,26,47,0.06)]"
            : "bg-white/95 backdrop-blur-sm",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10 transition-[height] duration-300",
            isScrolled ? "h-[60px] sm:h-[68px]" : "h-[68px] sm:h-[76px]",
          )}
          aria-label="Primary navigation"
        >
          {/* ─── Brand ──────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-montfortian-blue shrink-0 py-1"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={cn(
                "relative rounded-full border border-heritage-gold/30 overflow-hidden bg-white p-0.5 shrink-0 group-hover:border-heritage-gold/70 transition-all duration-300 shadow-xs group-hover:shadow-md",
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" : "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12",
              )}
            >
              <Image
                src="/images/lfjc-logo.jpg"
                alt="LFJC Official Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif font-bold leading-tight text-montfortian-blue text-base sm:text-lg md:text-xl xl:text-[22px] transition-colors duration-300 group-hover:text-montfortian-blue/90 whitespace-nowrap">
                Little Flower
              </span>
              <span className="font-sans font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-heritage-gold-strong text-[9px] sm:text-[10px] xl:text-[10.5px] leading-tight mt-0.5 transition-colors duration-300 whitespace-nowrap">
                Junior College
              </span>
            </div>
          </Link>

          {/* ─── Desktop Navigation with Mega-Panels ─────────────────────── */}
          <div className="hidden items-center lg:gap-x-2 xl:gap-x-3.5 2xl:gap-x-5 lg:flex">
            {navMenu.map((item) => {
              const hasChildren = !!item.children?.length;
              const isActive = isTopActive(item.href);
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && openMenuFn(item.label)}
                  onMouseLeave={() => hasChildren && scheduleClose()}
                >
                  <Link
                    href={item.href}
                    ref={(node) => {
                      triggerRefs.current[item.label] = node;
                    }}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    aria-controls={hasChildren && isOpen ? "mega-panel" : undefined}
                    onFocus={() => hasChildren && openMenuFn(item.label)}
                    onKeyDown={(e) => hasChildren && openMenuOnArrow(e, item.label)}
                    onClick={() => setOpenMenu(null)}
                    className={cn(
                      "premium-focus relative inline-flex items-center gap-1 shrink-0 whitespace-nowrap px-1.5 py-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] xl:tracking-[0.14em] transition-colors group font-sans",
                      isActive
                        ? "text-montfortian-blue"
                        : "text-academic-slate/70 hover:text-montfortian-blue",
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1.5 h-[1.5px] bg-heritage-gold transition-all duration-300 ease-out group-hover:w-[calc(100%-0.75rem)]",
                        isActive ? "w-[calc(100%-0.75rem)]" : "w-0",
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* ─── Desktop CTA Actions ────────────────────────────────────── */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild size="sm" className="h-9 px-4 xl:px-5 rounded-sm text-[10px] xl:text-[11px] font-bold tracking-wider uppercase shrink-0 shadow-xs">
              <Link href="/admissions">Admissions 2026–27</Link>
            </Button>
          </div>

          {/* ─── Mobile Menu Button ──────────────────────────────────────── */}
          <button
            type="button"
            className="premium-focus grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-sm border border-stone-texture/40 text-montfortian-blue transition-colors hover:bg-surface-container-low lg:hidden cursor-pointer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* ─── Desktop Mega-Panel ──────────────────────────────────────── */}
        <AnimatePresence>
          {activeItem?.children && (
            <motion.div
              id="mega-panel"
              key={activeItem.label}
              role="menu"
              aria-label={`${activeItem.label} directory`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full z-40 hidden xl:block"
              onMouseEnter={() => openMenuFn(activeItem.label)}
              onMouseLeave={scheduleClose}
              onKeyDown={handleMenuKeyDown}
              onBlur={(e) => {
                if (!panelRef.current?.contains(e.relatedTarget as Node | null)) {
                  scheduleClose();
                }
              }}
              ref={panelRef}
            >
              <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10 pt-2">
                <div className="mx-auto w-[min(90vw,380px)] overflow-hidden rounded-xl border border-stone-texture/30 bg-white shadow-float">
                  <MegaPanelContent item={activeItem} onNavigate={() => setOpenMenu(null)} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── MOBILE NAVIGATION OVERLAYS ─────────────────────────────────── */}

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeDrawer}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-deep-navy/50 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: -380, right: 0 }}
            dragElastic={{ left: 0.35, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -120 || info.velocity.x < -600) closeDrawer();
            }}
            className="fixed top-0 left-0 z-50 flex h-[100dvh] w-[88%] max-w-[380px] flex-col bg-white rounded-r-2xl border-r border-stone-texture/25 shadow-float xl:hidden"
          >
            {/* Drawer Header */}
            <div className="flex shrink-0 items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 border-b border-stone-texture/25">
              <Link
                href="/"
                onClick={closeDrawer}
                className="flex items-center gap-2.5 sm:gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-montfortian-blue"
              >
                <div className="rounded-full border border-heritage-gold/25 overflow-hidden bg-white p-0.5 w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
                  <Image
                    src="/images/lfjc-logo.jpg"
                    alt="LFJC Official Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold leading-none text-montfortian-blue text-[15px] sm:text-base">
                    Little Flower
                  </span>
                  <span className="font-sans font-bold uppercase tracking-[0.16em] text-heritage-gold-strong text-[9px] sm:text-[10px] mt-1">
                    Junior College
                  </span>
                </div>
              </Link>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-texture/30 text-academic-slate hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-3.5 py-3 sm:px-5 sm:py-4 scrollbar-none">
              {/* Admissions Quick Access */}
              <Link
                href="/admissions"
                onClick={closeDrawer}
                className="mb-3 block rounded-xl border border-heritage-gold/30 bg-royal-cream p-3 sm:p-4 hover:border-heritage-gold/60 transition-colors group"
              >
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-heritage-gold-strong font-sans">
                  Admissions 2026-27
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-academic-slate/80 font-sans">
                  Intermediate programs in MPC, BiPC, MEC, and CEC are open.
                </p>
              </Link>

              {/* Navigation Links — Accordion */}
              <nav aria-label="Mobile" className="flex flex-col gap-0.5">
                {navMenu.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const isActive = isTopActive(item.href);

                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex min-h-[42px] items-center justify-between rounded-md px-3.5 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors font-sans",
                          isActive
                            ? "bg-royal-cream text-montfortian-blue border-l-[3px] border-heritage-gold-strong"
                            : "text-academic-slate hover:bg-surface-container-low hover:text-montfortian-blue",
                        )}
                        onClick={closeDrawer}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const expanded = !!expandedMobile[item.label];
                  const subId = `mobile-sub-${item.label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center gap-1">
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex min-h-[42px] flex-1 items-center rounded-md px-3.5 py-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors font-sans",
                            isActive
                              ? "text-montfortian-blue font-bold"
                              : "text-academic-slate hover:text-montfortian-blue",
                          )}
                          onClick={closeDrawer}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={subId}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} sections`}
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-academic-slate/70 hover:bg-surface-container-low hover:text-montfortian-blue transition-colors cursor-pointer"
                          onClick={() =>
                            setExpandedMobile((prev) => ({ ...prev, [item.label]: !prev[item.label] }))
                          }
                        >
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key="sub"
                            id={subId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 flex flex-col border-l border-stone-texture/30 pl-1 pb-1.5 pt-0.5">
                              {item.children!.map((child) => (
                                <MobileChildLink
                                  key={`${child.href}-${child.label}`}
                                  child={child}
                                  onSelect={closeDrawer}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="shrink-0 px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5 border-t border-stone-texture/25 bg-royal-cream/40">
              <Button asChild size="default" className="w-full h-11 text-xs font-bold uppercase tracking-wider">
                <Link href="/admissions" onClick={closeDrawer}>
                  Begin Admissions Inquiry
                </Link>
              </Button>
              <Link
                href="/parent-login"
                onClick={closeDrawer}
                className="mt-2 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-sm border border-montfortian-blue/30 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-montfortian-blue transition-colors hover:bg-montfortian-blue hover:text-white font-sans"
              >
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Parent Portal
              </Link>
              <div className="mt-3 flex flex-col gap-1.5">
                <a
                  href={`tel:${instData.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-academic-slate/80 hover:text-montfortian-blue transition-colors font-sans py-0.5"
                >
                  <Phone className="h-3.5 w-3.5 text-heritage-gold-strong" aria-hidden="true" />
                  {instData.phone}
                </a>
                <a
                  href={`mailto:${instData.email}`}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-academic-slate/80 hover:text-montfortian-blue transition-colors font-sans py-0.5"
                >
                  <Mail className="h-3.5 w-3.5 text-heritage-gold-strong" aria-hidden="true" />
                  {instData.email}
                </a>
                <p className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-widest text-academic-slate/60 font-sans">
                  {instData.addressLine}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SEARCH OVERLAY ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            ref={searchRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onKeyDown={(e) => { if (e.key === "Escape") setIsSearchOpen(false); }}
          >
            <div className="min-h-screen px-4 text-center" role="presentation">
              <div
                className="fixed inset-0 bg-deep-navy/60 backdrop-blur-md"
                onClick={() => setIsSearchOpen(false)}
                aria-hidden="true"
              />
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block w-full max-w-2xl p-4 sm:p-6 my-4 sm:my-8 overflow-hidden text-left align-middle bg-white shadow-2xl border border-stone-texture/60 rounded-xl relative z-10">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-texture/30">
                  <div className="flex items-center gap-2 sm:gap-2.5 text-montfortian-blue">
                    <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-heritage-gold-strong" />
                    <span className="font-serif font-bold text-base sm:text-lg text-academic-slate">Institutional Search</span>
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-stone-texture/30 hover:bg-royal-cream text-academic-slate transition-colors cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3.5 sm:mt-4 relative">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type to search admissions, streams, campus..."
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-royal-cream/30 border border-stone-texture/50 rounded-lg text-base sm:text-sm text-academic-slate placeholder-academic-slate/35 focus:outline-none focus:border-heritage-gold/70 focus:ring-2 focus:ring-heritage-gold/10 transition-all font-sans"
                  />
                  <Search className="absolute left-3.5 sm:left-4 top-3 sm:top-3.5 h-4 w-4 text-academic-slate/35" />
                </div>
                <div className="mt-6">
                  {searchQuery ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-3 font-sans">
                        Search Results ({searchResults.length})
                      </p>
                      {searchResults.length > 0 ? (
                        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                          {searchResults.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="block p-3 rounded-lg border border-stone-texture/15 bg-royal-cream/10 hover:border-heritage-gold/40 hover:bg-royal-cream/25 transition-all group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-serif text-sm font-semibold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-royal-cream text-heritage-gold-strong border border-stone-texture/30 font-sans">
                                  {item.category}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-xs text-academic-slate/70 font-sans">
                            No results found for &quot;{searchQuery}&quot;. Try checking spelling.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-heritage-gold-strong mb-3 font-sans">
                        Popular Search Targets
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {searchableItems.slice(0, 6).map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => {
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-3 rounded-lg border border-stone-texture/25 bg-white hover:border-heritage-gold/40 hover:bg-royal-cream/15 transition-all group"
                          >
                            <div className="flex flex-col">
                              <span className="font-serif text-xs font-semibold text-academic-slate group-hover:text-montfortian-blue transition-colors">
                                {item.title}
                              </span>
                              <span className="text-[8px] font-bold uppercase tracking-wider text-academic-slate/35 mt-0.5 font-sans">
                                {item.category}
                              </span>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-academic-slate/25 group-hover:text-montfortian-blue transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-3 border-t border-stone-texture/30 flex justify-between items-center text-[9px] text-academic-slate/35 font-sans">
                  <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-royal-cream border border-stone-texture/60 rounded font-mono font-bold text-[8px] uppercase">ESC</kbd> to close</span>
                  <span>Press <kbd className="px-1.5 py-0.5 bg-royal-cream border border-stone-texture/60 rounded font-mono font-bold text-[8px] uppercase">Ctrl + K</kbd> to search</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Mega-Panel Content ──────────────────────────────────────────────── */
function MegaPanelContent({ item, onNavigate }: { item: NavMenuItem; onNavigate: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-stone-texture/20 px-4 py-2.5 bg-royal-cream/30">
        <div className="flex items-center gap-2">
          <span className="h-3 w-[3px] rounded-full bg-heritage-gold-strong" aria-hidden="true" />
          <span className="font-serif text-sm font-bold leading-none text-montfortian-blue">
            {item.label}
          </span>
        </div>
        <Link
          href={item.href}
          onClick={onNavigate}
          role="menuitem"
          className="premium-focus group inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-heritage-gold-strong hover:text-montfortian-blue transition-colors duration-200"
        >
          Explore Page
          <ChevronRight
            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-0.5 p-2">
        {item.children!.map((child) => (
          <MegaLink key={`${child.href}-${child.label}`} child={child} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function MegaLink({ child, onNavigate }: { child: NavSubItem; onNavigate: () => void }) {
  const Icon = child.icon;
  const className =
    "group flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors duration-200 hover:bg-royal-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-montfortian-blue/40 focus-visible:ring-offset-1 focus-visible:ring-offset-white";
  const content = (
    <>
      <Icon
        className="h-4 w-4 shrink-0 text-montfortian-blue/60 transition-colors duration-200 group-hover:text-heritage-gold-strong"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-sans text-[13px] font-bold leading-tight text-academic-slate transition-colors duration-200 group-hover:text-montfortian-blue">
          {child.label}
        </span>
      </span>
    </>
  );

  return (
    <Link href={child.href} role="menuitem" className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function MobileChildLink({ child, onSelect }: { child: NavSubItem; onSelect: () => void }) {
  const Icon = child.icon;
  const className =
    "flex min-h-[44px] items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium font-sans text-academic-slate/80 hover:bg-royal-cream/50 hover:text-montfortian-blue transition-colors";

  return (
    <Link href={child.href} className={className} onClick={onSelect}>
      <Icon className="h-3.5 w-3.5 shrink-0 text-heritage-gold-strong" aria-hidden="true" />
      {child.label}
    </Link>
  );
}
