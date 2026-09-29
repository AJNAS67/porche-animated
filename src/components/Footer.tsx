import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Footer Tier */}
        <div className="footer-top-tier">
          <div className="footer-brand-col">
            <div className="footer-brand-logo" onClick={scrollToTop}>
              <svg className="footer-crest" viewBox="0 0 100 120" fill="none">
                <path
                  d="M50 5 L90 20 L85 85 L50 115 L15 85 L10 20 Z"
                  stroke="#e4002b"
                  strokeWidth="2"
                  fill="rgba(20, 20, 20, 0.9)"
                />
                <path
                  d="M52 28 C55 24, 60 22, 62 25 C63 28, 59 32, 57 35 C58 38, 63 36, 67 40 C64 42, 60 41, 57 44 C56 48, 58 53, 58 58 C55 57, 53 54, 52 50 C50 55, 47 62, 43 68 C41 62, 43 55, 45 49 C42 51, 38 56, 36 61 C35 55, 39 47, 43 43 C40 43, 36 45, 34 48 C34 43, 38 38, 43 36 C45 32, 47 30, 52 28 Z"
                  fill="#ffffff"
                />
                <rect x="25" y="14" width="16" height="3" fill="#009246" />
                <rect x="42" y="14" width="16" height="3" fill="#ffffff" />
                <rect x="59" y="14" width="16" height="3" fill="#ce2b37" />
              </svg>
              <div className="footer-titles">
                <span className="footer-brand-title">FERRARI</span>
                <span className="footer-model-title">F8 TRIBUTO</span>
              </div>
            </div>
            <p className="footer-brand-tagline">
              A tribute to the most powerful V8 engine in Ferrari history.
            </p>
          </div>

          <div className="footer-nav-columns">
            <div className="nav-col">
              <span className="col-header">MODELS</span>
              <a href="#hero">F8 Tributo</a>
              <a href="#hero">F8 Spider</a>
              <a href="#hero">SF90 Stradale</a>
              <a href="#hero">296 GTB</a>
            </div>

            <div className="nav-col">
              <span className="col-header">TECHNOLOGY</span>
              <a href="#performance">Twin-Turbo V8</a>
              <a href="#aerodynamics">CFD Aerodynamics</a>
              <a href="#xray">Spaceframe Architecture</a>
              <a href="#engineering">Side Slip Control 6.1</a>
            </div>

            <div className="nav-col">
              <span className="col-header">EXPLORATION</span>
              <a href="#explorer">Exterior Design</a>
              <a href="#explorer">Cockpit Architecture</a>
              <a href="#explorer">Performance Telemetry</a>
              <a href="#explorer">Vehicle Configurator</a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Tier */}
        <div className="footer-bottom-tier">
          <div className="legal-disclaimer">
            <p className="disclaimer-text">
              <strong>Conceptual digital experience. Not an official Ferrari website.</strong>
            </p>
            <p className="disclaimer-sub">
              Ferrari, F8 Tributo, and the Prancing Horse device are registered trademarks of Ferrari S.p.A.
              This digital showcase is created strictly for non-commercial educational and design demonstration purposes.
            </p>
          </div>

          <div className="footer-right-legal">
            <div className="legal-links">
              <a href="#privacy">PRIVACY POLICY</a>
              <span className="sep">/</span>
              <a href="#terms">TERMS OF USE</a>
              <span className="sep">/</span>
              <a href="#cookies">COOKIE POLICY</a>
            </div>

            <button type="button" className="btn-back-top" onClick={scrollToTop}>
              <span>BACK TO TOP</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
