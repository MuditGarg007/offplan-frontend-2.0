"use client";

import { X, Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface RecommendationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  { code: "+971", label: "UAE" },
  { code: "+91", label: "IND" },
  { code: "+44", label: "UK" },
  { code: "+1", label: "USA" },
  { code: "+966", label: "KSA" },
];

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  required?: boolean;
}

function CustomDropdown({ label, value, options, onChange, required }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }} ref={dropdownRef}>
      <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>
        {label} {required && "*"}
      </label>
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1.5px solid #E5E7EB",
            backgroundColor: "#ffffff",
            fontSize: "15px",
            color: "#1a1a1a",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s",
            borderColor: isOpen ? "#1a1a1a" : "#E5E7EB",
          }}
        >
          <span style={{ fontWeight: 500 }}>{value}</span>
          <ChevronDown
            size={18}
            style={{
              color: "#6B7280",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #F3F4F6",
              zIndex: 350,
              overflow: "hidden",
              padding: "4px",
            }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  padding: "10px 12px",
                  fontSize: "14px",
                  color: value === opt ? "#C9A84C" : "#1a1a1a",
                  fontWeight: value === opt ? 600 : 500,
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: value === opt ? "#FDFBF7" : "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = value === opt ? "#FDFBF7" : "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = value === opt ? "#FDFBF7" : "transparent")}
              >
                {opt}
                {value === opt && <Check size={16} color="#C9A84C" strokeWidth={3} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecommendationsOverlay({ isOpen, onClose }: RecommendationsOverlayProps) {
  const [iam, setIam] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+971");
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);

  const features = [
    "This helps us suggest the right projects for your investment goals.",
    "Takes 30 seconds",
    "No spam. Founder will follow up.",
  ];

  const countryRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryCodeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 300,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Slide-in Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "100vw",
          backgroundColor: "#ffffff",
          zIndex: 301,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a1a1a",
            }}
          >
            <X size={24} strokeWidth={2} />
          </button>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 0 8px" }}>
            Personalized Recommendations
          </h2>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "24px", overflow: "hidden" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#1a1a1a",
              lineHeight: 1.4,
              marginBottom: "24px",
            }}
          >
            Get AI-curated project recommendations based on your goals.
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ marginTop: "2px" }}>
                  <Check size={18} strokeWidth={2.5} color="#C9A84C" />
                </div>
                <p style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <CustomDropdown
              label="I am a"
              required
              value={iam}
              options={["Investor", "End-user", "Agent"]}
              onChange={setIam}
            />

            <CustomDropdown
              label="Investment Goal"
              required
              value={goal}
              options={["Long-term rental appreciation", "Capital growth", "Secondary home", "High ROI"]}
              onChange={setGoal}
            />

            <CustomDropdown
              label="Budget Range (AED)"
              required
              value={budget}
              options={["1M – 2M", "2M – 3M", "3M – 5M", "5M+"]}
              onChange={setBudget}
            />

            {/* WhatsApp Number */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>WhatsApp Number *</label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "4px",
                  borderRadius: "10px",
                  border: "1.5px solid #E5E7EB",
                  position: "relative",
                }}
              >
                <div ref={countryRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                    style={{
                      padding: "10px 14px",
                      backgroundColor: "#F9FAFB",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "15px",
                      color: "#1a1a1a",
                      outline: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    {countryCode}
                    <ChevronDown size={14} />
                  </button>

                  {isCountryCodeOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #F3F4F6",
                        zIndex: 360,
                        padding: "4px",
                        minWidth: "80px",
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setCountryCode(c.code);
                            setIsCountryCodeOpen(false);
                          }}
                          style={{
                            padding: "8px 12px",
                            fontSize: "14px",
                            color: countryCode === c.code ? "#C9A84C" : "#1a1a1a",
                            fontWeight: 600,
                            cursor: "pointer",
                            borderRadius: "6px",
                            backgroundColor: countryCode === c.code ? "#FDFBF7" : "transparent",
                          }}
                        >
                          {c.code}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="50 123 4567"
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "15px",
                    color: "#1a1a1a",
                    outline: "none",
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              <button
                onClick={() => {
                  /* Handle submission */
                  onClose();
                }}
                style={{
                  padding: "16px",
                  backgroundColor: "#C9A84C",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "transform 0.1s, opacity 0.2s",
                  boxShadow: "0 4px 12px rgba(201, 168, 76, 0.2)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.98)";
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Get Recommendations
              </button>

              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1a1a1a",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "8px",
                  textAlign: "center",
                  width: "100%",
                  opacity: 0.7,
                }}
              >
                Not now
              </button>
            </div>
          </div>
          <div style={{ height: "40px" }} />
        </div>
      </div>
    </>
  );
}
