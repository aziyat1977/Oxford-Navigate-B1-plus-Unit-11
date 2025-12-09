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
    <div className="w-full max-w-4xl mx-auto my-24 relative group">
      {/* Folder Tab */}
      <div className="absolute -top-10 left-0 bg-noir-folder text-noir-tan px-6 py-2 font-mono text-sm border-t border-l border-r border-gray-700 rounded-t-lg flex items-center gap-2">
        {icon}
        <span>CASE FILE: {id}</span>
      </div>

      {/* Folder Body */}
      <div className="bg-noir-paper border-l-4 border-noir-tan p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Stamp */}
        <div className="absolute top-4 right-8 border-4 border-noir-red opacity-20 transform -rotate-12 p-2 pointer-events-none">
          <span className="text-noir-red font-black font-mono text-xl uppercase">Confidential</span>
        </div>

        <div className="border-b border-dashed border-gray-600 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-white mb-1 uppercase tracking-wider">{title}</h2>
          <p className="font-mono text-noir-tan">{subtitle}</p>
        </div>

        <div className="text-noir-text leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};