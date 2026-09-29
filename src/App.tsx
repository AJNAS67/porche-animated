import React, { useState, useCallback } from 'react';
import { useImageSequence } from './hooks/useImageSequence';
import { experienceConfig } from './data/experienceConfig';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PerformanceSection } from './components/PerformanceSection';
import { EngineeringSection } from './components/EngineeringSection';
import { AerodynamicsSection } from './components/AerodynamicsSection';
import { XRaySection } from './components/XRaySection';
import { ExplorerSection } from './components/ExplorerSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { AudioExperience } from './components/AudioExperience';
import './styles/globals.css';

export const App: React.FC = () => {
  const [experienceEntered, setExperienceEntered] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  // Initialize central Canvas Image Sequence engine with 300 frames
  const {
    canvasRef,
    progress,
    loadedFrames,
    totalFrames,
    isReady,
    setFrame,
    getCurrentFrame,
  } = useImageSequence({
    frameCount: experienceConfig.frameCount,
    initialBatch: experienceConfig.initialPreloadBatch,
    fitMode: 'cover',
  });

  const handleEnterExperience = useCallback(() => {
    setExperienceEntered(true);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setAudioPlaying((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="ferrari-experience-app">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Web Audio V8 Engine Rumble Synthesizer */}
      <AudioExperience isPlaying={audioPlaying} />

      {/* Cinematic Preloader */}
      {!experienceEntered && (
        <LoadingScreen
          progress={progress}
          loadedFrames={loadedFrames}
          totalFrames={totalFrames}
          isReady={isReady}
          onEnter={handleEnterExperience}
        />
      )}

      {/* Fixed Sticky Header */}
      <Header
        onNavigate={handleNavigate}
        isAudioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* Pinned Cinematic Canvas Sequence Hero */}
        <Hero
          canvasRef={canvasRef}
          setFrame={setFrame}
          getCurrentFrame={getCurrentFrame}
          isReady={experienceEntered}
        />

        {/* Section 1: Performance Benchmarks */}
        <PerformanceSection />

        {/* Section 2: V8 Twin-Turbo Engineering Breakdown */}
        <EngineeringSection />

        {/* Section 3: CFD Aerodynamics & Airflow Streamlines */}
        <AerodynamicsSection />

        {/* Section 4: Holographic Cutaway / X-Ray Reveal */}
        <XRaySection />

        {/* Section 5: Multi-perspective Vehicle Explorer */}
        <ExplorerSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
