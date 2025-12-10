import React from 'react';

interface CaseFileProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const CaseFile: React.FC<CaseFileProps> = ({ id, title, subtitle, children, icon }) => {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 md:my-16 lg:my-24 px-2 sm:px-6 lg:px-8 relative group">
      {/* Folder Tab - Adaptive Positioning */}
      <div className="relative md:absolute md:-top-10 md:left-8 bg-noir-folder text-noir-tan px-4 py-2 font-mono text-xs md:text-sm border-t border-l border-r border-gray-700 rounded-t-lg flex items-center gap-2 z-10 w-fit mx-4 md:mx-0 shadow-lg md:shadow-none">
        {icon}
        <span>CASE FILE: {id}</span>
      </div>

      {/* Folder Body */}
      <div className="bg-noir-paper border-l-0 md:border-l-4 border-t-4 md:border-t-0 border-noir-tan p-4 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden rounded-lg md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-lg">
        {/* Decorative Stamp - Hidden on small mobile to save space, visible on tablet+ */}
        <div className="hidden sm:block absolute top-4 right-8 border-4 border-noir-red opacity-20 transform -rotate-12 p-2 pointer-events-none select-none">
          <span className="text-noir-red font-black font-mono text-lg md:text-xl uppercase">Confidential</span>
        </div>

        <div className="border-b border-dashed border-gray-600 pb-4 mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-2 uppercase tracking-tight break-words">{title}</h2>
          <p className="font-mono text-noir-tan text-sm sm:text-base md:text-lg">{subtitle}</p>
        </div>

        <div className="text-noir-text leading-relaxed w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};