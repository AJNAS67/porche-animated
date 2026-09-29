import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  progress: number;
  loadedFrames: number;
  totalFrames: number;
  isReady: boolean;
  onEnter: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  loadedFrames,
  totalFrames,
  isReady,
  onEnter,
}) => {
  const [fadingOut, setFadingOut] = useState(false);

  // Auto-enter or allow quick click once minimum threshold is ready
  const handleProceed = () => {
    setFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  useEffect(() => {
    // If fully loaded or initial ready threshold reached, can auto proceed after brief settle
    if (progress >= 100 && !fadingOut) {
      const timer = setTimeout(() => {
        handleProceed();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, fadingOut]);

  const paddedLoaded = String(loadedFrames).padStart(3, '0');
  const paddedTotal = String(totalFrames).padStart(3, '0');

  return (
    <aside
      aria-label="Experience Preloader"
      className={`loading-screen ${fadingOut ? 'fade-out' : ''}`}
    >
      <div className="loading-bg-glow" />

      <div className="loading-content">
        {/* Ferrari-inspired emblem crest */}
        <div className="loading-emblem">
          <svg className="crest-svg" viewBox="0 0 100 120" fill="none">
            {/* Shield Outline */}
            <path
              d="M50 5 L90 20 L85 85 L50 115 L15 85 L10 20 Z"
              stroke="#e4002b"
              strokeWidth="2"
              fill="rgba(10, 10, 10, 0.85)"
            />
            {/* Prancing horse stylized silhouette */}
            <path
              d="M52 28 C55 24, 60 22, 62 25 C63 28, 59 32, 57 35 C58 38, 63 36, 67 40 C64 42, 60 41, 57 44 C56 48, 58 53, 58 58 C55 57, 53 54, 52 50 C50 55, 47 62, 43 68 C41 62, 43 55, 45 49 C42 51, 38 56, 36 61 C35 55, 39 47, 43 43 C40 43, 36 45, 34 48 C34 43, 38 38, 43 36 C45 32, 47 30, 52 28 Z"
              fill="#ffffff"
            />
            {/* Italian tricolor top band */}
            <rect x="25" y="14" width="16" height="3" fill="#009246" />
            <rect x="42" y="14" width="16" height="3" fill="#ffffff" />
            <rect x="59" y="14" width="16" height="3" fill="#ce2b37" />
          </svg>
          <div className="brand-text">FERRARI</div>
        </div>

        <div className="loading-status-group">
          <div className="sys-status">
            <span className="status-blink" />
            <span>INITIALIZING EXPERIENCE</span>
          </div>

          <h2 className="loading-title">FERRARI F8 TRIBUTO</h2>
          <p className="loading-subtitle">CINEMATIC IMAGE SEQUENCE ENGINE</p>
        </div>

        {/* Dynamic progress bar */}
        <div className="progress-container">
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(100, Math.max(progress, 8))}%` }}
            />
          </div>
          <div className="progress-meta">
            <span className="mono-counter">
              FRAME {paddedLoaded} / {paddedTotal}
            </span>
            <span className="mono-percent">{progress}%</span>
          </div>
        </div>

        {/* Call to action when enough frames are ready */}
        <div className="loading-action-area">
          {isReady ? (
            <button
              type="button"
              className="btn-enter"
              onClick={handleProceed}
              autoFocus
            >
              <span>ENTER EXPERIENCE</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="loading-hint">LOADING VEHICLE DYNAMICS SYSTEM...</div>
          )}
        </div>
      </div>

      <div className="loading-footer">
        <span>3.9L TWIN-TURBO V8</span>
        <span className="dot-divider">•</span>
        <span>720 HP</span>
        <span className="dot-divider">•</span>
        <span>340 KM/H</span>
      </div>
    </aside>
  );
};
