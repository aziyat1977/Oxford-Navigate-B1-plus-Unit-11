// Text-to-Speech Helper
export const speak = (text: string, rate: number = 0.9) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // Slightly slower for learning
    utterance.pitch = 1.0;
    utterance.lang = 'en-GB'; // British English for Oxford Navigate context
    window.speechSynthesis.speak(utterance);
  }
};

// Procedural Sound Effects (No external assets needed)
// Uses Web Audio API to create simple UI sounds
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playSFX = (type: 'correct' | 'wrong' | 'click' | 'reveal' | 'glitch' | 'typing') => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'correct': // High pitched success chime
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
        break;

      case 'wrong': // Low buzz
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.linearRampToValueAtTime(100, now + 0.3);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'click': // Sharp tick
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, now);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;

      case 'reveal': // Soft sweep
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.linearRampToValueAtTime(400, now + 0.2);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'glitch': // Digital noise
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, now);
        oscillator.frequency.linearRampToValueAtTime(500, now + 0.1);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;
        
      case 'typing': // Keyboard clack
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        oscillator.start(now);
        oscillator.stop(now + 0.03);
        break;
    }
  } catch (e) {
    console.warn("Audio Context Error", e);
  }
};