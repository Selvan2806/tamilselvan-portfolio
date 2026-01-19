import { useState, useEffect, useCallback } from 'react';

interface AntiSpamChallenge {
  question: string;
  answer: number;
}

interface UseAntiSpamReturn {
  // Honeypot field value and handler
  honeypot: string;
  setHoneypot: (value: string) => void;
  // Time tracking
  formLoadTime: number;
  // Math challenge
  challenge: AntiSpamChallenge;
  challengeAnswer: string;
  setChallengeAnswer: (value: string) => void;
  regenerateChallenge: () => void;
  // Validation
  validateSubmission: () => { valid: boolean; error?: string };
  // For chatbot - simpler validation without math challenge
  validateChatSubmission: () => { valid: boolean; error?: string };
}

const generateMathChallenge = (): AntiSpamChallenge => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return {
    question: `What is ${a} + ${b}?`,
    answer: a + b,
  };
};

const MIN_SUBMISSION_TIME_MS = 3000; // Minimum 3 seconds to fill form
const MIN_CHAT_TIME_MS = 500; // Minimum 0.5 seconds for chat (faster interactions)

export const useAntiSpam = (isChatbot = false): UseAntiSpamReturn => {
  const [honeypot, setHoneypot] = useState('');
  const [formLoadTime] = useState(() => Date.now());
  const [challenge, setChallenge] = useState<AntiSpamChallenge>(generateMathChallenge);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const regenerateChallenge = useCallback(() => {
    setChallenge(generateMathChallenge());
    setChallengeAnswer('');
  }, []);

  // For forms with math challenge
  const validateSubmission = useCallback((): { valid: boolean; error?: string } => {
    // Check honeypot (should be empty)
    if (honeypot.trim() !== '') {
      // Silently fail for bots - don't give them feedback
      console.warn('Anti-spam: Honeypot field filled');
      return { valid: false, error: 'Submission failed. Please try again.' };
    }

    // Check time-based validation
    const elapsed = Date.now() - formLoadTime;
    if (elapsed < MIN_SUBMISSION_TIME_MS) {
      return { 
        valid: false, 
        error: 'Please take a moment to fill out the form properly.' 
      };
    }

    // Check math challenge
    const userAnswer = parseInt(challengeAnswer.trim(), 10);
    if (isNaN(userAnswer) || userAnswer !== challenge.answer) {
      return { 
        valid: false, 
        error: 'Incorrect answer to the security question. Please try again.' 
      };
    }

    return { valid: true };
  }, [honeypot, formLoadTime, challengeAnswer, challenge.answer]);

  // For chatbot - simpler validation without math challenge
  const validateChatSubmission = useCallback((): { valid: boolean; error?: string } => {
    // Check time-based validation (shorter for chat)
    const elapsed = Date.now() - formLoadTime;
    if (elapsed < MIN_CHAT_TIME_MS) {
      return { 
        valid: false, 
        error: 'Please wait a moment before sending.' 
      };
    }

    return { valid: true };
  }, [formLoadTime]);

  return {
    honeypot,
    setHoneypot,
    formLoadTime,
    challenge,
    challengeAnswer,
    setChallengeAnswer,
    regenerateChallenge,
    validateSubmission,
    validateChatSubmission,
  };
};
