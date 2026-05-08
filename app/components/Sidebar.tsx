"use client";

import {
  X,
  ChartNoAxesColumnIncreasing,
  MapPin,
  Building2,
  BookOpenText,
  Scale,
  ChevronRight,
  CircleDot,
  Sparkle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAi: () => void;
}

const menuItems = [
  { icon: ChartNoAxesColumnIncreasing, label: "Market" },
  { icon: MapPin, label: "Areas" },
  { icon: Building2, label: "Developers" },
  { icon: BookOpenText, label: "Guides" },
  { icon: Scale, label: "Compare" },
  { icon: CircleDot, label: "About Offplan" },
];

export default function Sidebar({ isOpen, onClose, onOpenAi }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpenAiClick = () => {
    onClose();
    // Small delay to let sidebar start closing before overlay appears
    setTimeout(() => {
      onOpenAi();
    }, 100);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s",
        }}
      />

      {/* Sidebar Menu */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "85%",
          height: "100%",
          backgroundColor: "#ffffff",
          zIndex: 101,
          boxShadow: "20px 0 50px rgba(0, 0, 0, 0.1)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          borderTopRightRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        <div style={{ flex: 1, padding: "0 0 40px", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0 24px", marginTop: "10px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "20px" }}>
              Menu
            </h2>
          </div>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {menuItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  width: "100%",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#1a1a1a",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Icon size={22} strokeWidth={1.5} color="#4a4a4a" />
                  <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {label}
                  </span>
                </div>
                <ChevronRight size={18} strokeWidth={1.5} color="#cccccc" />
              </button>
            ))}
          </nav>

          <div style={{ padding: "24px", marginTop: "auto" }}>
            <div
              style={{
                backgroundColor: "#fefce8",
                padding: "24px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "1px solid #fef3c7",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
                  Continue your research with AI
                </h3>
                <p style={{ fontSize: "14px", color: "#4a4a4a", lineHeight: 1.4, fontWeight: 500 }}>
                  Ask anything about Dubai real estate.
                </p>
              </div>
              
              <button
                onClick={handleOpenAiClick}
                style={{
                  backgroundColor: "#ffffff",
                  border: "none",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  fontSize: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <Sparkle size={18} color="#d4af37" fill="#d4af37" strokeWidth={2.5} />
                Open AI Assistant
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "32px 24px", borderTop: "1px solid #f0f0f0" }}>
          <img
            src="/offplan-logo.png"
            alt="Offplan logo"
            style={{ height: "24px", width: "auto", opacity: 0.5 }}
          />
        </div>
      </aside>
    </>
  );
}
