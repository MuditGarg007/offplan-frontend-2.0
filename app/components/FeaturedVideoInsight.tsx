"use client";

import React, { useState } from 'react';
import { Play, Clock, Sparkles, ChevronRight } from 'lucide-react';

const FeaturedVideoInsight = () => {
  const [playing, setPlaying] = useState(false);
  const videoId = "oSXXo4SyiYY";

  return (
    <section className="featured-video-section">
      <h2 className="section-title">Featured Video Insight</h2>
      <div className="video-insight-grid">
        {/* Video Card */}
        <div 
          className="video-insight-card" 
          onClick={() => !playing && setPlaying(true)}
          style={{ cursor: playing ? 'default' : 'pointer' }}
        >
          <div className="video-thumbnail-wrapper">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&iv_load_policy=3&color=white`}
                title="Dubai Off-Plan Investment Guide 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            ) : (
              <>
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Dubai Skyline" 
                  className="video-thumbnail"
                />
                <div className="play-button-overlay">
                  <div className="play-button-circle">
                    <Play fill="white" size={20} />
                  </div>
                </div>
                <div className="video-duration">7:45</div>
              </>
            )}
          </div>
          <div className="video-info">
            <h3 className="video-title">Dubai Off-Plan Investment Guide 2026</h3>
            <p className="video-description">
              Our complete guide to off-plan investments in Dubai – trends, opportunities and strategies.
            </p>
            <div className="video-footer">
              <div className="video-footer-item">
                <Clock size={14} />
                <span>7 min</span>
              </div>
              <span className="footer-dot">•</span>
              <span className="video-footer-item">Market Briefing</span>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="ai-cta-card">
          <div className="cta-icon-wrapper">
            <div className="cta-icon-circle">
              <Sparkles className="cta-sparkle-icon" size={24} />
            </div>
          </div>
          <div className="cta-content">
            <h3 className="cta-title">Explore Opportunities Based on Your Goals</h3>
            <p className="cta-description">
              Tell us what matters to you and Offplan AI will surface relevant areas, projects and investment strategies.
            </p>
          </div>
          <div className="cta-button-wrapper">
            <button className="discover-btn">
              Discover Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoInsight;
