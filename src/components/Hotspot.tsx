import React, { useState } from 'react';
import { HotspotData } from '../data/hotspots';
import './Hotspot.css';

interface HotspotProps {
  hotspot: HotspotData;
  isActive?: boolean;
}

export const Hotspot: React.FC<HotspotProps> = ({ hotspot, isActive = true }) => {
  const [open, setOpen] = useState(false);

  if (!isActive) return null;

  return (
    <div
      className={`hotspot-wrapper ${open ? 'expanded' : ''}`}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {/* Interactive Trigger Dot */}
      <button
        type="button"
        className="hotspot-trigger"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={`View technical details for ${hotspot.title}`}
        aria-expanded={open}
      >
        <span className="radar-ring" />
        <span className="dot-core" />
      </button>

      {/* Thin leader line and label preview */}
      <div className={`hotspot-tag ${open ? 'hide-preview' : ''}`}>
        <span className="tag-line" />
        <span className="tag-text">{hotspot.title}</span>
      </div>

      {/* Expanded Technical Detail Card */}
      {open && (
        <div
          className="hotspot-card glass-panel"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="card-header">
            <span className="card-category">{hotspot.category}</span>
            <button
              type="button"
              className="card-close"
              onClick={() => setOpen(false)}
              aria-label="Close details"
            >
              ×
            </button>
          </div>
          <h4 className="card-title">{hotspot.title}</h4>
          <p className="card-desc">{hotspot.description}</p>
          <div className="card-specs-grid">
            {hotspot.specs.map((s, idx) => (
              <div key={idx} className="spec-pill">
                <span className="spec-label">{s.label}</span>
                <span className="spec-val">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
