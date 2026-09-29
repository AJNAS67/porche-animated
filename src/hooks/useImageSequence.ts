import { useEffect, useRef, useState, useCallback } from 'react';
import {
  experienceConfig,
  getFramePath,
  getFallbackFramePath,
  getFrameCandidatePaths,
} from '../data/experienceConfig';
import { useResponsive } from './useResponsive';

export interface UseImageSequenceOptions {
  frameCount?: number;
  initialBatch?: number;
  fitMode?: 'cover' | 'contain';
  onInitialBatchLoaded?: () => void;
}

export interface UseImageSequenceReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  progress: number;
  loadedFrames: number;
  totalFrames: number;
  isLoading: boolean;
  isReady: boolean;
  hasError: boolean;
  setFrame: (index: number) => void;
  getCurrentFrame: () => number;
}

export function useImageSequence(options: UseImageSequenceOptions = {}): UseImageSequenceReturn {
  const {
    frameCount = experienceConfig.frameCount,
    initialBatch = experienceConfig.initialPreloadBatch,
    fitMode = 'cover',
    onInitialBatchLoaded,
  } = options;

  const { dpr } = useResponsive();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Image cache array indexed 1 to frameCount
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);

  const [loadedFrames, setLoadedFrames] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Initialize image array if empty
  if (imagesRef.current.length !== frameCount + 1) {
    imagesRef.current = new Array(frameCount + 1).fill(null);
  }

  // Draw specific frame onto canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or fallback to closest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[frameIndex] || null;

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      for (let offset = 1; offset < frameCount; offset++) {
        const lower = frameIndex - offset;
        const higher = frameIndex + offset;
        if (lower >= 1 && imagesRef.current[lower]?.complete && imagesRef.current[lower]?.naturalWidth !== 0) {
          img = imagesRef.current[lower];
          break;
        }
        if (higher <= frameCount && imagesRef.current[higher]?.complete && imagesRef.current[higher]?.naturalWidth !== 0) {
          img = imagesRef.current[higher];
          break;
        }
      }
    }

    // Still null? Use static fallback
    if (!img) {
      img = fallbackImgRef.current;
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
      return;
    }

    // Match canvas pixel buffer to CSS display dimensions * DPR
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.max(1, Math.round(rect.width * dpr));
    const targetHeight = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Preserve aspect ratio (cover / contain)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const hRatio = canvas.width / imgWidth;
    const vRatio = canvas.height / imgHeight;

    const ratio = fitMode === 'cover' ? Math.max(hRatio, vRatio) : Math.min(hRatio, vRatio);
    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const offsetX = (canvas.width - renderWidth) / 2;
    const offsetY = (canvas.height - renderHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, renderWidth, renderHeight);
  }, [dpr, fitMode, frameCount]);

  // Request Animation Frame throttled draw
  const requestDraw = useCallback((frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(currentFrameRef.current);
      rafIdRef.current = null;
    });
  }, [drawFrame]);

  // Public setter for scrubbing/animating frame
  const setFrame = useCallback((index: number) => {
    const clamped = Math.max(1, Math.min(frameCount, Math.round(index)));
    requestDraw(clamped);
  }, [frameCount, requestDraw]);

  const getCurrentFrame = useCallback(() => currentFrameRef.current, []);

  // Preloading system
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const thresholdBatch = Math.min(initialBatch, frameCount);

    // Preload static fallback image first
    const fallbackCandidates = [
      experienceConfig.fallbackImage,
      '/images/testarossa-jpg/ezgif-frame-001.jpg',
      '/testarossa-jpg/ezgif-frame-001.jpg',
      '/frames/frame-0001.jpg',
    ];
    let fallbackIdx = 0;
    const tryLoadFallback = () => {
      if (isCancelled || fallbackIdx >= fallbackCandidates.length) return;
      const src = fallbackCandidates[fallbackIdx++];
      const fallback = new Image();
      fallback.src = src;
      fallback.onload = () => {
        if (isCancelled) return;
        fallbackImgRef.current = fallback;
        if (currentFrameRef.current === 1) {
          requestDraw(1);
        }
      };
      fallback.onerror = () => {
        tryLoadFallback();
      };
    };
    tryLoadFallback();

    const loadSingleFrame = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]?.complete && imagesRef.current[index]?.naturalWidth !== 0) {
          resolve(imagesRef.current[index]);
          return;
        }

        const candidates = getFrameCandidatePaths(index);
        let candidateIdx = 0;

        const tryCandidate = () => {
          if (isCancelled) return resolve(null);
          if (candidateIdx >= candidates.length) {
            // Non-breaking fallback: reuse previous frame or fallback image
            loadedCount++;
            setLoadedFrames(loadedCount);
            if (loadedCount >= thresholdBatch && !isReady) {
              setIsReady(true);
            }
            if (loadedCount >= frameCount) {
              setIsLoading(false);
            }
            resolve(null);
            return;
          }

          const currentSrc = candidates[candidateIdx++];
          const img = new Image();

          img.onload = () => {
            if (isCancelled) return resolve(null);
            imagesRef.current[index] = img;
            loadedCount++;
            setLoadedFrames(loadedCount);

            if (index === currentFrameRef.current || (currentFrameRef.current === 1 && index === 1)) {
              requestDraw(index);
            }

            if (loadedCount >= thresholdBatch && !isReady) {
              setIsReady(true);
              onInitialBatchLoaded?.();
            }

            if (loadedCount >= frameCount) {
              setIsLoading(false);
            }

            resolve(img);
          };

          img.onerror = () => {
            tryCandidate();
          };

          img.src = currentSrc;
        };

        tryCandidate();
      });
    };

    // Load initial priority batch first
    const loadSequence = async () => {
      try {
        // Step 1: Priority load frame 1
        await loadSingleFrame(1);

        // Step 2: Priority load keyframes up to thresholdBatch
        const priorityIndices: number[] = [];
        for (let i = 2; i <= thresholdBatch; i++) {
          priorityIndices.push(i);
        }

        // Staggered concurrency for initial batch
        const batchSize = 8;
        for (let i = 0; i < priorityIndices.length; i += batchSize) {
          if (isCancelled) break;
          const chunk = priorityIndices.slice(i, i + batchSize);
          await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
        }

        // Step 3: Progressive background loading for remaining frames
        const remainingIndices: number[] = [];
        for (let i = thresholdBatch + 1; i <= frameCount; i++) {
          remainingIndices.push(i);
        }

        for (let i = 0; i < remainingIndices.length; i += 6) {
          if (isCancelled) break;
          const chunk = remainingIndices.slice(i, i + 6);
          await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
          // Brief yield to avoid blocking the main thread during user scroll
          await new Promise((r) => setTimeout(r, 16));
        }
      } catch (err) {
        console.error('Frame preload error:', err);
        setHasError(true);
        setIsReady(true);
        setIsLoading(false);
      }
    };

    loadSequence();

    return () => {
      isCancelled = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [frameCount, initialBatch, isReady, onInitialBatchLoaded, requestDraw]);

  // Redraw on window resize or DPR update
  useEffect(() => {
    const handleResize = () => {
      requestDraw(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [requestDraw]);

  const progress = Math.min(100, Math.round((loadedFrames / frameCount) * 100));

  return {
    canvasRef,
    progress,
    loadedFrames,
    totalFrames: frameCount,
    isLoading,
    isReady,
    hasError,
    setFrame,
    getCurrentFrame,
  };
}
