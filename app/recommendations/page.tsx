"use client";

import { Check, ChevronDown, ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api/config";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { E164Number } from "libphonenumber-js/core";
import Link from "next/link";

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

export default function RecommendationsPage() {
  const router = useRouter();
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
    <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            color: "#1a1a1a",
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 0 12px" }}>
          Personalized Recommendations
        </h1>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 20px" }}>
        {submitted ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#FDFBF7",
                border: "2px solid #C9A84C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={40} color="#C9A84C" strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>
                You&apos;re all set!
              </h2>
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6 }}>
                We&apos;ll curate personalized project recommendations and reach out to you shortly.
              </p>
            </div>
            <Link
              href="/"
              style={{
                marginTop: "16px",
                padding: "14px 40px",
                backgroundColor: "#C9A84C",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#1a1a1a",
                lineHeight: 1.2,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Get AI-curated project recommendations based on your goals.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {features.map((feature, index) => (
                <div key={index} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ marginTop: "4px" }}>
                    <Check size={20} strokeWidth={3} color="#C9A84C" />
                  </div>
                  <p style={{ fontSize: "15px", color: "#1a1a1a", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
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
                <p style={{ fontSize: "14px", color: "#DC2626", margin: 0, padding: "12px 16px", backgroundColor: "#FEF2F2", borderRadius: "10px", border: "1px solid #FEE2E2" }}>
                  {submitError}
                </p>
              )}

              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={!canSubmit}
                  style={{
                    padding: "18px",
                    backgroundColor: canSubmit ? "#C9A84C" : "#E5E7EB",
                    color: canSubmit ? "#ffffff" : "#9CA3AF",
                    border: "none",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    width: "100%",
                    boxShadow: canSubmit ? "0 4px 20px rgba(201, 168, 76, 0.25)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {isLoading ? "Submitting..." : "Get My Recommendations"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
