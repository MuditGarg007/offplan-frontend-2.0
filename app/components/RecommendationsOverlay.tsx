"use client";

import { X, Check, ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { API_BASE } from "@/lib/api/config";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { E164Number } from "libphonenumber-js/core";

interface RecommendationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  required?: boolean;
}

interface CountrySelectOption {
  value: string | undefined;
  label: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (val: string) => void;
  options: CountrySelectOption[];
  iconComponent: React.ComponentType<{ country: string; label: string }>;
}

function CountrySelect({ value, onChange, options, iconComponent: Icon }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 10px",
          background: "#F9FAFB",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          outline: "none",
          height: "100%",
        }}
      >
        {value && <Icon country={value} label={selected?.label ?? ""} />}
        <ChevronDown size={13} color="#6B7280" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            width: "220px",
            maxHeight: "240px",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08)",
            border: "1px solid #F3F4F6",
            zIndex: 400,
            padding: "4px",
          }}
        >
          {options.filter((o) => o.value).map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value!);
                setIsOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: value === opt.value ? "#FDFBF7" : "transparent",
                color: value === opt.value ? "#C9A84C" : "#1a1a1a",
                fontWeight: value === opt.value ? 600 : 500,
                fontSize: "13px",
              }}
              onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "#F9FAFB"; }}
              onMouseLeave={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Icon country={opt.value!} label={opt.label} />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opt.label}</span>
              {value === opt.value && <Check size={13} color="#C9A84C" strokeWidth={3} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
          type="button"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1.5px solid #E5E7EB",
            backgroundColor: "#ffffff",
            fontSize: "15px",
            color: value ? "#1a1a1a" : "#9CA3AF",
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
          <span style={{ fontWeight: 500 }}>{value || `Select ${label}`}</span>
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

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1.5px solid #E5E7EB",
  backgroundColor: "#ffffff",
  fontSize: "15px",
  color: "#1a1a1a",
  outline: "none",
  fontWeight: 500,
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
};

export default function RecommendationsOverlay({ isOpen, onClose }: RecommendationsOverlayProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [preferredArea, setPreferredArea] = useState("");
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const features = [
    "This helps us suggest the right projects for your investment goals.",
    "Takes 30 seconds",
    "No spam. Founder will follow up.",
  ];

  async function handleSubmit() {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const payload: Record<string, unknown> = {
        name,
        email,
        source: "website_chatbot",
        source_video_id: null,
        whatsapp_opted_in: !!phone,
      };
      if (phone) payload.phone_number = phone;
      if (budget) payload.budget_range = budget;
      if (timeline) payload.investment_timeline = timeline;
      if (preferredArea) payload.preferred_area = preferredArea;
      if (goal) payload.investment_goal = goal;

      const res = await fetch(`${API_BASE}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setSubmitError(data?.detail?.[0]?.msg ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmit = name.trim() && email.trim() && !isLoading;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="recs-overlay-backdrop"
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
        className="recs-overlay-panel"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "min(100%, 20vw)",
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
            flexShrink: 0,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a1a1a",
              position: "relative",
              zIndex: 10,
            }}
          >
            <X size={24} strokeWidth={2} />
          </button>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 0 8px" }}>
            Personalized Recommendations
          </h2>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", height: "100%", textAlign: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#FDFBF7",
                  border: "2px solid #C9A84C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={32} color="#C9A84C" strokeWidth={2.5} />
              </div>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
                You&apos;re all set!
              </h1>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
                We&apos;ll curate personalized project recommendations and reach out to you shortly.
              </p>
              <button
                onClick={onClose}
                type="button"
                style={{
                  marginTop: "16px",
                  padding: "14px 32px",
                  backgroundColor: "#C9A84C",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
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
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    style={inputStyle}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    style={inputStyle}
                  />
                </div>

                {/* WhatsApp Number */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>WhatsApp Number</label>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    value={phone}
                    onChange={setPhone}
                    className="recs-phone-input"
                    countrySelectComponent={CountrySelect}
                  />
                </div>

                <CustomDropdown
                  label="Budget Range (AED)"
                  value={budget}
                  options={["1M-2M AED", "2M-3M AED", "3M-5M AED", "5M+ AED"]}
                  onChange={setBudget}
                />

                <CustomDropdown
                  label="Investment Timeline"
                  value={timeline}
                  options={["3 months", "6 months", "12 months", "2+ years"]}
                  onChange={setTimeline}
                />

                {/* Preferred Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>Preferred Area</label>
                  <input
                    type="text"
                    value={preferredArea}
                    onChange={(e) => setPreferredArea(e.target.value)}
                    placeholder="e.g. Dubai Hills, Downtown"
                    style={inputStyle}
                  />
                </div>

                <CustomDropdown
                  label="Investment Goal"
                  value={goal}
                  options={["Long-term rental appreciation", "Capital growth", "Secondary home", "High ROI"]}
                  onChange={setGoal}
                />

                {submitError && (
                  <p style={{ fontSize: "13px", color: "#DC2626", margin: 0, padding: "10px 14px", backgroundColor: "#FEF2F2", borderRadius: "8px" }}>
                    {submitError}
                  </p>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={!canSubmit}
                    style={{
                      padding: "16px",
                      backgroundColor: canSubmit ? "#C9A84C" : "#E5E7EB",
                      color: canSubmit ? "#ffffff" : "#9CA3AF",
                      border: "none",
                      borderRadius: "14px",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      transition: "transform 0.1s, opacity 0.2s",
                      boxShadow: canSubmit ? "0 4px 12px rgba(201, 168, 76, 0.2)" : "none",
                      width: "100%",
                    }}
                  >
                    {isLoading ? "Submitting..." : "Get Recommendations"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1a1a1a",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      padding: "12px",
                      textAlign: "center",
                      width: "100%",
                      opacity: 0.7,
                      display: "block",
                      margin: "0 auto",
                    }}
                  >
                    Not now
                  </button>
                </div>
              </div>
              <div style={{ height: "40px" }} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
