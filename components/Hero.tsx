import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black border-b-4 border-noir-red relative overflow-hidden p-4">
        
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }}></div>

      <div className="z-10 text-center w-full max-w-7xl mx-auto">
        <div className="inline-block border-2 border-noir-red px-4 py-2 md:px-6 mb-6 md:mb-8 transform -rotate-2">
          <span className="text-noir-red font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-xl">TOP SECRET // EYES ONLY</span>
        </div>

        {/* Fluid Typography: Scales smoothly from 3rem to 8rem based on viewport width */}
        <h1 className="font-black text-white mb-4 tracking-tighter uppercase font-sans" style={{ fontSize: 'clamp(3rem, 15vw, 8rem)', lineHeight: 0.9 }}>
          Unit <span className="text-noir-red">11</span>
        </h1>
        
        <p className="font-mono text-noir-tan text-base sm:text-xl md:text-3xl typewriter-cursor px-4">
          SUBJECT: Outlaws, Regrets & Polysemy
        </p>

        <div className="mt-8 md:mt-12 text-gray-500 max-w-lg mx-auto text-xs sm:text-sm font-mono border-t border-gray-800 pt-4 px-4 leading-relaxed">
          WARNING: This file contains classified grammar protocols. Unintended consequences may occur if studied improperly.
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 animate-bounce text-gray-600">
         <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </div>
  );
};