"use client";

import React from 'react';
import { Plane, Users, Waves, TrendingUp, ChevronRight } from 'lucide-react';

const InvestmentThemes = () => {
  const themes = [
    {
      title: "Airport Corridor Growth",
      subtitle: "Strong demand ahead",
      icon: <Plane size={20} />,
      image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Family Communities",
      subtitle: "Top picks for family living",
      icon: <Users size={20} />,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Waterfront Living",
      subtitle: "Strong rental performance",
      icon: <Waves size={20} />,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Projects Under AED 2M",
      subtitle: "High ROI opportunities",
      icon: <TrendingUp size={20} />,
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="investment-themes">
      <div className="themes-header">
        <h2 className="themes-title">Trending Investment Themes</h2>
        <a href="#" className="all-themes-link">
          All Themes <ChevronRight size={16} />
        </a>
      </div>
      <div className="themes-grid">
        {themes.map((theme, index) => (
          <div 
            key={index} 
            className="theme-card" 
            style={{ backgroundImage: `url(${theme.image})` }}
          >
            <div className="theme-card-overlay"></div>
            <div className="theme-card-content">
              <div className="theme-icon-circle">
                {theme.icon}
              </div>
              <div className="theme-text-wrapper">
                <h3 className="theme-card-title">{theme.title}</h3>
                <p className="theme-card-subtitle">{theme.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentThemes;
