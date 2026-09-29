export interface SequenceState {
  id: string;
  name: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
  badge: string;
  telemetry: {
    speed: string;
    rpm: string;
    gear: string;
    gForce: string;
    status: string;
  };
}

export interface ExperienceConfig {
  frameCount: number;
  framePath: string;
  fallbackFramePath: string;
  padding: number;
  initialPreloadBatch: number;
  fallbackImage: string;
  aspectRatio: number;
  states: SequenceState[];
  hero: {
    startFrame: number;
    endFrame: number;
  };
  xray: {
    enabled: boolean;
    image: string;
  };
  aero: {
    image: string;
  };
  interior: {
    image: string;
  };
  engine: {
    image: string;
  };
}

export const experienceConfig: ExperienceConfig = {
  frameCount: 300,
  framePath: '/images/testarossa-jpg/ezgif-frame-{index}.jpg',
  fallbackFramePath: '/frames/frame-{index}.jpg',
  padding: 3,
  initialPreloadBatch: 40,
  fallbackImage: '/images/testarossa-jpg/ezgif-frame-001.jpg',
  aspectRatio: 16 / 9,

  hero: {
    startFrame: 1,
    endFrame: 300,
  },

  states: [
    {
      id: 'launch',
      name: 'LAUNCH & ACCELERATION',
      subtitle: 'TWIN-TURBO BOOST INITIATION',
      startFrame: 1,
      endFrame: 60,
      badge: 'STATE 01',
      telemetry: {
        speed: '185 KM/H',
        rpm: '7,200 RPM',
        gear: 'GEAR 3',
        gForce: '1.45 G',
        status: 'TRACTION ACTIVE',
      },
    },
    {
      id: 'drift',
      name: 'HIGH-G LATERAL DRIFT',
      subtitle: 'SIDE SLIP ANGLE CONTROL 6.1',
      startFrame: 61,
      endFrame: 140,
      badge: 'STATE 02',
      telemetry: {
        speed: '240 KM/H',
        rpm: '7,800 RPM',
        gear: 'GEAR 4',
        gForce: '1.72 G',
        status: 'DRIFT CONTROLLER ON',
      },
    },
    {
      id: 'decelerate',
      name: 'AERO BRAKING & STABILIZATION',
      subtitle: 'CARBON-CERAMIC BRAKE VECTORING',
      startFrame: 141,
      endFrame: 210,
      badge: 'STATE 03',
      telemetry: {
        speed: '95 KM/H',
        rpm: '4,400 RPM',
        gear: 'GEAR 2',
        gForce: '-1.50 G',
        status: 'BRAKE ENERGY RECOVERY',
      },
    },
    {
      id: 'stop',
      name: 'DYNAMIC HALT & STANCE',
      subtitle: 'ACTIVE SUSPENSION LEVELING',
      startFrame: 211,
      endFrame: 240,
      badge: 'STATE 04',
      telemetry: {
        speed: '0 KM/H',
        rpm: '850 RPM',
        gear: 'NEUTRAL',
        gForce: '0.00 G',
        status: 'IDLE / TELEMETRY LOCKED',
      },
    },
    {
      id: 'reveal',
      name: 'DIHEDRAL REVEAL & COCKPIT',
      subtitle: 'AERODYNAMIC ACCESS INITIATION',
      startFrame: 241,
      endFrame: 300,
      badge: 'STATE 05',
      telemetry: {
        speed: '0 KM/H',
        rpm: '0 RPM',
        gear: 'PARK',
        gForce: 'STATIC',
        status: 'COCKPIT UNLOCKED',
      },
    },
  ],

  xray: {
    enabled: true,
    image: '/images/ferrari_f8_xray.jpg',
  },

  aero: {
    image: '/images/ferrari_f8_aero.jpg',
  },

  interior: {
    image: '/images/ferrari_f8_interior.jpg',
  },

  engine: {
    image: '/images/ferrari_f8_engine.jpg',
  },
};

/**
 * Returns formatted frame path using configured padding.
 */
export function getFramePath(index: number, config: ExperienceConfig = experienceConfig): string {
  const clampedIndex = Math.max(1, Math.min(config.frameCount, Math.round(index)));
  const paddedIndex = String(clampedIndex).padStart(config.padding, '0');
  return config.framePath.replace('{index}', paddedIndex);
}

/**
 * Fallback path generator for alternate directory format (e.g. 4-digit frames or 3-digit ezgif naming)
 */
export function getFallbackFramePath(index: number, config: ExperienceConfig = experienceConfig): string {
  const clampedIndex = Math.max(1, Math.min(config.frameCount, Math.round(index)));
  const padLen = config.fallbackFramePath.includes('/frames/') ? 4 : 3;
  const padded = String(clampedIndex).padStart(padLen, '0');
  return config.fallbackFramePath.replace('{index}', padded);
}

/**
 * Returns an ordered array of candidate URLs to load a given frame.
 * Tries the primary path first, then alternate folder conventions, and lastly legacy fallback.
 */
export function getFrameCandidatePaths(index: number, config: ExperienceConfig = experienceConfig): string[] {
  const clampedIndex = Math.max(1, Math.min(config.frameCount, Math.round(index)));
  const padded3 = String(clampedIndex).padStart(3, '0');
  const padded4 = String(clampedIndex).padStart(4, '0');

  const candidates = [
    getFramePath(clampedIndex, config),
    `/testarossa-jpg/ezgif-frame-${padded3}.jpg`,
    `/images/testarossa-jpg/ezgif-frame-${padded3}.jpg`,
    getFallbackFramePath(clampedIndex, config),
    `/frames/frame-${padded4}.jpg`,
  ];

  return Array.from(new Set(candidates));
}
