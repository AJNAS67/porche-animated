import React, { useState } from 'react';
import { experienceConfig } from '../data/experienceConfig';
import './XRaySection.css';

interface XRayComponent {
  id: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  coords: { x: number; y: number };
}

const xrayComponents: XRayComponent[] = [
  {
    id: 'engine',
    name: 'TWIN-TURBO 90° V8',
    category: 'MID-REAR POWERTRAIN',
    spec: '720 HP / 770 NM / 3,902 CC',
    description: 'Centralized mass distribution positioned low behind the driver for minimal polar moment of inertia.',
    coords: { x: 38, y: 39 },
  },
  {
    id: 'transmission',
    name: '7-SPEED DUAL-CLUTCH DCT',
    category: 'TRANSAXLE',
    spec: 'ZERO-TORQUE INTERRUPTION',
    description: 'Direct gear pre-selection with electronic differential integration (E-Diff 3) for millisecond shift execution.',
    coords: { x: 67, y: 38 },
  },
  {
    id: 'brakes',
    name: 'BREMBO CARBON-CERAMIC (CCM)',
    category: 'DECELERATION SYSTEM',
    spec: '398 MM FRONT / 360 MM REAR',
    description: 'Extreme thermal dissipation materials eliminating brake fade under sustained high-speed circuit braking.',
    coords: { x: 49, y: 73 },
  },
  {
    id: 'chassis',
    name: 'ALUMINUM SPACE-FRAME',
    category: 'STRUCTURAL ARCHITECTURE',
    spec: 'MULTI-MATERIAL HYBRID RIGIDITY',
    description: 'Extruded sections and high-pressure cast nodes delivering maximum torsional stiffness with minimum dry weight.',
    coords: { x: 82, y: 58 },
  },
  {
    id: 'exhaust',
    name: 'TITANIUM RACING EXHAUST',
    category: 'GAS DYNAMICS',
    spec: 'EQUAL-LENGTH TUNED MANIFOLD',
    description: 'Optimized exhaust backpressure and Formula 1 inspired sound harmonics calibrated across the 8,000 RPM range.',
    coords: { x: 74, y: 48 },
  },
  {
    id: 'suspension',
    name: 'MAGNETORHEOLOGICAL DAMPERS',
    category: 'ACTIVE CHASSIS CONTROL',
    spec: 'SCM-E DUAL-COIL ECU SYSTEM',
    description: 'Fluid viscosity modulates in milliseconds to eliminate body roll, pitch under braking, and absorb track kerbs.',
    coords: { x: 26, y: 46 },
  },
];

export const XRaySection: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<XRayComponent>(xrayComponents[0]);
  const [viewMode, setViewMode] = useState<'cad' | 'thermal' | 'wireframe'>('cad');

  return (
    <section id="xray" className="xray-section section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">INTERNAL ANATOMY & STRUCTURAL CAD</span>
          <h2 className="section-title-big">INTERNAL ARCHITECTURE</h2>
          <p className="section-sub-desc">
            Peeling back the Rosso Corsa bodywork reveals the uncompromising race-bred engineering beneath:
            aluminum spaceframe, mid-rear V8, titanium exhaust, and carbon ceramic stopping power.
          </p>
        </div>

        {/* X-Ray Cutaway Interactive Card */}
        <div className="xray-card glass-panel">
          {/* Top Control Bar: Mode Toggles */}
          <div className="xray-top-bar">
            <div className="xray-telemetry-badge">
              <span className="hud-dot" />
              <span>HOLOGRAPHIC SCAN MODE: {viewMode.toUpperCase()}</span>
            </div>

            <div className="xray-mode-toggles">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'cad' ? 'active' : ''}`}
                onClick={() => setViewMode('cad')}
              >
                HOLOGRAPHIC CAD
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'thermal' ? 'active' : ''}`}
                onClick={() => setViewMode('thermal')}
              >
                THERMAL SCAN
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'wireframe' ? 'active' : ''}`}
                onClick={() => setViewMode('wireframe')}
              >
                WIREFRAME
              </button>
            </div>
          </div>

          {/* Interactive X-Ray Viewport */}
          <div className={`xray-viewport mode-${viewMode}`}>
            <img
              src={experienceConfig.xray.image}
              alt="Ferrari F8 Tributo X-Ray Holographic Cutaway"
              className="xray-image"
              loading="lazy"
            />

            {/* Holographic Scanline & Grid Effect */}
            <div className="xray-scan-grid" />
            <div className="xray-sweep-line" />

            {/* Interactive Component Callout Markers */}
            <div className="xray-markers-layer">
              {xrayComponents.map((comp) => {
                const isSelected = selectedComp.id === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    className={`xray-marker ${isSelected ? 'active' : ''}`}
                    style={{ left: `${comp.coords.x}%`, top: `${comp.coords.y}%` }}
                    onClick={() => setSelectedComp(comp)}
                    aria-label={`Inspect ${comp.name}`}
                  >
                    <span className="marker-radar" />
                    <span className="marker-dot" />
                    <span className="marker-label">{comp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Component Inspector Drawer */}
          <div className="xray-inspector-drawer">
            <div className="inspector-main">
              <div className="inspector-meta-row">
                <span className="inspector-cat">{selectedComp.category}</span>
                <span className="inspector-spec-pill">{selectedComp.spec}</span>
              </div>
              <h3 className="inspector-title">{selectedComp.name}</h3>
              <p className="inspector-desc">{selectedComp.description}</p>
            </div>

            <div className="inspector-quick-nav">
              <span className="quick-nav-label">QUICK SELECT:</span>
              <div className="quick-buttons-row">
                {xrayComponents.map((comp) => (
                  <button
                    key={comp.id}
                    type="button"
                    className={`quick-pill ${selectedComp.id === comp.id ? 'active' : ''}`}
                    onClick={() => setSelectedComp(comp)}
                  >
                    {comp.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
