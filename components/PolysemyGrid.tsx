import React, { useState } from 'react';
import { PolysemyItem } from '../types';

const WORDS: PolysemyItem[] = [
  { id: 1, clue1: "A financial institution", clue2: "The side of a river", answer: "BANK" },
  { id: 2, clue1: "A penalty fee", clue2: "Of high quality / Okay", answer: "FINE" },
  { id: 3, clue1: "To ignite a fire", clue2: "A sports competition", answer: "MATCH" },
  { id: 4, clue1: "To perform on stage", clue2: "Participate in a game", answer: "PLAY" },
];

export const PolysemyGrid: React.FC = () => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealed.includes(id)) {
      setRevealed(revealed.filter(i => i !== id));
    } else {
      setRevealed([...revealed, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {WORDS.map((item) => {
        const isRevealed = revealed.includes(item.id);
        return (
          <div 
            key={item.id}
            onClick={() => toggleReveal(item.id)}
            className="cursor-pointer group perspective h-40"
          >
            <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute w-full h-full bg-noir-folder border border-gray-600 p-6 flex flex-col justify-center items-center backface-hidden shadow-lg group-hover:border-noir-tan">
                <p className="text-gray-400 text-sm mb-2 text-center">"{item.clue1}"</p>
                <div className="w-8 h-px bg-noir-tan my-2"></div>
                <p className="text-gray-400 text-sm text-center">"{item.clue2}"</p>
                <p className="mt-4 text-noir-red font-mono text-xs animate-pulse">CLICK TO DECRYPT</p>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full bg-noir-tan border-2 border-white p-6 flex justify-center items-center backface-hidden rotate-y-180 shadow-lg">
                 <h3 className="text-3xl font-bold text-black font-mono tracking-widest">{item.answer}</h3>
              </div>
            </div>
            {/* Simple CSS for flip if Tailwind plugin not present */}
            <style>{`
              .perspective { perspective: 1000px; }
              .transform-style-3d { transform-style: preserve-3d; }
              .backface-hidden { backface-visibility: hidden; }
              .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
          </div>
        );
      })}
    </div>
  );
};