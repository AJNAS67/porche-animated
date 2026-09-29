import React, { useState } from 'react';
import { carData, EngineFeature } from '../data/carData';
import { experienceConfig } from '../data/experienceConfig';
import './EngineeringSection.css';

export const EngineeringSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<EngineFeature>(
    carData.engineFeatures[0]
  );

  return (
    <section id="engineering" className="engineering-section section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">INTERNATIONAL ENGINE OF THE YEAR</span>
          <h2 className="section-title-big">ENGINEERED FOR PERFORMANCE</h2>
          <p className="section-sub-desc">
            A bespoke 3.9-liter 90° V8 twin-turbo architecture evolved from Ferrari’s endurance racing
            championship victories. Lighter components, sharper acoustics, and instantaneous throttle delivery.
          </p>
        </div>

        {/* Engineering Content Layout: Visual Showcase on Left, Interactive Selector on Right */}
        <div className="engineering-grid">
          {/* Left: Engine Imagery Showcase */}
          <div className="engine-showcase-panel glass-panel">
            <div className="engine-image-wrap">
              <img
                src={experienceConfig.engine.image}
                alt="Ferrari F8 Tributo 3.9L Twin-Turbo V8 Engine"
                className="engine-img"
                loading="lazy"
              />
              <div className="engine-overlay-gradient" />

              {/* Dynamic Engine Callout Label */}
              <div className="engine-hud-callout">
                <span className="hud-dot" />
                <div className="callout-text">
                  <span className="callout-code">ENGINE SPEC: F154 CD</span>
                  <span className="callout-sub">90° V8 FLAT-PLANE TWIN-TURBO</span>
                </div>
              </div>
            </div>

            {/* Quick Engine Telemetry Specs Bar */}
            <div className="engine-specs-strip">
              <div className="strip-item">
                <span className="strip-label">DISPLACEMENT</span>
                <span className="strip-val">3,902 CC</span>
              </div>
              <div className="strip-divider" />
              <div className="strip-item">
                <span className="strip-label">BORE & STROKE</span>
                <span className="strip-val">86.5 X 83 MM</span>
              </div>
              <div className="strip-divider" />
              <div className="strip-item">
                <span className="strip-label">COMPRESSION</span>
                <span className="strip-val">9.6 : 1</span>
              </div>
              <div className="strip-divider" />
              <div className="strip-item">
                <span className="strip-label">SPECIFIC POWER</span>
                <span className="strip-val">185 CV/L</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Feature Tabs */}
          <div className="engine-features-column">
            <div className="feature-selection-header">
              <span className="feat-col-title">MOTORSPORT COMPONENT BREAKDOWN</span>
              <span className="feat-col-note">SELECT COMPONENT TO INSPECT</span>
            </div>

            <div className="features-list">
              {carData.engineFeatures.map((feat) => {
                const isSelected = selectedFeature.id === feat.id;
                return (
                  <div
                    key={feat.id}
                    className={`feature-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedFeature(feat)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedFeature(feat);
                      }
                    }}
                  >
                    <div className="feature-item-header">
                      <div className="feature-meta">
                        <span className="feat-category">{feat.category}</span>
                        <h4 className="feat-name">{feat.title}</h4>
                      </div>
                      <span className="feat-gain-pill">{feat.specs}</span>
                    </div>

                    {isSelected && (
                      <div className="feature-expanded-body">
                        <p className="feat-desc">{feat.description}</p>
                        <div className="feat-footer-spec">
                          <span className="spec-indicator-dot" />
                          <span>RACING DERIVATION: 488 GTE & F1 TECHNOLOGY</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Powertrain Overview Card */}
            <div className="powertrain-summary glass-panel">
              <div className="summary-row">
                <span className="sum-label">TRANSMISSION</span>
                <span className="sum-val">7-Speed Dual-Clutch F1 Gearbox</span>
              </div>
              <div className="summary-row">
                <span className="sum-label">DRIVETRAIN</span>
                <span className="sum-val">Rear-Wheel Drive (RWD) with E-Diff 3</span>
              </div>
              <div className="summary-row">
                <span className="sum-label">WEIGHT REDUCTION</span>
                <span className="sum-val highlight">-18 KG vs. 488 GTB Engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
