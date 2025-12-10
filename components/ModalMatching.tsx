import React, { useState } from 'react';
import { playSFX } from '../utils/audio';
import { Link2 } from 'lucide-react';

interface Item {
  id: string;
  text: string;
}

const CONTEXTS: Item[] = [
  { id: 'c1', text: "It's an office rule." },
  { id: 'c2', text: "I'm not 100% sure." },
  { id: 'c3', text: "It was necessary yesterday." },
];

const MODALS: Item[] = [
  { id: 'm1', text: "Must / Have to" },
  { id: 'm2', text: "Might / Could" },
  { id: 'm3', text: "Had to" },
];

const CORRECT_MATCHES: Record<string, string> = {
  'c1': 'm1',
  'c2': 'm2',
  'c3': 'm3'
};

export const ModalMatching: React.FC = () => {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<string[]>([]);

  const handleContextClick = (id: string) => {
    if (completed.includes(id)) return;
    playSFX('click');
    setSelectedContext(id);
  };

  const handleModalClick = (id: string) => {
    if (!selectedContext) return;
    
    // Check match
    if (CORRECT_MATCHES[selectedContext] === id) {
      playSFX('correct');
      setMatches(prev => ({ ...prev, [selectedContext]: id }));
      setCompleted(prev => [...prev, selectedContext]);
      setSelectedContext(null);
    } else {
      playSFX('wrong');
      setSelectedContext(null); // Reset selection on wrong guess
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 md:p-8 my-10 shadow-lg">
      <h4 className="text-lg md:text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-6 md:mb-8 text-center">
        CONNECT THE CONTEXT
      </h4>

      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-16">
        
        {/* Contexts Column */}
        <div className="flex flex-col gap-3 md:gap-4 flex-1">
          <h5 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">SITUATION</h5>
          {CONTEXTS.map(item => {
            const isMatched = completed.includes(item.id);
            const isSelected = selectedContext === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleContextClick(item.id)}
                disabled={isMatched}
                className={`
                  p-3 md:p-4 rounded-lg border-2 text-sm md:text-base font-medium transition-all relative h-full min-h-[60px]
                  ${isMatched 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 opacity-50' 
                    : isSelected
                      ? 'bg-noir-tan text-black border-yellow-600 scale-105 z-10'
                      : 'bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }
                `}
              >
                {item.text}
                {isSelected && (
                  <div className="absolute left-1/2 -bottom-3 md:-right-3 md:top-1/2 md:-translate-y-1/2 md:left-auto w-4 h-4 bg-yellow-600 rotate-45 transform -translate-x-1/2 md:translate-x-0"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Center Connector */}
        <div className="flex flex-col justify-center items-center text-gray-300 dark:text-gray-700 px-1 py-2 md:py-0">
           <Link2 size={24} className="md:w-8 md:h-8 rotate-90 md:rotate-0" />
        </div>

        {/* Modals Column */}
        <div className="flex flex-col gap-3 md:gap-4 flex-1">
          <h5 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">MODAL VERB</h5>
          {MODALS.map(item => {
            // Check if this modal is part of any completed match
            const isMatched = Object.values(matches).includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleModalClick(item.id)}
                disabled={isMatched}
                className={`
                  p-3 md:p-4 rounded-lg border-2 text-sm md:text-base font-mono font-bold transition-all h-full min-h-[60px]
                  ${isMatched 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 opacity-50' 
                    : selectedContext
                      ? 'bg-white dark:bg-black border-dashed border-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800'
                      : 'bg-gray-100 dark:bg-zinc-800 border-transparent text-gray-400 cursor-default'
                  }
                `}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
      
      {completed.length === CONTEXTS.length && (
         <div className="mt-8 text-center text-green-500 font-bold animate-pulse text-sm md:text-base">
            ALL CONNECTIONS ESTABLISHED
         </div>
      )}
    </div>
  );
};