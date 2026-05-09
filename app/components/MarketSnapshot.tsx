"use client";

import React from 'react';
import { TrendingUp, Home, Building2, PieChart, ArrowUp } from 'lucide-react';

const MarketSnapshot = () => {
  const stats = [
    {
      label: "Avg. Rental Yield",
      value: "6.5%",
      trend: "0.3% (MoM)",
      icon: <TrendingUp className="snapshot-icon" />,
      isPositive: true
    },
    {
      label: "Avg. Price (sq.ft.)",
      value: "AED 1,210",
      trend: "3.2% (MoM)",
      icon: <Home className="snapshot-icon" />,
      isPositive: true
    },
    {
      label: "Offplan Supply Pipeline",
      value: "45,000+",
      trend: "Units",
      icon: <Building2 className="snapshot-icon" />,
      isPositive: null
    },
    {
      label: "Price Growth (YoY)",
      value: "+12.4%",
      trend: "2.1% (YoY)",
      icon: <PieChart className="snapshot-icon" />,
      isPositive: true
    }
  ];

  return (
    <div className="market-snapshot">
      <h2 className="snapshot-title">Market Snapshot</h2>
      <div className="snapshot-grid">
        {stats.map((stat, index) => (
          <div key={index} className="snapshot-card">
            <div className="snapshot-icon-wrapper">
              {stat.icon}
            </div>
            <p className="snapshot-label">{stat.label}</p>
            <h3 className="snapshot-value">{stat.value}</h3>
            <div className="snapshot-footer">
              {stat.isPositive === true && (
                <ArrowUp className="trend-arrow" size={12} strokeWidth={3} />
              )}
              <span className={`snapshot-trend ${stat.isPositive === null ? 'muted' : 'positive'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSnapshot;
