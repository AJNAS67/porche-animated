import React from 'react';
import { SequenceState, experienceConfig } from '../data/experienceConfig';
import './TechnicalOverlay.css';

interface TechnicalOverlayProps {
  currentState: SequenceState;
  currentFrame: number;
  totalFrames: number;
  scrollProgress: number;
}

export const TechnicalOverlay: React.FC<TechnicalOverlayProps> = ({
  currentState,
  currentFrame,
  totalFrames,
  scrollProgress,
}) => {
  return (
    <div className="technical-overlay" aria-hidden="true">
      {/* Top Left: Live telemetry display */}
      <div className="hud-corner top-left">
        <div className="hud-bracket-tl" />
        <div className="telemetry-block">
          <div className="state-badge-row">
            <span className="state-badge">{currentState.badge}</span>
            <span className="state-name">{currentState.name}</span>
          </div>
          <div className="telemetry-metrics">
            <div className="metric-row">
              <span className="metric-lbl">SPEED</span>
              <span className="metric-val">{currentState.telemetry.speed}</span>
            </div>
            <div className="metric-row">
              <span className="metric-lbl">RPM</span>
              <span className="metric-val">{currentState.telemetry.rpm}</span>
            </div>
            <div className="metric-row">
              <span className="metric-lbl">LATERAL G</span>
              <span className="metric-val highlight">{currentState.telemetry.gForce}</span>
            </div>
            <div className="metric-row">
              <span className="metric-lbl">TRANSMISSION</span>
              <span className="metric-val">{currentState.telemetry.gear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right: Frame sequence scrubber indicator */}
      <div className="hud-corner top-right">
        <div className="hud-bracket-tr" />
        <div className="frame-telemetry">
          <div className="frame-counter">
            <span className="frame-num">
              {String(currentFrame).padStart(experienceConfig.padding, '0')}
            </span>
            <span className="frame-slash">/</span>
            <span className="frame-max">
              {String(totalFrames).padStart(experienceConfig.padding, '0')}
            </span>
          </div>
          <div className="frame-timeline-bar">
            <div
              className="frame-timeline-fill"
              style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
            />
          </div>
          <span className="frame-label">TIMELINE SCRUBBER</span>
        </div>
      </div>

      {/* Bottom Left: Vehicle Architecture Specs */}
      <div className="hud-corner bottom-left">
        <div className="hud-bracket-bl" />
        <div className="arch-specs">
          <div className="arch-item">
            <span className="arch-title">ENGINE CODE</span>
            <span className="arch-code">F154 CD 90° V8</span>
          </div>
          <div className="arch-item">
            <span className="arch-title">BOOST MGMT</span>
            <span className="arch-code">VARIABLE TORQUE</span>
          </div>
          <div className="arch-item">
            <span className="arch-title">DRIVE AXLE</span>
            <span className="arch-code">E-DIFF 3 / SSC 6.1</span>
          </div>
        </div>
      </div>

      {/* Bottom Right: Scroll Prompt */}
      <div className="hud-corner bottom-right">
        <div className="hud-bracket-br" />
        <div className="scroll-indicator-box">
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
          <div className="scroll-text-group">
            <span className="scroll-heading">SCROLL TO DRIVE</span>
            <span className="scroll-sub">EXPLORE CINEMATIC TIMELINE</span>
          </div>
        </div>
      </div>

      {/* Dynamic Reticle Crosshair in Center */}
      <div className="hud-center-crosshair">
        <div className="crosshair-h" />
        <div className="crosshair-v" />
      </div>
    </div>
  );
};
