import React, { useEffect, useRef } from 'react';
import { carData } from '../data/carData';
import { animateCounter } from '../animation/transitions';
import './PerformanceSection.css';

export const PerformanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hpNumRef = useRef<HTMLSpanElement>(null);
  const nmNumRef = useRef<HTMLSpanElement>(null);
  const speedNumRef = useRef<HTMLSpanElement>(null);
  const secNumRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (hpNumRef.current) {
      animateCounter(hpNumRef.current, 720, {
        duration: 2.0,
        triggerElement: sectionRef.current,
      });
    }

    if (nmNumRef.current) {
      animateCounter(nmNumRef.current, 770, {
        duration: 2.2,
        triggerElement: sectionRef.current,
      });
    }

    if (speedNumRef.current) {
      animateCounter(speedNumRef.current, 340, {
        duration: 2.4,
        triggerElement: sectionRef.current,
      });
    }

    if (secNumRef.current) {
      animateCounter(secNumRef.current, 2.9, {
        duration: 1.8,
        decimals: 1,
        triggerElement: sectionRef.current,
      });
    }
  }, []);

  return (
    <section id="performance" ref={sectionRef} className="performance-section section-wrapper tech-grid-bg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">BENCHMARK POWERTRAIN</span>
          <h2 className="section-title-big">ENGINEERED TO EXHILARATE</h2>
          <p className="section-sub-desc">
            The most powerful production V8 in Ferrari history, delivering unrelenting acceleration,
            zero turbo lag, and instantaneous response across the entire powerband.
          </p>
        </div>

        {/* 4 Hero Spec Cards Grid with Animated Numbers */}
        <div className="perf-cards-grid">
          {/* Card 1: 720 HP */}
          <div className="perf-card glass-panel">
            <div className="perf-card-glow" />
            <div className="perf-card-header">
              <span className="perf-badge">MAXIMUM OUTPUT</span>
              <span className="perf-sub-rpm">@ 8,000 RPM</span>
            </div>
            <div className="perf-metric-val">
              <span ref={hpNumRef} className="num-odometer">720</span>
              <span className="metric-unit">HP</span>
            </div>
            <div className="perf-bar-track">
              <div className="perf-bar-fill" style={{ width: '96%' }} />
            </div>
            <p className="perf-card-note">
              185 cv/l specific output setting a world record for mid-rear production sports cars.
            </p>
          </div>

          {/* Card 2: 770 NM */}
          <div className="perf-card glass-panel">
            <div className="perf-card-glow" />
            <div className="perf-card-header">
              <span className="perf-badge">PEAK TORQUE</span>
              <span className="perf-sub-rpm">@ 3,250 RPM</span>
            </div>
            <div className="perf-metric-val">
              <span ref={nmNumRef} className="num-odometer">770</span>
              <span className="metric-unit">NM</span>
            </div>
            <div className="perf-bar-track">
              <div className="perf-bar-fill" style={{ width: '92%' }} />
            </div>
            <p className="perf-card-note">
              Variable Torque Management delivers progressive thrust resembling a naturally aspirated engine.
            </p>
          </div>

          {/* Card 3: 2.9 SEC */}
          <div className="perf-card glass-panel">
            <div className="perf-card-glow" />
            <div className="perf-card-header">
              <span className="perf-badge">0–100 KM/H</span>
              <span className="perf-sub-rpm">LAUNCH CONTROL</span>
            </div>
            <div className="perf-metric-val">
              <span ref={secNumRef} className="num-odometer">2.9</span>
              <span className="metric-unit">SEC</span>
            </div>
            <div className="perf-bar-track">
              <div className="perf-bar-fill" style={{ width: '98%' }} />
            </div>
            <p className="perf-card-note">
              F1 dual-clutch transmission shifts with zero power loss to slingshot to triple digits.
            </p>
          </div>

          {/* Card 4: 340 KM/H */}
          <div className="perf-card glass-panel">
            <div className="perf-card-glow" />
            <div className="perf-card-header">
              <span className="perf-badge">TOP VELOCITY</span>
              <span className="perf-sub-rpm">211 MPH</span>
            </div>
            <div className="perf-metric-val">
              <span ref={speedNumRef} className="num-odometer">340</span>
              <span className="metric-unit">KM/H</span>
            </div>
            <div className="perf-bar-track">
              <div className="perf-bar-fill" style={{ width: '94%' }} />
            </div>
            <p className="perf-card-note">
              Aerodynamic balance and blown rear spoiler maintain high-speed stability without drag.
            </p>
          </div>
        </div>

        {/* Secondary Specifications Matrix */}
        <div className="secondary-specs-matrix">
          <div className="matrix-title-bar">
            <span className="matrix-title">TECHNICAL SPECIFICATION INDEX</span>
            <span className="matrix-code">ISO / F154 CD CLASSIFICATION</span>
          </div>

          <div className="matrix-grid">
            {carData.secondarySpecs.map((item, idx) => (
              <div key={idx} className="matrix-cell">
                <span className="cell-label">{item.label}</span>
                <span className="cell-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
