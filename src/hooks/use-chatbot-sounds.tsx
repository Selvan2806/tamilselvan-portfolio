import { useCallback, useRef } from 'react';

const SFX_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-sfx`;

// Cache for generated sounds
const soundCache = new Map<string, string>();

// Sound prompts for different events
const SOUND_PROMPTS = {
  open: "soft digital pop sound, notification chime, friendly UI open sound",
  close: "gentle digital close sound, soft swoosh down, UI minimize",
  send: "quick digital send sound, message whoosh, soft ping",
  receive: "gentle notification ding, soft digital chime, message received tone",
} as const;

type SoundType = keyof typeof SOUND_PROMPTS;

export const useChatbotSounds = () => {
  const isLoadingRef = useRef<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateSound = useCallback(async (type: SoundType): Promise<string | null> => {
    const cacheKey = type;
    
    // Return cached sound if available
    if (soundCache.has(cacheKey)) {
      return soundCache.get(cacheKey)!;
    }

    // Prevent duplicate requests
    if (isLoadingRef.current[cacheKey]) {
      return null;
    }

    isLoadingRef.current[cacheKey] = true;

    try {
      const response = await fetch(SFX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          prompt: SOUND_PROMPTS[type],
          duration: type === 'open' || type === 'close' ? 0.8 : 0.5,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to generate ${type} sound:`, response.status);
        return null;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the sound
      soundCache.set(cacheKey, audioUrl);
      
      return audioUrl;
    } catch (error) {
      console.error(`Error generating ${type} sound:`, error);
      return null;
    } finally {
      isLoadingRef.current[cacheKey] = false;
    }
  }, []);

  const playSound = useCallback(async (type: SoundType) => {
    try {
      const audioUrl = await generateSound(type);
      
      if (!audioUrl) {
        return;
      }

      // Stop any currently playing sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audio.volume = 0.5;
      audioRef.current = audio;
      
      await audio.play();
    } catch (error) {
      // Silently fail - sound effects are non-critical
      console.error('Error playing sound:', error);
    }
  }, [generateSound]);

  // Pre-generate sounds in the background
  const preloadSounds = useCallback(() => {
    Object.keys(SOUND_PROMPTS).forEach((type) => {
      generateSound(type as SoundType);
    });
  }, [generateSound]);

  return {
    playSound,
    preloadSounds,
  };
};
