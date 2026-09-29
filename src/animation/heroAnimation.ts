import { gsap } from 'gsap';

export interface HeroEntranceElements {
  overlayRef: HTMLElement | null;
  brandTagRef: HTMLElement | null;
  mainTitleRef: HTMLElement | null;
  subTitleRef: HTMLElement | null;
  specsBarRef: HTMLElement | null;
  telemetryRef: HTMLElement | null;
  scrollIndicatorRef: HTMLElement | null;
}

export function playHeroEntranceTimeline(
  elements: HeroEntranceElements,
  onComplete?: () => void
): gsap.core.Timeline {
  const {
    overlayRef,
    brandTagRef,
    mainTitleRef,
    subTitleRef,
    specsBarRef,
    telemetryRef,
    scrollIndicatorRef,
  } = elements;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete,
  });

  // Fade out black curtain overlay
  if (overlayRef) {
    tl.to(overlayRef, {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      pointerEvents: 'none',
    }, 0);
  }

  // Brand tag reveal
  if (brandTagRef) {
    tl.fromTo(
      brandTagRef,
      { opacity: 0, y: -20, letterSpacing: '0.6em' },
      { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.0 },
      0.3
    );
  }

  // Hero main title reveal
  if (mainTitleRef) {
    tl.fromTo(
      mainTitleRef,
      { opacity: 0, y: 35, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2 },
      0.5
    );
  }

  // Subtitle reveal
  if (subTitleRef) {
    tl.fromTo(
      subTitleRef,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 0.9 },
      0.8
    );
  }

  // Telemetry HUD reveal
  if (telemetryRef) {
    tl.fromTo(
      telemetryRef,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1.0 },
      0.9
    );
  }

  // Bottom specs bar reveal
  if (specsBarRef) {
    tl.fromTo(
      specsBarRef,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0 },
      1.0
    );
  }

  // Scroll indicator bounce
  if (scrollIndicatorRef) {
    tl.fromTo(
      scrollIndicatorRef,
      { opacity: 0 },
      { opacity: 0.8, duration: 0.8 },
      1.3
    );
  }

  return tl;
}
