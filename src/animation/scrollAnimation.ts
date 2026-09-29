import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationOptions {
  triggerElement: HTMLElement;
  totalFrames: number;
  onFrameUpdate: (frame: number) => void;
  onProgressUpdate?: (progress: number) => void;
  onStateUpdate?: (stateIndex: number) => void;
  pinDistance?: string; // e.g. '+=350%'
}

export function initHeroScrollSequence(options: ScrollAnimationOptions): ScrollTrigger {
  const {
    triggerElement,
    totalFrames,
    onFrameUpdate,
    onProgressUpdate,
    onStateUpdate,
    pinDistance = '+=300%',
  } = options;

  const frameController = { frame: 1 };

  const trigger = ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top top',
    end: pinDistance,
    pin: true,
    scrub: 0.6, // Smooth scrubbing with natural momentum
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const targetFrame = Math.max(1, Math.min(totalFrames, Math.round(progress * (totalFrames - 1) + 1)));

      onFrameUpdate(targetFrame);
      onProgressUpdate?.(progress);

      // Map progress to 5 cinematic states
      let stateIndex = 0;
      if (progress < 0.20) stateIndex = 0; // State 01: Launch
      else if (progress < 0.48) stateIndex = 1; // State 02: Drift
      else if (progress < 0.72) stateIndex = 2; // State 03: Decelerate
      else if (progress < 0.85) stateIndex = 3; // State 04: Stop
      else stateIndex = 4; // State 05: Door reveal

      onStateUpdate?.(stateIndex);
    },
  });

  return trigger;
}
