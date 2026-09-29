export interface HotspotData {
  id: string;
  title: string;
  category: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  specs: { label: string; value: string }[];
  description: string;
  activeInStates?: string[]; // IDs of states where this hotspot is relevant
}

export const carHotspots: HotspotData[] = [
  {
    id: 'engine-bay',
    title: '3.9L TWIN-TURBO V8',
    category: 'POWERTRAIN',
    x: 23,
    y: 35,
    specs: [
      { label: 'DISPLACEMENT', value: '3,902 CC' },
      { label: 'POWER', value: '720 HP @ 8,000 RPM' },
      { label: 'TORQUE', value: '770 NM @ 3,250 RPM' },
    ],
    description: 'Mid-rear mounted V8 F154 CD with zero turbo lag and instantaneous throttle response via Variable Boost Management.',
    activeInStates: ['stop', 'reveal', 'decelerate'],
  },
  {
    id: 'brembo-brakes',
    title: 'BREMBO CARBON-CERAMIC (CCM)',
    category: 'BRAKING SYSTEM',
    x: 42,
    y: 53,
    specs: [
      { label: 'FRONT ROTORS', value: '398 X 38 MM' },
      { label: 'CALIPERS', value: '6-PISTON MONOBLOCK' },
      { label: '100–0 KM/H', value: '29.5 METERS' },
    ],
    description: 'High thermal resistance carbon-ceramic compound with integrated brake cooling ducts fed through the front bumper.',
    activeInStates: ['launch', 'drift', 'decelerate', 'stop', 'reveal'],
  },
  {
    id: 's-duct',
    title: 'F1-DERIVED S-DUCT',
    category: 'AERODYNAMICS',
    x: 76,
    y: 52,
    specs: [
      { label: 'DOWNFORCE GAIN', value: '+15%' },
      { label: 'DRAG COEFFICIENT', value: '0.33 CD' },
      { label: 'FLOW VELOCITY', value: 'HIGH EFFICIENCY' },
    ],
    description: 'Air ingested by central intake is diverted upward through the bonnet duct, generating substantial front downforce without drag penalty.',
    activeInStates: ['launch', 'drift', 'decelerate', 'stop', 'reveal'],
  },
  {
    id: 'cockpit-cabin',
    title: 'HUMAN MACHINE INTERFACE (HMI)',
    category: 'COCKPIT & INTERIOR',
    x: 29,
    y: 36,
    specs: [
      { label: 'STEERING', value: 'F1 MULTIFUNCTION WHEEL' },
      { label: 'MANETTINO', value: '5-STAGE DYNAMICS' },
      { label: 'DRIVER DISPLAY', value: 'DUAL 7" TFT SCREENS' },
    ],
    description: 'Driver-oriented digital cockpit with all primary driving switches mounted directly on the flat-bottom steering wheel.',
    activeInStates: ['stop', 'reveal'],
  },
  {
    id: 'rear-diffuser',
    title: 'BLOWN REAR DIFFUSER',
    category: 'UNDERBODY DYNAMICS',
    x: 16,
    y: 56,
    specs: [
      { label: 'DIFFUSER FLAPS', value: 'ACTIVE DUAL-STAGE' },
      { label: 'DOWNFORCE SUCTION', value: 'GROUND EFFECT' },
      { label: 'EXHAUST INTEGRATION', value: 'FLOW-OPTIMIZED' },
    ],
    description: 'Active aerodynamic flaps dynamically stall downforce at high straightaway speeds and re-engage during high-speed cornering.',
    activeInStates: ['drift', 'decelerate', 'stop', 'reveal'],
  },
];
