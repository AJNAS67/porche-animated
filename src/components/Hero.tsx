import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ImageSequence } from './ImageSequence';
import { TechnicalOverlay } from './TechnicalOverlay';
import { Hotspot } from './Hotspot';
import { carHotspots } from '../data/hotspots';
import { experienceConfig, SequenceState } from '../data/experienceConfig';
import { initHeroScrollSequence } from '../animation/scrollAnimation';
import { playHeroEntranceTimeline } from '../animation/heroAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Hero.css';

interface HeroProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  setFrame: (frame: number) => void;
  getCurrentFrame: () => number;
  isReady: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  canvasRef,
  setFrame,
  getCurrentFrame,
  isReady,
}) => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const brandTagRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const specsBarRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStateIndex, setActiveStateIndex] = useState<number>(0);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  const prefersReducedMotion = useReducedMotion();

  // Handle frame updates without lagging state
  const handleFrameUpdate = useCallback((frame: number) => {
    setCurrentFrameNum(frame);
    setFrame(frame);
  }, [setFrame]);

  // Cinematic entrance once ready
  useEffect(() => {
    if (!isReady) return;

    const tl = playHeroEntranceTimeline({
      overlayRef: curtainRef.current,
      brandTagRef: brandTagRef.current,
      mainTitleRef: mainTitleRef.current,
      subTitleRef: subTitleRef.current,
      specsBarRef: specsBarRef.current,
      telemetryRef: telemetryRef.current,
      scrollIndicatorRef: scrollIndicatorRef.current,
    });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Setup GSAP ScrollTrigger pinning for the 300-frame sequence
  useEffect(() => {
    if (!heroWrapperRef.current || prefersReducedMotion) return;

    const trigger = initHeroScrollSequence({
      triggerElement: heroWrapperRef.current,
      totalFrames: experienceConfig.frameCount,
      onFrameUpdate: handleFrameUpdate,
      onProgressUpdate: (prog) => setScrollProgress(prog),
      onStateUpdate: (stateIdx) => setActiveStateIndex(stateIdx),
      pinDistance: '+=320%',
    });

    return () => {
      trigger.kill();
    };
  }, [handleFrameUpdate, prefersReducedMotion]);

  const currentState: SequenceState =
    experienceConfig.states[activeStateIndex] || experienceConfig.states[0];

  // Hotspots are highlighted especially when car slows and stops (States 3, 4, 5)
  const isStopOrReveal = activeStateIndex >= 2;

  return (
    <section id="hero" ref={heroWrapperRef} className="hero-sequence-section">
      {/* Black Entrance Curtain */}
      <div ref={curtainRef} className="hero-entrance-curtain" />

      {/* Main Canvas Viewport */}
      <div className="hero-canvas-wrapper">
        <ImageSequence
          canvasRef={canvasRef}
          currentFrame={currentFrameNum}
          totalFrames={experienceConfig.frameCount}
          fallbackImage={experienceConfig.fallbackImage}
          onManualScrub={handleFrameUpdate}
          interactive={true}
        />

        {/* Interactive Hotspots Layer */}
        {showHotspots && (
          <div className="hero-hotspots-layer">
            {carHotspots.map((h) => {
              const activeInState =
                !h.activeInStates || h.activeInStates.includes(currentState.id);
              return <Hotspot key={h.id} hotspot={h} isActive={activeInState} />;
            })}
          </div>
        )}
      </div>

      {/* Hero Foreground Typography Hierarchy */}
      <div className="hero-typography-container container">
        <div ref={brandTagRef} className="hero-brand-tag">
          <span className="brand-dot" />
          <span>MARANELLO, ITALIA</span>
        </div>

        <h1 ref={mainTitleRef} className="hero-main-title">
          <span className="title-lead">FERRARI</span>
          <span className="title-model">F8 TRIBUTO</span>
        </h1>

        <p ref={subTitleRef} className="hero-tagline">
          A NEW ERA OF PERFORMANCE
        </p>

        {/* Hotspot toggle button */}
        <div className="hotspot-toggle-wrap">
          <button
            type="button"
            className={`btn-hotspot-toggle ${showHotspots ? 'active' : ''}`}
            onClick={() => setShowHotspots(!showHotspots)}
          >
            <span className="toggle-dot" />
            <span>{showHotspots ? 'HIDE HOTSPOTS' : 'INSPECT HOTSPOTS'}</span>
          </button>
        </div>
      </div>

      {/* Primary Specifications Bar */}
      <div ref={specsBarRef} className="hero-specs-bar">
        <div className="specs-bar-inner container">
          <div className="spec-item">
            <span className="spec-val-big">3.9 L</span>
            <span className="spec-label-sub">V8 TWIN-TURBO</span>
          </div>

          <div className="spec-separator" />

          <div className="spec-item">
            <span className="spec-val-big">720 <span className="spec-unit">HP</span></span>
            <span className="spec-label-sub">MAXIMUM OUTPUT</span>
          </div>

          <div className="spec-separator" />

          <div className="spec-item">
            <span className="spec-val-big">770 <span className="spec-unit">NM</span></span>
            <span className="spec-label-sub">PEAK TORQUE</span>
          </div>

          <div className="spec-separator" />

          <div className="spec-item">
            <span className="spec-val-big">2.9 <span className="spec-unit">S</span></span>
            <span className="spec-label-sub">0–100 KM/H</span>
          </div>
        </div>
      </div>

      {/* Technical HUD Overlay with corner telemetries */}
      <div ref={telemetryRef}>
        <TechnicalOverlay
          currentState={currentState}
          currentFrame={currentFrameNum}
          totalFrames={experienceConfig.frameCount}
          scrollProgress={scrollProgress}
        />
      </div>
    </section>
  );
};
