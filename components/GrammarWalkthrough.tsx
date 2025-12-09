import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Volume2, Globe, Bookmark, Mic, Layers, Type } from 'lucide-react';
import { playSFX, speak } from '../utils/audio';

interface Example {
  en: string;
  ru: string;
  uz: string;
}

interface Pronunciation {
  text: string;
  ipa: string;
  note?: string;
}

interface GrammarWalkthroughProps {
  title: string;
  meaningExamples: Example[];
  timelineComponent: React.ReactNode;
  form: string;
  formNote?: string;
  pronunciations: Pronunciation[];
}

export const GrammarWalkthrough: React.FC<GrammarWalkthroughProps> = ({
  title,
  meaningExamples,
  timelineComponent,
  form,
  formNote,
  pronunciations
}) => {
  const [step, setStep] = useState(0);

  const steps = [
    { id: 'meaning', title: 'STEP 1: MEANING', icon: <Globe /> },
    { id: 'timeline', title: 'STEP 2: TIMELINE', icon: <Layers /> },
    { id: 'form', title: 'STEP 3: FORM', icon: <Type /> },
    { id: 'pronunciation', title: 'STEP 4: SOUND', icon: <Mic /> },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      playSFX('click');
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      playSFX('click');
      setStep(step - 1);
    }
  };

  return (
    <div className="my-12 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
      
      {/* Header */}
      <div className="bg-noir-folder p-6 border-b border-gray-600 flex justify-between items-center">
        <div>
          <h3 className="text-noir-tan font-mono font-bold text-sm uppercase tracking-widest mb-1">GRAMMAR PROTOCOL</h3>
          <h2 className="text-white text-2xl font-black">{title}</h2>
        </div>
        <div className="flex gap-1">
          {steps.map((s, idx) => (
            <div 
              key={s.id} 
              className={`h-2 w-8 rounded-full transition-colors ${idx === step ? 'bg-noir-red' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 p-6 md:p-12 flex flex-col relative">
        <div className="absolute top-6 right-6 text-gray-200 dark:text-gray-800 opacity-10 pointer-events-none">
          {steps[step].icon && React.cloneElement(steps[step].icon as React.ReactElement, { size: 120 })}
        </div>

        <h4 className="text-xl font-bold text-gray-400 mb-8 flex items-center gap-3">
          <span className="bg-noir-red text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">
            {step + 1}
          </span>
          {steps[step].title}
        </h4>

        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-300 key={step}">
          
          {/* STEP 1: MEANING */}
          {step === 0 && (
            <div className="space-y-8">
              {meaningExamples.map((ex, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-xl border-l-4 border-noir-tan hover:bg-white dark:hover:bg-zinc-900 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                      "{ex.en}"
                    </p>
                    <button onClick={() => speak(ex.en)} className="text-gray-400 hover:text-noir-red p-2">
                      <Volume2 size={24} />
                    </button>
                  </div>
                  <div className="space-y-1 pl-4 border-l border-gray-300 dark:border-gray-700">
                    <p className="text-blue-600 dark:text-blue-400 font-medium">RU: {ex.ru}</p>
                    <p className="text-green-600 dark:text-green-400 font-medium">UZ: {ex.uz}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: TIMELINE */}
          {step === 1 && (
            <div className="w-full">
              <div className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg mb-4 text-center text-gray-500 font-mono text-sm">
                VISUALIZING TEMPORAL DISTORTION
              </div>
              {timelineComponent}
            </div>
          )}

          {/* STEP 3: FORM */}
          {step === 2 && (
            <div className="text-center space-y-8">
              <div className="inline-block bg-black dark:bg-white text-white dark:text-black p-8 md:p-12 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform">
                <p className="text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter leading-tight">
                  {form}
                </p>
              </div>
              {formNote && (
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                  <Bookmark className="inline mr-2 text-noir-red" size={20} />
                  {formNote}
                </p>
              )}
            </div>
          )}

          {/* STEP 4: PRONUNCIATION */}
          {step === 3 && (
            <div className="grid gap-6 md:grid-cols-1 max-w-3xl mx-auto w-full">
              {pronunciations.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border-2 border-transparent hover:border-noir-red transition-all">
                  <button 
                    onClick={() => speak(item.text, 0.8)}
                    className="bg-noir-red text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex-shrink-0"
                  >
                    <Volume2 size={32} />
                  </button>
                  <div className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                      "{item.text}"
                    </p>
                    <p className="text-xl font-mono text-noir-tan font-bold">
                      /{item.ipa}/
                    </p>
                    {item.note && <p className="text-gray-500 text-sm mt-2 font-medium">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-100 dark:bg-zinc-900 p-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <button 
          onClick={handlePrev}
          disabled={step === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-black text-gray-800 dark:text-white"
        >
          <ChevronLeft /> Previous
        </button>
        
        <span className="font-mono font-bold text-gray-400">
          PAGE {step + 1} OF {steps.length}
        </span>

        <button 
          onClick={handleNext}
          disabled={step === steps.length - 1}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase transition-colors text-white shadow-lg
            ${step === steps.length - 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-noir-red hover:bg-red-700'}
            disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-500
          `}
        >
          {step === steps.length - 1 ? 'Complete' : 'Next'} <ChevronRight />
        </button>
      </div>
    </div>
  );
};