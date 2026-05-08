"use client";

import { useCallback, useRef, useState } from "react";
import {
  Menu,
  Search,
  ChartNoAxesColumnIncreasing,
  MapPin,
  Building2,
  BookOpenText,
  Scale,
} from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import Sidebar from "./Sidebar";

const navItems = [
  { icon: ChartNoAxesColumnIncreasing, label: "Market" },
  { icon: MapPin, label: "Areas" },
  { icon: Building2, label: "Developers" },
  { icon: BookOpenText, label: "Guides" },
  { icon: Scale, label: "Compare" },
];

export default function Navbar({ onOpenAi }: { onOpenAi: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const toggleSearch = useCallback(() => setSearchOpen((prev) => !prev), []);
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navbarHeight = headerRef.current?.offsetHeight ?? 100;

  return (
    <>
      <header
        ref={headerRef}
        className="navbar-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        {/* Top row */}
        <div
          className="navbar-top-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            height: "56px",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="navbar-left-section" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              aria-label="Open menu"
              onClick={toggleMenu}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", color: "#1a1a1a" }}
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            <div className="logo-container" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/offplan-logo.png"
                alt="Offplan logo"
                style={{ height: "26px", width: "auto", display: "block" }}
              />
            </div>

          </div>

          {/* Desktop Nav Items (Centered) */}
          <div className="navbar-center-section">
            <nav className="desktop-nav-menu">
              {navItems.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="nav-item-desktop"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="navbar-right-section" style={{ display: "flex", alignItems: "center" }}>
            <button
              aria-label="Open search"
              onClick={toggleSearch}
              className="mobile-search-btn"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", color: "#1a1a1a" }}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>
            <button
              aria-label="Open search"
              onClick={toggleSearch}
              className="desktop-search-btn"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "none", alignItems: "center", color: "#1a1a1a" }}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Icon nav row (Mobile only) */}
        <nav
          className="mobile-nav-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "6px 8px 10px",
          }}
        >
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                color: "#4a4a4a",
                flex: 1,
              }}
            >
              <Icon size={20} strokeWidth={1.6} />
              <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1 }}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </header>

      <Sidebar isOpen={menuOpen} onClose={closeMenu} onOpenAi={onOpenAi} />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={closeSearch}
        navbarHeight={navbarHeight}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}
