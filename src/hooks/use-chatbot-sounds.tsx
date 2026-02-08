import { useCallback, useRef } from 'react';

type SoundType = 'open' | 'close' | 'send' | 'receive';

// Audio context singleton
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Sound configurations for different events
const SOUND_CONFIG: Record<SoundType, { frequency: number; duration: number; type: OscillatorType; fadeOut?: boolean }> = {
  open: { frequency: 800, duration: 0.15, type: 'sine', fadeOut: true },
  close: { frequency: 600, duration: 0.12, type: 'sine', fadeOut: true },
  send: { frequency: 1000, duration: 0.08, type: 'sine' },
  receive: { frequency: 880, duration: 0.1, type: 'sine', fadeOut: true },
};

export const useChatbotSounds = () => {
  const isPlayingRef = useRef(false);

  const playSound = useCallback(async (type: SoundType) => {
    // Prevent overlapping sounds
    if (isPlayingRef.current) return;
    
    try {
      const ctx = getAudioContext();
      
      // Resume context if suspended (required for user interaction)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      isPlayingRef.current = true;
      const config = SOUND_CONFIG[type];
      
      // Create oscillator
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency, ctx.currentTime);
      
      // Set volume
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      
      // Add fade out for smoother sound
      if (config.fadeOut) {
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + config.duration);
      }
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Play sound
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + config.duration);
      
      // Cleanup
      oscillator.onended = () => {
        isPlayingRef.current = false;
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      // Silently fail - sound effects are non-critical
      isPlayingRef.current = false;
      console.error('Error playing sound:', error);
    }
  }, []);

  // No preloading needed for Web Audio API
  const preloadSounds = useCallback(() => {
    // Initialize audio context on user interaction
    getAudioContext();
  }, []);

  return {
    playSound,
    preloadSounds,
  };
};
