import React, { useState } from 'react';
import { Radio, Activity, Check, X, Play } from 'lucide-react';
import { playSFX, speak } from '../utils/audio';

interface AudioChallenge {
  id: number;
  context: string;
  corruptedSentence: string;
  options: string[];
  correct: string;
  explanation: string;
}

const CHALLENGES: AudioChallenge[] = [
  {
    id: 1,
    context: "Office Rules (Obligation)",
    corruptedSentence: "We ___ get permission before leaving.",
    options: ["must", "might", "would"],
    correct: "must",
    explanation: "Context implies a rule/obligation. 'Must' is often reduced in fast speech."
  },
  {
    id: 2,
    context: "Past Narrative (Past Obligation)",
    corruptedSentence: "I decided to help, so I ___ stay late.",
    options: ["must", "had to", "could"],
    correct: "had to",
    explanation: "We often shift 'must' to 'had to' when talking about the past."
  },
  {
    id: 3,
    context: "Uncertainty (Possibility)",
    corruptedSentence: "It ___ be a software error, but I'm not sure.",
    options: ["will", "could", "must"],
    correct: "could",
    explanation: "'Could' expresses possibility here. 'Must' would imply certainty."
  }
];

export const AudioDecryptor: React.FC = () => {
  const [activeId, setActiveId] = useState(0);
  const [selection, setSelection] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const current = CHALLENGES[activeId];

  const handlePlayAudio = () => {
    playSFX('glitch');
    // Read sentence with a "beep" for the blank
    const textToRead = current.corruptedSentence.replace('___', 'beep');
    setTimeout(() => speak(textToRead, 1.0), 500);
  };

  const handleCheck = (opt: string) => {
    setSelection(opt);
    if (opt === current.correct) {
      playSFX('correct');
      setIsSolved(true);
      // Read the full correct sentence
      setTimeout(() => {
          speak(current.corruptedSentence.replace('___', current.correct));
      }, 500);
    } else {
      playSFX('wrong');
    }
  };

  const next = () => {
    playSFX('click');
    if (activeId < CHALLENGES.length - 1) {
      setActiveId(prev => prev + 1);
      setSelection(null);
      setIsSolved(false);
    }
  };

  return (
    <div className="bg-black border-2 border-gray-800 rounded-xl p-4 md:p-6 relative overflow-hidden my-8">
      {/* Decryption Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-noir-red/20 p-2 rounded-full animate-pulse flex-shrink-0">
            <Radio className="text-noir-red" size={24} />
          </div>
          <div>
            <h3 className="text-white font-mono font-bold uppercase tracking-widest text-sm md:text-base">Audio Intercept</h3>
            <p className="text-gray-500 text-[10px] md:text-xs font-mono">UNLOCK THE CODE // SEGMENT {activeId + 1}/{CHALLENGES.length}</p>
          </div>
        </div>
        <div className="flex gap-1 w-full sm:w-auto">
          {CHALLENGES.map((_, idx) => (
            <div key={idx} className={`h-2 md:h-1 flex-1 sm:w-8 rounded-full transition-colors ${idx <= activeId ? 'bg-noir-tan' : 'bg-gray-800'}`} />
          ))}
        </div>
      </div>

      {/* Waveform Viz */}
      <div className="h-16 md:h-20 flex items-center justify-center gap-1 mb-6 opacity-50 relative group cursor-pointer touch-manipulation" onClick={handlePlayAudio}>
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-green-500 transition-all duration-300 group-hover:bg-green-400"
            style={{ 
              height: `${Math.random() * 100}%`,
              opacity: Math.random() > 0.5 ? 1 : 0.3
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
            <Play fill="white" className="text-white drop-shadow-lg opacity-80" size={48} />
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs font-mono mb-4 uppercase">Click waveform to play corrupted audio</p>

      {/* Challenge Area */}
      <div className="bg-zinc-900 p-4 md:p-6 rounded-lg border border-gray-700 mb-6">
        <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase mb-2">CONTEXT: {current.context}</p>
        <p className="text-xl md:text-2xl text-white font-mono leading-relaxed break-words">
          {current.corruptedSentence.split('___').map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i === 0 && (
                <span className={`inline-block px-3 py-1 mx-1 md:mx-2 rounded border-b-2 text-lg md:text-xl
                  ${isSolved ? 'bg-green-900/50 border-green-500 text-green-400' : 'bg-gray-800 border-gray-600 text-gray-500'}
                `}>
                  {isSolved ? current.correct : '???'}
                </span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* Options - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleCheck(opt)}
            disabled={isSolved}
            className={`
              py-4 px-4 rounded font-bold text-lg uppercase transition-all touch-manipulation border-2
              ${isSolved && opt === current.correct ? 'bg-green-600 text-white border-green-600' : 'border-transparent'}
              ${!isSolved && selection === opt && opt !== current.correct ? 'bg-red-900/50 border-red-500 text-white' : ''}
              ${!isSolved && selection !== opt ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : ''}
              ${isSolved && opt !== current.correct ? 'opacity-30 bg-gray-900' : ''}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback & Next */}
      {selection && (
        <div className={`mt-6 p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in slide-in-from-bottom-2 fade-in
          ${isSolved ? 'border-green-800 bg-green-900/10' : 'border-red-800 bg-red-900/10'}
        `}>
          <div className="flex items-start gap-3">
             {isSolved ? <Check className="text-green-500 mt-1 flex-shrink-0" /> : <X className="text-red-500 mt-1 flex-shrink-0" />}
             <div>
               <p className={`font-bold ${isSolved ? 'text-green-400' : 'text-red-400'}`}>
                 {isSolved ? 'DECRYPTION SUCCESSFUL' : 'DECRYPTION FAILED'}
               </p>
               <p className="text-gray-400 text-sm mt-1 leading-relaxed">{current.explanation}</p>
             </div>
          </div>
          
          {isSolved && activeId < CHALLENGES.length - 1 && (
            <button 
              onClick={next}
              className="w-full md:w-auto bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 uppercase text-sm tracking-wider touch-manipulation"
            >
              Next Segment
            </button>
          )}
           {isSolved && activeId === CHALLENGES.length - 1 && (
            <span className="text-noir-tan font-mono text-sm uppercase text-center w-full md:w-auto">All Segments Restored</span>
          )}
        </div>
      )}

    </div>
  );
};