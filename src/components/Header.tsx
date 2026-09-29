import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  isAudioPlaying = false,
  onToggleAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Left: Brand logo */}
        <div className="header-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg className="header-crest" viewBox="0 0 100 120" fill="none">
            <path
              d="M50 5 L90 20 L85 85 L50 115 L15 85 L10 20 Z"
              stroke="#e4002b"
              strokeWidth="2"
              fill="rgba(15, 15, 15, 0.9)"
            />
            <path
              d="M52 28 C55 24, 60 22, 62 25 C63 28, 59 32, 57 35 C58 38, 63 36, 67 40 C64 42, 60 41, 57 44 C56 48, 58 53, 58 58 C55 57, 53 54, 52 50 C50 55, 47 62, 43 68 C41 62, 43 55, 45 49 C42 51, 38 56, 36 61 C35 55, 39 47, 43 43 C40 43, 36 45, 34 48 C34 43, 38 38, 43 36 C45 32, 47 30, 52 28 Z"
              fill="#ffffff"
            />
            <rect x="25" y="14" width="16" height="3" fill="#009246" />
            <rect x="42" y="14" width="16" height="3" fill="#ffffff" />
            <rect x="59" y="14" width="16" height="3" fill="#ce2b37" />
          </svg>
          <div className="header-titles">
            <span className="brand-name">FERRARI</span>
            <span className="model-badge">F8 TRIBUTO</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button type="button" className="nav-link" onClick={() => handleNavClick('hero')}>
            OVERVIEW
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('performance')}>
            PERFORMANCE
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('engineering')}>
            ENGINEERING
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('aerodynamics')}>
            AERODYNAMICS
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('xray')}>
            X-RAY VIEW
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('explorer')}>
            EXPLORER
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          {onToggleAudio && (
            <button
              type="button"
              className={`audio-toggle ${isAudioPlaying ? 'active' : ''}`}
              onClick={onToggleAudio}
              title={isAudioPlaying ? 'Mute V8 Audio' : 'Play V8 Engine Sound'}
              aria-label="Toggle V8 Audio"
            >
              <div className="equalizer-bars">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
              </div>
              <span className="audio-label">{isAudioPlaying ? 'AUDIO ON' : 'V8 SOUND'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn-explore-cta"
            onClick={() => handleNavClick('explorer')}
          >
            <span>EXPLORE</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('hero')}>
          OVERVIEW
        </button>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('performance')}>
          PERFORMANCE
        </button>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('engineering')}>
          ENGINEERING
        </button>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('aerodynamics')}>
          AERODYNAMICS
        </button>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('xray')}>
          X-RAY VIEW
        </button>
        <button type="button" className="mobile-link" onClick={() => handleNavClick('explorer')}>
          EXPLORER
        </button>
        {onToggleAudio && (
          <button type="button" className="mobile-link mobile-audio" onClick={onToggleAudio}>
            {isAudioPlaying ? 'MUTE V8 AUDIO' : 'ENABLE V8 SOUND'}
          </button>
        )}
      </div>
    </header>
  );
};
