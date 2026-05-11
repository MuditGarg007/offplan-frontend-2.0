"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  Search,
  ChartNoAxesColumnIncreasing,
  MapPin,
  Building2,
  BookOpenText,
  Scale,
  Home,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ChartNoAxesColumnIncreasing, label: "Market", path: "/market" },
  { icon: MapPin, label: "Areas", path: "/areas" },
  { icon: Building2, label: "Developers", path: "/developers" },
  { icon: BookOpenText, label: "Guides", path: "/guides" },
  { icon: Scale, label: "Compare", path: "/compare" },
];

export default function Navbar({ onOpenAi }: { onOpenAi: () => void }) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const handleSearchClick = useCallback(() => {
    router.push("/search");
  }, [router]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);
  const headerRef = useRef<HTMLElement>(null);
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
            <div className="mobile-auth-btns">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="mobile-logout-btn"
                  style={{ color: "#000" }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="mobile-login-btn">Login</Link>
                  <Link href="/signup" className="mobile-signup-btn">SignUp</Link>
                </>
              )}
            </div>
            <Link href="/" className="logo-container" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/offplan-logo.png"
                alt="Offplan logo"
                style={{ height: "26px", width: "auto", display: "block" }}
              />
            </Link>

          </div>

          {/* Desktop Nav Items (Centered) */}
          <div className="navbar-center-section">
            <nav className="desktop-nav-menu">
              {navItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className="nav-item-desktop"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                </Link>
              ))}
              <button
                onClick={handleSearchClick}
                className="nav-item-desktop"
              >
                <Search size={18} strokeWidth={1.8} />
                <span>Search</span>
              </button>
            </nav>
          </div>

          <div className="navbar-right-section" style={{ display: "flex", alignItems: "center" }}>
            <div className="desktop-auth-btns">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{ color: "#000" }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="login-btn">Login</Link>
                  <Link href="/signup" className="signup-btn">SignUp</Link>
                </>
              )}
            </div>
            <button
              aria-label="Open search"
              onClick={handleSearchClick}
              className="mobile-search-btn"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", color: "#1a1a1a" }}
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
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              href={path}
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
                textDecoration: "none"
              }}
            >
              <Icon size={20} strokeWidth={1.6} />
              <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1 }}>
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </header>

      {/* SearchOverlay removed in favor of /search page */}
    </>
  );
}
