import React, { useState } from 'react';
import { ArrowLeftRight, VenetianMask } from 'lucide-react';
import { playSFX } from '../utils/audio';

interface PolysemyPair {
  id: number;
  word: string;
  contextA: string;
  contextB: string;
  type: 'gap-fill' | 'matching'; // Ex 7a vs Ex 8b style
}

const WORDS: PolysemyPair[] = [
  // Ex 7a: One word fits both sentences
  { 
    id: 1, 
    word: "FINE", 
    contextA: "The doctor made the patients pay a ____ if they were late.", 
    contextB: "It was a ____, sunny day.",
    type: 'gap-fill'
  },
  { 
    id: 2, 
    word: "BANK", 
    contextA: "They stopped at the ____ to get some money.", 
    contextB: "We pulled the fish out of the river ____.",
    type: 'gap-fill'
  },
  { 
    id: 3, 
    word: "JAM", 
    contextA: "There was a terrible traffic ____ on the way to the airport.", 
    contextB: "For breakfast, they gave us toast and ____.",
    type: 'gap-fill'
  },
  { 
    id: 4, 
    word: "PERFORMANCE", 
    contextA: "The ____ starts at 7.30, so don't be late!", 
    contextB: "Over the last ten years, China's economic ____ has been strong.",
    type: 'gap-fill'
  },
  { 
    id: 5, 
    word: "WAVE", 
    contextA: "My mother gave me a final ____ goodbye.", 
    contextB: "The boat was sunk by an enormous ____.",
    type: 'gap-fill'
  },
  // Ex 8b: Match word to meanings
  {
    id: 6,
    word: "SQUARE",
    contextA: "A shape with four equal sides",
    contextB: "An open area of a town with buildings around it",
    type: 'matching'
  },
  {
    id: 7,
    word: "KEY",
    contextA: "A metal thing for locking a door",
    contextB: "The answer to a problem",
    type: 'matching'
  },
  {
    id: 8,
    word: "MATCH",
    contextA: "A game between two teams",
    contextB: "A small wooden stick for lighting a fire",
    type: 'matching'
  },
  {
    id: 9,
    word: "ROCK",
    contextA: "A large stone",
    contextB: "A type of loud music",
    type: 'matching'
  },
  {
    id: 10,
    word: "LIGHT",
    contextA: "The energy that comes from the sun",
    contextB: "Something you turn on when it's dark (e.g. lamp)",
    type: 'matching'
  },
  {
    id: 11,
    word: "CHANGE",
    contextA: "Money which is coins",
    contextB: "To make something different from before",
    type: 'matching'
  }
];

export const PolysemyGrid: React.FC = () => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealed.includes(id)) {
      setRevealed(revealed.filter(i => i !== id));
      playSFX('click');
    } else {
      setRevealed([...revealed, id]);
      playSFX('reveal');
    }
  };

  return (
    <div className="space-y-12">
      
      {/* SECTION 1: SENTENCE GAP FILL (Ex 7a) */}
      <div>
         <h4 className="text-xl font-bold text-noir-tan mb-6 flex items-center gap-2">
            <VenetianMask /> PHASE 1: MISSING ASSET (Fill the Gap)
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORDS.filter(w => w.type === 'gap-fill').map((item) => (
               <div 
                  key={item.id}
                  onClick={() => toggleReveal(item.id)}
                  className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl relative cursor-pointer group hover:-translate-y-1 transition-transform"
               >
                  <div className={`transition-opacity duration-300 ${revealed.includes(item.id) ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                        1. {item.contextA.replace('____', '_____')}
                     </p>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        2. {item.contextB.replace('____', '_____')}
                     </p>
                  </div>
                  
                  {/* REVEAL OVERLAY */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${revealed.includes(item.id) ? 'opacity-100' : 'opacity-0'}`}>
                     <span className="text-3xl font-black text-noir-red uppercase tracking-widest">{item.word}</span>
                  </div>

                  {!revealed.includes(item.id) && (
                     <div className="absolute bottom-2 right-4">
                        <span className="text-xs text-noir-tan font-mono animate-pulse">CLICK TO IDENTIFY</span>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      {/* SECTION 2: DEFINITION MATCHING (Ex 8b) */}
      <div>
         <h4 className="text-xl font-bold text-noir-tan mb-6 flex items-center gap-2">
            <ArrowLeftRight /> PHASE 2: DOUBLE IDENTITY (Match Definitions)
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORDS.filter(w => w.type === 'matching').map((item) => (
               <div 
                  key={item.id}
                  onClick={() => toggleReveal(item.id)}
                  className="bg-noir-folder border-l-4 border-gray-600 p-4 relative cursor-pointer hover:bg-gray-800 transition-colors"
               >
                  <div className="flex justify-between items-center">
                     <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                           <span className="bg-black text-gray-500 text-xs px-2 py-0.5 rounded font-mono">ALIAS A</span>
                           <span className="text-gray-300 text-sm">{item.contextA}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="bg-black text-gray-500 text-xs px-2 py-0.5 rounded font-mono">ALIAS B</span>
                           <span className="text-gray-300 text-sm">{item.contextB}</span>
                        </div>
                     </div>
                     
                     <div className="ml-4 w-32 text-right">
                        {revealed.includes(item.id) ? (
                           <span className="text-xl font-bold text-white uppercase">{item.word}</span>
                        ) : (
                           <span className="text-xl font-bold text-gray-700 uppercase blur-sm">??????</span>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};