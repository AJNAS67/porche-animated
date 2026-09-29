import { useEffect, useRef } from 'react';

interface AudioExperienceProps {
  isPlaying: boolean;
}

export const AudioExperience: React.FC<AudioExperienceProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      return;
    }

    // Initialize Web Audio API on user toggle
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const master = ctx.createGain();
        master.gain.value = 0.001;
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // V8 Low-Frequency Rumble Oscillator (sawtooth + lowpass)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(48, ctx.currentTime); // 48Hz idle rumble

        const filter1 = ctx.createBiquadFilter();
        filter1.type = 'lowpass';
        filter1.frequency.setValueAtTime(140, ctx.currentTime);

        osc1.connect(filter1);
        filter1.connect(master);
        osc1.start();
        osc1Ref.current = osc1;

        // Turbo Whistle Oscillator (sine + highpass)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1200, ctx.currentTime);

        const filter2 = ctx.createBiquadFilter();
        filter2.type = 'bandpass';
        filter2.frequency.setValueAtTime(1400, ctx.currentTime);
        filter2.Q.setValueAtTime(4.0, ctx.currentTime);

        const turboGain = ctx.createGain();
        turboGain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc2.connect(filter2);
        filter2.connect(turboGain);
        turboGain.connect(master);
        osc2.start();
        osc2Ref.current = osc2;
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.18, audioCtxRef.current.currentTime, 0.4);
      }
    } catch (err) {
      console.warn('Web Audio synthesis unavailable:', err);
    }

    return () => {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      }
    };
  }, [isPlaying]);

  return null;
};
