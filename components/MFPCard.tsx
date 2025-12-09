import React, { useState } from 'react';
import { Volume2, Globe } from 'lucide-react';
import { speak, playSFX } from '../utils/audio';

interface MFPCardProps {
  word: string;
  ipa: string;
  type: string;
  definition: string;
  context: string;
  ru: string;
  uz: string;
}

export const MFPCard: React.FC<MFPCardProps> = ({ word, ipa, type, definition, context, ru, uz }) => {
  const [showRu, setShowRu] = useState(false);
  const [showUz, setShowUz] = useState(false);

  const handleSpeak = () => {
    playSFX('click');
    // Clean the word of any slashes e.g. "theft / a theft" -> "theft"
    const cleanWord = word.split('/')[0].trim();
    speak(cleanWord);
  };

  const toggleTranslation = (lang: 'ru' | 'uz') => {
    playSFX('reveal');
    if (lang === 'ru') setShowRu(!showRu);
    else setShowUz(!showUz);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* HEADER: Word & Pronunciation */}
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{word}</h3>
          <div className="flex items-center gap-3">
             <span className="font-mono text-noir-red text-xl">{ipa}</span>
             <span className="text-gray-400 text-sm font-bold uppercase bg-gray-100 dark:bg-black px-2 py-1 rounded">{type}</span>
          </div>
        </div>
        <button 
          onClick={handleSpeak}
          className="bg-noir-red/10 text-noir-red p-3 rounded-full hover:bg-noir-red hover:text-white transition-colors active:scale-90"
          title="Listen to pronunciation"
        >
          <Volume2 size={24} />
        </button>
      </div>

      {/* BODY: Definition & Context */}
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Meaning (Definition)</h4>
          <p className="text-xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{definition}</p>
        </div>
        <div>
          <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Context</h4>
          <div className="flex items-center gap-2">
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">"{context}"</p>
            <button 
              onClick={() => speak(context, 0.85)} 
              className="p-1 text-gray-400 hover:text-noir-red"
              title="Listen to sentence"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER: Translations */}
      <div className="flex gap-4 mt-6">
        <div className="flex-1">
          <button 
            onClick={() => toggleTranslation('ru')}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all
              ${showRu ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-black text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}
            `}
          >
            <Globe size={16} /> RU
          </button>
          <div className={`mt-2 text-center overflow-hidden transition-all duration-300 ${showRu ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-bold">{ru}</p>
          </div>
        </div>

        <div className="flex-1">
          <button 
            onClick={() => toggleTranslation('uz')}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all
              ${showUz ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-black text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'}
            `}
          >
            <Globe size={16} /> UZ
          </button>
          <div className={`mt-2 text-center overflow-hidden transition-all duration-300 ${showUz ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-lg text-green-600 dark:text-green-400 font-bold">{uz}</p>
          </div>
        </div>
      </div>

    </div>
  );
};