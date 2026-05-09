"use client";

import Navbar from "./components/Navbar";
import MarketSnapshot from "./components/MarketSnapshot";
import InvestmentThemes from "./components/InvestmentThemes";
import FeaturedVideoInsight from "./components/FeaturedVideoInsight";

export default function Home() {
  return (
    <div className="home-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar onOpenAi={() => {}} />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                AI-powered insights for<br />
                smarter property decisions in Dubai
              </h1>
              <div className="hero-subheadlines">
                <p>Independent analysis. Real-time data.</p>
                <p>Smarter investments.</p>
              </div>
              <p className="hero-description">
                Offplan delivers AI-powered market intelligence and real-time insights to help you explore Dubai's property market with confidence. From rental trends to investment opportunities, we provide the data and analysis you need to make smarter decisions.
              </p>
            </div>
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
                alt="Dubai Skyline" 
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </section>

        <section className="home-info-section">
          <div className="market-snapshot-container">
            <MarketSnapshot />
          </div>
          <div className="secondary-info-container">
            <InvestmentThemes />
          </div>
        </section>

        <FeaturedVideoInsight />
      </main>
    </div>
  );
}
