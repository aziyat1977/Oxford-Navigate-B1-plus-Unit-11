import React, { useState, useEffect } from 'react';
import { playSFX } from '../utils/audio';
import { GripVertical, RefreshCw, Check } from 'lucide-react';

interface Word {
  id: string;
  text: string;
  isCorrectSlot1?: boolean;
  isCorrectSlot2?: boolean;
}

const INITIAL_WORDS: Word[] = [
  { id: 'w1', text: "hadn't crashed", isCorrectSlot1: true },
  { id: 'w2', text: "wouldn't have been", isCorrectSlot2: true },
  { id: 'w3', text: "didn't crash" }, // Distractor
  { id: 'w4', text: "wouldn't be" }, // Distractor
];

export const DragDropSentence: React.FC = () => {
  const [bank, setBank] = useState<Word[]>([]);
  const [slot1, setSlot1] = useState<Word | null>(null);
  const [slot2, setSlot2] = useState<Word | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Shuffle words on mount
    setBank([...INITIAL_WORDS].sort(() => Math.random() - 0.5));
  }, []);

  const handleWordClick = (word: Word) => {
    playSFX('click');
    if (status !== 'idle') setStatus('idle'); // Reset status on interaction

    // Move from bank to first available slot
    if (!slot1) {
      setSlot1(word);
      setBank(bank.filter(w => w.id !== word.id));
    } else if (!slot2) {
      setSlot2(word);
      setBank(bank.filter(w => w.id !== word.id));
    }
  };

  const handleSlotClick = (slotNum: 1 | 2) => {
    playSFX('click');
    if (status !== 'idle') setStatus('idle');

    if (slotNum === 1 && slot1) {
      setBank([...bank, slot1]);
      setSlot1(null);
    } else if (slotNum === 2 && slot2) {
      setBank([...bank, slot2]);
      setSlot2(null);
    }
  };

  const checkAnswer = () => {
    if (slot1?.isCorrectSlot1 && slot2?.isCorrectSlot2) {
      setStatus('success');
      playSFX('correct');
    } else {
      setStatus('error');
      playSFX('wrong');
    }
  };

  const reset = () => {
    setSlot1(null);
    setSlot2(null);
    setBank([...INITIAL_WORDS].sort(() => Math.random() - 0.5));
    setStatus('idle');
    playSFX('click');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-8 shadow-lg my-10">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg md:text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
          EVIDENCE RECONSTRUCTION
        </h4>
        <button onClick={reset} className="text-gray-400 hover:text-noir-red transition-colors p-3 touch-manipulation">
          <RefreshCw size={24} />
        </button>
      </div>

      <p className="text-gray-500 mb-6 font-mono text-xs md:text-sm">
        Tap words to move them into the timeline gaps.
      </p>

      {/* Sentence Structure */}
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 text-base md:text-2xl font-mono text-gray-800 dark:text-gray-300 mb-8 p-4 md:p-6 bg-gray-50 dark:bg-black rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <span className="py-2">If he</span>
        
        {/* Slot 1 */}
        <button
          onClick={() => handleSlotClick(1)}
          className={`min-w-[140px] px-3 py-3 rounded-lg border-2 border-b-4 transition-all text-sm md:text-base font-bold touch-manipulation
            ${slot1 
              ? 'bg-noir-tan text-black border-yellow-700' 
              : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-600 border-dashed'
            }
            ${status === 'success' ? '!bg-green-500 !text-white !border-green-700 !border-solid' : ''}
            ${status === 'error' ? '!border-red-500' : ''}
          `}
        >
          {slot1?.text || "GAP 1"}
        </button>

        <span className="py-2">the plane, he</span>

        {/* Slot 2 */}
        <button
          onClick={() => handleSlotClick(2)}
          className={`min-w-[140px] px-3 py-3 rounded-lg border-2 border-b-4 transition-all text-sm md:text-base font-bold touch-manipulation
            ${slot2 
              ? 'bg-noir-tan text-black border-yellow-700' 
              : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-600 border-dashed'
            }
            ${status === 'success' ? '!bg-green-500 !text-white !border-green-700 !border-solid' : ''}
            ${status === 'error' ? '!border-red-500' : ''}
          `}
        >
          {slot2?.text || "GAP 2"}
        </button>

        <span className="py-2">arrested.</span>
      </div>

      {/* Word Bank */}
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
        {bank.map((word) => (
          <button
            key={word.id}
            onClick={() => handleWordClick(word)}
            className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:border-noir-red hover:-translate-y-1 transition-all text-gray-800 dark:text-gray-200 font-bold text-sm md:text-base touch-manipulation"
          >
            <GripVertical size={16} className="text-gray-400" />
            {word.text}
          </button>
        ))}
      </div>

      {/* Check Button */}
      {slot1 && slot2 && status !== 'success' && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={checkAnswer}
            className="w-full md:w-auto bg-noir-red text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest shadow-lg hover:bg-red-600 transition-colors animate-in fade-in slide-in-from-bottom-2 touch-manipulation"
          >
            VERIFY SEQUENCE
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 text-center text-green-500 font-bold font-mono flex items-center justify-center gap-2 animate-bounce">
          <Check size={28} /> SEQUENCE VERIFIED
        </div>
      )}
    </div>
  );
};