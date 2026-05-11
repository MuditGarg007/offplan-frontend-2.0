"use client";

import React from "react";
import Link from "next/link";
import { Globe, MapPin, Building, Home, CreditCard, BarChart3, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Country Comparisons",
    description: "Compare Dubai with other global markets",
    articles: "12 Articles",
    icon: Globe,
    iconColor: "#8b5cf6", // Purple
    iconBg: "#f5f3ff",
  },
  {
    id: 2,
    title: "Area Comparisons",
    description: "Compare different areas and communities",
    articles: "18 Articles",
    icon: MapPin,
    iconColor: "#10b981", // Green
    iconBg: "#ecfdf5",
  },
  {
    id: 3,
    title: "Developer Comparisons",
    description: "Compare top developers on key factors",
    articles: "10 Articles",
    icon: Building,
    iconColor: "#C9A84C", // Golden
    iconBg: "#fefce8",
  },
  {
    id: 4,
    title: "Property Type",
    description: "Offplan vs Secondary and more",
    articles: "8 Articles",
    icon: Home,
    iconColor: "#3b82f6", // Blue
    iconBg: "#eff6ff",
  },
  {
    id: 5,
    title: "Payment Plans",
    description: "Compare payment plans and structures",
    articles: "14 Articles",
    icon: CreditCard,
    iconColor: "#a855f7", // Light Purple/Indigo
    iconBg: "#faf5ff",
  },
  {
    id: 6,
    title: "Investment Strategies",
    description: "Compare strategies and approaches",
    articles: "9 Articles",
    icon: BarChart3,
    iconColor: "#C9A84C", // Golden
    iconBg: "#fefce8",
  },
];

export default function ComparisonCategories() {
  return (
    <section className="comparison-categories" style={{ padding: "20px 8% 60px", backgroundColor: "#ffffff" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Explore Comparison Categories</h2>
        <Link href="/compare/categories" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All Categories <ChevronRight size={16} />
        </Link>
      </div>

      <div className="categories-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(6, 1fr)", 
        gap: "12px"
      }}>
        {categories.map((category) => (
          <div key={category.id} className="category-card" style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            border: "1px solid #f3f4f6", 
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            transition: "all 0.2s ease",
            cursor: "pointer",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ 
                backgroundColor: category.iconBg, 
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <category.icon size={20} color={category.iconColor} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#111827", margin: "0 0 4px 0", lineHeight: "1.2" }}>
                  {category.title}
                </h3>
                <p style={{ fontSize: "10px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>
                  {category.description}
                </p>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8" }}>
                {category.articles}
              </span>
              <ChevronRight size={12} color="#cbd5e1" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .category-card:hover {
          border-color: #e5e7eb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .categories-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            margin: 0 -16px !important;
            padding: 0 16px 12px !important;
            gap: 12px !important;
            scrollbar-width: none;
          }
          .categories-grid::-webkit-scrollbar {
            display: none;
          }
          .category-card {
            min-width: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
