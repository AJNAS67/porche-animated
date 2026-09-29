export interface CarSpec {
  value: string;
  unit: string;
  numericValue: number;
  label: string;
  sublabel: string;
  detail: string;
}

export interface EngineFeature {
  id: string;
  title: string;
  category: string;
  specs: string;
  description: string;
}

export interface AeroFeature {
  id: string;
  name: string;
  gain: string;
  description: string;
  coords: { x: number; y: number };
}

export interface ExplorerTab {
  id: 'exterior' | 'interior' | 'engineering' | 'technology';
  label: string;
  title: string;
  subtitle: string;
  image: string;
  specs: { label: string; value: string }[];
  highlights: string[];
}

export const carData = {
  model: 'F8 TRIBUTO',
  tagline: 'A NEW ERA OF PERFORMANCE',
  brand: 'FERRARI',
  heroSubtitle: 'THE TRIBUTE TO EXCELLENCE',
  
  keySpecs: [
    {
      numericValue: 720,
      value: '720',
      unit: 'HP',
      label: 'MAXIMUM POWER',
      sublabel: '@ 8,000 RPM',
      detail: '185 cv/l specific output record for Ferrari production V8',
    },
    {
      numericValue: 770,
      value: '770',
      unit: 'NM',
      label: 'MAXIMUM TORQUE',
      sublabel: '@ 3,250 RPM',
      detail: 'Zero turbo lag with Variable Torque Management',
    },
    {
      numericValue: 2.9,
      value: '2.9',
      unit: 'SEC',
      label: '0–100 KM/H',
      sublabel: 'STANDING START',
      detail: 'Supercar benchmark acceleration with F1 launch control',
    },
    {
      numericValue: 340,
      value: '340',
      unit: 'KM/H',
      label: 'MAXIMUM SPEED',
      sublabel: '211 MPH',
      detail: 'Aerodynamically optimized top velocity without drag penalty',
    },
  ],

  secondarySpecs: [
    { label: 'DISPLACEMENT', value: '3,902 CC' },
    { label: '0–200 KM/H', value: '7.8 SEC' },
    { label: 'DRY WEIGHT', value: '1,330 KG' },
    { label: 'WEIGHT/POWER', value: '1.85 KG/HP' },
    { label: 'TRANSMISSION', value: '7-SPEED DUAL-CLUTCH' },
    { label: 'DRIVETRAIN', value: 'REAR-WHEEL DRIVE' },
    { label: 'EMISSIONS/CYCLE', value: 'EURO 6D-TEMP' },
    { label: 'BRAKING 100-0', value: '29.5 METERS' },
  ],

  engineFeatures: [
    {
      id: 'twin-turbos',
      title: 'TWIN TITANIUM TURBOS',
      category: 'FORCED INDUCTION',
      specs: 'ZERO TURBO LAG',
      description: 'Compact twin-scroll turbochargers with titanium-aluminide turbine wheels and ball bearings for instantaneous throttle response.',
    },
    {
      id: 'crankshaft',
      title: 'FLAT-PLANE CRANKSHAFT',
      category: 'ROTATING ASSEMBLY',
      specs: '180° PIN ORIENTATION',
      description: 'A pure racing heritage flat-plane crank that ensures equal exhaust pulse firing, sharp throttle modulation, and the signature Ferrari acoustic crescendo.',
    },
    {
      id: 'rods',
      title: 'TITANIUM CONNECTING RODS',
      category: 'LIGHTWEIGHT INTERNALS',
      specs: '-17% ROTATING MASS',
      description: 'Direct motorsport transfer from the 488 Challenge and Pista, shaving rotating inertia and enabling immediate 8,000 RPM redline response.',
    },
    {
      id: 'exhaust',
      title: 'INCONEL EXHAUST MANIFOLD',
      category: 'ACOUSTIC ARCHITECTURE',
      specs: '-9.7 KG WEIGHT',
      description: 'Formula 1-grade Inconel headers optimize gas fluid dynamics while amplifying harmonic exhaust frequencies inside and outside the cockpit.',
    },
  ] as EngineFeature[],

  aeroFeatures: [
    {
      id: 's-duct',
      name: 'FRONT S-DUCT',
      gain: '+15% DOWNFORCE',
      description: 'Directly borrowed from F1, air entering the front bumper exits upward through the bonnet, drawing the front axle tight against the asphalt.',
      coords: { x: 38, y: 46 },
    },
    {
      id: 'side-intakes',
      name: 'LATERAL CHARGE INTAKES',
      gain: '+10% INTERCOOLER EFFICIENCY',
      description: 'Sculpted dynamic air scoops feed compressed air directly to dual intercoolers, maintaining optimal intake density under heavy circuit loads.',
      coords: { x: 62, y: 42 },
    },
    {
      id: 'blown-spoiler',
      name: 'BLOWN REAR SPOILER',
      gain: '+25% REAR DOWNFORCE',
      description: 'Patented rear aerodynamics channel high-pressure air through an internal duct, increasing downforce without penalizing aerodynamic drag.',
      coords: { x: 80, y: 35 },
    },
    {
      id: 'rear-diffuser',
      name: 'ACTIVE UNDERBODY DIFFUSER',
      gain: 'DUAL-STAGE EXTENSION',
      description: 'Three pairs of active flaps deploy at high speeds to stall the diffuser, shedding drag on straights and engaging instantly under braking.',
      coords: { x: 22, y: 65 },
    },
  ] as AeroFeature[],

  explorerTabs: [
    {
      id: 'exterior',
      label: 'EXTERIOR',
      title: 'SCULPTED BY THE WIND',
      subtitle: 'FORM FOLLOWS FUNCTION WITH UNCOMPROMISED BEAUTY',
      image: '/frames/frame-0001.jpg',
      specs: [
        { label: 'Length', value: '4,611 mm' },
        { label: 'Width', value: '1,979 mm' },
        { label: 'Height', value: '1,206 mm' },
        { label: 'Wheelbase', value: '2,650 mm' },
      ],
      highlights: [
        'Rosso Corsa signature composite coachwork',
        'Horizontal LED headlamp clusters with compact aero intakes',
        'Twin rear tail-lamp clusters paying tribute to the classic 308 GTB',
        'Lexan slotted rear screen showcasing the mid-rear V8',
      ],
    },
    {
      id: 'interior',
      label: 'INTERIOR',
      title: 'DRIVER-CENTRIC ARCHITECTURE',
      subtitle: 'EVERY CONTROL AT YOUR FINGERTIPS',
      image: '/images/ferrari_f8_interior.jpg',
      specs: [
        { label: 'Steering Wheel', value: 'F1 Manettino & LED rev bar' },
        { label: 'Displays', value: 'Twin 7-inch TFT Displays' },
        { label: 'Passenger Screen', value: 'Optional 7-inch Touchscreen' },
        { label: 'Seating', value: 'Carbon Racing Buckets' },
      ],
      highlights: [
        'Aviation-inspired sculpted dash with aluminum bridge console',
        'Multifunction steering wheel housing indicators, wipers, and engine start',
        'Hand-stitched Italian leather with contrast red stitching',
        'Carbon-fiber driver zone with gearshift paddles mounted on column',
      ],
    },
    {
      id: 'engineering',
      label: 'ENGINEERING',
      title: 'HEART OF A CHAMPION',
      subtitle: 'INTERNATIONAL ENGINE OF THE YEAR 4 CONSECUTIVE YEARS',
      image: '/images/ferrari_f8_engine.jpg',
      specs: [
        { label: 'Configuration', value: '90° V8 Twin-Turbo' },
        { label: 'Max Redline', value: '8,000 RPM' },
        { label: 'Compression Ratio', value: '9.6:1' },
        { label: 'Specific Power', value: '185 cv/l' },
      ],
      highlights: [
        'Zero turbo lag guaranteed by Variable Torque Management',
        'Ion-sensing knock control system per cylinder',
        'Lightweight carbon intake plenum with tuned resonance runner lengths',
        'Dual-clutch 7-speed gearbox with zero-torque-interruption shifts',
      ],
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      title: 'DYNAMIC ENHANCER & TELEMETRY',
      subtitle: 'CONFIDENCE AT THE LIMIT OF LATERAL ADHESION',
      image: '/images/ferrari_f8_xray.jpg',
      specs: [
        { label: 'Dynamics System', value: 'Side Slip Control (SSC 6.1)' },
        { label: 'Brake Enhancement', value: 'Ferrari Dynamic Enhancer (FDE+)' },
        { label: 'Differential', value: 'E-Diff 3 Electronic Differential' },
        { label: 'Suspension', value: 'SCM-E Magnetorheological Dampers' },
      ],
      highlights: [
        'FDE+ active in CT-Off mode for controlled drift angles on track',
        'Brembo carbon-ceramic matrix brakes with 398mm front discs',
        'Predictive traction control anticipating road surface friction changes',
        'Telemetry system with race track lap telemetry recording',
      ],
    },
  ] as ExplorerTab[],
};
