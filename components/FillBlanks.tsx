import React, { useState } from 'react';
import { playSFX } from '../utils/audio';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  prefix: string;
  suffix: string;
  verb: string;
  answer: string;
  placeholder: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    prefix: "You posted a photo without asking. You",
    suffix: "her first.",
    verb: "ask",
    answer: "should have asked",
    placeholder: "should + have + ask"
  },
  {
    id: 2,
    prefix: "I was rude to my boss. I",
    suffix: "so rude.",
    verb: "be",
    answer: "shouldn't have been",
    placeholder: "shouldn't + have + be"
  }
];

export const FillBlanks: React.FC = () => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean | null>>({});

  const handleChange = (id: number, val: string) => {
    setInputs(prev => ({ ...prev, [id]: val }));
    setResults(prev => ({ ...prev, [id]: null })); // Reset result on typing
  };

  const checkAll = () => {
    const newResults: Record<number, boolean> = {};
    let allCorrect = true;

    QUESTIONS.forEach(q => {
      const userInput = (inputs[q.id] || "").trim().toLowerCase().replace(/\s+/g, ' ');
      const isCorrect = userInput === q.answer.toLowerCase();
      newResults[q.id] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setResults(newResults);

    if (allCorrect) playSFX('correct');
    else playSFX('wrong');
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900/50 p-4 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 my-10">
      <h4 className="text-xl font-black text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-6 flex items-center gap-2">
        <span className="bg-noir-red w-2 h-6 block"></span>
        CRITICISM LOG
      </h4>
      
      <div className="space-y-6">
        {QUESTIONS.map((q) => {
          const result = results[q.id];
          return (
            <div key={q.id} className="bg-white dark:bg-black p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              {/* Flex wrap ensures the sentence flows naturally like a paragraph on mobile */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-lg text-gray-700 dark:text-gray-300">
                <span className="whitespace-normal">{q.prefix}</span>
                <div className="relative inline-block min-w-[200px] flex-1">
                  <input
                    type="text"
                    value={inputs[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className={`w-full bg-gray-50 dark:bg-zinc-900 border-b-2 px-3 py-2 focus:outline-none transition-colors font-mono font-bold text-base
                      ${result === true ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/10' : ''}
                      ${result === false ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700 focus:border-noir-tan'}
                    `}
                  />
                  {result === true && <CheckCircle2 className="absolute right-2 top-2.5 text-green-500 pointer-events-none" size={20} />}
                  {result === false && <AlertCircle className="absolute right-2 top-2.5 text-red-500 pointer-events-none" size={20} />}
                </div>
                <span>{q.suffix}</span>
              </div>
              {result === false && (
                <p className="text-red-500 text-xs mt-3 font-mono ml-2 animate-in slide-in-from-top-1">Correction: {q.answer}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={checkAll}
          className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:opacity-80 transition-opacity shadow-lg touch-manipulation"
        >
          Check Entries
        </button>
      </div>
    </div>
  );
};