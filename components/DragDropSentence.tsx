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
    <div className="bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg my-10">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide">
          EVIDENCE RECONSTRUCTION
        </h4>
        <button onClick={reset} className="text-gray-400 hover:text-noir-red transition-colors">
          <RefreshCw size={20} />
        </button>
      </div>

      <p className="text-gray-500 mb-6 font-mono text-sm">
        Click words to place them into the timeline gaps.
      </p>

      {/* Sentence Structure */}
      <div className="flex flex-wrap items-center gap-3 text-lg md:text-2xl font-mono text-gray-800 dark:text-gray-300 mb-8 p-6 bg-gray-50 dark:bg-black rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <span>If he</span>
        
        {/* Slot 1 */}
        <button
          onClick={() => handleSlotClick(1)}
          className={`min-w-[150px] px-4 py-2 rounded border-2 border-b-4 transition-all
            ${slot1 
              ? 'bg-noir-tan text-black border-yellow-700' 
              : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-transparent'
            }
            ${status === 'success' ? '!bg-green-500 !text-white !border-green-700' : ''}
            ${status === 'error' ? '!border-red-500' : ''}
          `}
        >
          {slot1?.text || "________"}
        </button>

        <span>the plane, he</span>

        {/* Slot 2 */}
        <button
          onClick={() => handleSlotClick(2)}
          className={`min-w-[150px] px-4 py-2 rounded border-2 border-b-4 transition-all
            ${slot2 
              ? 'bg-noir-tan text-black border-yellow-700' 
              : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-transparent'
            }
            ${status === 'success' ? '!bg-green-500 !text-white !border-green-700' : ''}
            ${status === 'error' ? '!border-red-500' : ''}
          `}
        >
          {slot2?.text || "________"}
        </button>

        <span>arrested.</span>
      </div>

      {/* Word Bank */}
      <div className="flex flex-wrap gap-4 justify-center">
        {bank.map((word) => (
          <button
            key={word.id}
            onClick={() => handleWordClick(word)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:border-noir-red hover:-translate-y-1 transition-all text-gray-800 dark:text-gray-200 font-bold"
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
            className="bg-noir-red text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest shadow-lg hover:bg-red-600 transition-colors animate-in fade-in slide-in-from-bottom-2"
          >
            VERIFY SEQUENCE
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 text-center text-green-500 font-bold font-mono flex items-center justify-center gap-2 animate-bounce">
          <Check size={24} /> SEQUENCE VERIFIED
        </div>
      )}
    </div>
  );
};