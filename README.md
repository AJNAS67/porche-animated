# Ferrari F8 Tributo — Cinematic 3D Image Sequence Experience

A production-grade, highly immersive automotive showroom experience built with **React**, **Vite**, **TypeScript**, **GSAP ScrollTrigger**, and an optimized **HTML5 Canvas image sequence engine**.

---

## Quick Start: How to Run the Project

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes bundled with Node.js)

### 2. Install Dependencies
Open your terminal (PowerShell, Command Prompt, or bash) in the project root directory and run:

```bash
npm install
```
*(On Windows systems where PowerShell script execution is restricted, you can run `npm.cmd install`)*

### 3. Start Development Server
```bash
npm run dev
```
*(Or `npm.cmd run dev` on Windows)*

The local development server will start at:
```text
http://localhost:3000/
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser to experience the application.

### 4. Build for Production
To create an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Architecture & Technical Overview

### 1. Image Sequence Engine
The primary vehicle animation uses **HTML5 Canvas** rather than placing hundreds of `<img>` tags into the DOM or relying on heavy Three.js 3D models.

- **Progressive Preloader**: Loads initial priority frames immediately so the user can enter the experience, while smoothly streaming remaining frames in the background.
- **Canvas Rendering Controller**: Maintains an in-memory cache, renders inside `requestAnimationFrame`, clamps DPR (max 2.0 desktop, 1.5 mobile) to prevent GPU strain, and preserves aspect ratio.
- **Interactive Drag & Scrub**: Visitors can scroll through the pinned sequence or click and drag horizontally on the canvas to manually rotate and scrub frames.

### 2. Frame Assets & Directory Structure
```text
public/
├── frames/
│   ├── frame-0001.jpg
│   ├── frame-0002.jpg
│   └── ... up to frame-0300.jpg
│
└── images/
    ├── ferrari_f8_engine.jpg
    ├── ferrari_f8_aero.jpg
    ├── ferrari_f8_xray.jpg
    └── ferrari_f8_interior.jpg
```

### 3. Central Configuration (`src/data/experienceConfig.ts`)
To configure frame counts, frame paths, sequence milestones, or assets, edit [experienceConfig.ts](file:///c:/workspace/Personal/porche/src/data/experienceConfig.ts):

```typescript
export const experienceConfig = {
  frameCount: 300,
  framePath: '/frames/frame-{index}.jpg',
  padding: 4,
  initialPreloadBatch: 40,
  fallbackImage: '/frames/frame-0001.jpg',
  aspectRatio: 16 / 9,
  ...
};
```

### 4. Pinned Scroll Milestones (300 Frames)
- **State 01 (Frames 1–60)**: *Launch & Acceleration* — Twin-turbo boost initiation.
- **State 02 (Frames 61–140)**: *High-G Lateral Drift* — Lateral slip angle control.
- **State 03 (Frames 141–210)**: *Aero Braking & Stabilization* — Carbon-ceramic brake vectoring.
- **State 04 (Frames 211–240)**: *Dynamic Halt & Stance* — Stationary stance.
- **State 05 (Frames 241–300)**: *Dihedral Door Reveal* — Driver cockpit reveal.

---

## Interactive Features

1. **Cinematic Hero**: Pinned GSAP ScrollTrigger timeline with live telemetry HUD and draggable canvas scrubber.
2. **Interactive Hotspots**: Inspect Powertrain, Brembo Carbon-Ceramic Brakes, F1 S-Duct, Cabin HMI, and Active Rear Diffuser.
3. **Performance Telemetry**: Animated counter odometers for 720 HP, 770 NM, 340 KM/H, and 2.9 SEC 0–100 km/h.
4. **V8 Engineering Showcase**: Interactive selector for Twin Turbos, Flat-Plane Crank, Titanium Rods, and Inconel Exhaust.
5. **CFD Aerodynamics**: Animated SVG airflow streamlines and interactive downforce markers.
6. **X-Ray Structural Anatomy**: Holographic CAD view with Thermal Scan and Wireframe toggle modes.
7. **Vehicle Explorer**: Multi-perspective tabbed discovery (Exterior, Interior, Engineering, Technology).
8. **Synthesized V8 Audio**: Built-in Web Audio API engine rumble & turbo harmonic toggle (no external audio files required).

---

## License & Disclaimer
*Conceptual digital experience. Not an official Ferrari website. Ferrari, F8 Tributo, and the Prancing Horse device are registered trademarks of Ferrari S.p.A.*
