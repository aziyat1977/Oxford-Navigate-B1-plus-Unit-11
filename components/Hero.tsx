import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black border-b-4 border-noir-red relative overflow-hidden">
        
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }}></div>

      <div className="z-10 text-center px-4">
        <div className="inline-block border-2 border-noir-red px-6 py-2 mb-8 transform -rotate-2">
          <span className="text-noir-red font-mono font-bold tracking-[0.3em] text-lg md:text-xl">TOP SECRET // EYES ONLY</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter uppercase font-sans">
          Unit <span className="text-noir-red">11</span>
        </h1>
        
        <p className="font-mono text-noir-tan text-lg md:text-2xl typewriter-cursor">
          SUBJECT: Outlaws, Regrets & Polysemy
        </p>

        <p className="mt-12 text-gray-500 max-w-md mx-auto text-sm font-mono border-t border-gray-800 pt-4">
          WARNING: This file contains classified grammar protocols. Unintended consequences may occur if studied improperly.
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce text-gray-600">
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </div>
  );
};