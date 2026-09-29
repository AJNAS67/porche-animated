import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animate numbers counting up when entering viewport
 */
export function animateCounter(
  targetElement: HTMLElement,
  endValue: number,
  options: {
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    triggerElement?: HTMLElement;
  } = {}
) {
  const {
    duration = 2.2,
    decimals = 0,
    prefix = '',
    suffix = '',
    triggerElement = targetElement,
  } = options;

  const obj = { val: 0 };

  return gsap.to(obj, {
    val: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top 85%',
      once: true,
    },
    onUpdate: () => {
      if (targetElement) {
        targetElement.innerText = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
      }
    },
  });
}

/**
 * Reveal stagger elements on scroll
 */
export function animateScrollFade(
  elements: HTMLElement[] | NodeListOf<HTMLElement>,
  trigger: HTMLElement,
  options: {
    yOffset?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const {
    yOffset = 30,
    stagger = 0.15,
    duration = 1.0,
    start = 'top 80%',
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: yOffset },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
}
