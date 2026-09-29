import React, { useState } from 'react';
import { carData, AeroFeature } from '../data/carData';
import { experienceConfig } from '../data/experienceConfig';
import './AerodynamicsSection.css';

export const AerodynamicsSection: React.FC = () => {
  const [activeAero, setActiveAero] = useState<AeroFeature>(carData.aeroFeatures[0]);
  const [airflowEnabled, setAirflowEnabled] = useState<boolean>(true);

  return (
    <section id="aerodynamics" className="aerodynamics-section section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">COMPUTATIONAL FLUID DYNAMICS (CFD)</span>
          <h2 className="section-title-big">AERODYNAMICS, REDEFINED</h2>
          <p className="section-sub-desc">
            Direct transfer of Formula 1 aerodynamic solutions. 10% more aerodynamic efficiency and 15% more
            downforce than the 488 GTB without increasing the drag coefficient.
          </p>
        </div>

        {/* Aerodynamic Wind Tunnel Visualization Canvas / Frame */}
        <div className="aero-stage-card glass-panel">
          <div className="aero-stage-viewport">
            <img
              src={experienceConfig.aero.image}
              alt="Ferrari F8 Tributo Wind Tunnel Aerodynamics"
              className="aero-base-img"
              loading="lazy"
            />

            {/* Dynamic SVG Animated Airflow Streamlines */}
            {airflowEnabled && (
              <svg className="airflow-svg-overlay" viewBox="0 0 1000 560" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="streamlineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
                    <stop offset="30%" stopColor="#00e5ff" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#e4002b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#e4002b" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="streamlineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="40%" stopColor="#00e5ff" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#ff1a40" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ff1a40" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Streamlines wrapping hood S-Duct, roofline, side intake, and blown rear spoiler */}
                <path
                  d="M 50 380 Q 220 370, 360 300 T 560 190 Q 720 185, 960 210"
                  fill="none"
                  stroke="url(#streamlineGrad1)"
                  strokeWidth="2.5"
                  className="animate-airflow"
                />
                <path
                  d="M 20 410 Q 200 410, 340 330 T 590 200 Q 750 205, 980 230"
                  fill="none"
                  stroke="url(#streamlineGrad2)"
                  strokeWidth="2"
                  className="animate-airflow"
                  style={{ animationDelay: '-3s' }}
                />
                <path
                  d="M 40 435 Q 260 440, 480 390 T 750 320 Q 860 310, 990 315"
                  fill="none"
                  stroke="url(#streamlineGrad1)"
                  strokeWidth="2"
                  className="animate-airflow"
                  style={{ animationDelay: '-6s' }}
                />
                <path
                  d="M 30 460 Q 280 470, 520 450 T 800 440 Q 900 430, 990 420"
                  fill="none"
                  stroke="url(#streamlineGrad2)"
                  strokeWidth="1.8"
                  className="animate-airflow"
                  style={{ animationDelay: '-9s' }}
                />
              </svg>
            )}

            {/* Interactive Aero Points on Car */}
            <div className="aero-interactive-pins">
              {carData.aeroFeatures.map((feat) => {
                const isSelected = activeAero.id === feat.id;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    className={`aero-pin ${isSelected ? 'active' : ''}`}
                    style={{ left: `${feat.coords.x}%`, top: `${feat.coords.y}%` }}
                    onClick={() => setActiveAero(feat)}
                    aria-label={`Select aero feature: ${feat.name}`}
                  >
                    <span className="pin-pulse" />
                    <span className="pin-core" />
                    <span className="pin-tag-label">{feat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Airflow Toggle & Status */}
            <div className="aero-hud-controls">
              <button
                type="button"
                className={`btn-streamline-toggle ${airflowEnabled ? 'on' : ''}`}
                onClick={() => setAirflowEnabled(!airflowEnabled)}
              >
                <span className="toggle-indicator" />
                <span>{airflowEnabled ? 'CFD STREAMLINES: ACTIVE' : 'CFD STREAMLINES: OFF'}</span>
              </button>
            </div>
          </div>

          {/* Active Aero Detail Banner */}
          <div className="aero-detail-banner">
            <div className="aero-banner-info">
              <span className="banner-gain-badge">{activeAero.gain}</span>
              <h4 className="banner-feat-title">{activeAero.name}</h4>
              <p className="banner-feat-desc">{activeAero.description}</p>
            </div>

            {/* 4 Aero Metrics Pillars */}
            <div className="aero-pillars-grid">
              <div className="pillar-cell">
                <span className="pillar-num">+15%</span>
                <span className="pillar-label">TOTAL DOWNFORCE</span>
              </div>
              <div className="pillar-cell">
                <span className="pillar-num">+10%</span>
                <span className="pillar-label">AERO EFFICIENCY</span>
              </div>
              <div className="pillar-cell">
                <span className="pillar-num">0.33</span>
                <span className="pillar-label">DRAG COEFF (CD)</span>
              </div>
              <div className="pillar-cell">
                <span className="pillar-num">F1 S-DUCT</span>
                <span className="pillar-label">PATENTED CHANNEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
