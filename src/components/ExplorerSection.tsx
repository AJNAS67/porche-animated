import React, { useState } from 'react';
import { carData, ExplorerTab } from '../data/carData';
import './ExplorerSection.css';

export const ExplorerSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<'exterior' | 'interior' | 'engineering' | 'technology'>(
    'exterior'
  );
  const [animating, setAnimating] = useState(false);

  const activeTab: ExplorerTab =
    carData.explorerTabs.find((t) => t.id === activeTabId) || carData.explorerTabs[0];

  const handleTabChange = (newId: 'exterior' | 'interior' | 'engineering' | 'technology') => {
    if (newId === activeTabId) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTabId(newId);
      setAnimating(false);
    }, 250);
  };

  return (
    <section id="explorer" className="explorer-section section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">MULTI-PERSPECTIVE VEHICLE DISCOVERY</span>
          <h2 className="section-title-big">EXPLORE THE F8</h2>
          <p className="section-sub-desc">
            Immerse yourself across every dimension of the Ferrari F8 Tributo. Switch between exterior
            sculpture, driver-centric cockpit, V8 engineering, and electronic vehicle dynamics.
          </p>
        </div>

        {/* Tab Selection Navigation Bar */}
        <div className="explorer-tabs-nav">
          {carData.explorerTabs.map((tab) => {
            const isSelected = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tab-indicator" />
                <span className="tab-title">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Explorer Content Stage */}
        <div className={`explorer-stage-card glass-panel ${animating ? 'transitioning' : ''}`}>
          {/* Main Visual Display */}
          <div className="explorer-visual-half">
            <div className="visual-media-box">
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className="explorer-hero-img"
                loading="lazy"
              />
              <div className="visual-shading-edge" />

              <div className="tab-watermark-tag">
                <span>{activeTab.label} // F8 TRIBUTO</span>
              </div>
            </div>
          </div>

          {/* Details & Specs Half */}
          <div className="explorer-details-half">
            <div className="tab-headline-group">
              <span className="tab-meta-badge">PERSPECTIVE: {activeTab.label}</span>
              <h3 className="tab-title-main">{activeTab.title}</h3>
              <p className="tab-subtitle-lead">{activeTab.subtitle}</p>
            </div>

            {/* Quick Specs Matrix */}
            <div className="tab-specs-grid">
              {activeTab.specs.map((spec, idx) => (
                <div key={idx} className="tab-spec-cell">
                  <span className="spec-cell-label">{spec.label}</span>
                  <span className="spec-cell-val">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Architectural Highlights Checklist */}
            <div className="tab-highlights-list">
              <span className="highlights-title">KEY DESIGN & ENGINEERING MILESTONES:</span>
              <ul>
                {activeTab.highlights.map((item, idx) => (
                  <li key={idx} className="highlight-item">
                    <span className="bullet-dash">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
