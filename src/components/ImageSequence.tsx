import React, { useEffect, useRef, useState } from 'react';
import './ImageSequence.css';

interface ImageSequenceProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  currentFrame: number;
  totalFrames: number;
  fallbackImage?: string;
  onManualScrub?: (frame: number) => void;
  interactive?: boolean;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
  canvasRef,
  currentFrame,
  totalFrames,
  fallbackImage = '/images/testarossa-jpg/ezgif-frame-001.jpg',
  onManualScrub,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(1);

  // Manual interactive scrub on drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive || !onManualScrub) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    startFrameRef.current = currentFrame;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !onManualScrub) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map drag distance (e.g. 10px per frame)
    const frameDelta = Math.round(deltaX / 5);
    let target = startFrameRef.current + frameDelta;
    // Loop or clamp
    while (target < 1) target += totalFrames;
    while (target > totalFrames) target -= totalFrames;
    onManualScrub(target);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignored
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`image-sequence-container ${isDragging ? 'dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas
        ref={canvasRef}
        className="sequence-canvas"
        aria-label="Interactive 3D vehicle sequence viewer"
        role="img"
      >
        {/* Fallback image if Canvas is unsupported */}
        <img
          src={fallbackImage}
          alt="Ferrari F8 Tributo Supercar"
          className="canvas-fallback-img"
        />
      </canvas>

      {/* Subtle cinematic vignette overlay to blend edges seamlessly with #050505 */}
      <div className="canvas-vignette" />
      <div className="canvas-bottom-gradient" />
    </div>
  );
};
